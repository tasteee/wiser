import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import './styles/components.css';
import './styles/layout.css';
import './styles/styles.css';
import './styles/tokens.css';
import './styles/utilities.css';

const rootElement = document.getElementById('root') as HTMLElement;
const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
