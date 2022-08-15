import express from "express";
import http from "http";
import path from "path";
import { Server, Socket } from "socket.io";

const app = express();
if (process.env["NODE_ENV"] === "production") {
  app.use("/", express.static(path.resolve(__dirname, "../dist_client")));
}
const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
  },
});
function validateTimerId(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  timerId: string
): boolean {
  //TODO:validate timerId
  // eslint-disable-next-line no-constant-condition
  if (false) {
    socket.emit("requestFailed", "invalid-timer-id");
    return false;
  }
  return true;
}

function validateToken(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  timerId: string,
  token: string
): boolean {
  //TODO:validate token
  // eslint-disable-next-line no-constant-condition
  if (false) {
    socket.emit("requestFailed", "invalid-token");
    return false;
  }
  return true;
}
let startTimeMs = 0;
let elapsedMs = 0;

io.on("connection", (socket) => {
  console.log(`User id ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`User id ${socket.id} DISCONNECTED`);
  });

  // client
  socket.on("joinTimer", (timerId: string) => {
    if (!validateTimerId(socket, timerId)) {
      return;
    }
    socket.join(timerId);
    const durationMs = 10 * 1000;
    socket.emit("timerJoined", timerId, durationMs, startTimeMs, elapsedMs);
  });

  // admin
  socket.on("startTimer", (timerId: string, token: string) => {
    if (!validateTimerId(socket, timerId)) {
      return;
    }
    if (!validateToken(socket, timerId, token)) {
      return;
    }
    startTimeMs = Date.now();
    io.sockets
      .in(timerId)
      .emit("timerStarted", timerId, startTimeMs, elapsedMs);
  });
  socket.on("pauseTimer", (timerId: string, token: string) => {
    if (!validateTimerId(socket, timerId)) {
      return;
    }
    if (!validateToken(socket, timerId, token)) {
      return;
    }
    elapsedMs += Date.now() - startTimeMs;
    io.sockets.in(timerId).emit("timerPaused", timerId, elapsedMs);
  });
  socket.on("resetTimer", (timerId: string, token: string) => {
    if (!validateTimerId(socket, timerId)) {
      return;
    }
    if (!validateToken(socket, timerId, token)) {
      return;
    }
    startTimeMs = 0;
    elapsedMs = 0;
    io.sockets.in(timerId).emit("timerResetted", timerId);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
console.log(__dirname);
