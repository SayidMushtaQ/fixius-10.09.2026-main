import { IMessage } from "@/backend/models/Conversation";
import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useMutation, useQuery } from "@tanstack/react-query";
const useMessageRequests = () => {
	const apiCaller = useApiCaller();
	const { userData } = useAuth();
	const user = userData[0];
	const GetCoversation = (queryParams: any) =>
		useQuery({
			queryKey: ["getMessages"],
			queryFn: async () => {
				const response = await apiCaller.get(`/conversations`);
				return response.data?.response;
			},
		});

	const CreateCoversation = useMutation({
		mutationFn: async ({
			receiver,
			message,
		}: {
			receiver: string;
			message: IMessage;
		}) => {
			const response = await apiCaller.post(`/conversations`, {
				receiver,
				message,
			});
			return response.data;
		},
	});

	const AddMessage = useMutation({
		mutationFn: async ({
			convId,
			message,
		}: {
			convId: string;
			message: IMessage;
		}) => {
			const response = await apiCaller.put(`/conversations`, {
				convId,
				message,
			});
			return response.data;
		},
	});

	const UpdateSeenStatus = useMutation({
		mutationFn: async ({ convId }: { convId: string }) => {
			const response = await apiCaller.put(`/conversations/seen_status`, {
				convId,
			});
			return response.data;
		},
	});

	return { CreateCoversation, GetCoversation, AddMessage, UpdateSeenStatus };
};

export default useMessageRequests;
