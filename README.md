# FinFlow - P2P Lending Client

## Overview & Goal

FinFlow is a comprehensive React-based frontend application for a peer-to-peer lending platform, enabling seamless interactions between borrowers and lenders. Users can browse loan listings, apply for loans, fund their wallets, withdraw earnings, and manage their profiles—all through an intuitive, responsive interface. The app emphasizes security, performance, and user experience, handling complex financial workflows with real-time data, robust validation, and efficient API integrations.

Key features include wallet management with Paystack-powered funding and withdrawals, account name resolution for secure transfers, debounced inputs to optimize API calls, and a dashboard with analytics and transaction history. The application is built with modularity in mind, separating concerns across feature modules for maintainability and scalability.

## Features

- **Authentication**: Secure login and registration with JWT-based auth.
- **Dashboard**: Overview of user stats, including balance, loans, and transactions, with interactive charts.
- **Loan Listings**: Browse and filter available loan opportunities.
- **Loan Management**: Apply for loans, view user-specific loans, and track statuses.
- **Wallet Operations**: Fund wallet via Paystack, withdraw funds with account verification, and view transaction history.
- **Profile Management**: Update user details and settings.
- **Responsive Design**: Mobile-first UI with Tailwind CSS and Shadcn components.

## Technical Decisions & Performance

### API Integration & Data Fetching

The app uses TanStack Query (React Query) for efficient data fetching, caching, and synchronization. Queries handle user profiles, transactions, banks, and loan data, with automatic invalidation on mutations (e.g., refreshing wallet data after funding). Axios is employed for HTTP requests, with interceptors for authentication and error handling. This setup ensures minimal API calls, optimistic updates, and offline resilience.

### Payment & External Integrations

Paystack is integrated for secure payments, including wallet funding and account name resolution. The `usePaystackScript` hook dynamically loads the Paystack SDK, while mutations handle funding and resolution requests. Global type declarations in `src/types/paystack.d.ts` ensure type safety for Paystack's window object.

### Form Management & Validation

Forms are managed with React Hook Form and Zod schemas for type-safe validation. Custom hooks encapsulate logic for mutations (e.g., `useFundWalletMutation`, `useWithdrawMutation`), enabling reusable, declarative components. Validation includes minimum amounts, regex patterns (e.g., for account numbers), and real-time feedback.

### Debouncing & Performance Optimizations

Custom `useDebounce` hooks (500ms delay) are used on inputs like account numbers and bank codes to prevent excessive API calls during typing. This balances UX with efficiency, triggering requests only after user pauses, reducing server load and throttling risks.

### State Management

Zustand provides lightweight global state for user data, while local state in components handles UI-specific logic. React Query manages server state, avoiding unnecessary re-renders.

### Type Safety & Build

TypeScript ensures compile-time type checking across components, hooks, and API responses. Vite enables fast development with HMR, and the build process includes ESLint for code quality.

## Component Structure

The application follows a modular, feature-based architecture:

- **Modules**: Organized by domain (e.g., `auth`, `dashboard`, `listings`, `loan`, `profile`, `user-loans`, `wallet`). Each module contains `components`, `hooks`, `types`, and `views` for encapsulation.
- **Reusable Components**: Located in `src/components/ui` (e.g., Button, Card, Dialog) and `src/components/common` (e.g., CustomInput, ComboboxSelect), built with Shadcn UI for consistency.
- **Hooks**: Custom hooks in `src/hooks` (e.g., `useDebounce`) and module-specific hooks for queries/mutations.
- **Layouts & Providers**: `src/layouts` for page structures, `src/providers` for context (e.g., QueryClient provider).
- **Services & Utils**: `src/services` for API clients, `src/lib` for utilities like formatting and validation.
- **Routing**: React Router for client-side navigation.

This structure promotes separation of concerns, with container components (e.g., `WithdrawModal`, `WalletPage`) managing state and logic, while presentational components handle UI.

## Styling & Responsiveness

Styling leverages Tailwind CSS for utility-first classes, combined with Shadcn UI components for accessible, customizable primitives. The design is mobile-first, with responsive breakpoints ensuring compatibility across devices. Interactive elements include hover states, transitions, and loading skeletons for better UX. Charts in the dashboard use Recharts for data visualization.

## Testing Focus (UI & Integration)

Testing is handled with Vitest for unit tests and Cypress/Playwright for E2E scenarios. Coverage includes:

- **Authentication Flows**: Login, registration, and token handling.
- **Wallet Operations**: Funding modal integration, withdrawal with account resolution, debounced inputs, and transaction invalidation.
- **Dashboard & Listings**: Data rendering, chart interactions, and filtering.
- **Form Validations**: Error states, submission handling, and API responses.
- **UI States**: Loading skeletons, error toasts, and responsive layouts.

Tests simulate user interactions, network delays, and edge cases to ensure reliability.

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
