import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("https://simple-kanban.onrender.com");
export const SocketContext = createContext(socket);
export default SocketContext;
