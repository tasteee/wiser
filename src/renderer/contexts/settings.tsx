import * as React from 'react';
import { createContextHook } from '../utilities/createContextHook';
import { togglePrimitiveItemInArray } from '../utilities/array';

type SettingsContextT = {
  folders: string[];
  addFolder: (path: string) => void;
  removeFolder: (path: string) => void;
};

const contextCreator = (): SettingsContextT => {
  const [folders, setFolders] = React.useState<string[]>([]);

  const addFolder = (path: string) => {
    setFolders([...folders, path]);
  };

  const removeFolder = (path: string) => {
    const updatedFolders = togglePrimitiveItemInArray({
      target: folders,
      item: path,
    });

    setFolders(updatedFolders);
  };

  return {
    folders,
    addFolder,
    removeFolder,
  };
};

export const [SettingsProvider, useSettings] =
  createContextHook<SettingsContextT>(contextCreator);
