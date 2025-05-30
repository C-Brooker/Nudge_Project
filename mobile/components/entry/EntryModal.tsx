import { useHabitStore } from "@/stores/useHabitStore";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

interface modalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (habit: string | null, color: string) => void;
  name: string;
  color?: string | null;
  habit?: string | null;
}

export default function EntryModal({
  visible,
  onClose,
  onSave,
  color,
  habit,
}: modalProps) {
  const allHabits = useHabitStore((state) => state.habits);
  const habits = useMemo(() => {
    const names = allHabits.map((habit) => habit.name);
    return [...new Set(names)];
  }, [allHabits]);

  const [selectedColor, setSelectedColor] = useState(color ?? "#e5e5e5");
  const [selectedHabit, setSelectedHabit] = useState(habit ?? null);

  const handleSave = () => {
    onSave(selectedHabit, selectedColor);
    onClose();
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
          <View
            style={[styles.modalHeader, { backgroundColor: selectedColor }]}
          >
            <Text style={styles.headerStyle}>Save Journal Entry</Text>
          </View>
          <View style={styles.colorPicker}>
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>
                Related to a habit? (optional)
              </Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedHabit}
                  onValueChange={(value) => setSelectedHabit(value)}
                  placeholder="No habit"
                  style={styles.picker}
                >
                  <Picker.Item label="Not Related" value={null} />
                  {habits.map((h) => (
                    <Picker.Item key={h} label={h} value={h} />
                  ))}
                </Picker>
              </View>
            </View>
            <ColorPicker
              color={selectedColor}
              swatches={false}
              sliderHidden={true}
              onColorChange={(color: string) => setSelectedColor(color)}
            />
          </View>
          <View style={styles.buttonBlock}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  fieldBlock: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },

  picker: {
    height: 55,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.71)",
    justifyContent: "center",
  },
  modalHeader: {
    display: "flex",
    height: "12%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  headerStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    height: "60%",
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  colorPicker: {
    flex: 1,
  },
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "15%",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },

  button: {
    width: "25%",
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
