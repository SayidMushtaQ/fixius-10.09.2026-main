"use client";
import useNotificationRequests from "@/ApiRequests/notification";
import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

// Define interface for Notification
export interface Notification {
	_id: string;
	userId: string;
	type: string;
	content: { text: string; link?: string; senderName?: string };
	read: boolean;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

interface NotificationContextProps {
	children: React.ReactNode;
}

// Define context type
interface NotificationContextType {
	notifications: string[];
	// addNotification: (message: string) => void;
	// removeNotification: (id: number) => void;
}

// Create notification context
const NotificationContext = createContext<NotificationContextType>({
	notifications: [],
	// addNotification: () => {},
	// removeNotification: () => {},
});

// Custom hook to use notification context
// export const useNotification = () => useContext(NotificationContext);

// Notification context provider
export const NotificationProvider: React.FC<NotificationContextProps> = ({
	children,
}) => {
	const { GetNotification } = useNotificationRequests();
	const notifications = [""];

	const { userData } = useAuth();
	const user = userData[0];

	// useEffect(() => {
	// 	refetch();
	// }, [user, refetch]);

	return (
		<NotificationContext.Provider
			value={{
				notifications,
			}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useSocketContext must be used within a SocketProvider"
		);
	}
	return context;
};
