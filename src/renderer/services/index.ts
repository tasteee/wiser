import wretch from 'wretch';

const server = wretch('http://127.0.0.1:64426');

export const getSettings = () => {
  return server.get('/settings');
};

const updateSettings = async (updates: any) => {};

export const getFolders = () => {
  return server.get('/folders');
};

const addFolder = (partialFolderData: PartialFolderT) => {
  return server.url('/folders/add').put(partialFolderData);
};

const removeFolder = (id: string) => {
  return server.url('/folders/' + id).delete();
};

export const services = {
  settings: {
    get: getSettings,
    update: updateSettings,
  },

  folders: {
    get: getFolders,
    add: addFolder,
    remove: removeFolder,
  },
};
