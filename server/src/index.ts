import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from "socket.io";

const app = express();
if (process.env["NODE_ENV"] === "production"){
  app.use("/", 
    express.static(
      path.resolve(__dirname, "../dist_client")
    )
  );
}
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
console.log(__dirname)