// import { dbFolders } from './scripts/database.mjs';
import { indexFolders } from "./actions/indexFolders.mjs"
import * as dbFolders from "./database/folders/index.mjs"
import { sendMessage } from "./socket.mjs"

export const getAll = async (req, res) => {
  console.log("GET /folders")
  const result = await dbFolders.getAll()

  console.log({ result })
  if (result.didError) {
    return res.json({ error: "dbFolders.getAll" })
  }

  console.log("found ", result.data.length, " folders")
  res.json(result.data)
}

export const getById = async (req, res) => {
  console.log("GET /folders", req.params.id)
  const result = await dbFolders.getById(req.params.id)

  if (result.didError) {
    return res.json({ error: "dbFolders.getById" })
  }

  res.json(result.data)
}

export const add = async (req, res) => {
  console.log("PUT /folders", req.body)
  const createResult = await dbFolders.create(req.body)
  const allFoldersResult = await dbFolders.getAll()
  res.json(allFoldersResult.data)

  await indexFolders()
  const newAllFoldersResult = await dbFolders.getAll()

  sendMessage({
    messageType: "foldersUpdate",
    folders: newAllFoldersResult.data,
  })
}

export const remove = async (req, res) => {
  console.log("DELETE /folders", req.params.id)
  const result = await dbFolders.removeById(req.params.id)

  console.log("remove result", result)
  console.log("and data", result.data)

  const allFoldersResult = await dbFolders.getAll()

  res.json(allFoldersResult.data)
}
