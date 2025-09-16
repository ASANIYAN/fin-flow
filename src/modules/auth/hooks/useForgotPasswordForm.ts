import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchema,
  type ForgotPasswordFormType,
} from "../utils/validation";

type UseForgotPasswordFormReturn = {
  form: ReturnType<typeof useForm<ForgotPasswordFormType>>;
};

export const useForgotPasswordForm = (): UseForgotPasswordFormReturn => {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  return {
    form,
  };
};
