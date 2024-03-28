import { db } from "../database.mjs"

const GET_BY_ID_QUERY = `
  SELECT * FROM collections
  WHERE id = ?
`

export const getById = asyncQuery({
  method: "get",
  query: GET_BY_ID_QUERY,
})

export const getAll = asyncGetAll({
  query: "SELECT * FROM collections",
})
