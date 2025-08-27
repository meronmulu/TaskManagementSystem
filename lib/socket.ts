// lib/socket.ts
import { io } from "socket.io-client";

// connect to your backend socket server
const socket = io("http://localhost:6600", {
  withCredentials: true,
});

export default socket;
