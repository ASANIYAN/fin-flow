/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export type ValidationError = string | string[];

export interface APIError {
  message: string;
  errors?: Record<string, ValidationError>;
}

/**
 * Extracts a user-friendly error message from various error formats
 */
const getErrorMessage = (message: string | object): string => {
  if (typeof message === "object" && message !== null) {
    const values = Object.values(message);
    if (values.length > 0) {
      return String(values[0]);
    }
    return "An error occurred";
  }
  return String(message || "An error occurred");
};

/**
 * Extracts field-specific validation errors if available
 */
const getValidationErrors = (
  error: AxiosError<APIError>
): Record<string, string[]> | null => {
  if (error?.response?.data?.errors) {
    const validationErrors: Record<string, string[]> = {};

    // Convert all validation errors to arrays of strings for consistent handling
    Object.entries(error.response.data.errors).forEach(
      ([field, errorMessages]) => {
        validationErrors[field] = Array.isArray(errorMessages)
          ? errorMessages
          : [errorMessages];
      }
    );

    return validationErrors;
  }

  return null;
};

/**
 * Returns the main error message from an API error
 */
export const getApiErrorMessage = (
  error: AxiosError<APIError> | any
): string => {
  try {
    if (error?.response?.data?.message) {
      return getErrorMessage(error.response.data.message);
    }

    if (error?.message) {
      return String(error.message);
    }

    if (error?.toString) {
      return error.toString();
    }

    return "An unexpected error occurred";
  } catch (err) {
    console.error("Error processing API error:", err);
    return "An unexpected error occurred";
  }
};

/**
 * Handles API errors and returns both the main message and any field validation errors
 */
export const handleApiError = (
  error: AxiosError<APIError> | any
): {
  message: string;
  fieldErrors: Record<string, string[]> | null;
} => {
  return {
    message: getApiErrorMessage(error),
    fieldErrors: error?.response?.data?.errors
      ? getValidationErrors(error)
      : null,
  };
};
