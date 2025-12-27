import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters")
  .regex(/^[A-Za-z\s.-]+$/, "Name can only contain letters, spaces, dots, or hyphens"),


  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),

  role: z.enum(["patient", "doctor", "staff", "management"]),
});

export type UserRegisterType = z.infer<typeof userRegisterSchema>;
