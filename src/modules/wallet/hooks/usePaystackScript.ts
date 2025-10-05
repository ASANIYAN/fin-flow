import { useEffect, useState } from "react";

/** Public key (may come from Vite's import.meta.env or process.env depending on runtime) */
const getViteKey = (): string | undefined => {
  if (typeof process !== "undefined") {
    const env = process.env as unknown as Record<string, string> | undefined;
    return env?.VITE_PAYSTACK_PUBLIC_KEY;
  }
  if (typeof import.meta !== "undefined") {
    const meta = import.meta as unknown as
      | { env?: Record<string, string> }
      | undefined;
    return meta?.env?.VITE_PAYSTACK_PUBLIC_KEY;
  }
  return undefined;
};

export const PAYSTACK_KEY: string | undefined = getViteKey();

export const CURRENCY = "NGN";

/**
 * Hook that ensures the Paystack inline script is loaded.
 * Returns true when the `PaystackPop` global is available.
 */
const usePaystackScript = (): boolean => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If Paystack is already available, mark loaded and exit.
    if (window.PaystackPop) {
      setLoaded(true);
      return;
    }

    // Create script element
    const script: HTMLScriptElement = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    const onScriptLoad = (): void => setLoaded(true);
    script.addEventListener("load", onScriptLoad);

    document.head.appendChild(script);

    return () => {
      // Remove event listener
      script.removeEventListener("load", onScriptLoad);
      // Only remove the script if it is still attached
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
    // We intentionally do not include dependencies so this runs once on mount
  }, []);

  return loaded;
};

export default usePaystackScript;
