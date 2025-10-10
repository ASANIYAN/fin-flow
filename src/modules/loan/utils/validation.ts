import { z } from "zod";

export const CreateLoanSchema = z
  .object({
    title: z
      .string("Title is required")
      .min(1, "Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),

    description: z
      .string("Description is required")
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),

    amountRequested: z
      .string("Amount is required")
      .min(1, "Amount is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
      .refine((val) => {
        const num = parseFloat(val);
        return num >= 1000;
      }, "Minimum loan amount is ₦1,000")
      .refine((val) => {
        const num = parseFloat(val);
        return num <= 10000000;
      }, "Maximum loan amount is ₦10,000,000"),

    interestRate: z
      .string("Interest rate is required")
      .min(1, "Interest rate is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Interest rate must be a valid number")
      .refine((val) => {
        const num = parseFloat(val);
        return num >= 1;
      }, "Minimum interest rate is 1%")
      .refine((val) => {
        const num = parseFloat(val);
        return num <= 30;
      }, "Maximum interest rate is 30%"),

    duration: z
      .string("Duration is required")
      .min(1, "Duration is required")
      .regex(/^\d+$/, "Duration must be a valid whole number")
      .refine((val) => {
        const num = parseInt(val, 10);
        return num >= 1;
      }, "Minimum duration is 1"),

    durationUnit: z.enum(["DAYS", "WEEKS", "MONTHS", "YEARS"], {
      message: "Duration unit must be DAYS, WEEKS, MONTHS, or YEARS",
    }),
  })
  .refine(
    (data) => {
      const duration = parseInt(data.duration, 10);
      const unit = data.durationUnit;

      // Maximum limits based on 10 years total
      const maxLimits = {
        DAYS: 3650, // 10 years ≈ 3650 days
        WEEKS: 520, // 10 years ≈ 520 weeks
        MONTHS: 120, // 10 years = 120 months
        YEARS: 10, // 10 years
      };

      const maxForUnit = maxLimits[unit];
      return duration <= maxForUnit;
    },
    {
      message:
        "Loan duration cannot exceed 10 years total (max: 3650 days, 520 weeks, 120 months, or 10 years)",
      path: ["duration"], // This will show the error on the duration field
    }
  );

export type CreateLoanFormType = z.infer<typeof CreateLoanSchema>;
