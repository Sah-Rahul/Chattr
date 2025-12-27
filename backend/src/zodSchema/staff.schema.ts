import { z } from "zod";

export const staffZodSchema = z.object({
  departmentId: z.string().optional(),
  designation: z.string().min(2),
  shift: z.enum(["morning", "evening", "night"]).optional(),
});

export type StaffInput = z.infer<typeof staffZodSchema>;
