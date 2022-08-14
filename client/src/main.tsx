import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { io, Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = import.meta.env.DEV ? io("http://localhost:3000") : io();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
