import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  registerSchema,
  registerFields,
} from "@/components/auth/SignupFormConfig";
import Form from "@/components/auth/Form";
import { registerUser } from "@/apis";
import { Modal } from "react-native";
import SocialRow from "./SocialRow";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface modalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  name: string;
}

export default function RegisterModal({
  visible,
  onClose,
  onLogin,
  name,
}: modalProps) {
  const handleSubmit = async (data: FormData) => {
    try {
      const result = await registerUser(data);
      onLogin();
    } catch (error: any) {
      console.log("Error: " + error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerStyle}>{name}</Text>
            <TouchableOpacity style={styles.headerButton} onPress={onLogin}>
              <Text style={styles.textStyle}>Login Instead</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalForm}>
            <Form
              schema={registerSchema}
              fields={registerFields}
              onSubmit={handleSubmit}
            />
            <Text style={styles.textStyle}>Alternatively {name} With</Text>
          </View>
          <View style={styles.buttonBlock}>
            <SocialRow />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.71)",
    justifyContent: "center",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    height: "12%",
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerButton: {
    width: "40%",
    padding: 10,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: "#D3D3D3",
  },

  headerStyle: {
    marginStart: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    height: "70%",
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  modalForm: {
    flex: 1,
  },
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    height: "15%",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },

  buttonRow: { width: "50%", justifyContent: "center" },

  button: {
    alignSelf: "flex-end",
    width: "80%",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "#E5E5E5",
  },

  textStyle: {
    color: "black",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
