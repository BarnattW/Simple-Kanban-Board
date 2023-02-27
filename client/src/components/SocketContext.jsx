import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("https://simple-kanban-379104.uc.r.appspot.com");
export const SocketContext = createContext(socket);
export default SocketContext;
