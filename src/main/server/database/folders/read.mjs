import { asyncGet, asyncGetAll } from "../asyncQueries.mjs"
import { db } from "../database.mjs"

const GET_BY_ID_QUERY = `
  SELECT * FROM folders
  WHERE id = ?
  LIMIT 1
`

const GET_BY_IS_INDEXING_COMPLETE_QUERY = `
  SELECT * FROM folders
  WHERE isIndexingComplete = ?
`

export const getById = asyncGet({
  method: "get",
  query: GET_BY_ID_QUERY,
})

export const getByIsIndexingComplete = asyncGet({
  method: "get",
  query: GET_BY_IS_INDEXING_COMPLETE_QUERY,
  fallbackData: [],
})

export const getAll = asyncGetAll({
  query: "SELECT * FROM folders",
})
