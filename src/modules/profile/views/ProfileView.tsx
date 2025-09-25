import { useGetUserProfile } from "../hooks/useGetUserProfile";
import ProfileForm from "../components/ProfileForm";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileView = () => {
  const { data, isLoading, error, refetch, isRefetching } = useGetUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary mx-auto" />
          <p className="text-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-900">
            Failed to load profile
          </h3>
          <p className="text-text-secondary">
            We couldn't fetch your profile information. Please try again.
          </p>
          <Button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            {isRefetching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (!data?.success || !data?.data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto" />
          <h3 className="text-lg font-semibold text-gray-900">
            No profile data found
          </h3>
          <p className="text-text-secondary">
            Your profile information is not available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <ProfileForm userProfile={data.data} />
    </div>
  );
};

export default ProfileView;
