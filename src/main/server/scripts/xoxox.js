// import { JSONFilePreset } from 'lowdb/node';
// import databaseTemplate from './databaseTemplate.json' assert { type: 'json' };
// import { nanoid } from 'nanoid';

const { JSONFilePreset } = require('lowdb/node');
const databaseTemplate = require('./databaseTemplate.json');
const { nanoid } = require('nanoid');

const database = JSONFilePreset('wiserDatabase.json', databaseTemplate);

// basic
// utility
// functions

const createUniqueArray = (targets) => {
  return Array.from(new Set(targets));
};

const checkArrayObjectsForKeyValue = (options) => {
  const foundObject = options.target.find((item) => {
    return item[options.key] === options.value;
  });

  return !!foundObject;
};

// basic
// CRUD
// shit

// addDatabaseItem({ databaseKey: 'assets', item: { name: 'foo' }})
const addDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey];
    target.push(options.item);
  });
};

// deleteDatabaseItem({ databaseKey: "collections", id: 12345 })
const deleteDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey];

    data[options.databaseKey] = target.filter((item) => {
      return item.id !== options.id;
    });
  });
};

// updateDatabaseItem({ databaseKey: 'assets', id: 12345, applyChanges: () => {} })
const updateDatabaseItem = async (options) => {
  await database.update((data) => {
    const target = data[options.databaseKey];

    for (const item of target) {
      if (item.id === options.id) {
        options.applyChanges(item);
        break;
      }
    }
  });
};

// folders
// related
// stuff

// addFolder(folderPath)
const addFolder = async (folderPath) => {
  const name = path.basename(folderPath);
  const originalIndexDate = Date.now();
  const updatedIndexDate = originalIndexDate;
  const isIndexingComplete = false;
  const isAwaitingIndexing = true;
  const isIndexing = false;
  const shouldIndexRecurisvely = true;
  const albumArtworkSrc = 'https://i.imgur.com/Jgv9KEb.png';
  const midiFileCount = 0;
  const audioFileCount = 0;
  const assetCount = 0;

  const id = nanoid();

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
  };

  await addDatabaseItem({
    databaseKey: 'folders',
    item: updatedFolder,
  });
};

// updateFolder({ id: 12345, assetCount: 12, midiFileCount: 3 })
const updateFolder = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options);
  };

  await updateDatabaseItem({
    databaseKey: 'folders',
    id: options.id,
    applyChanges,
  });
};

// removeFolder(12345)
const removeFolder = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'folders',
    id,
  });
};

// colections
// related
// stuff

// updateCollection({ id: 12345, name: 'foo', description: 'bar' })
const updateCollection = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options);
  };

  await updateDatabaseItem({
    databaseKey: 'collections',
    id: options.id,
    applyChanges,
  });
};

// addAssetToCollection({ id: 12345, assetId: 54321 })
const addAssetToCollection = async (options) => {
  const applyChanges = (item) => {
    const mergedAssetIds = [...item.assetIds, options.assetId];
    const assetIds = createUniqueArray(mergedAssetIds);
    item.assetIds = assetIds;
  };

  await updateDatabaseItem({
    databaseKey: 'collections',
    id: options.id,
    applyChanges,
  });
};

// createCollection({ name: 'foo', description: 'bar' })
const createCollection = async (collection) => {
  // TODO: Set up default artwork path.
  const artworkPath = '';
  const createdDate = Date.now();
  const updatedDate = createdDate;
  const assets = [];
  const id = nanoid();

  const updatedCollection = {
    ...collection,
    createdDate,
    updatedDate,
    artworkPath,
    assets,
    id,
  };

  await addDatabaseItem({
    databaseKey: 'collections',
    item: updatedCollection,
  });
};

// deleteCollection(12345)
const deleteCollection = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'collections',
    id,
  });
};

// assets
// related
// stuff

// removeAsset(12345)
const removeAsset = async (id) => {
  await deleteDatabaseItem({
    databaseKey: 'assets',
    id,
  });
};

const addAsset = async (asset) => {
  const id = nanoid();

  await addDatabaseItem({
    databaseKey: 'assets',
    item: {
      ...asset,
      id,
    },
  });
};

const updateAsset = async (options) => {
  const applyChanges = (item) => {
    Object.apply(item, options);
  };

  await updateDatabaseItem({
    databaseKey: 'assets',
    id: options.id,
    applyChanges,
  });
};

const toggleAssetFavorited = async (id) => {
  const applyChanges = (item) => {
    item.isFavorited = !item.isFavorited;
  };

  await updateDatabaseItem({
    databaseKey: 'assets',
    applyChanges,
    id,
  });
};

// diaidaidia
// ajgejajejgajeg
// aegiaiegaiegi

// Check to see if any folders are not done indexing.
// Returns an array of all folders that need to be indexed.
const checkForIndexingJobs = async () => {
  const folders = database.data.folders;

  const pendingFolders = folders.reduce((list, folder) => {
    if (!folder.isIndexingComplete) list.push(folder);
    return list;
  }, []);

  return pendingFolders;
};

// Checks if an asset matching the given filePath
// has or has not been indexed yet.
const checkIfAssetIsIndexed = async (filePath) => {
  const assets = database.data.assets;

  const isFileIndexed = checkArrayObjectsForKeyValue({
    target: assets,
    key: 'path',
    value: filePath,
  });

  return isFileIndexed;
};

// settings
// stuff
// duh

const getSettings = async (options) => {
  return database.settings;
};

const updateSettings = async (options) => {
  await database.update((data) => {
    Object.apply(data.settings, options);
  });
};

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

module.exports.createUniqueArray = createUniqueArray;
module.exports.checkArrayObjectsForKeyValue = checkArrayObjectsForKeyValue;
module.exports.addDatabaseItem = addDatabaseItem;
module.exports.deleteDatabaseItem = deleteDatabaseItem;
module.exports.updateDatabaseItem = updateDatabaseItem;
module.exports.addFolder = addFolder;
module.exports.updateFolder = updateFolder;
module.exports.removeFolder = removeFolder;
module.exports.updateCollection = updateCollection;
module.exports.addAssetToCollection = addAssetToCollection;
module.exports.createCollection = createCollection;
module.exports.deleteCollection = deleteCollection;
module.exports.removeAsset = removeAsset;
module.exports.addAsset = addAsset;
module.exports.updateAsset = updateAsset;
module.exports.toggleAssetFavorited = toggleAssetFavorited;
module.exports.checkForIndexingJobs = checkForIndexingJobs;
module.exports.checkIfAssetIsIndexed = checkIfAssetIsIndexed;
module.exports.getSettings = getSettings;
module.exports.updateSettings = updateSettings;
module.exports.database = database;
