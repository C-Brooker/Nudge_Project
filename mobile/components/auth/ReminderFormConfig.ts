import { z } from "zod";
import { FieldConfig } from "@/types/formTypes";

export const ReminderSchema = z.object({
  name: z.string().min(1, { message: "Title is Required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  time: z.date(),
});

export const ReminderFields: FieldConfig[] = [
  { name: "name", placeholder: "Name", type: "text" },
  { name: "description", placeholder: "Description", type: "text" },
  { name: "time", type: "time" },
];
