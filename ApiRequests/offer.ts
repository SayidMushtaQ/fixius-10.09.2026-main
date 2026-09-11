import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
const useOfferRequests = () => {
	const apiCaller = useApiCaller();
	const { socket } = useSocketContext();
	const clientQuery = useQueryClient();
	const userId =
		typeof window !== "undefined" &&
		window.localStorage.getItem("userId_for_admin_req");
	
	const GetJobOffer = ({ pageSize }: { pageSize: number }, filter: any) => {
		const fetchJobs = async ({ pageParam = 1 }) => {
			return apiCaller
				.get(
					`/offers?pageNumber=${pageParam}&pageSize=${pageSize}&userid=${userId}`
				)
				.then((response) => response.data);
		};
		return useInfiniteQuery({
			queryKey: ["getOfferData"],
			queryFn: fetchJobs,
			getNextPageParam: (lastPage, allPage) => {
				const nextPage = lastPage.currentPage + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
			initialPageParam: 1,
		});
	};

	const GetSingleOffer = (offer_id: string) => {
		return useQuery({
			queryKey: ["getSingleOffer"],
			queryFn: async () => {
				const data = await apiCaller.get(`/offers/${offer_id}`);
				return data.data;
			},
		});
	};
	const CreateJobOffer = useMutation({
		mutationFn: async (data: any) => {
			const response = await apiCaller.post(`/offers`, data);
			socket.emit("sendOffer", { receiverId: data.client });
			return response.data;
		},
	});

	const UpdateJobOffer = useMutation({
		mutationFn: async ({
			notifyUser,
			offerId,
			jobId,
			data,
		}: {
			notifyUser: string;
			offerId: string;
			data: any;
			jobId: string;
		}) => {
			const response = await apiCaller.put(`/offers`, {
				offerId,
				jobId,
				data,
			});
			socket.emit("sendOffer", { receiverId: notifyUser });
			clientQuery.invalidateQueries({
				queryKey: ["getOfferData"],
			});
			clientQuery.invalidateQueries({
				queryKey: ["getNotification"],
			});
			return response.data.data;
		},
	});
	return { UpdateJobOffer, GetJobOffer, CreateJobOffer, GetSingleOffer };
};

export default useOfferRequests;
