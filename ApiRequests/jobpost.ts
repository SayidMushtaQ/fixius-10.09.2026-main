import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";

import useApiCaller from "@/hooks/useApiCaller";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import useJobAlertRequests from "./jobalert";
const useJobpostRequests = () => {
  const apiCaller = useApiCaller();
  const { setUserData } = useAuth();
  const { SendJobAlert } = useJobAlertRequests();
  const { userData } = useAuth();
  const user = userData[0];
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();
  const GetUserJobPost = ({ pageSize }: { pageSize: number }, filter: any) => {
    const adminUserId =
      typeof window !== "undefined" &&
      window.localStorage.getItem("userId_for_admin_req");
    const actualUserId = adminUserId || user?._id;

    return useInfiniteQuery({
      queryKey: ["getUserJobPostData", filter],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/jobpost?pageSize=${pageSize}&pageNumber=${pageParam}&userId=${
            actualUserId || ""
          }`,
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });
  };

  const GetPublicJobs = (
    { pageSize }: { pageSize: number },
    filter: any = {
      categories: "",
      distance: "",
      userCoordinates: {
        lat: user?.address?.coordinates?.lat,
        lon: user?.address?.coordinates?.lng,
      },
    },
  ) => {
    //console.log("user", user)
    const fetchJobs = async ({ pageParam = 1 }) => {
      return apiCaller
        .get(
          `/get_jobs?categories=${filter.categories}&distance=${
            filter.distance
          }&Place_Name=${
            filter?.address?.Place_Name || ""
          }&pageSize=${pageSize}&pageNumber=${pageParam}`,
        )
        .then((response) => response.data);
    };

    return useInfiniteQuery({
      queryKey: ["getAllJobs", filter],
      queryFn: fetchJobs,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
      initialPageParam: 1, // Specify the initial page parameter
    });
  };

  const updateJobPost = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiCaller.put(`/jobpost?id=${id}`, data);
      socket?.emit("sendPublicEvent", "public event");
      queryClient.invalidateQueries({ queryKey: ["getAllJobs"] });
      queryClient.invalidateQueries({ queryKey: ["getUserJobPostData"] });
      return response.data;
    },
  });

  const CreateJobPost = useMutation({
    mutationFn: async (newData: any) => {
      const response = await apiCaller.post(`/jobpost`, { newData });
      if (response.status === 200 || response.status === 201) {
        const responseData = response?.data;

        // sendJob alert
        // if (user) {
        //   SendJobAlert.mutate(response.data);
        // }
        // dispatch(userSignUp(responseData));
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        toast.success(responseData.info);
        if (responseData?.success && responseData?.accessToken) {
          setUserData([responseData?.user_details]);
          if (responseData?.accessToken)
            if (!accessToken) {
              localStorage.setItem(
                "accessToken",
                JSON.stringify(responseData?.accessToken),
              );
            }
          if (!refreshToken) {
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(responseData?.refreshToken),
            );
          } else if (refreshToken) {
            refreshToken = responseData?.refreshToken;
            console.log(refreshToken);
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          }
        }
      }

      socket?.emit("sendPublicEvent", response.data);
      queryClient.invalidateQueries({ queryKey: ["getAllJobs"] });
      await queryClient.invalidateQueries({
        queryKey: ["getUserJobPostData"],
      });

      return response.data;
    },
  });
  return { updateJobPost, GetUserJobPost, CreateJobPost, GetPublicJobs };
};

export default useJobpostRequests;
