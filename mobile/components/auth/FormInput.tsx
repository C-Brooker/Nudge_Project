import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { FormInputProp } from "@/components/auth/formTypes";

interface TextInputFieldProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  secure?: boolean;
  keyboardType?: "numeric" | "default";
}

function TextInputField({
  value,
  onChange,
  placeholder,
  secure,
  keyboardType,
}: TextInputFieldProps) {
  return (
    <TextInput
      placeholder={placeholder}
      mode="outlined"
      style={styles.input}
      onChangeText={onChange}
      value={value}
      secureTextEntry={secure == true}
      keyboardType={keyboardType === "numeric" ? "numeric" : "default"}
    />
  );
}
interface TimeInputFieldProps {
  value: Date;
  onChange: (date: Date) => void;
}

function TimeInputField({ value, onChange }: TimeInputFieldProps) {
  const [isTimeVisible, setTimeVisible] = useState(false);
  return (
    <View>
      <Button onPress={() => setTimeVisible(true)}>
        {value.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Button>
      {isTimeVisible && (
        <RNDateTimePicker
          value={value}
          mode="time"
          is24Hour={true}
          onChange={(event, time) => {
            if (time) onChange(time);
            setTimeVisible(false);
          }}
        />
      )}
    </View>
  );
}

const inputComponents = {
  text: (props: TextInputFieldProps) => (
    <TextInputField {...props} secure={false} keyboardType={"default"} />
  ),
  email: (props: TextInputFieldProps) => (
    <TextInputField {...props} secure={false} keyboardType={"default"} />
  ),
  password: (props: TextInputFieldProps) => (
    <TextInputField {...props} secure={true} keyboardType={"default"} />
  ),
  number: (props: TextInputFieldProps) => (
    <TextInputField {...props} secure={false} keyboardType={"numeric"} />
  ),
  time: (props: TimeInputFieldProps) => <TimeInputField {...props} />,
};

export default function FormInput({ field, control, errors }: FormInputProp) {
  const InputComponent = inputComponents[field.type];
  if (!InputComponent) {
    return (
      <Text style={{ color: "red" }}>Invalid field type: {field.type}</Text>
    );
  }
  return (
    <>
      <Controller
        control={control}
        name={field.name}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            placeholder={field.placeholder || value}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {errors[field.name] && (
        <Text style={styles.errorText}>{errors[field.name]?.message}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
