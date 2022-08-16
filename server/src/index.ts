import crypto from "crypto";
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
type TimerData = {
  startTimeMs: number;
  elapsedMs: number;
  durationMs: number;
  token: string;
};
const timerDatas: Record<string, TimerData | undefined> = {};
function fetchTimerDataOrThrow(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  timerId: string,
  token?: string
): TimerData | undefined {
  const data = timerDatas[timerId];
  if (data === undefined) {
    socket.emit("requestFailed", "invalid-timer-id");
    return undefined;
  }
  if (token !== undefined && data.token !== token) {
    socket.emit("requestFailed", "invalid-token");
    return undefined;
  }
  return data;
}

io.on("connection", (socket) => {
  console.log(`User id ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`User id ${socket.id} DISCONNECTED`);
  });

  // client
  socket.on("joinTimer", (timerId: string, token) => {
    const timerData = fetchTimerDataOrThrow(socket, timerId, token);
    if (timerData === undefined) {
      return;
    }
    socket.join(timerId);
    socket.emit(
      "timerJoined",
      timerId,
      timerData.durationMs,
      timerData.startTimeMs,
      timerData.elapsedMs
    );
  });

  function generateTimerId(): string {
    for (;;) {
      const timerId = `timer-${crypto.randomBytes(8).toString("hex")}`;
      if (timerDatas[timerId] === undefined) {
        return timerId;
      }
    }
  }

  socket.on("createTimer", (durationMs, callback) => {
    if (durationMs === 0) {
      socket.emit("requestFailed", "unexpected-error");
      return;
    }
    const timerId = generateTimerId();
    const token = crypto.randomBytes(24).toString("base64");
    timerDatas[timerId] = {
      durationMs,
      token,
      startTimeMs: 0,
      elapsedMs: 0,
    };
    callback(timerId, token);
  });

  // admin
  socket.on("startTimer", (timerId: string, token: string) => {
    const timerData = fetchTimerDataOrThrow(socket, timerId, token);
    if (timerData === undefined) {
      return;
    }
    timerData.startTimeMs = Date.now();
    io.sockets
      .in(timerId)
      .emit(
        "timerStarted",
        timerId,
        timerData.startTimeMs,
        timerData.elapsedMs
      );
  });
  socket.on("pauseTimer", (timerId: string, token: string) => {
    const timerData = fetchTimerDataOrThrow(socket, timerId, token);
    if (timerData === undefined) {
      return;
    }
    timerData.elapsedMs += Date.now() - timerData.startTimeMs;
    timerData.startTimeMs = 0;
    io.sockets.in(timerId).emit("timerPaused", timerId, timerData.elapsedMs);
  });
  socket.on("resetTimer", (timerId: string, token: string) => {
    const timerData = fetchTimerDataOrThrow(socket, timerId, token);
    if (timerData === undefined) {
      return;
    }
    timerData.startTimeMs = 0;
    timerData.elapsedMs = 0;
    io.sockets.in(timerId).emit("timerResetted", timerId);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
console.log(__dirname);
