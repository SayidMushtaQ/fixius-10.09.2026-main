"use client";
import useMessageRequests from "@/ApiRequests/message";
import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import clientError from "@/helper/clientError";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const useChat = () => {
	const { userData } = useAuth();
	const handleClinetError = clientError();
	const queryClient = useQueryClient();
	const { socket } = useSocketContext();
	const user = userData[0];
	const { UpdateSeenStatus, AddMessage, CreateCoversation } =
		useMessageRequests();
	const [inputMessage, setInputMessage] = useState<string>("");
	const updateSeenStatus = async (convId: string) => {
		try {
			await UpdateSeenStatus.mutateAsync(
				{ convId },
				{
					onSuccess(data) {
						queryClient.invalidateQueries({
							queryKey: ["getMessages"],
						});
					},
				}
			);
		} catch (error) {
			handleClinetError(error);
		}
	};

	const sendMessage = async (convId: string, receiverId: any) => {
		try {
			await AddMessage.mutateAsync(
				{
					convId,
					message: { text: inputMessage, seenBy: [user?._id as any] },
				},
				{
					async onSuccess(data) {
						// Emit a "sendMessage" event to the server
						socket?.emit("sendMessage", {
							receiverId,
							message: data?.response,
						});
						setInputMessage("");
						await queryClient.invalidateQueries({
							queryKey: ["getMessages"],
							refetchType: "active",
						});
					},
				}
			);
		} catch (error) {
			handleClinetError(error);
		}
	};

	const createCoversation = async (receiver: string) => {
		try {
			await CreateCoversation.mutateAsync(
				{
					receiver: receiver,
					message: { text: inputMessage, seenBy: [user?._id as any] },
				},
				{
					async onSuccess(data) {
						toast.success("Nachricht erfolgreich gesendet");
						socket?.emit("sendMessage", {
							receiverId: receiver,
							message: data?.response,
						});
						setInputMessage("");
						await queryClient.invalidateQueries({
							queryKey: ["getMessages"],
							refetchType: "active",
						});
					},
				}
			);
		} catch (error) {
			handleClinetError(error);
		}
	};
	return {
		updateSeenStatus,
		sendMessage,
		inputMessage,
		setInputMessage,
		createCoversation,
		isCreatingConv: CreateCoversation.isPending,
		isSending: AddMessage.isPending,
	};
};

export default useChat;
