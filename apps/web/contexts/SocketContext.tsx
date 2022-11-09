import React, { useState, createContext } from "react";

import io from "socket.io-client";

import type { Socket } from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket;
  refreshSocket: () => void;
}>(null);

export default SocketContext;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const refreshSocket = () => {
    //@ts-ignore
    const newSocket = io();
    setSocket(newSocket);
  };

  return (
    <>
      <SocketContext.Provider value={{ socket, refreshSocket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};
