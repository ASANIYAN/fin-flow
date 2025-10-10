/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export type ValidationError = string | string[];

export interface APIError {
  message: string;
  errors?: Record<string, ValidationError>;
}

// New error format from API
interface ValidationErrorField {
  field: string;
  message: string;
  expectedType: string;
  receivedType: string;
}

interface NewApiErrorResponse {
  code: string;
  fields?: ValidationErrorField[];
  message?: string;
}

/**
 * Utility function to convert field names to readable format
 */
const formatFieldName = (fieldName: string): string => {
  // Convert camelCase to Title Case with spaces
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Handles new validation error format and returns formatted message
 */
const handleValidationError = (errorData: NewApiErrorResponse): string => {
  if (errorData.fields && errorData.fields.length > 0) {
    const fieldNames = errorData.fields
      .map((f) => formatFieldName(f.field))
      .join(", ");
    return `Validation errors in: ${fieldNames}`;
  }
  return errorData.message || "Validation error occurred";
};

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
  error: AxiosError<APIError | NewApiErrorResponse> | any
): string => {
  try {
    // Check for new validation error format first
    if (error?.response?.data?.code === "VALIDATION_ERROR") {
      return handleValidationError(error.response.data as NewApiErrorResponse);
    }

    // Handle existing error format
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
  error: AxiosError<APIError | NewApiErrorResponse> | any
): {
  message: string;
  fieldErrors: Record<string, string[]> | null;
} => {
  // Handle new validation error format
  if (error?.response?.data?.code === "VALIDATION_ERROR") {
    const errorData = error.response.data as NewApiErrorResponse;
    const fieldErrors: Record<string, string[]> = {};

    if (errorData.fields) {
      errorData.fields.forEach((fieldError) => {
        fieldErrors[fieldError.field] = [fieldError.message];
      });
    }

    return {
      message: handleValidationError(errorData),
      fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : null,
    };
  }

  // Handle existing error format
  return {
    message: getApiErrorMessage(error),
    fieldErrors: error?.response?.data?.errors
      ? getValidationErrors(error)
      : null,
  };
};
