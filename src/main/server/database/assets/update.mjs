import { db } from "../database.mjs"

export const update = (asset) => {
  const QUERY = `
    UPDATE assets
    SET
      folderId = ?,
      name = ?,
      localPath = ?,
      length = ?,
      type = ?,
      fileExtension = ?,
      sizeKb = ?,
      sizeMb = ?
    WHERE
      id = ?
  `

  const assetDataList = [
    asset.folderId,
    asset.name,
    asset.localPath,
    asset.length,
    asset.type,
    asset.fileExtension,
    asset.sizeKb,
    asset.sizeMb,
    asset.id,
  ]

  const handleResult = (error) => {
    error && console.error("error updating asset: ", error.message)
    !error && console.log("asset updated successfully")
  }

  db.run(QUERY, assetDataList, handleResult)
}
