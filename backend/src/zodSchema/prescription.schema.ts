import { z } from "zod";

export const prescriptionZodSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  appointmentId: z.string().optional(),
  medicines: z.array(z.string()).nonempty("Medicines list cannot be empty"),
  instructions: z.string().optional(),
});

export type PrescriptionInput = z.infer<typeof prescriptionZodSchema>;
