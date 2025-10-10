import App from "@/App";
import AdminLayout from "@/layouts/AdminLayout";
import ForgotPasswordView from "@/modules/auth/views/ForgotPasswordView";
import Login from "@/modules/auth/views/Login";
import ResetPasswordView from "@/modules/auth/views/ResetPasswordView";
import Signup from "@/modules/auth/views/Signup";
import VerifyEmailView from "@/modules/auth/views/VerifyEmailView";
import Dashboard from "@/modules/dashboard/views/Dashboard";
import FundedLoansPage from "@/modules/funded-loans/views/FundedLoansPage";
import LoanListingsPage from "@/modules/listings/views/LoanListingsPage";
import CreateLoanPage from "@/modules/loan/views/CreateLoanPage";
import ProfileView from "@/modules/profile/views/ProfileView";
import UserLoansPage from "@/modules/user-loans/views/UserLoansPage";
import WalletPage from "@/modules/wallet/view/WalletPage";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/loan-listings", element: <LoanListingsPage /> },
      { path: "/create-loan", element: <CreateLoanPage /> },
      { path: "/user-loans", element: <UserLoansPage /> },
      { path: "/funded-loans", element: <FundedLoansPage /> },
      { path: "/wallet", element: <WalletPage /> },
      { path: "/profile", element: <ProfileView /> },
    ],
  },
];

// Unprotected routes
const unprotectedRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordView />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordView />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailView />,
  },
];

// Main router configuration
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />, // App component acts as the root boundary
    errorElement: <></>, // A global error element
    children: [...unprotectedRoutes, ...protectedRoutes],
  },
];

// Create the router instance
const router = createBrowserRouter(routes);

export default router;
