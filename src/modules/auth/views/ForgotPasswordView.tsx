import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordView = () => {
  return (
    <div className="min-h-screen bg-bg-light-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordView;
