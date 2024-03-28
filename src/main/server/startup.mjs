import { indexFolders } from "./actions/indexFolders.mjs"
import { performFolderIndex } from "./scripts/assetIndexer.mjs"
import * as dbFolders from "./database/folders/index.mjs"
import { sendMessage } from "./socket.mjs"

export const startup = async (request, response) => {
  console.log("GET /startup")
  response.send(200)

  await indexFolders()
  const allFoldersResult = await dbFolders.getAll()

  sendMessage({
    messageType: "foldersUpdate",
    folders: allFoldersResult.data,
  })
}
