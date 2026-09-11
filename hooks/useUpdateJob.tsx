import useJobpostRequests from "@/ApiRequests/jobpost";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateJobpost = (setIsOpen:any) => {
	const { updateJobPost } = useJobpostRequests();
	const queryClient = useQueryClient()
	const handleUpdateJobPost = async (id: string, data: any) => {
		try {
			updateJobPost.mutateAsync(
				{ id, data },
				{
					onSuccess(data) {
						toast.success(data.message);
							queryClient.invalidateQueries({ queryKey: ['getUserJobPostData'] })
						setIsOpen('')
					},
				}
			);
		} catch (error: any) {
			const errorResponse = error.response?.data;
			if (errorResponse) {
				toast.error(errorResponse.message);
			} else toast.error(error.message);
			console.log(error);
		}
	};
	return { handleUpdateJobPost, isLoading: updateJobPost.isPending };
};

export default useUpdateJobpost;
