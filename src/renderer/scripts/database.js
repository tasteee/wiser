import { JSONFilePreset } from 'lowdb/node'
import databaseTemplate from './databaseTemplate.json' assert { type: 'json' }
import { nanoid } from 'nanoid'

const database = await JSONFilePreset('wiiserDatabase.json', databaseTemplate)

// basic
// utility
// functions

export const createUniqueArray = (targets) => {
  return Array.from(new Set(targets))
}

export const checkArrayObjectsForKeyValue = (options) => {
  const foundObject = options.target.find((item) => {
    return item[options.key] === options.value
  })

  return !!foundObject
}

// basic
// CRUD
// shit

// addDatabaseItem({ databaseKey: 'assets', item: { name: 'foo' }})
export const addDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey]
    target.push(options.item)
  })
}

// deleteDatabaseItem({ databaseKey: "collections", id: 12345 })
export const deleteDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey]

    data[options.databaseKey] = target.filter((item) => {
      return item.id !== options.id
    })
  })
}

// updateDatabaseItem({ databaseKey: 'assets', id: 12345, applyChanges: () => {} })
export const updateDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey]

    for (const item of target) {
      if (item.id === options.id) {
        options.applyChanges(item)
        break
      }
    }
  })
}

// folders
// related
// stuff

// addFolder(folderPath)
export const addFolder = async (folderPath) => {
  const name = path.basename(folderPath)
  const originalIndexDate = Date.now()
  const updatedIndexDate = originalIndexDate
  const isIndexingComplete = false
  const isAwaitingIndexing = true
  const isIndexing = false
  const shouldIndexRecurisvely = true
  const albumArtworkSrc = 'https://i.imgur.com/Jgv9KEb.png'
  const midiFileCount = 0
  const audioFileCount = 0
  const assetCount = 0

  const id = nanoid()

  // Add common data to the folder object.
  const updatedFolder = {
    isIndexingComplete,
    isAwaitingIndexing,
    isIndexing,
    name,
    shouldIndexRecurisvely,
    albumArtworkSrc,
    midiFileCount,
    audioFileCount,
    assetCount,
    originalIndexDate,
    updatedIndexDate,
    ...folder,
    id,
  }

  await addDatabaseItem({
    databaseKey: 'folders',
    item: updatedFolder,
  })
}

// updateFolder({ id: 12345, assetCount: 12, midiFileCount: 3 })
export const updateFolder = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options)
  }

  await updateDatabaseItem({
    databaseKey: 'folders',
    id: options.id,
    applyChanges,
  })
}

// removeFolder(12345)
export const removeFolder = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'folders',
    id,
  })
}

// colections
// related
// stuff

// updateCollection({ id: 12345, name: 'foo', description: 'bar' })
export const updateCollection = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options)
  }

  await updateDatabaseItem({
    databaseKey: 'collections',
    id: options.id,
    applyChanges,
  })
}

// addAssetToCollection({ id: 12345, assetId: 54321 })
export const addAssetToCollection = async (options) => {
  const applyChanges = (item) => {
    const mergedAssetIds = [...item.assetIds, options.assetId]
    const assetIds = createUniqueArray(mergedAssetIds)
    item.assetIds = assetIds
  }

  await updateDatabaseItem({
    databaseKey: 'collections',
    id: options.id,
    applyChanges,
  })
}

// createCollection({ name: 'foo', description: 'bar' })
export const createCollection = async (collection) => {
  // TODO: Set up default artwork path.
  const artworkPath = ''
  const createdDate = Date.now()
  const updatedDate = createdDate
  const assets = []
  const id = nanoid()

  const updatedCollection = {
    ...collection,
    createdDate,
    updatedDate,
    artworkPath,
    assets,
    id,
  }

  await addDatabaseItem({
    databaseKey: 'collections',
    item: updatedCollection,
  })
}

// deleteCollection(12345)
export const deleteCollection = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'collections',
    id,
  })
}

// assets
// related
// stuff

// removeAsset(12345)
export const removeAsset = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'assets',
    id,
  })
}

export const addAsset = async (asset) => {
  const id = nanoid()

  await addDatabaseItem({
    databaseKey: 'assets',
    item: {
      ...asset,
      id,
    },
  })
}

export const updateAsset = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options)
  }

  await updateDatabaseItem({
    databaseKey: 'assets',
    id: options.id,
    applyChanges,
  })
}

export const toggleAssetFavorited = async (id) => {
  const applyChanges = (item) => {
    item.isFavorited = !item.isFavorited
  }

  await updateDatabaseItem({
    databaseKey: 'assets',
    applyChanges,
    id,
  })
}

// diaidaidia
// ajgejajejgajeg
// aegiaiegaiegi

// Check to see if any folders are not done indexing.
// Returns an array of all folders that need to be indexed.
export const checkForIndexingJobs = async () => {
  const folders = database.data.folders

  const pendingFolders = folders.reduce((list, folder) => {
    if (!folder.isIndexingComplete) list.push(folder)
    return list
  }, [])

  return pendingFolders
}

// Checks if an asset matching the given filePath
// has or has not been indexed yet.
export const checkIfAssetIsIndexed = async (filePath) => {
  const assets = database.data.assets

  const isFileIndexed = checkArrayObjectsForKeyValue({
    target: assets,
    key: 'path',
    value: filePath,
  })

  return isFileIndexed
}

// settings
// stuff
// duh

export const updateSettings = async (options) => {
  await database.update((data) => {
    Object.apply(data.settings, options)
  })
}

// module
// exports
// stuff

// module.exports.updateSettings = updateSettings
// module.exports.checkIfAssetIsIndexed = checkIfAssetIsIndexed
// module.exports.checkForIndexingJobs = checkForIndexingJobs

// module.exports.addAssetToCollection = addAssetToCollection
// module.exports.createCollection = createCollection
// module.exports.updateCollection = updateCollection
// module.exports.deleteCollection = deleteCollection

// module.exports.addFolder = addFolder
// module.exports.removeFolder = removeFolder
// module.exports.updateFolder = updateFolder

// module.exports.addAsset = addAsset
// module.exports.removeAsset = removeAsset
// module.exports.updateAsset = updateAsset
// module.exports.toggleAssetFavorited = toggleAssetFavorited

// module.exports.initializeDatabase = initializeDatabase
