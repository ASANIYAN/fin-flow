import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/auth-services/axiosInstance";
import type { GetUserProfileResponse } from "../utils/types";

const GET_USER_PROFILE_ENDPOINT = "/api/user/profile";
const QUERY_KEY = "user-profile";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async (): Promise<GetUserProfileResponse> => {
      const response = await authApi.get<GetUserProfileResponse>(
        GET_USER_PROFILE_ENDPOINT
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
