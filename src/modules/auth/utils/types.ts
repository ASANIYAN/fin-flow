// API Response Types
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: {
      value: string;
      expiresAt: string;
    };
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      isEmailVerified: boolean;
      role: "LENDER" | "BORROWER";
    };
  };
}

export interface SignupResponse {
  message: string;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    role: "LENDER" | "BORROWER";
  };
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// API Payload Types
export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: "BORROWER" | "LENDER";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
