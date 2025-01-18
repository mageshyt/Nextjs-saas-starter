import { Role } from "@prisma/client";
import { z } from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(35),
})

export type userNameType = z.infer<typeof userNameSchema>;

export const userRoleSchema = z.object({
  role: z.nativeEnum(Role),
});
