import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LoginSchema, LoginFields } from "@/components/forms/SignInFormConfig";
import Form from "@/components/Form";
import { loginUser } from "@/apis";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function TabThreeScreen() {
  const handleSubmit = async (data: FormData) => {
    try {
      const result = await loginUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <Form schema={LoginSchema} fields={LoginFields} onSubmit={handleSubmit} />
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
