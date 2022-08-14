import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
  }
});
io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});