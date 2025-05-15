import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { FormProps } from "@/types/formTypes";

export default function Form({ schema, fields, onSubmit }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((arr, field) => {
      switch (field.type) {
        case "text":
        case "email":
        case "password":
          arr[field.name] = "";
          break;
        case "number":
          arr[field.name] = 0;
          break;
        case "time":
          arr[field.name] = new Date();
          break;
      }
      return arr;
    }, {} as Record<string, any>),
  });

  return (
    <View style={styles.form}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <FormInput field={field} control={control} errors={errors} />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.textStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  button: {
    alignSelf: "center",
    width: 150,
    padding: 5,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#E5E5E5",
  },
  textStyle: {
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
