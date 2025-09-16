import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const SignupSchema = z
  .object({
    firstName: z
      .string("First name is required")
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

    lastName: z
      .string("Last name is required")
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

    email: z
      .string("Email is required")
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    role: z
      .string("Please select your role")
      .min(1, "Please select your role")
      .refine((value) => value === "lender" || value === "borrower", {
        message: "Please select either Lender or Borrower",
      }),

    phoneNumber: z
      .string("Phone number is required")
      .min(1, "Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),

    password: z
      .string("Password is required")
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /^(?=.*[@$!%*?&])/,
        "Password must contain at least one special character (@$!%*?&)"
      ),

    confirmPassword: z
      .string("Please confirm your password")
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string("Password is required")
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /^(?=.*[@$!%*?&])/,
        "Password must contain at least one special character (@$!%*?&)"
      ),

    confirmPassword: z
      .string("Please confirm your password")
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormType = z.infer<typeof LoginSchema>;
export type SignupFormType = z.infer<typeof SignupSchema>;
export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordFormType = z.infer<typeof ResetPasswordSchema>;
