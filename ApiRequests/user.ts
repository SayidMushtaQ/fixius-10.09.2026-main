import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
const useUserRequests = () => {
  const apiCaller = useApiCaller();
  const { socket } = useSocketContext();
  const GetUser = (queryParams: any) =>
    useQuery({
      queryKey: ["getUserData", queryParams._id, queryParams.email], // Unique key based on params
      queryFn: async () => {
        const response = await apiCaller.get(
          `/user?email=${queryParams.email}&_id=${queryParams._id}`,
        );
        return response.data;
      },
    });

  const GetCraftManProfile = (queryParams: string) =>
    useQuery({
      queryKey: ["getCraftsmanProfile"],
      queryFn: async () => {
        const response = await apiCaller.get(`/user/craftman/${queryParams}`);
        return response.data;
      },
    });

  // try {
  // 	const response = await apiCaller.get(
  // 		`/user/craftman/${queryParams}`
  // 	);

  // 	return { data: response.data };
  // } catch (error) {
  // 	return { error: error };

  const GetUsers = (
    { pageSize, role }: { pageSize: number; role: string },
    filter: any,
  ) => {
    return useInfiniteQuery({
      queryKey: ["getUsers", role, filter.search],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/user/getuser?role=${role}&pageSize=${pageSize}&pageNumber=${pageParam}&search=${filter.search}`,
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

  const GetHandymans = ({ pageSize }: { pageSize: number }, filter: any) => {
    return useInfiniteQuery({
      queryKey: ["getCraftsmans"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiCaller.get(
          `/user/craftman/getcraftsman?pageSize=${pageSize}&pageNumber=${pageParam}&status=${filter.status}`,
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

  const UpdateUser = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCaller.put("/user", data);
      await queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });
      socket.emit("sendOffer", { receiverId: data.user });
      return response.data;
    },
  });

  // client registration not using this route
  const CreateUser = useMutation({
    mutationFn: async (data: Object) => {
      const response = await apiCaller.post("/auth/register", data);
      return response.data;
    },
  });

  const UpdateCraftman = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCaller.put("/user/craftman", data);
      await queryClient.invalidateQueries({
        queryKey: ["getCraftsmans"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });
      socket.emit("sendOffer", { receiverId: data.user });
      return response.data;
    },
  });

  const DeleteCraftman = useMutation({
    mutationFn: async (nul: null) => {
      const response = await apiCaller.delete("/user/craftman");
      return response.data;
    },
  });
  const SearchHandyman = (
    { pageSize }: { pageSize: number },
    filter: {
      service: string;
      rating?: string;
      city: string;
      distance?: string;
    },
    initialResults?: any,
  ) => {
    const distance = filter.distance || "50";
    const shouldSeed = Boolean(initialResults) && !filter.rating;

    return useInfiniteQuery({
      queryKey: [
        "searchHandyman",
        filter.service,
        filter.city,
        filter.rating ?? "",
        distance,
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const qs = new URLSearchParams({
          service: filter.service || "",
          rating: filter.rating || "",
          city: filter.city,
          distance,
          pageSize: String(pageSize),
          pageNumber: String(pageParam),
        });
        const response = await apiCaller.get(
          `/find_handymans/?${qs.toString()}`,
        );
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const current = lastPage?.currentPage ?? 1;
        const total = lastPage?.totalPages ?? 1;
        return current < total ? current + 1 : undefined;
      },
      // Seed with the server-rendered first page and don't refetch it right away
      ...(shouldSeed
        ? {
            initialData: { pages: [initialResults], pageParams: [1] },
            staleTime: 60 * 1000,
          }
        : {}),
    });
  };
  
  return {
    GetUser,
    GetUsers,
    GetHandymans,
    GetCraftManProfile,
    SearchHandyman,
    UpdateUser,
    CreateUser,
    UpdateCraftman,
    DeleteCraftman,
  };
};

export default useUserRequests;
