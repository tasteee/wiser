// const { database, getSettings } = require('./scripts/database');
// import { dbSettings } from './scripts/database.mjs';
// import { JSONFilePreset } from 'lowdb/node';
// import databaseTemplate from './scripts/databaseTemplate.json' assert { type: 'json' };
import { dbSettings } from './scripts/database.mjs';

export const get = async (req, res) => {
  console.log('\nGET /settings\n');
  const settings = await dbSettings.get();
  console.log('----------- ', settings);
  res.json(settings);
};

export const update = async (req, res) => {
  console.log('\nPUT /settings\n');
  const settings = await dbSettings.update(req.json);
  console.log('----------- ', settings);
  res.json(settings);
};
