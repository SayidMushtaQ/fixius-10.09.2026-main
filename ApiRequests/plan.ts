import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const usePlanRequest = () => {
  const apiCaller = useApiCaller();
  const { socket } = useSocketContext();
  const clientQuery = useQueryClient();

  const GetPlans = (
    { pageSize = 1 }: { pageSize: number },
    filter: any = ""
  ) => {
    const fetchJobs = async () => {
      try {
        const response = await apiCaller.get(`/plans?requestType=all`);
        return response.data;
      } catch (error: any) {
        handleApiError(error);
        throw error;
      }
    };

    return useQuery({
      queryKey: ["getPlans"],
      queryFn: fetchJobs,
      retry: 1,
    });
  };

  const GetSubscription = (
    {
      pageSize = 10,
    }: {
      pageSize?: number;
    },
    filter: any
  ) =>
    useInfiniteQuery({
      queryKey: ["getSubscription"],
      queryFn: async ({ pageParam = 1 }) => {
        try {
          const response = await apiCaller.get(
            `/subscription?pageSize=${pageSize}&pageNumber=${pageParam}&status=${
              filter?.status || ""
            }&payment_status=${filter?.payment_status || ""}&paymentId=${
              filter?.paymentId || ""
            }`
          );
          return response.data;
        } catch (error: any) {
          handleApiError(error);
          throw error;
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
      retry: 1,
    });

  const CreateSubscritpion = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await apiCaller.post(`/subscription`, data);
        toast.success("Subscription created successfully");
        return response.data;
      } catch (error: any) {
        handleApiError(error);
        throw error;
      }
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["getSubscription"] });
    },
  });

  const VerifyPayment = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await apiCaller.post(
          `/subscription/verify-payment`,
          data
        );
        if (response.data?.userId) {
          socket.emit("sendOffer", { receiverId: response.data?.userId });
        }
        toast.success("Payment verified successfully");
        return response.data;
      } catch (error: any) {
        handleApiError(error);
        throw error;
      }
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({ queryKey: ["getSubscription"] });
    },
  });

  // Helper function to handle API errors
  const handleApiError = (error: any) => {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";

    // Handle unauthorized errors
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      // You might want to redirect to login page here
      // or trigger a token refresh mechanism
    }
    // Handle forbidden errors
    else if (error.response?.status === 403) {
      toast.error("You don't have permission to access this resource");
    }
    // Handle other errors
    else {
      toast.error(errorMessage);
    }

    console.error("API Error:", error);
  };

  return { GetPlans, GetSubscription, CreateSubscritpion, VerifyPayment };
};

export default usePlanRequest;
