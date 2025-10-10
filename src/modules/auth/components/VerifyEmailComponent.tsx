import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmailVerification } from "../hooks/useEmailVerification";
import { useResendVerification } from "../hooks/useResendVerification";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

const VerifyEmailComponent = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { data, isLoading, isError, isSuccess, error } =
    useEmailVerification(token);

  const { resendVerification, isResending } = useResendVerification();

  // Handle resend verification
  const handleResendVerification = () => {
    if (email) {
      resendVerification({ email });
    }
  };

  // Handle success and error notifications
  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Email verified successfully!");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      try {
        const errorMsg = getApiErrorMessage(error);
        toast.error(errorMsg || "Email verification failed");
      } catch (err) {
        console.error("Error handling failed:", err);
        toast.error("Email verification failed");
      }
    }
  }, [isError, error]);

  const renderContent = () => {
    // Handle loading state
    if (isLoading || (!token && !isError)) {
      return (
        <>
          <div className="flex justify-center mb-6">
            <Loader2
              size={64}
              className="animate-spin text-brand-primary"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-black font-medium text-2xl text-center mb-4">
            Verifying Email
          </h1>
          <p className="text-text-secondary text-center text-sm">
            Please wait while we verify your email address...
          </p>
        </>
      );
    }

    // Handle success state
    if (isSuccess && data) {
      return (
        <>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle
                size={64}
                className="text-brand-primary"
                aria-hidden="true"
              />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle
                  size={64}
                  className="text-brand-primary opacity-30 duration-700 delay-600"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <h1 className="text-black font-medium text-2xl text-center mb-4">
            Email Verified Successfully!
          </h1>
          <p className="text-text-secondary text-center text-sm mb-8">
            Your email has been verified. You can now access your account.
          </p>
          <Button
            asChild
            className="w-full bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 text-white text-base text-center flex justify-center items-center transition-all duration-300"
          >
            <Link to="/login" aria-label="Go to login page">
              Continue to Login
            </Link>
          </Button>
        </>
      );
    }

    // Handle error state
    if (isError || !token) {
      return (
        <>
          <div className="flex justify-center mb-6">
            <XCircle
              size={64}
              className="text-error animate-pulse"
              aria-hidden="true"
            />
          </div>
          <h1 className="text-black font-medium text-2xl text-center mb-4">
            Verification Failed
          </h1>
          <p className="text-text-secondary text-center text-sm mb-8">
            The verification link is invalid or has expired. Please request a
            new verification email.
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 text-white text-base text-center flex justify-center items-center transition-all duration-300 disabled:opacity-50"
              aria-label="Request new verification email"
            >
              {isResending ? (
                <>
                  <RefreshCw
                    size={16}
                    className="animate-spin mr-2"
                    aria-hidden="true"
                  />
                  <span aria-live="polite">Sending...</span>
                </>
              ) : (
                "Request New Link"
              )}
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 text-base text-center flex justify-center items-center transition-all duration-300"
            >
              <Link to="/login" aria-label="Go to login page">
                Back to Login
              </Link>
            </Button>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <section
      className="w-full max-w-lg mx-auto shadow-sm max-sm:p-5 bg-white rounded-xl p-8"
      role="main"
      aria-labelledby="verify-email-heading"
    >
      {renderContent()}
    </section>
  );
};

export default VerifyEmailComponent;
