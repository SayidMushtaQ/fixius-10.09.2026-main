import useApiCaller from "@/hooks/useApiCaller";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export type AdminJobFilter = "all" | "blocked" | "active";

const useAdminJobRequests = () => {
  const apiCaller = useApiCaller();
  const queryClient = useQueryClient();

  const GetAllJobs = ({
    pageSize,
    pageNumber,
    search,
    filter,
  }: {
    pageSize: number;
    pageNumber: number;
    search: string;
    filter: AdminJobFilter;
  }) =>
    useQuery({
      queryKey: ["adminJobs", { pageNumber, pageSize, search, filter }],
      queryFn: async () => {
        const response = await apiCaller.get(
          `/admin/jobs?pageSize=${pageSize}&pageNumber=${pageNumber}&filter=${filter}&search=${encodeURIComponent(
            search,
          )}`,
        );
        return response.data;
      },
      placeholderData: keepPreviousData,
    });

  const SetJobBlocked = useMutation({
    mutationFn: async ({
      id,
      blocked,
      reason,
    }: {
      id: string;
      blocked: boolean;
      reason?: string;
    }) => {
      const response = await apiCaller.patch(`/admin/jobs`, {
        id,
        blocked,
        reason,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      // The ad also disappears from / reappears in the public listings.
      queryClient.invalidateQueries({ queryKey: ["getAllJobs"] });
      queryClient.invalidateQueries({ queryKey: ["getUserJobPostData"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message,
      );
    },
  });

  return { GetAllJobs, SetJobBlocked };
};

export default useAdminJobRequests;
