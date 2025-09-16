import ResetPasswordForm from "../components/ResetPasswordForm";
import { useSearchParams } from "react-router-dom";

const ResetPasswordView = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = searchParams.get("token");

  // In a real application, you would validate the token here
  // For now, we'll just pass the email to show in the form

  return (
    <div className="min-h-screen bg-bg-light-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm userEmail={email || undefined} />
      </div>
    </div>
  );
};

export default ResetPasswordView;
