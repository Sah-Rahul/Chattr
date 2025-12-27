import { z } from "zod";

export const managementZodSchema = z.object({
  level: z.enum(["admin", "superadmin"]).optional(),
});

export type ManagementInput = z.infer<typeof managementZodSchema>;
