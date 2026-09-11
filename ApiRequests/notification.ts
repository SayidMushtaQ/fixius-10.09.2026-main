import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
const useNotificationRequests = () => {
	const apiCaller = useApiCaller();
	const { userData } = useAuth();
	const queryClient = useQueryClient();
	const user = userData[0];
	const updateNotification = () =>
		queryClient.invalidateQueries({ queryKey: ["getNotification"] });
	const GetNotification = (
		{
			pageSize = 10,
		}: {
			pageSize?: number;
		},
		filter: any
	) =>
		useInfiniteQuery({
			queryKey: ["getNotification"],
			queryFn: async ({ pageParam = 1 }) => {
				const response = await apiCaller.get(
					`/notifications?pageSize=${pageSize}&pageNumber=${pageParam}`
				);
				return response.data;
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPage) => {
				const nextPage = lastPage.currentPage + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
		});

	const CreateNotification = useMutation({
		mutationFn: async () => {
			const response = await apiCaller.post(`/notifications`);
			return response.data;
		},
	});

	const UpdateNotification = useMutation({
		mutationFn: async ({ notificationId }: { notificationId: string }) => {
			const response = await apiCaller.put(
				`/notifications?id=${notificationId}`
			);
			updateNotification();
			return response.data;
		},
	});

	return { CreateNotification, GetNotification, UpdateNotification };
};

export default useNotificationRequests;
