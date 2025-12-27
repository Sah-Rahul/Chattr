 
import { z } from "zod";

export const doctorZodSchema = z.object({
  specialization: z.string().min(1, "Specialization is required"),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.number().min(0, "Experience must be positive"),
  age: z.number().min(21, "Age must be at least 21"),
  consultationFee: z.number().min(0).optional(),
  departmentId: z.string().optional(),
});

export type DoctorInput = z.infer<typeof doctorZodSchema>;
