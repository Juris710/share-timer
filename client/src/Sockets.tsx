import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  import.meta.env.DEV ? io("http://localhost:3000") : io();

export const Sockets: React.FC = () => {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
  }, []);
  return <></>;
};
