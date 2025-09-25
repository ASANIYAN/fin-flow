import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProfileSchema,
  type UpdateProfileFormType,
} from "../utils/validation";
import type { UpdateUserProfileResponse } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";
import { authApi } from "@/services/auth-services/axiosInstance";

type UseUpdateUserProfileReturn = {
  form: ReturnType<typeof useForm<UpdateProfileFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: UpdateProfileFormType) => void;
  };
};

const UPDATE_USER_PROFILE_ENDPOINT = "/api/user/profile";
const UPDATE_PROFILE_SUCCESS_MESSAGE = "Profile updated successfully";
const QUERY_KEY = "user-profile";

export const useUpdateUserProfile = (
  currentFirstName?: string,
  currentLastName?: string
): UseUpdateUserProfileReturn => {
  const form = useForm<UpdateProfileFormType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: currentFirstName || "",
      lastName: currentLastName || "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: UpdateProfileFormType
    ): Promise<UpdateUserProfileResponse> => {
      const response = await authApi.patch<UpdateUserProfileResponse>(
        UPDATE_USER_PROFILE_ENDPOINT,
        data
      );
      return response.data;
    },
    onError: (error) => {
      console.log(error, "Update profile error");

      try {
        const errorMsg = getApiErrorMessage(error);
        toast.error(
          errorMsg || "An error occurred while updating your profile"
        );
      } catch (err) {
        console.error("Error handling failed:", err);
        toast.error("An error occurred while updating your profile");
      }
    },
    onSuccess: (data) => {
      try {
        // Update the form with the new values
        form.reset({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        });

        // Invalidate and refetch user profile data
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });

        toast.success(UPDATE_PROFILE_SUCCESS_MESSAGE);
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.success("Profile updated successfully");
      }
    },
  });

  return {
    form,
    mutation: {
      isLoading: mutation.isPending,
      mutate: mutation.mutate,
    },
  };
};
