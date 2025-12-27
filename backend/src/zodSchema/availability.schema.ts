import { z } from "zod";

export const availabilitySlotZodSchema = z.object({
  doctorId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format YYYY-MM-DD"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format HH:mm"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format HH:mm"),
}).refine(data => data.startTime < data.endTime, {
  message: "startTime must be before endTime",
})
;

export type AvailabilitySlotInput = z.infer<typeof availabilitySlotZodSchema>;
