import { z } from "zod"

export const userRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["patient", "doctor", "staff", "management"]),
})

export type UserRegisterType = z.infer<typeof userRegisterSchema>
