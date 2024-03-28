import { db } from "../database.mjs"
import { asyncRemoveById } from "../asyncQueries.mjs"

const REMOVE_BY_ID_QUERY = `
  DELETE FROM collections
  WHERE id = ?
`

export const removeById = asyncRemoveById({
  query: REMOVE_BY_ID_QUERY,
})
