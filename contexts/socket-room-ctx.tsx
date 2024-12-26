"use client";
import { BACKEND_BASE_URL } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/redux-store/hooks";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = React.createContext<SocketContextProps>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null); // always null initially
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem("authToken");
    if (!token) return;

    // make a connection
    const newSocket = io(BACKEND_BASE_URL, {
      auth: {
        token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    // join the chat room
    newSocket.emit("join_room", authState.user?.id);
    newSocket.on("room_joined", (data: any) => {
      console.log("room joined", data);
    });

    newSocket.on("connect_error", (err: Error) => {
      console.error("Connection error:", err.message);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave_room", authState.user?.id);
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
