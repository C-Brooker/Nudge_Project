import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
  count: number;
  setCount: (count: number) => void;
  incrementTimes: () => void;
  decrementTimes: () => void;
}

export default function CountModal({
  visible,
  setVisible,
  title,
  count,
  setCount,
  incrementTimes,
  decrementTimes,
}: ModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How Many Times</Text>

          <View style={styles.numberContainer}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={decrementTimes}
            >
              <Text style={styles.numberButtonText}>-</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.numberInput}
              value={count.toString()}
              onChangeText={(text) => {
                const num = parseInt(text) || 1;
                setCount(num > 0 ? num : 1);
              }}
              keyboardType="numeric"
              textAlign="center"
            />

            <TouchableOpacity
              style={styles.numberButton}
              onPress={incrementTimes}
            >
              <Text style={styles.numberButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  // Number input styles
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  numberButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  numberInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 15,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
