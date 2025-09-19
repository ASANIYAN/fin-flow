import { Form } from "@/components/ui/form";
import { useSignupForm } from "../hooks/useSignupForm";
import CustomInput from "@/components/common/custom-input";
import CustomSelect from "@/components/common/custom-select";
import { Mail, User } from "lucide-react";
import CustomPasswordInput from "@/components/common/custom-password-input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { SignupFormType } from "../utils/validation";

const SignupForm = () => {
  const { form, mutation } = useSignupForm();

  const onSubmit = (data: SignupFormType) => {
    mutation.mutate(data);
  };

  const isSubmitting = mutation.isLoading;

  return (
    <section
      className="w-full max-w-lg mx-auto shadow-sm max-sm:p-5 sm:py-5 bg-white rounded-xl"
      role="main"
      aria-labelledby="signup-heading"
    >
      <h1
        id="signup-heading"
        className="text-black font-medium text-2xl text-center"
      >
        Sign Up
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2.5 mt-6.5 w-full mx-auto max-w-92"
          role="form"
          aria-label="Sign up form"
          noValidate
        >
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <legend className="sr-only">Personal Information</legend>
            <CustomInput
              name="firstName"
              placeholder="First Name"
              control={form.control}
              containerClassName="rounded-lg"
              append={
                <User size={20} color="var(--color-black)" aria-hidden="true" />
              }
              aria-label="First name"
              aria-required="true"
              aria-invalid={!!form.formState.errors.firstName}
              aria-describedby={
                form.formState.errors.firstName ? "firstName-error" : undefined
              }
            />

            <CustomInput
              name="lastName"
              placeholder="Last Name"
              control={form.control}
              containerClassName="rounded-lg"
              append={
                <User size={20} color="var(--color-black)" aria-hidden="true" />
              }
              aria-label="Last name"
              aria-required="true"
              aria-invalid={!!form.formState.errors.lastName}
              aria-describedby={
                form.formState.errors.lastName ? "lastName-error" : undefined
              }
            />
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="sr-only">Role Selection</legend>
            <CustomSelect
              name="role"
              control={form.control}
              placeholder="Select your role"
              selectTriggerClassName="rounded-lg h-12 border-border focus:ring-brand-primary"
              options={[
                { value: "lender", label: "I am a Lender" },
                { value: "borrower", label: "I am a Borrower" },
              ]}
              aria-label="Select your role"
              aria-required="true"
            />
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="sr-only">Contact Information</legend>
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

            {/* <CustomInput
              name="phoneNumber"
              placeholder="Phone Number"
              control={form.control}
              containerClassName="rounded-lg"
              append={
                <Phone
                  size={20}
                  color="var(--color-black)"
                  aria-hidden="true"
                />
              }
              aria-label="Phone number"
              aria-required="true"
              aria-invalid={!!form.formState.errors.phoneNumber}
              aria-describedby={
                form.formState.errors.phoneNumber
                  ? "phoneNumber-error"
                  : undefined
              }
            /> */}
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="sr-only">Password Information</legend>
            <CustomPasswordInput
              name="password"
              control={form.control}
              placeholder="Password"
              containerClassName="rounded-lg"
              aria-label="Password (minimum 8 characters with uppercase, lowercase, number and special character)"
              aria-required="true"
              aria-invalid={!!form.formState.errors.password}
              aria-describedby={
                form.formState.errors.password
                  ? "password-error"
                  : "password-requirements"
              }
            />

            <div
              id="password-requirements"
              className="text-sm text-gray-600 sr-only"
            >
              Password must be at least 8 characters and contain uppercase,
              lowercase, number and special character
            </div>

            <CustomPasswordInput
              name="confirmPassword"
              control={form.control}
              placeholder="Confirm Password"
              containerClassName="rounded-lg"
              aria-label="Confirm password"
              aria-required="true"
              aria-invalid={!!form.formState.errors.confirmPassword}
              aria-describedby={
                form.formState.errors.confirmPassword
                  ? "confirmPassword-error"
                  : undefined
              }
            />
          </fieldset>

          <Button
            type="submit"
            className="mt-10.5 bg-brand-primary hover:bg-brand-primary/80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-5 h-12 w-full text-white text-base text-center flex justify-center items-center transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Creating account..." : "Create your account"
            }
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-sm"
                aria-label="Go to login page"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default SignupForm;
