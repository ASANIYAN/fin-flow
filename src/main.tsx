import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/providers.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
      <Toaster richColors={false} position="top-center" />
    </Providers>
  </StrictMode>
);
