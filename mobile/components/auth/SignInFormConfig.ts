import { z } from "zod";
import { FieldConfig } from "@/types/formTypes";

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is Required" }),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const LoginFields: FieldConfig[] = [
  { name: "username", placeholder: "Username", type: "text" },
  { name: "password", placeholder: "Password", type: "password" },
];
