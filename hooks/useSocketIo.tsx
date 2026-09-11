"use client";
import { Server } from "http";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket(): {
	socket: Socket | null;
	connect: () => void;
	disconnect: () => void;
} {
	const socketRef = useRef<Socket | null>(null);

	const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCEKT_SERVER as string;
	useEffect(() => {
		const socket = io(
			SOCKET_SERVER_URL || "https://handyman-socket-server.onrender.com",
			{ autoConnect: false }
		);
		socketRef.current = socket;

		return () => {
			socket.disconnect();
		};
	}, [SOCKET_SERVER_URL]);

	const connect = () => {
		if (socketRef.current) {
			socketRef.current?.connect();
		}
	};

	const disconnect = () => {
		if (socketRef.current) {
			socketRef.current.disconnect();
		}
	};

	return {
		socket: socketRef.current,
		connect,
		disconnect,
	};
}
