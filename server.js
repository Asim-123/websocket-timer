const express = require('express');
const WebSocket = require('ws');

// Create an Express application
const app = express();

const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const interval = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    ws.send(currentTime);
  }, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket server is running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
