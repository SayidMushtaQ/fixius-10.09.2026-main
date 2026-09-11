import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
const useReviewsRequests = () => {
	const apiCaller = useApiCaller();
	const { socket } = useSocketContext();
	const queryClient = useQueryClient();
	const updateStates = () => {
		queryClient.invalidateQueries({ queryKey: ["getReviews"] });
		queryClient.invalidateQueries({ queryKey: ["getNotification"] });
	};
	const GetReviews = ({ pageSize }: { pageSize: number }, filter: any) =>
		useInfiniteQuery({
			queryKey: ["getReviews"],
			queryFn: async ({ pageParam }) => {
				const response = await apiCaller.get(
					`/reviews?pageNumber=${pageParam}&pageSize=${pageSize}`
				);
				return response?.data;
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.currentPage + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
		});

	const CreateReview = useMutation({
		mutationFn: async (data: {
			offerId: string;
			rating: number;
			comment: string;
			notifyUser: string;
		}) => {
			const response = await apiCaller.post(`/reviews`, data);
			socket?.emit("sendReview", data.notifyUser);
			updateStates();
			return response.data;
		},
	});

	const UpdateReview = useMutation({
		mutationFn: async ({
			reviewId,
			data,
			notifyUser,
		}: {
			reviewId: string;
			data: { rating: number; comment: string };
			notifyUser: string;
		}) => {
			const response = await apiCaller.put(`/reviews`, {
				reviewId,
				data,
			});
			socket?.emit("sendReview", notifyUser);
			updateStates();
			return response.data;
		},
	});

	const DeleteReview = useMutation({
		mutationFn: async ({
			reviewId,
			notifyUser,
		}: {
			reviewId: string;
			notifyUser: string;
		}) => {
			const response = await apiCaller.delete(`/reviews?_id=${reviewId}`);
			socket?.emit("sendReview", notifyUser);
			updateStates();
			return response.data;
		},
	});

	const CreateReclaim = useMutation({
		mutationFn: async ({
			reviewId,
			reason,
			notifyAdmin,
		}: {
			reviewId: string;
			reason: string;
			notifyAdmin: string;
		}) => {
			const response = await apiCaller.post(`/reviews/reclaim`, {
				reviewId,
				reason,
			});
			// socket?.emit("sendReview", notifyAdmin);
			updateStates();
			return response.data;
		},
	});

	const UpdateReclaim = useMutation({
		mutationFn: async ({
			data,
			notifyUser,
		}: {
			data: any;
			notifyUser: string;
		}) => {
			const response = await apiCaller.put(`/reviews/reclaim`, data);
			socket?.emit("sendReview", notifyUser);
			queryClient.invalidateQueries({ queryKey: ["getReclaims"] });
			updateStates();
			return response.data;
		},
	});

	const GetReclaimById = (id: string) =>
		useQuery({
			queryKey: ["getReclaim"],
			queryFn: async () => {
				const response = await apiCaller.get(`/reviews/reclaim/${id}`);
				return response?.data;
			},
		});
	const GetReclaims = ({ pageSize }: { pageSize: number }, filter: any) =>
		useInfiniteQuery({
			queryKey: ["getReclaims"],
			queryFn: async ({ pageParam }) => {
				const response = await apiCaller.get(
					`/reviews/reclaim?pageNumber=${pageParam}&pageSize=${pageSize}`
				);
				return response?.data;
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.currentPage + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
		});

	return {
		CreateReview,
		GetReviews,
		UpdateReview,
		DeleteReview,
		CreateReclaim,
		UpdateReclaim,
		GetReclaimById,
		GetReclaims,
	};
};

export default useReviewsRequests;
