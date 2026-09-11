import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const usePostalRequests = () => {
	const apiCaller = useApiCaller();
	const { socket } = useSocketContext();
	const queryClient = useQueryClient();
	const updateStates = () => {
		queryClient.invalidateQueries({ queryKey: ["getReviews"] });
		queryClient.invalidateQueries({ queryKey: ["getNotification"] });
	};
	const GetPostalsBySearch = (search: any) =>
		useQuery({
			queryKey: ["getPostalCode"],
			queryFn: async () => {
				const response = await apiCaller.get(
					`/postal_codes?search=${search}`
				);
				return response?.data;
			},
		});

	const GetPostalById = (id: any) =>
		useQuery({
			queryKey: ["getPostalCodeById"],
			queryFn: async () => {
				const response = await apiCaller.get(`/postal_codes/${id}`);
				return response?.data;
			},
		});

	return { GetPostalsBySearch, GetPostalById };
};

export default usePostalRequests;
