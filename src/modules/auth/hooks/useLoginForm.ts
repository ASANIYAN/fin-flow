import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginFormType } from "../utils/validation";
import type { LoginResponse } from "../utils/types";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "@/lib/token";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { toast } from "sonner";
import { unauthApi } from "@/services/unauth-services/axiosInstance";
import { useUserStore } from "@/store/user-store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UseLoginFormReturn = {
  form: ReturnType<typeof useForm<LoginFormType>>;
  mutation: {
    isLoading: boolean;
    mutate: (data: LoginFormType) => void;
  };
  emailVerificationError: {
    isEmailNotVerified: boolean;
    userEmail: string | null;
  };
};

const LOGIN_ENDPOINT = "/api/auth/login";
const LOGIN_SUCCESS_MESSAGE = "Login Successful";

export const useLoginForm = (): UseLoginFormReturn => {
  const [emailVerificationError, setEmailVerificationError] = useState({
    isEmailNotVerified: false,
    userEmail: null as string | null,
  });

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormType): Promise<LoginResponse> => {
      const response = await unauthApi.post<LoginResponse>(
        LOGIN_ENDPOINT,
        data
      );
      setToken(
        response.data.data.token.value,
        new Date(response.data.data.token.expiresAt).getTime()
      );
      setUser(response.data.data.user);
      return response.data;
    },
    onError: (error) => {
      console.log(error, "error Msg");

      try {
        const errorMsg = getApiErrorMessage(error);

        // Check if this is an email verification error
        const isEmailVerificationError =
          errorMsg
            .toLowerCase()
            .includes("please verify your email address before logging in") ||
          errorMsg.toLowerCase().includes("email not verified") ||
          errorMsg.toLowerCase().includes("verify your email");

        if (isEmailVerificationError) {
          const currentEmail = form.getValues("email");
          setEmailVerificationError({
            isEmailNotVerified: true,
            userEmail: currentEmail,
          });
          toast.error("Please verify your email address before logging in");
        } else {
          // Reset email verification error state if it's a different error
          setEmailVerificationError({
            isEmailNotVerified: false,
            userEmail: null,
          });
          toast.error(errorMsg || "An error occurred during login");
        }
      } catch (err) {
        console.error("Error handling failed:", err);
        setEmailVerificationError({
          isEmailNotVerified: false,
          userEmail: null,
        });
        toast.error("An error occurred during login");
      }
    },
    onSuccess: (data) => {
      try {
        // Reset form with empty values
        form.reset({
          email: "",
          password: "",
        });
        setToken(
          data.data.token.value,
          new Date(data.data.token.expiresAt).getTime()
        );
        setUser(data.data.user);
        // Reset email verification error state
        setEmailVerificationError({
          isEmailNotVerified: false,
          userEmail: null,
        });

        toast.success(LOGIN_SUCCESS_MESSAGE);
        void navigate(`/dashboard`);
      } catch (err) {
        console.error("Success handling failed:", err);
        toast.success("Login successful");
      }
    },
  });

  return {
    form,
    mutation: {
      isLoading: mutation.isPending,
      mutate: mutation.mutate,
    },
    emailVerificationError,
  };
};
