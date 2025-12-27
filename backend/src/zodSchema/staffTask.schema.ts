import { z } from "zod";

export const staffTaskZodSchema = z.object({
  staffId: z.string(),
  patientId: z.string().optional(),
  appointmentId: z.string().optional(),
  taskType: z.enum(["assign", "followup", "report"]),
  status: z.enum(["pending", "done"]).optional(),
});

export type StaffTaskInput = z.infer<typeof staffTaskZodSchema>;
