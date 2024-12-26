"use client";
import { AUTH_TOKEN_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import { JOIN_ROOM_RECIEVED, LEAVE_ROOM_RECIEVED } from "@/lib/events";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = React.createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null); // always null initially
  
  //handle make connection to socket server
  useEffect(() => {

    // get token from local storage
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!token) return;

    // make a connection
    const newSocket = io(BACKEND_BASE_URL, {
      auth: {
        token,
      },
    });

    newSocket.on("connect", () => {
      // console.log("Socket connected");
    });


    newSocket.on(JOIN_ROOM_RECIEVED, (data: any) => {
      // console.log("room joined", data);
    });
    newSocket.on(LEAVE_ROOM_RECIEVED, (data: any) => {
      // console.log("room leaved", data);
    });

    newSocket.on("connect_error", (err: Error) => {
      console.error("Connection error:", err.message);
    });

    newSocket.on("disconnect", () => {
      // console.log("Socket disconnected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
