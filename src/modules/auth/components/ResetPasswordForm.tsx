import { Form } from "@/components/ui/form";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import CustomPasswordInput from "@/components/common/custom-password-input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { ResetPasswordFormType } from "../utils/validation";

const ResetPasswordForm = ({ userEmail }: { userEmail?: string }) => {
  const { form, mutation } = useResetPasswordForm();
  const [password, setPassword] = useState("");

  const onSubmit = (data: ResetPasswordFormType) => {
    mutation.mutate(data);
  };

  const isSubmitting = mutation.isLoading;

  // Watch password field for real-time validation
  const watchedPassword = form.watch("password");

  useEffect(() => {
    setPassword(watchedPassword || "");
  }, [watchedPassword]);

  // Password requirement checks
  const requirements = [
    {
      label: "At least 8 characters",
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      label: "Contains uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      label: "Contains lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      label: "Contains a number",
      test: (pwd: string) => /\d/.test(pwd),
    },
    {
      label: "Contains special character",
      test: (pwd: string) => /[@$!%*?&]/.test(pwd),
    },
  ];

  const maskedEmail = userEmail
    ? userEmail.replace(/(.{2})(.*)(@.*)/, "$1****$3")
    : "****@****.com";

  return (
    <section
      className="w-full max-w-lg mx-auto shadow-sm max-sm:p-5 sm:py-5 bg-white rounded-xl"
      role="main"
      aria-labelledby="reset-password-heading"
    >
      <h1
        id="reset-password-heading"
        className="text-black font-medium text-2xl text-center"
      >
        Reset Password
      </h1>

      <div className="text-center mt-2 mb-6">
        <p className="text-text-secondary text-sm">Resetting password for</p>
        <p className="text-text-primary font-medium">{maskedEmail}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5 mt-4 w-full mx-auto max-w-92"
          role="form"
          aria-label="Reset password form"
          noValidate
        >
          <CustomPasswordInput
            name="password"
            control={form.control}
            placeholder="New Password"
            containerClassName="rounded-lg"
            aria-label="New password"
            aria-required="true"
            aria-invalid={!!form.formState.errors.password}
            aria-describedby={
              form.formState.errors.password
                ? "password-error"
                : "password-requirements"
            }
          />

          {/* Real-time Password Requirements */}
          <div
            id="password-requirements"
            className="bg-gray-50 p-4 rounded-lg space-y-2"
          >
            <p className="text-sm font-medium text-text-primary mb-2">
              Password must contain:
            </p>
            {requirements.map((requirement, index) => {
              const isValid = requirement.test(password);
              return (
                <div key={index} className="flex items-center gap-2">
                  {isValid ? (
                    <Check
                      size={16}
                      className="text-success flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <X
                      size={16}
                      className="text-error flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`text-sm ${
                      isValid ? "text-success" : "text-text-secondary"
                    }`}
                  >
                    {requirement.label}
                  </span>
                </div>
              );
            })}
          </div>

          <CustomPasswordInput
            name="confirmPassword"
            control={form.control}
            placeholder="Confirm New Password"
            containerClassName="rounded-lg"
            aria-label="Confirm new password"
            aria-required="true"
            aria-invalid={!!form.formState.errors.confirmPassword}
            aria-describedby={
              form.formState.errors.confirmPassword
                ? "confirmPassword-error"
                : undefined
            }
          />

          <Button
            type="submit"
            className="mt-5 bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 w-full text-white text-base text-center flex justify-center items-center transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Resetting password..." : "Reset your password"
            }
          >
            {isSubmitting ? "Resetting..." : "Reset My Password"}
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

export default ResetPasswordForm;
