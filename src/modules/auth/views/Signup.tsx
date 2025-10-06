import SignupForm from "../components/SignupForm";
import { useStart } from "../hooks/useStart";

const Signup = () => {
  useStart(); // Start the application

  return (
    <section className="w-full min-h-dvh flex items-center justify-center">
      <SignupForm />
    </section>
  );
};

export default Signup;
