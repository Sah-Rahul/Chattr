import { z } from "zod";

export const appointmentZodSchema = z.object({
  slotId: z.string().optional(),
  createdBy: z.enum(["patient", "staff"]),
  status: z.enum(["accepted", "completed", "cancelled"]),
});

export type AppointmentInput = z.infer<typeof appointmentZodSchema>;
