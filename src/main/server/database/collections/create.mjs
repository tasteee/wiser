import { db } from "../database.mjs"

export const create = (collection, assetIds) => {
  const QUERY = `
    INSERT INTO collections
    (id, name, description, createdDate, updatedDate, artworkPath, assetIds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  const assetIdsJson = JSON.stringify(assetIds)
  const collectionDataList = [
    collection.id,
    collection.name,
    collection.description,
    collection.createdDate,
    collection.updatedDate,
    collection.artworkPath,
    assetIdsJson,
  ]

  const handleResult = (error) => {
    error && console.error("error creating collection: ", error.message)
    !error && console.log("collection created successfully")
  }

  db.run(QUERY, collectionDataList, handleResult)
}
