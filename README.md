# FinFlow - P2P Lending Client

## Overview & Goal

FinFlow is a comprehensive React-based frontend application for a peer-to-peer lending platform, enabling seamless interactions where users can act as both borrowers and lenders. Users can seamlessly switch between borrowing and lending activities through an intuitive unified dashboard, browse loan listings, apply for loans, fund their investments, manage their wallets, withdraw earnings, and handle their profiles—all through a responsive, role-agnostic interface. The app emphasizes security, performance, and user experience, handling complex financial workflows with real-time data, robust validation, and efficient API integrations.

Key features include a unified dashboard with tab-based navigation between borrower and lender views, wallet management with Paystack-powered funding and withdrawals, account name resolution for secure transfers, debounced inputs to optimize API calls, and comprehensive analytics for both investment and borrowing activities. The application is built with modularity in mind, separating concerns across feature modules for maintainability and scalability.

## Features

- **Authentication**: Secure login and registration with JWT-based auth.
- **Unified Dashboard**: Dual-role overview with tabbed interface for switching between borrower and lender views, including comprehensive stats, balances, loans, investments, and transaction history with interactive charts.
- **Borrower Features**:
  - Browse and filter available loan opportunities
  - Apply for loans and track application statuses
  - Manage loan repayments and view loan history
- **Lender Features**:
  - View investment opportunities and fund loans
  - Track funded loans and monitor returns
  - Analyze investment performance and earnings
- **Wallet Operations**: Fund wallet via Paystack, withdraw funds with account verification, and view comprehensive transaction history for both borrowing and lending activities.
- **Profile Management**: Update user details and settings with role-agnostic preferences.
- **Responsive Design**: Mobile-first UI with Tailwind CSS and Shadcn components, optimized for both borrower and lender workflows.

## Technical Decisions & Performance

### API Integration & Data Fetching

The app uses TanStack Query (React Query) for efficient data fetching, caching, and synchronization. Queries handle user profiles, transactions, banks, loan data, and investment analytics, with automatic invalidation on mutations (e.g., refreshing wallet data after funding, updating investment summaries after loan funding). The unified dashboard leverages a single API endpoint to serve both borrower and lender data, optimizing performance and ensuring data consistency. Axios is employed for HTTP requests, with interceptors for authentication and error handling. This setup ensures minimal API calls, optimistic updates, and offline resilience across both borrowing and lending workflows.

### Payment & External Integrations

Paystack is integrated for secure payments, including wallet funding and account name resolution. The `usePaystackScript` hook dynamically loads the Paystack SDK, while mutations handle funding and resolution requests. Global type declarations in `src/types/paystack.d.ts` ensure type safety for Paystack's window object.

### Form Management & Validation

Forms are managed with React Hook Form and Zod schemas for type-safe validation. Custom hooks encapsulate logic for mutations (e.g., `useFundWalletMutation`, `useWithdrawMutation`, `useLoanFundingMutation`), enabling reusable, declarative components. Validation includes minimum amounts, regex patterns (e.g., for account numbers), investment limits, and real-time feedback for both borrowing and lending scenarios.

### Debouncing & Performance Optimizations

Custom `useDebounce` hooks (500ms delay) are used on inputs like account numbers and bank codes to prevent excessive API calls during typing. This balances UX with efficiency, triggering requests only after user pauses, reducing server load and throttling risks.

### State Management

Zustand provides lightweight global state for user data, while local state in components handles UI-specific logic (including dashboard tab switching between borrower and lender views). React Query manages server state, avoiding unnecessary re-renders while ensuring data consistency across dual-role interfaces.

### Type Safety & Build

TypeScript ensures compile-time type checking across components, hooks, and API responses. Vite enables fast development with HMR, and the build process includes ESLint for code quality.

## Component Structure

The application follows a modular, feature-based architecture designed to support dual-role user workflows:

- **Modules**: Organized by domain (e.g., `auth`, `dashboard`, `listings`, `loan`, `profile`, `user-loans`, `funded-loans`, `wallet`). Each module contains `components`, `hooks`, `types`, and `views` for encapsulation. The dashboard module specifically supports both borrower and lender interfaces.
- **Reusable Components**: Located in `src/components/ui` (e.g., Button, Card, Dialog, StatusCard) and `src/components/common` (e.g., CustomInput, ComboboxSelect, DataTable), built with Shadcn UI for consistency across borrower and lender workflows.
- **Hooks**: Custom hooks in `src/hooks` (e.g., `useDebounce`) and module-specific hooks for queries/mutations. The `useUnifiedDashboardData` hook efficiently serves data for both user roles.
- **Layouts & Providers**: `src/layouts` for page structures including responsive sidebar navigation, `src/providers` for context (e.g., QueryClient provider).
- **Services & Utils**: `src/services` for API clients, `src/lib` for utilities like formatting and validation that work across both borrower and lender contexts.
- **Routing**: React Router for client-side navigation with role-agnostic route handling.

This structure promotes separation of concerns, with container components managing state and logic for both roles, while presentational components handle UI consistently across borrowing and lending features.

## Styling & Responsiveness

Styling leverages Tailwind CSS for utility-first classes, combined with Shadcn UI components for accessible, customizable primitives. The design is mobile-first with responsive breakpoints ensuring compatibility across devices for both borrower and lender interfaces. Interactive elements include hover states, transitions, loading skeletons, and tab-based navigation for seamless role switching. Charts in the unified dashboard use Recharts for data visualization of both borrowing and investment metrics.

## Testing Focus (UI & Integration)

Testing is handled with Vitest for unit tests and Cypress/Playwright for E2E scenarios. Coverage includes:

- **Authentication Flows**: Login, registration, and token handling.
- **Dual-Role Dashboard**: Tab switching between borrower and lender views, data consistency, and role-specific analytics.
- **Wallet Operations**: Funding modal integration, withdrawal with account resolution, debounced inputs, and transaction invalidation across both borrowing and lending activities.
- **Borrower Workflows**: Loan application, status tracking, and repayment management.
- **Lender Workflows**: Investment opportunities, loan funding, portfolio tracking, and earnings management.
- **Dashboard & Listings**: Data rendering, chart interactions, filtering, and unified data display.
- **Form Validations**: Error states, submission handling, and API responses for both borrower and lender forms.
- **UI States**: Loading skeletons, error toasts, responsive layouts, and seamless role transitions.

Tests simulate user interactions, network delays, edge cases, and role-switching scenarios to ensure reliability across all user workflows.

## Installation

To set up FinFlow locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ASANIYAN/fin-flow.git
   cd fin-flow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`. Ensure Node.js (v16+) and the backend API are running. For production, use `npm run build`.
