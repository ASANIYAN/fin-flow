import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Providers from "./providers/providers.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import router from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster richColors={false} position="top-center" />
    </Providers>
  </StrictMode>
);
