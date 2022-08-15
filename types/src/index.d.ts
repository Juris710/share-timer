/* eslint-disable @typescript-eslint/no-empty-interface */
interface ServerToClientEvents {
  pong: () => void;
}

interface ClientToServerEvents {
  ping: () => void;
}

interface InterServerEvents {}

interface SocketData {}
