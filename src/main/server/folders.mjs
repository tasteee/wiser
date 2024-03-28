// const { database, getSettings } = require('./scripts/database');
// import { dbFolders } from './scripts/database.mjs';
// import { JSONFilePreset } from 'lowdb/node';
// import databaseTemplate from './scripts/databaseTemplate.json' assert { type: 'json' };
import { dbFolders } from './scripts/database.mjs';

export const get = async (req, res) => {
  console.log('\nGET /folders\n');
  const folders = await dbFolders.get();
  console.log('----------- ', folders);
  res.json(folders);
};

export const add = async (req, res) => {
  console.log('\nPUT /folders\n', req.body);
  const folders = await dbFolders.add(req.body);
  console.log('----------- ', folders);
  res.json(folders);
};

export const remove = async (req, res) => {
  console.log('\nDELETE /folders\n', req.params.id);
  const folders = await dbFolders.remove(req.params.id);
  res.json(folders);
};
