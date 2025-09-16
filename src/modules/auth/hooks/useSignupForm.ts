import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, type SignupFormType } from "../utils/validation";

type UseSignupFormReturn = {
  form: ReturnType<typeof useForm<SignupFormType>>;
};

export const useSignupForm = (): UseSignupFormReturn => {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
  });

  return {
    form,
  };
};
