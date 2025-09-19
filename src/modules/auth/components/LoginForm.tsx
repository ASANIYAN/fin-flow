import { Form } from "@/components/ui/form";
import { useLoginForm } from "../hooks/useLoginForm";
import CustomInput from "@/components/common/custom-input";
import { Mail, RefreshCw } from "lucide-react";
import CustomPasswordInput from "@/components/common/custom-password-input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LoginFormType } from "../utils/validation";
import { useResendVerification } from "../hooks/useResendVerification";

const LoginForm = () => {
  const { form, mutation, emailVerificationError } = useLoginForm();
  const { resendVerification, isResending } = useResendVerification();

  const onSubmit = (data: LoginFormType) => {
    mutation.mutate(data);
  };

  const handleResendVerification = () => {
    if (emailVerificationError.userEmail) {
      resendVerification({ email: emailVerificationError.userEmail });
    }
  };

  const isSubmitting = mutation.isLoading;

  return (
    <section
      className="w-full max-w-lg mx-auto shadow-sm max-sm:p-5 sm:py-5 bg-white rounded-xl"
      role="main"
      aria-labelledby="login-heading"
    >
      <h1
        id="login-heading"
        className="text-black font-medium text-2xl text-center"
      >
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5 mt-6.5 w-full mx-auto max-w-92"
          role="form"
          aria-label="Login form"
          noValidate
        >
          <CustomInput
            name="email"
            placeholder="Email"
            control={form.control}
            containerClassName="rounded-lg"
            append={
              <Mail size={20} color="var(--color-black)" aria-hidden="true" />
            }
            aria-label="Email address"
            aria-required="true"
            aria-invalid={!!form.formState.errors.email}
            aria-describedby={
              form.formState.errors.email ? "email-error" : undefined
            }
          />

          <CustomPasswordInput
            name="password"
            control={form.control}
            placeholder="Password"
            containerClassName="rounded-lg"
            aria-label="Password"
            aria-required="true"
            aria-invalid={!!form.formState.errors.password}
            aria-describedby={
              form.formState.errors.password ? "password-error" : undefined
            }
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-sm"
              aria-label="Go to forgot password page"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Email Verification Error Section */}
          {emailVerificationError.isEmailNotVerified && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <RefreshCw
                    size={20}
                    className="text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Email Verification Required
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    Please verify your email address before logging in. Check
                    your inbox for the verification link.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="border-red-300 text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
                    aria-label="Resend verification email"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw
                          size={16}
                          className="animate-spin mr-2"
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw
                          size={16}
                          className="mr-2"
                          aria-hidden="true"
                        />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="mt-5 bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 w-full text-white text-base text-center flex justify-center items-center transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Logging in..." : "Login to your account"
            }
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-sm"
                aria-label="Go to sign up page"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
