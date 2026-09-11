"use client";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
// import { IMessage } from "@/models/messageModel"; // Import your message model
import useMessageRequests from "@/ApiRequests/message";
import clientError from "@/helper/clientError";
import { useAuth } from "./AuthContext";

interface ChatContextProps {
	conversations: any[]; // Update with your conversation model
	selectedConversationId: string | null;
	setSelectedConversationId: React.Dispatch<
		React.SetStateAction<string | null>
	>;
	isLoading: boolean;
	unseenConversations: any[];
	refetch: () => void;
	// getConversations: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const { GetCoversation } = useMessageRequests();
	const [unseenConversations, setUnseenConversations] = useState<any[]>([]); // Update with your conversation model
	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);
	const handleError = clientError();
	const { data: conversations, isLoading, refetch } = GetCoversation("");
	const { userData } = useAuth();
	const user = userData[0];
	// console.log(isLoading);

	useEffect(() => {
		const getUnseneConversation = () => {
			try {
				const unseenConvs = conversations
					? conversations
							?.filter((conversation: any) =>
								conversation.messages?.some(
									(message: any) =>
										!message.seenBy.includes(user?._id)
								)
							)
							.map((conv: any) => {
								const filterMessage = conv.messages?.filter(
									(message: any) =>
										!message?.seenBy?.includes(user?._id)
								);
								const sender = conv.participants.find(
									(participant: any) =>
										participant._id !== user?._id
								);
								return {
									...conv,
									messages: filterMessage,
									participants: sender,
								};
							})
					: [];

				setUnseenConversations(unseenConvs);
			} catch (error) {
				handleError(error);
			}
		};
		getUnseneConversation();
	}, [conversations]);

	return (
		<ChatContext.Provider
			value={{
				conversations,
				selectedConversationId,
				setSelectedConversationId,
				isLoading,
				unseenConversations,
				refetch,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
