import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FieldConfig {
  name: string;
  placeholder: string;
  label?: string;
  rules?: object;
  type?: "text" | "number" | "email" | "password";
}

interface FormProps {
  schema: z.ZodSchema<any>;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}

export default function Form({ schema, fields, onSubmit }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {fields.map((field) => (
          <View key={field.name} style={styles.inputContainer}>
            <Controller
              control={control}
              name={field.name}
              rules={field.rules}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder={field.placeholder}
                  label={field.label || field.placeholder}
                  mode="outlined"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={field.type === "password"}
                  keyboardType={field.type === "number" ? "numeric" : "default"}
                />
              )}
            />
            {errors[field.name] && (
              <Text style={styles.errorText}>
                {errors[field.name]?.message?.toString() ||
                  `${field.name} is required`}
              </Text>
            )}
          </View>
        ))}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the entire screen
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    backgroundColor: "#f4f4f4", // Light background color
    padding: 20, // Padding around the edges for small screens
  },
  form: {
    width: "90%", // Occupies 90% of the screen width
    maxWidth: 400, // Maximum width for large screens
    backgroundColor: "#ffffff", // White background
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the form container
    shadowColor: "#000", // Shadow for elevation effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15, // Space between input fields
  },
  input: {
    backgroundColor: "#ffffff", // White background for TextInput
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
