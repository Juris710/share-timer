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
const timerDatas: Record<string, TimerData | undefined> = {
  "timer-1": {
    startTimeMs: 0,
    elapsedMs: 0,
    durationMs: 10 * 1000,
    token: "token",
  },
  "timer-2": {
    startTimeMs: 0,
    elapsedMs: 0,
    durationMs: 5 * 1000,
    token: "token",
  },
};
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
    return;
  }
  if (token !== undefined && data.token !== token) {
    socket.emit("requestFailed", "invalid-token");
  }
  return data;
}

io.on("connection", (socket) => {
  console.log(`User id ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`User id ${socket.id} DISCONNECTED`);
  });

  // client
  socket.on("joinTimer", (timerId: string) => {
    const timerData = fetchTimerDataOrThrow(socket, timerId);
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
