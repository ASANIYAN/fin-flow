import { Form } from "@/components/ui/form";
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile";
import CustomInput from "@/components/common/custom-input";
import { Button } from "@/components/ui/button";
import type { UpdateProfileFormType } from "../utils/validation";
import type { UserProfile } from "../utils/types";
import { User, Mail, CheckCircle, XCircle, Save } from "lucide-react";

interface ProfileFormProps {
  userProfile: UserProfile;
}

const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  const { form, mutation } = useUpdateUserProfile(
    userProfile.firstName,
    userProfile.lastName
  );

  const onSubmit = (data: UpdateProfileFormType) => {
    mutation.mutate(data);
  };

  const isSubmitting = mutation.isLoading;

  const getStatusBadge = (isVerified: boolean) => {
    if (isVerified) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircle size={16} />
          Verified
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
        <XCircle size={16} />
        Unverified
      </div>
    );
  };

  return (
    <section
      className="w-full max-w-2xl mx-auto shadow-sm max-sm:p-5 sm:py-8 bg-white rounded-xl"
      role="main"
      aria-labelledby="profile-heading"
    >
      <div className="text-center mb-8">
        <h1 id="profile-heading" className="text-black font-bold text-3xl">
          User Profile
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          Manage your personal information and account settings
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-6 w-full mx-auto max-w-xl"
          role="form"
          aria-label="Update profile form"
          noValidate
        >
          {/* Email (Read-only) */}
          <div className="space-y-2">
            <label className="text-brand-primary font-medium text-sm">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  size={20}
                  color="var(--color-text-secondary)"
                  aria-hidden="true"
                />
              </div>
              <input
                type="email"
                value={userProfile.email}
                readOnly
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                aria-label="Email address (read-only)"
              />
            </div>
          </div>

          {/* First Name */}
          <CustomInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            control={form.control}
            containerClassName="rounded-lg border-gray-300 focus-within:border-brand-primary"
            formLabelClassName="text-brand-primary font-medium"
            append={
              <User
                size={20}
                color="var(--color-text-secondary)"
                aria-hidden="true"
              />
            }
            aria-label="First name"
            aria-required="true"
            aria-invalid={!!form.formState.errors.firstName}
          />

          {/* Last Name */}
          <CustomInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            control={form.control}
            containerClassName="rounded-lg border-gray-300 focus-within:border-brand-primary"
            formLabelClassName="text-brand-primary font-medium"
            append={
              <User
                size={20}
                color="var(--color-text-secondary)"
                aria-hidden="true"
              />
            }
            aria-label="Last name"
            aria-required="true"
            aria-invalid={!!form.formState.errors.lastName}
          />

          {/* Email Verification Status (Read-only) */}
          <div className="space-y-2">
            <label className="text-brand-primary font-medium text-sm">
              Email Verification Status
            </label>
            <div className="flex items-center">
              {getStatusBadge(userProfile.isEmailVerified)}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-8 bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-6 h-14 w-full text-white text-lg font-semibold flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Updating profile..." : "Update profile"}
          >
            {isSubmitting ? (
              "Updating Profile..."
            ) : (
              <>
                <Save size={20} aria-hidden="true" />
                Update Profile
              </>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ProfileForm;
