import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetJobs = () => {
  const getAllJobs = useQuery({
    queryKey: ["allJob"],
    queryFn: async () => {
      const response = await axios.get("/api/get_jobs?pageSize=4&pageNumber=1");
      return response.data.data;
    },
  });

  return getAllJobs;
};
