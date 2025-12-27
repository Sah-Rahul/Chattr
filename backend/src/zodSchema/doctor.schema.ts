import { z } from "zod";

export const doctorZodSchema = z.object({
  specialization: z.string().min(2),
  qualification: z.string().min(2),
  experience: z.number().min(0),
  age: z.number().min(21),
  departmentId: z.string().optional(),
});

export type DoctorInput = z.infer<typeof doctorZodSchema>;
