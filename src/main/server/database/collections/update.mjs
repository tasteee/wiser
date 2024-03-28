import { db } from "../database.mjs"

export const update = (collection) => {
  const QUERY = `
    UPDATE collections
    SET
      name = ?,
      description = ?,
      createdDate = ?,
      updatedDate = ?,
      artworkPath = ?,
      assetIds = ?
    WHERE
      id = ?
  `

  const assetIdsJson = JSON.stringify(collection.assetIds)
  const collectionDataList = [
    collection.name,
    collection.description,
    collection.createdDate,
    collection.updatedDate,
    collection.artworkPath,
    assetIdsJson,
    collection.id,
  ]

  const handleResult = (error) => {
    error && console.error("error updating collection: ", error.message)
    !error && console.log("collection updated successfully")
  }

  db.run(QUERY, collectionDataList, handleResult)
}
