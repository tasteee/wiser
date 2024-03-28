import { asyncRemoveById } from "../asyncQueries.mjs"
import { db } from "../database.mjs"

const REMOVE_BY_ID_QUERY = `
  DELETE FROM assets
  WHERE id = ?
`

export const removeById = asyncRemoveById({
  query: REMOVE_BY_ID_QUERY,
})
