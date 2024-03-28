import { db } from "../database.mjs"

export const update = (folder) => {
  const QUERY = `
    UPDATE folders
    SET
      isIndexingComplete = ?,
      isAwaitingIndexing = ?,
      isIndexing = ?,
      shouldIndexRecursively = ?,
      albumArtworkSrc = ?,
      midiFileCount = ?,
      audioFileCount = ?,
      assetCount = ?,
      originalIndexDate = ?,
      updatedIndexDate = ?,
      name = ?,
      localPath = ?
    WHERE
      id = ?
  `

  const folderDataList = [
    folder.isIndexingComplete,
    folder.isAwaitingIndexing,
    folder.isIndexing,
    folder.shouldIndexRecursively,
    folder.albumArtworkSrc,
    folder.midiFileCount,
    folder.audioFileCount,
    folder.assetCount,
    folder.originalIndexDate,
    folder.updatedIndexDate,
    folder.name,
    folder.localPath,
    folder.id,
  ]

  const handleResult = (error) => {
    error && console.error("error updating folder: ", error.message)
    !error && console.log("folder updated successfully")
  }

  db.run(QUERY, folderDataList, handleResult)
}
