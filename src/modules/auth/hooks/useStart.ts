import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";

const START_APP_ENDPOINT = "/";
const QUERY_KEY = "start-app";

export const useStart = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const response = await authApi.get(START_APP_ENDPOINT);
      return response.data;
    },
    staleTime: Infinity, // Only fetch once
    refetchOnWindowFocus: false,
    enabled: true, // Fetch immediately
  });
};
