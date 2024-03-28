import sqlite3 from "sqlite3"

const verbose = sqlite3.verbose()
export const db = new verbose.Database("wiser0.db")

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id TEXT PRIMARY KEY,
      isIndexingComplete BOOLEAN,
      isAwaitingIndexing BOOLEAN,
      isIndexing BOOLEAN,
      shouldIndexRecursively BOOLEAN,
      albumArtworkSrc TEXT,
      midiFileCount INTEGER,
      audioFileCount INTEGER,
      assetCount INTEGER,
      originalIndexDate INTEGER,
      updatedIndexDate INTEGER,
      name TEXT,
      localPath TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS collections (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      createdDate INTEGER,
      updatedDate INTEGER,
      artworkPath TEXT,
      assetIds TEXT -- Assuming you want to store asset IDs as JSON string
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY,
      type TEXT,
      folderId TEXT,
      fileExtension TEXT,
      sizeKb INTEGER,
      sizeMb INTEGER,
      length INTEGER,
      localPath TEXT,
      name TEXT
    )
  `)
})
