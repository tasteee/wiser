const { dialog } = require('electron');

const selectDirectory = async () => {
  const result = await dialog.showOpenDialog(null, {
    properties: ['openDirectory'],
  });
  if (result.canceled) {
    return null;
  } else {
    const dir = result.filePaths[0];
    return dir;
  }
};
