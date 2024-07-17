const WebSocket = require('websocket').w3cwebsocket;
const Deepgram = require('@deepgram/sdk');

const deepgramApiKey = 'DEEPGRAM_API_KEY';
const deepgram = new Deepgram(deepgramApiKey);

let socket;

const initializeDeepgram = () => {
  socket = new WebSocket('wss://api.deepgram.com/v1/listen');

  socket.onopen = () => {
    console.log('deepgram: connected');
  };

  socket.onmessage = (message) => {
    console.log('deepgram: packet received');
    const data = JSON.parse(message.data);
    console.log('deepgram: metadata received', data);
    // Process the data and send it to the client
  };

  socket.onclose = () => {
    console.log('deepgram: disconnected');
    // Attempt to reconnect or handle the disconnection
  };

  socket.onerror = (error) => {
    console.error('deepgram: error', error);
    // Handle the error
  };
};

const sendToDeepgram = (data) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  } else {
    console.error('Cannot send data, WebSocket is not open');
  }
};

initializeDeepgram();

// Your server code
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('AI Voice Assistant is running');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
