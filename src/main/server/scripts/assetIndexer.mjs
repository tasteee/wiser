import fs from "fs"
import path from "path"
import { getAudioDurationInSeconds } from "get-audio-duration"
import { checkIfAssetIsIndexed, addAsset } from "./database.mjs"

const fsAsync = fs.promises

const ASSET_FILE_EXTENSIONS = [".midi", ".mid", ".mp3", ".wav"]
const AUDIO_FILE_EXTENSDIONS = [".mp3", ".wav"]
const MIDI_FILE_EXTENSDIONS = [".midi", ".mid"]
const IMAGE_FILE_EXTENSIONS = [".j[g", ".jpeg", ".png"]

const checkIfFileIsAsset = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase()
  return ASSET_FILE_EXTENSIONS.includes(fileExtension)
}

const checkIfFileIsImage = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase()
  return IMAGE_FILE_EXTENSIONS.includes(fileExtension)
}

const getFileSize = async (filePath) => {
  try {
    const stats = await fsAsync.stat(filePath)
    const fileSizeInBytes = stats.size
    const fileSizeInKilobytes = fileSizeInBytes / 1024
    return fileSizeInKilobytes
  } catch (err) {
    console.error("Error @ getFileSize: ", err)
  }
}

const getFilesList = async (folderPath) => {
  return await fs.promises.readdir(folderPath, { withFileTypes: true })
}

const getFolderAssetsList = async (folderPath) => {
  const currentFolderItems = await getFilesList(folderPath)
  const images = []
  const folders = []
  const assets = []

  for (const item of currentFolderItems) {
    const itemPath = path.join(folderPath, item.name).replace(/(\\)(\\)/g, "/")
    const isItemFolder = item.isDirectory()

    if (isItemFolder) {
      folders.push(itemPath)
      continue
    }

    const isItemAsset = checkIfFileIsAsset(itemPath)

    if (isItemAsset) {
      assets.push({ assetPath: itemPath, assetName: item.name })
      continue
    }

    const isItemImage = checkIfFileIsImage(itemPath)

    if (isItemImage) {
      images.push(itemPath)
    }
  }

  await Promise.all(folders.map(getFolderAssetsList))
  return [assets, images]
}

const buildAsset = async (assetPath, assetName, folderId) => {
  const sizeKbPromise = getFileSize(assetPath)
  const lengthPromise = getAudioDurationInSeconds(assetPath)
  const [sizeKb, length] = await Promise.all([sizeKbPromise, lengthPromise])
  const kbToMb = sizeKb / 1024
  const sizeMb = kbToMb >= 1 ? kbToMb : 0
  const fileExtension = path.extname(assetPath).toLowerCase()
  const isAudio = AUDIO_FILE_EXTENSDIONS.includes(fileExtension)
  const isMidi = MIDI_FILE_EXTENSDIONS.includes(fileExtension)
  const type = (isAudio && "audio") || (isMidi && "midi") || "ERROROROR"

  return {
    type,
    folderId,
    fileExtension,
    sizeKb: Math.floor(sizeKb),
    sizeMb: Number(sizeMb.toFixed(2)),
    length: Math.round(length),
    path: assetPath,
    name: assetName,
  }
}

// Uses the folderPath to identify all recursive child
// asset files (mp3, wav, mid). For each descendant asset
// file, it will check with the database to determine if
// the asset has been indexed or not yet. If so, it will
// skip that file. If it hasn't, then it will continue
// to gather necessary data about the asset and then
// save the data in the database.
export const performFolderIndex = async (folder) => {
  const [assets, imagePaths] = await getFolderAssetsList(folder.localPath)
  const finalAssets = []

  const assetStats = {
    midiFileCount: 0,
    audioFileCount: 0,
    assetCount: assets.length,
  }

  const tallyAssetStats = (asset) => {
    if (asset.type === "audio") assetStats.audioFileCount++
    if (asset.type === "midi") assetStats.midiFileCount++
  }

  const handleAssetIndexing = async ({ assetPath, assetName }) => {
    const foundAsset = await checkIfAssetIsIndexed(assetPath)
    const didFindAsset = !!foundAsset

    console.log("did find asset?", didFindAsset, foundAsset?.id)

    if (didFindAsset) {
      tallyAssetStats(foundAsset)
      return
    }

    const asset = await buildAsset(assetPath, assetName, folder.id)
    tallyAssetStats(asset)
    finalAssets.push(asset)
  }

  const promises = assets.map(handleAssetIndexing)
  await Promise.all(promises)

  for (const finalAsset of finalAssets) {
    await addAsset(finalAsset)
  }

  return assetStats
}

// performFolderIndex({
//   path: 'C:/Users/hannah/Music/Asset Packs/POP_PIANO/FLPP_WAV_LOOPS/FLPP_120/xxx',
//   id: 9090909,
// });
