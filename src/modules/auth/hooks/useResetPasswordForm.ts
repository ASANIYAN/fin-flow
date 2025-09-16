import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  type ResetPasswordFormType,
} from "../utils/validation";

type UseResetPasswordFormReturn = {
  form: ReturnType<typeof useForm<ResetPasswordFormType>>;
};

export const useResetPasswordForm = (): UseResetPasswordFormReturn => {
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  return {
    form,
  };
};
