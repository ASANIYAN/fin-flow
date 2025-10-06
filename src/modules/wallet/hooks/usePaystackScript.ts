import { useEffect, useState } from "react";

export const PAYSTACK_KEY: string | undefined = import.meta.env
  .VITE_PAYSTACK_PUBLIC_KEY;

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
