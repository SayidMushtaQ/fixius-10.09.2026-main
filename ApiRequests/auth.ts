import useApiCaller from "@/hooks/useApiCaller";
import { useMutation, useQuery } from "@tanstack/react-query";
const useAuthRequests = () => {
	const apiCaller = useApiCaller();
	const GetLoginUser = (queryParams: any) =>
		useQuery({
			queryKey: ["getLoginUserData"],
			queryFn: async () => {
				const response = await apiCaller.get(`/auth/login`);
				return response.data;
			},
		});

	const changPassword = useMutation({
		mutationFn: async (data: Object) => {
			const response = await apiCaller.put("/auth/change_password", data);
			return response.data;
		},
	});

	const resetPassword = useMutation({
		mutationFn: async (data: Object) => {
			const response = await apiCaller.put("/auth/reset_password", data);
			return response.data;
		},
	});

	return { changPassword, resetPassword, GetLoginUser };
};

export default useAuthRequests;
