import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("https://stingray-app-aqjaz.ondigitalocean.app/");
export const SocketContext = createContext(socket);
export default SocketContext;
