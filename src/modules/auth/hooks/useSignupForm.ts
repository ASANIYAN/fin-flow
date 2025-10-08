import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, type SignupFormType } from "../utils/validation";
import type { SignupResponse, SignupPayload } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { unauthApi } from "@/services/unauth-services/axiosInstance";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";

type UseSignupFormReturn = {
  form: ReturnType<typeof useForm<SignupFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: SignupFormType) => void;
  };
};

const SIGNUP_ENDPOINT = "/api/auth/signup";
const SIGNUP_SUCCESS_MESSAGE =
  "Account created successfully! Please check your email for verification.";

export const useSignupForm = (): UseSignupFormReturn => {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormType): Promise<SignupResponse> => {
      // Transform form data to match API payload
      const payload: SignupPayload = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const response = await unauthApi.post<SignupResponse>(
        SIGNUP_ENDPOINT,
        payload
      );
      return response.data;
    },
    onError: (error) => {
      const errorMsg = getApiErrorMessage(error);
      toast.error(errorMsg);
    },
    onSuccess: () => {
      form.reset();
      toast.success(SIGNUP_SUCCESS_MESSAGE);
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
