import { getAudioDurationInSeconds } from "get-audio-duration"
import * as dbFolders from "../database/folders/index.mjs"
import * as dbAssets from "../database/assets/index.mjs"
import fs from "fs"
import path from "path"

const fsAsync = fs.promises

const ASSET_FILE_EXTENSIONS = [".midi", ".mid", ".mp3", ".wav"]
const AUDIO_FILE_EXTENSDIONS = [".mp3", ".wav"]
const MIDI_FILE_EXTENSDIONS = [".midi", ".mid"]
const IMAGE_FILE_EXTENSIONS = [".jpg", ".jpeg", ".png"]

const checkIfFileIsAsset = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase()
  return ASSET_FILE_EXTENSIONS.includes(fileExtension)
}

const checkIfFileIsImage = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase()
  return IMAGE_FILE_EXTENSIONS.includes(fileExtension)
}

const getFilesList = async (folderPath) => {
  return await fs.promises.readdir(folderPath, { withFileTypes: true })
}

export const indexFolders = async () => {
  const result = await dbFolders.getAll()

  const foldersToIndex = result.data.filter((folder) => {
    return !folder.isIndexingComplete
  })

  console.log(`found ${foldersToIndex.length} non-indexed folders.`)

  for (const folder of foldersToIndex) {
    await dbFolders.update({
      ...folder,
      isIndexing: true,
    })

    console.log("indexing ", folder.name)
    const stats = await indexFolder(folder)
    console.log("done indexing ", folder.name)
    console.log("stats: ", stats)

    await dbFolders.update({
      ...folder,
      ...stats,
      isIndexing: false,
      isIndexingComplete: true,
    })
  }
}

// Uses the folderPath to identify all recursive child
// asset files (mp3, wav, mid). For each descendant asset
// file, it will check with the database to determine if
// the asset has been indexed or not yet. If so, it will
// skip that file. If it hasn't, then it will continue
// to gather necessary data about the asset and then
// save the data in the database.
const indexFolder = async (folder) => {
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

  const handleAssetIndexing = async ({ localPath, name }) => {
    const builtAsset = await buildAsset(localPath, name, folder.id)
    tallyAssetStats(builtAsset)
    finalAssets.push(builtAsset)
  }

  const promises = assets.map(handleAssetIndexing)
  await Promise.all(promises)

  for (const finalAsset of finalAssets) {
    console.log("creating asset", finalAsset)
    await dbAssets.create(finalAsset)
  }

  return assetStats
}

const buildAsset = async (localPath, name, folderId) => {
  const sizeKbPromise = getFileSize(localPath)
  const lengthPromise = getAudioDurationInSeconds(localPath)
  const [sizeKb, length] = await Promise.all([sizeKbPromise, lengthPromise])
  const kbToMb = sizeKb / 1024
  const sizeMb = kbToMb >= 1 ? kbToMb : 0
  const fileExtension = path.extname(localPath).toLowerCase()
  const isAudio = AUDIO_FILE_EXTENSDIONS.includes(fileExtension)
  const isMidi = MIDI_FILE_EXTENSDIONS.includes(fileExtension)
  const type = (isAudio && "audio") || (isMidi && "midi") || "ERROR"

  return {
    type,
    folderId,
    fileExtension,
    sizeKb: Math.floor(sizeKb),
    sizeMb: Number(sizeMb.toFixed(2)),
    length: Math.round(length),
    localPath,
    name,
  }
}

const getFolderAssetsList = async (localPath) => {
  const assets = []

  const handleFolder = async (localFolderPath) => {
    const currentFolderItems = await getFilesList(localFolderPath)

    for (const item of currentFolderItems) {
      const itemPath = path.join(localFolderPath, item.name).replace(/\\/g, "/")
      const isItemFolder = item.isDirectory()
      const isItemAsset = checkIfFileIsAsset(itemPath)

      if (isItemAsset) {
        assets.push({ localPath: itemPath, name: item.name })
      }

      if (isItemFolder) {
        await handleFolder(itemPath)
      }
    }
  }

  await handleFolder(localPath)
  return [assets]
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
