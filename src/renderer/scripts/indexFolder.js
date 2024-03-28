const fs = require('fs')
const fsAsync = fs.promises
const ffprobe = require('ffprobe-static')
const ffmpeg = require('fluent-ffmpeg')
const { getAudioDurationInSeconds } = require('get-audio-duration')
const path = require('path')
const { addFolder } = require('./database')

// const {
//   createIndexedFolder,
//   updateIndexedFolder,
//   createAsset,
//   updateAsset,
// } = require("./database");

const addFolderToDatabase = async (folderPath) => {
  await addFolder(folderPath)
}

const startIndexingAssets = () => {}

addFolderToDatabase(
  'C:/Users/hannah/Music/Asset Packs/POP_PIANO/FLPP_WAV_LOOPS/FLPP_120/FLPP_120_BM',
)
