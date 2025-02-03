import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import {
  registerSchema,
  registerFields,
} from "@/components/forms/SignupFormConfig";
import Form from "@/components/Form";
import { registerUser } from "@/apis";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function TabThreeScreen() {
  const handleSubmit = async (data: FormData) => {
    try {
      const result = await registerUser(data);
      console.log("User Registered: " + result);
    } catch (error: any) {
      console.log("Error: " + error);
    }
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <Form
        schema={registerSchema}
        fields={registerFields}
        onSubmit={handleSubmit}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
