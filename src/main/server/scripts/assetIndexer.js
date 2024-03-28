import fs from 'fs';
import path from 'path';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { checkIfAssetIsIndexed, addAsset } from './database.mjs';

const fsAsync = fs.promises;

const ASSET_FILE_EXTENSIONS = ['.midi', '.mid', '.mp3', '.wav'];
const AUDIO_FILE_EXTENSDIONS = ['.mp3', '.wav'];
const MIDI_FILE_EXTENSDIONS = ['.midi', '.mid'];
const IMAGE_FILE_EXTENSIONS = ['.j[g', '.jpeg', '.png'];

const checkIfFileIsAsset = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase();
  return ASSET_FILE_EXTENSIONS.includes(fileExtension);
};

const checkIfFileIsImage = (filePath) => {
  const fileExtension = path.extname(filePath).toLowerCase();
  return IMAGE_FILE_EXTENSIONS.includes(fileExtension);
};

const getFileSize = async (filePath) => {
  try {
    const stats = await fsAsync.stat(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;
    return fileSizeInKilobytes;
  } catch (err) {
    console.error('Error @ getFileSize: ', err);
  }
};

const getFilesList = async (folderPath) => {
  return await fs.promises.readdir(folderPath, { withFileTypes: true });
};

const getFolderAssetsList = async (folderPath) => {
  const currentFolderItems = await getFilesList(folderPath);
  const images = [];
  const folders = [];
  const assets = [];

  for (const item of currentFolderItems) {
    const itemPath = path.join(folderPath, item.name);
    const isItemFolder = item.isDirectory();

    if (isItemFolder) {
      folders.push(itemPath);
      continue;
    }

    const isItemAsset = checkIfFileIsAsset(itemPath);

    if (isItemAsset) {
      assets.push({ assetPath: itemPath, assetName: item.name });
      continue;
    }

    const isItemImage = checkIfFileIsImage(itemPath);

    if (isItemImage) {
      images.push(itemPath);
    }
  }

  await Promise.all(folders.map(getFolderAssetsList));
  return [assets, images];
};

const buildAsset = async (assetPath, assetName, folderId) => {
  const sizeKbPromise = getFileSize(assetPath);
  const lengthPromise = getAudioDurationInSeconds(assetPath);
  const [sizeKb, length] = await Promise.all([sizeKbPromise, lengthPromise]);
  const kbToMb = sizeKb / 1024;
  const sizeMb = kbToMb >= 1 ? kbToMb : 0;
  const fileExtension = path.extname(assetPath).toLowerCase();
  const isAudio = AUDIO_FILE_EXTENSDIONS.includes(fileExtension);
  const isMidi = MIDI_FILE_EXTENSDIONS.includes(fileExtension);
  const type = (isAudio && 'audio') || (isMidi && 'midi') || 'ERROROROR';

  return {
    type,
    folderId,
    fileExtension,
    sizeKb: Math.floor(sizeKb),
    sizeMb: Number(sizeMb.toFixed(2)),
    length: Math.round(length),
    path: assetPath,
    name: assetName,
  };
};

// Uses the folderPath to identify all recursive child
// asset files (mp3, wav, mid). For each descendant asset
// file, it will check with the database to determine if
// the asset has been indexed or not yet. If so, it will
// skip that file. If it hasn't, then it will continue
// to gather necessary data about the asset and then
// save the data in the database.
const performFolderIndex = async (folder) => {
  console.log('\n\n------------------------\n');
  const [assets, imagePaths] = await getFolderAssetsList(folder.path);
  const finalAssets = [];

  const handleAssetIndexing = async ({ assetPath, assetName }) => {
    const isAssetIndexed = await checkIfAssetIsIndexed(assetPath);
    console.log(`\n${assetName}: indexed (${isAssetIndexed})`);

    if (isAssetIndexed) return;
    const asset = await buildAsset(assetPath, assetName, folder.id);
    finalAssets.push(asset);
  };

  const promises = assets.map(handleAssetIndexing);
  await Promise.all(promises);
  console.log(`\nAdding ${finalAssets.length} assets to database\n`);

  for (const finalAsset of finalAssets) {
    console.log(`Adding ${finalAsset.name}.`);
    await addAsset(finalAsset);
    console.log(`${finalAsset.name} added.\n`);
  }

  console.log('\n------------------------\n');
};

performFolderIndex({
  path: 'C:/Users/hannah/Music/Asset Packs/POP_PIANO/FLPP_WAV_LOOPS/FLPP_120/xxx',
  id: 9090909,
});
