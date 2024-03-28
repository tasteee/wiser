import { nanoid } from "nanoid"
import { db } from "../database.mjs"
import { asyncCreate } from "../asyncQueries.mjs"

const CREATE_FOLDER_QUERY = `
  INSERT INTO folders
  (id, isIndexingComplete, isAwaitingIndexing, isIndexing, shouldIndexRecursively, albumArtworkSrc, midiFileCount, audioFileCount, assetCount, originalIndexDate, updatedIndexDate, name, localPath)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const create = asyncCreate({
  query: CREATE_FOLDER_QUERY,

  getData: (folder) => {
    return [nanoid(), false, true, false, true, "", 0, 0, 0, 0, 0, folder.name, folder.localPath]
  },
})
