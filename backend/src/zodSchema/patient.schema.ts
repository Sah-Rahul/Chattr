import { z } from "zod";

export const patientSchema = z.object({
  age: z.number().int().min(0).max(120).optional(),

  gender: z.enum(["male", "female", "other"]).optional(),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  emergencyContact: z.string().min(10).max(15).optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
