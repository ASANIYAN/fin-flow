export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "BORROWER" | "LENDER" | "ADMIN";
  isEmailVerified: boolean;
  createdAt: string;
};

export type GetUserProfileResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

export type UpdateUserProfileRequest = {
  firstName: string;
  lastName: string;
};

export type UpdateUserProfileResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};
