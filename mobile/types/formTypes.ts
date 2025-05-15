import { Control } from "react-hook-form";
import { z } from "zod";

export interface FieldConfig {
  name: string;
  placeholder?: string;
  type: "text" | "number" | "email" | "password" | "time";
}

export interface FormProps {
  schema: z.ZodSchema<any>;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}

export interface FormInputProp {
  field: FieldConfig;
  control: Control<Record<string, any>>;
  errors: any;
}
