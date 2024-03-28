import { nanoid } from 'nanoid';
import { WebSocketServer, WebSocket } from 'ws';

export const ws = new WebSocketServer({ port: 19283 });

ws.on('connection', (server) => {
  // console.log('SOCKET CONNECTION');

  server.on('error', (error) => {
    throw error;
  });

  server.on('message', (data) => {
    const json = JSON.parse(data);
    const { from, messageType, ...otherData } = json;

    // console.log('ON MESSAGE', json);
    broadcast({
      messageType,
      ...otherData,
    });
  });
});

export const broadcast = (json) => {
  ws.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const string = JSON.stringify(json);
      client.send(string);
    }
  });
};
