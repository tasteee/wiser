import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:19283');

ws.on('error', console.error);

ws.on('open', () => {
  console.log('SOCKET OPEN');
});

export const sendMessage = (message) => {
  const string = JSON.stringify(message);
  ws.send(string);
};
