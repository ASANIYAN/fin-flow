export {};

/**
 * Global Paystack types used across the app.
 * Keep a single ambient declaration to avoid duplicate/deconflicting declarations.
 */
declare global {
  type PaystackConfig = {
    reference?: string;
    email?: string;
    amount?: number; // in Kobo
    publicKey?: string;
    currency?: string;
    metadata?: {
      custom_fields?: Array<{
        display_name?: string;
        variable_name?: string;
        value?: string;
        [key: string]: unknown;
      }>;
      [key: string]: unknown;
    };
    callback?: (response: PaystackResponse) => void;
    onClose?: () => void;
    [key: string]: unknown;
  };

  interface PaystackInstance {
    setup: (config: PaystackConfig) => { openIframe: () => void };
  }

  interface Window {
    PaystackPop?: PaystackInstance;
  }

  interface PaystackResponse {
    reference: string;
  }
}
