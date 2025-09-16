import { Form } from "@/components/ui/form";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import CustomInput from "@/components/common/custom-input";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { ForgotPasswordFormType } from "../utils/validation";

const ForgotPasswordForm = () => {
  const { form } = useForgotPasswordForm();

  const onSubmit = (data: ForgotPasswordFormType) => {
    console.log(data);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <section
      className="w-full max-w-lg mx-auto shadow-sm max-sm:p-5 sm:py-5 bg-white rounded-xl"
      role="main"
      aria-labelledby="forgot-password-heading"
    >
      <h1
        id="forgot-password-heading"
        className="text-black font-medium text-2xl text-center"
      >
        Forgot Password
      </h1>

      <p className="text-text-secondary text-center text-sm mt-2 mb-6">
        Enter your email address <br /> to receive a password reset link.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5 mt-4 w-full mx-auto max-w-92"
          role="form"
          aria-label="Forgot password form"
          noValidate
        >
          <CustomInput
            name="email"
            placeholder="Email"
            control={form.control}
            containerClassName="rounded-lg"
            append={
              <Mail
                size={20}
                color="var(--color-gray-400)"
                aria-hidden="true"
              />
            }
            aria-label="Email address"
            aria-required="true"
            aria-invalid={!!form.formState.errors.email}
            aria-describedby={
              form.formState.errors.email ? "email-error" : undefined
            }
          />

          <Button
            type="submit"
            className="mt-5 bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 w-full text-white text-base text-center flex justify-center items-center transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={
              isSubmitting
                ? "Sending reset link..."
                : "Send password reset link"
            }
          >
            {isSubmitting ? "Sending..." : "Reset Password"}
          </Button>

          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-sm"
                aria-label="Go back to login page"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ForgotPasswordForm;
