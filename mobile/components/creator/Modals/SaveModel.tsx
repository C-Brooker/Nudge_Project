import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import DaysRow from "../DaysRow";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useCreatorStore } from "@/stores/useCreatorStore";
import { createHabitFromCreator, useHabitStore } from "@/stores/useHabitStore";
import { useNotifications } from "@/hooks/useNotifications";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  color: string;
  name: string;
}

export default function SaveModal({
  visible,
  onClose,
  color,
  name,
}: ModalProps) {
  const { scheduleWeeklyNotifications } = useNotifications();
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeVisible, setTimeVisible] = useState(false);
  const validHabit = useCreatorStore((state) => state.validHabit);
  const creator = useCreatorStore((state) => state.getHabitDetails);
  const addHabit = useHabitStore((state) => state.addHabit);
  const habits = useHabitStore((state) => state.getAllHabits);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const onTimeChange = (event: any, time?: Date) => {
    if (time) {
      setSelectedTime(time);
    }
    setTimeVisible(false);
  };

  const handleDaysChange = (days: boolean[]) => {
    setSelectedDays(days);
  };

  const save = () => {
    if (validHabit()) {
      const habit = createHabitFromCreator(creator());
      const id = addHabit(habit);
      if (isEnabled && selectedDays && selectedTime) {
        scheduleWeeklyNotifications({
          id: String(id),
          title: name,
          body: "The ultimate test",
          days: selectedDays,
          time: selectedTime,
        });
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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
          <View style={[styles.modalHeader, { backgroundColor: color }]}>
            <Text style={styles.headerStyle}>{name}</Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.fieldBlock}>
              <DaysRow
                onDaysChange={(days) => {
                  handleDaysChange(days);
                }}
              />
            </View>

            <View style={styles.timePickerSection}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setTimeVisible(true)}
              >
                <Text style={styles.selectedTimeText}>
                  {formatTime(selectedTime)}
                </Text>
              </TouchableOpacity>
              {timeVisible && (
                <RNDateTimePicker
                  mode="time"
                  value={selectedTime}
                  onChange={onTimeChange}
                />
              )}
            </View>

            <View style={styles.reminders}>
              <View style={styles.rowContainer}>
                <Text style={styles.milestoneLabel}>Enable Reminders</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "#767577", true: "blue" }}
                  thumbColor={isEnabled ? "white" : "black"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <Text style={styles.infoText}>
                Receive a notification to remind you of this habit
              </Text>
            </View>
          </View>

          <View style={styles.buttonBlock}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={save}>
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
  timePickerSection: {
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 0.4,
    borderTopColor: "#E5E5E5",
  },
  timeButton: {
    padding: 10,
    backgroundColor: "#E6E6E6",
    elevation: 5,
    borderRadius: 5,
  },
  selectedTimeText: {
    fontSize: 26,
    color: "black",
    marginTop: 8,
    fontWeight: "700",
    padding: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.71)",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  mainContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 4,
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
  reminders: {
    flex: 1,
    padding: 10,
    borderTopWidth: 0.4,
    borderTopColor: "#E5E5E5",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  milestoneLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
