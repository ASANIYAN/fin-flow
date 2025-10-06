import LoginForm from "../components/LoginForm";
import { useStart } from "../hooks/useStart";

const Login = () => {
  useStart(); // Start the application

  return (
    <section className="w-full min-h-dvh flex items-center justify-center">
      <LoginForm />
    </section>
  );
};

export default Login;
