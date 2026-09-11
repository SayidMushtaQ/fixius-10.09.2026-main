import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import useApiCaller from "@/hooks/useApiCaller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFilters = () => {
  const apiCaller = useApiCaller();

  const getFilters = useQuery({
    queryKey: ["getFilter"],
    queryFn: async () => {
      const response = await apiCaller.get(`/filter`);
      return response.data;
    },
  });

  return getFilters;
};


export const useUpdateFilter = () => {
  const apiCaller = useApiCaller();
  const queryClient = useQueryClient();

  const updateFilter = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCaller.put(`/filter`, data);
      queryClient.invalidateQueries({ queryKey: ["getFilter"] });
      return response.data;
    },
  });

  return updateFilter;
};
