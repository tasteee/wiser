import Dexie, { Table } from 'dexie';

import {
  DBAssetT,
  DBCollectionT,
  DBFolderT,
  DBSettingsT,
} from './databaseTypes';

export class Database extends Dexie {
  folders!: Table<DBFolderT>;
  assets!: Table<DBAssetT>;

  constructor() {
    super('wiser-db0');

    this.version(1).stores({
      folders: '++id, name, localPath',
      assets: '++id, name, type, subType, isFavorited',
    });
  }
}

export const db = new Database();
