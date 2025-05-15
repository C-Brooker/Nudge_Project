import { z } from "zod";
import { FieldConfig } from "@/types/formTypes";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be longer than 3 characters" })
      .max(20, { message: "Username must be shorter than 20 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerFields: FieldConfig[] = [
  { name: "username", placeholder: "Username", type: "text" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "password", placeholder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  },
];
