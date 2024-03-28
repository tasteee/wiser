import * as React from 'react';
import { createContextHook } from '../utilities/createContextHook';
import { services } from '../services';
import { DBFolderT } from '../services/databaseTypes';

type PartialOrFullFolderT = PartialFolderT | DBFolderT;
type FolderListT = Array<PartialOrFullFolderT>;

type SettingsContextT = {
  settings: DBSettingsT | undefined;
  folders: FolderListT;
  addFolder: (folder: PartialFolderT) => void;
  removeFolder: (folder: DBFolderT) => void;
};

const contextCreator = (): SettingsContextT => {
  const [settings, setSettings] = React.useState<DBSettingsT | undefined>();
  const [folders, setFolders] = React.useState<FolderListT>([]);

  React.useEffect(() => {
    try {
      services.settings.get().json(setSettings);
      services.folders.get().json(setFolders);
    } catch (error) {
      console.log('Error at settings.get or folders.get', error);
    }
  }, []);

  const addFolder = async (folder: PartialFolderT) => {
    try {
      const response = await services.folders.add(folder);
      const updatedFolders = await response.json();
      setFolders(updatedFolders as DBFolderT[]);
    } catch (error) {
      console.log({ ERROR: error });
    }
  };

  const removeFolder = async (folder: DBFolderT) => {
    try {
      const response = await services.folders.remove(folder.id);
      const updatedFolders = await response.json();
      setFolders(updatedFolders as DBFolderT[]);
    } catch (error) {
      console.log({ ERROR: error });
    }
  };

  return {
    settings,
    folders,
    addFolder,
    removeFolder,
  };
};

export const [SettingsProvider, useSettings] =
  createContextHook<SettingsContextT>(contextCreator);
