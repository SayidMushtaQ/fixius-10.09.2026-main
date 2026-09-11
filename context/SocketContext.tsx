"use client";
import { useSocket } from "@/hooks/useSocketIo";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

interface SocketContextProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const { socket, connect, disconnect } = useSocket();
  const [connectedUsers, setConncectedUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState({});
  const { userData } = useAuth();
  const user = userData[0];

  useEffect(() => {
    if (user) {
      socket?.emit("addUser", user?._id);
    }
  }, [socket, user]);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      connect();
      setIsConnected(true);
    };

    handleConnect();

    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [socket, isConnected]);

  useEffect(() => {
    const updateData = (key: string[], isNotification: boolean = true) => {
      isNotification &&
        queryClient.invalidateQueries({
          queryKey: ["getNotification"],
        });
      key.forEach((item) => {
        queryClient.invalidateQueries({ queryKey: [item] });
      });
    };
    
    if (user) {
      socket?.on("getUsers", (users: any) => {
        // console.log("Updated users:", users);
        setConncectedUsers(users);
      });

      socket?.on("getMessage", (data: any) => {
        // console.log("Received message:", data);
        updateData(["getMessages"], false);
        setSocketMessage(data);
      });

      socket?.on("getOffer", (data) => {
        updateData(["getOfferData", "getUserJobPostData"]);
      });

      socket?.on("getReview", (data) => {
        updateData(["getReviews"]);
      });
    }

    socket?.on("getPublicEvent", (data) => {
      updateData(["getAllJobs"], false);
    });
    socket?.on("message", (data) => {
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket?.off("getOffer");
      socket?.off("getReview");
      socket?.off("getPublicEvent");
      socket?.off("getUsers");
      socket?.off("getMessage");

    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
        disconnect,
        connectedUsers,
        socketMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
