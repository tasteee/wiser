import { nanoid } from "nanoid"
import { asyncCreate } from "../asyncQueries.mjs"
import { db } from "../database.mjs"

const CREATE_ASSET_QUERY = `
  INSERT INTO assets
  (id, folderId, name, localPath, length, type, fileExtension, sizeKb, sizeMb)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const create = asyncCreate({
  query: CREATE_ASSET_QUERY,

  getData: (asset) => {
    return [
      nanoid(),
      asset.folderId,
      asset.name,
      asset.localPath,
      asset.length,
      asset.type,
      asset.fileExtension,
      asset.sizeKb,
      asset.sizeMb,
    ]
  },
})
