import { asyncGet, asyncSearch } from "../asyncQueries.mjs"
import { db } from "../database.mjs"

const GET_BY_ID_QUERY = `
  SELECT * FROM assets
  WHERE id = ?
`
const GET_BY_FOLDER_ID_QUERY = `
  SELECT * FROM assets
  WHERE folderId = ?
`

const GET_BY_TYPE_QUERY = `
  SELECT * FROM assets
  WHERE type = ?
`

const GET_BY_LOCAL_PATH_QUERY = `
  SELECT * FROM assets
  WHERE localPath = ?
  LIMIT 1
`

export const getById = asyncGet({
  method: "get",
  query: GET_BY_ID_QUERY,
})

export const getByFolderId = asyncGet({
  method: "get",
  query: GET_BY_FOLDER_ID_QUERY,
})

export const getByType = asyncGet({
  method: "get",
  query: GET_BY_TYPE_QUERY,
})

export const getByLocalPath = asyncGet({
  method: "get",
  query: GET_BY_LOCAL_PATH_QUERY,
})

const search = asyncSearch({
  baseQuery: `SELECT * FROM assets`,

  paramKeyQueryPieces: {
    type: "type = ?",
    minimumLength: "length >= ?",
    maximumLength: "length <= ?",
    fileExtension: "fileExtension = ?",
  },
})
