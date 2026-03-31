import { check, z } from "zod";

export const userSchema = z
  .object({
    name: z.string("Name is required").min(3, "Name is required"),
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(8, "Minimum of 8 characters is required"),
    password_confirmation: z
      .string("Password is required")
      .min(8, "Minimum of 8 characters is required"),
  })
  .refine((val) => val.password === val.password_confirmation, {
    error: "Passwords do not match",
    path: ["password_confirmation"],
  });
