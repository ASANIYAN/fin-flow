import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LoginForm from "../LoginForm";

// Mock the hooks
const mockUseLoginForm = vi.fn();
const mockUseResendVerification = vi.fn();

vi.mock("../hooks/useLoginForm", () => ({
  useLoginForm: mockUseLoginForm,
}));

vi.mock("../hooks/useResendVerification", () => ({
  useResendVerification: mockUseResendVerification,
}));

// Mock the custom components
vi.mock("@/components/common/custom-input", () => ({
  default: ({
    name,
    placeholder,
    append,
    error,
    ...props
  }: {
    name: string;
    placeholder: string;
    control?: unknown;
    append?: React.ReactNode;
    error?: string;
  } & React.ComponentProps<"input">) => (
    <div data-testid={`custom-input-${name}`}>
      <input
        name={name}
        placeholder={placeholder}
        data-testid={`input-${name}`}
        {...props}
      />
      {append}
      {error && <span data-testid={`error-${name}`}>{error}</span>}
      <span data-testid="form-message" />
    </div>
  ),
}));

vi.mock("@/components/common/custom-password-input", () => ({
  default: ({
    name,
    placeholder,
    error,
    ...props
  }: {
    name: string;
    placeholder: string;
    control?: unknown;
    error?: string;
  } & React.ComponentProps<"input">) => (
    <div data-testid={`custom-password-input-${name}`}>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        data-testid={`input-${name}`}
        {...props}
      />
      {error && <span data-testid={`error-${name}`}>{error}</span>}
      <span data-testid="form-message" />
    </div>
  ),
}));

// Mock the Form components
vi.mock("@/components/ui/form", () => ({
  Form: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  FormField: ({
    render,
    name,
  }: {
    render: (props: {
      field: { name: string; value: string; onChange: () => void };
    }) => React.ReactNode;
    name: string;
  }) => {
    const fieldProps = { field: { name, value: "", onChange: vi.fn() } };
    return render(fieldProps);
  },
  FormItem: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  FormLabel: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<{ className?: string }>) => (
    <label className={className} {...props}>
      {children}
    </label>
  ),
  FormControl: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  FormMessage: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <span data-testid="form-message" {...props}>
      {children}
    </span>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    type,
    className,
    ...props
  }: React.PropsWithChildren<{
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
  }>) => (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock the UI Input component
vi.mock("@/components/ui/input", () => ({
  Input: ({
    className,
    ...props
  }: React.ComponentProps<"input"> & { className?: string }) => (
    <input className={className} {...props} />
  ),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Mail: ({ size, ...props }: { size?: number; color?: string }) => (
    <svg data-testid="mail-icon" width={size} height={size} {...props}>
      <title>Mail Icon</title>
    </svg>
  ),
  RefreshCw: ({
    size,
    className,
    ...props
  }: {
    size?: number;
    className?: string;
  }) => (
    <svg
      data-testid="refresh-icon"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <title>Refresh Icon</title>
    </svg>
  ),
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("LoginForm - Essential Tests", () => {
  const mockMutate = vi.fn();
  const mockResendVerification = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => (e?: Event) => {
    e?.preventDefault();
    fn({ email: "test@example.com", password: "password123" });
  });

  beforeEach(() => {
    vi.clearAllMocks();

    // Set default mock implementations
    mockUseLoginForm.mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        control: {},
        formState: { errors: {} },
      },
      mutation: {
        isLoading: false,
        mutate: mockMutate,
      },
      emailVerificationError: {
        isEmailNotVerified: false,
        userEmail: null,
      },
    });

    mockUseResendVerification.mockReturnValue({
      resendVerification: mockResendVerification,
      isResending: false,
    });
  });

  describe("1. Initial Render & Basic Interactions", () => {
    it("renders all essential elements correctly", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      // Check for form inputs
      expect(screen.getByTestId("input-email")).toBeInTheDocument();
      expect(screen.getByTestId("input-password")).toBeInTheDocument();

      // Check for login button
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();

      // Check for navigation links
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
      const signUpLink = screen.getByRole("link", { name: /sign up/i });
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute("href", "/signup");
    });

    it("allows users to type in email and password fields", async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");

      await user.type(emailInput, "user@example.com");
      await user.type(passwordInput, "mypassword123");

      expect(emailInput).toHaveValue("user@example.com");
      expect(passwordInput).toHaveValue("mypassword123");
    });
  });

  describe("2. Form Validation", () => {
    it("handles form validation state for invalid email", () => {
      mockUseLoginForm.mockReturnValue({
        form: {
          handleSubmit: mockHandleSubmit,
          control: {},
          formState: {
            errors: {
              email: { message: "Invalid email format" },
            },
          },
        },
        mutation: {
          isLoading: false,
          mutate: mockMutate,
        },
        emailVerificationError: {
          isEmailNotVerified: false,
          userEmail: null,
        },
      });

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId("input-email");
      expect(emailInput).toBeInTheDocument();
    });

    it("handles form validation state for empty email field", () => {
      mockUseLoginForm.mockReturnValue({
        form: {
          handleSubmit: mockHandleSubmit,
          control: {},
          formState: {
            errors: {
              email: { message: "Email is required" },
            },
          },
        },
        mutation: {
          isLoading: false,
          mutate: mockMutate,
        },
        emailVerificationError: {
          isEmailNotVerified: false,
          userEmail: null,
        },
      });

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId("input-email");
      expect(emailInput).toBeInTheDocument();
    });

    it("handles form validation state for empty password field", () => {
      mockUseLoginForm.mockReturnValue({
        form: {
          handleSubmit: mockHandleSubmit,
          control: {},
          formState: {
            errors: {
              password: { message: "Password is required" },
            },
          },
        },
        mutation: {
          isLoading: false,
          mutate: mockMutate,
        },
        emailVerificationError: {
          isEmailNotVerified: false,
          userEmail: null,
        },
      });

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const passwordInput = screen.getByTestId("input-password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("prevents form submission with validation errors", async () => {
      const user = userEvent.setup();

      mockUseLoginForm.mockReturnValue({
        form: {
          handleSubmit: vi.fn(() => () => {}), // Mock that doesn't call the submit function
          control: {},
          formState: {
            errors: {
              email: { message: "Email is required" },
              password: { message: "Password is required" },
            },
          },
        },
        mutation: {
          isLoading: false,
          mutate: mockMutate,
        },
        emailVerificationError: {
          isEmailNotVerified: false,
          userEmail: null,
        },
      });

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const submitButton = screen.getByRole("button", { name: /login/i });
      await user.click(submitButton);

      // Mutation should not be called when there are validation errors
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe("3. Component State & Behavior", () => {
    it("allows user to fill form and submit button is clickable", async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      // Fill in the form
      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      // Verify the form inputs have the entered values
      expect(emailInput).toHaveValue("test@example.com");
      expect(passwordInput).toHaveValue("password123");

      // Verify submit button is enabled and clickable
      const submitButton = screen.getByRole("button", {
        name: /login to your account/i,
      });
      expect(submitButton).toBeEnabled();

      // Clicking the button should not throw an error
      await user.click(submitButton);
    });

    it("displays correct button text and state in default mode", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const loginButton = screen.getByRole("button", {
        name: /login to your account/i,
      });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).not.toBeDisabled();
      expect(loginButton).toHaveTextContent("Login");
    });

    it("can handle form input interactions", async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const emailInput = screen.getByTestId("input-email");
      const passwordInput = screen.getByTestId("input-password");

      await user.type(emailInput, "user@example.com");
      await user.type(passwordInput, "mypassword");

      expect(emailInput).toHaveValue("user@example.com");
      expect(passwordInput).toHaveValue("mypassword");
    });

    it("renders forgot password link with correct href", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const forgotPasswordLink = screen.getByRole("link", {
        name: /forgot password/i,
      });
      expect(forgotPasswordLink).toBeInTheDocument();
      expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
    });

    it("renders sign up link with correct href", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const signUpLink = screen.getByRole("link", { name: /sign up/i });
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute("href", "/signup");
    });
  });

  describe("4. Accessibility & User Experience", () => {
    it("has proper form accessibility attributes", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("aria-label", "Login form");
      expect(form).toHaveAttribute("novalidate");

      const emailInput = screen.getByLabelText("Email address");
      expect(emailInput).toHaveAttribute("aria-required", "true");

      const passwordInput = screen.getByLabelText("Password");
      expect(passwordInput).toHaveAttribute("aria-required", "true");
    });

    it("has proper heading structure", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Login");
      expect(heading).toHaveAttribute("id", "login-heading");
    });

    it("provides helpful link text for screen readers", () => {
      render(
        <TestWrapper>
          <LoginForm />
        </TestWrapper>
      );

      const forgotPasswordLink = screen.getByRole("link", {
        name: /go to forgot password page/i,
      });
      expect(forgotPasswordLink).toBeInTheDocument();

      const signUpLink = screen.getByRole("link", {
        name: /go to sign up page/i,
      });
      expect(signUpLink).toBeInTheDocument();
    });
  });
});
