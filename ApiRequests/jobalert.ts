import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useJobAlertRequests = () => {
	const apiCaller = useApiCaller();
	const { setUserData } = useAuth();
	const { userData } = useAuth();
	const user = userData[0];
	const { socket } = useSocketContext();
	const queryClient = useQueryClient();

	const GetJobAlert = () => {
		const fetchJobs = async () => {
			return apiCaller.get(`/jobalert`).then((response) => response.data);
		};

		return useQuery({
			queryKey: ["getJobAlert"],
			queryFn: fetchJobs,
		});
	};

	const UpdatedJobAlert = useMutation({
		mutationFn: async (data: any) => {
			const response = await apiCaller.put(`/jobalert`, data);
			queryClient.invalidateQueries({ queryKey: ["getJobAlert"] });
			return response.data;
		},
	});

	const SendJobAlert = useMutation({
		mutationFn: async (data: any) => {
			await apiCaller.post(`/jobalert/send_alert`, data);
			return "";
		},
	});

	return { UpdatedJobAlert, GetJobAlert, SendJobAlert };
};

export default useJobAlertRequests;
