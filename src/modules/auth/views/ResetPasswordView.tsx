import { useEffect } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      navigate("/auth/forgot-password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, email]);

  return (
    <div className="min-h-screen bg-bg-light-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm userEmail={email || undefined} />
      </div>
    </div>
  );
};

export default ResetPasswordView;
