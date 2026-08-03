import { z } from "zod";

export const applyLeaveSchema = z
  .object({
    reason: z
      .string()
      .trim()
      .min(5, "Reason must be at least 5 characters.")
      .max(500, "Reason cannot exceed 500 characters."),

    startDate: z
      .string()
      .min(1, "Start date is required."),

    endDate: z
      .string()
      .min(1, "End date is required."),
  })
  .refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      message: "End date cannot be before start date.",
      path: ["endDate"],
    }
  );