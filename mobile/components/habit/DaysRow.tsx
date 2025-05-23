import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

interface daysProps {
  onDaysChange: (days: boolean[]) => void;
}

export default function DaysRow({ onDaysChange }: daysProps) {
  const days = ["Su", "M", "T", "W", "Th", "F", "S"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    new Array(7).fill(true)
  );

  const toggleDay = (index: number) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
    onDaysChange(newSelectedDays);
  };

  const getDisplayText = () => {
    const allSelected = selectedDays.every((day) => day);

    if (allSelected) {
      return "Every Day";
    }

    const selectedDayNames = selectedDays
      .map((selected, index) => (selected ? dayNames[index] : null))
      .filter((day) => day !== null);

    if (selectedDayNames.length === 0) {
      return "No Days";
    }

    return selectedDayNames.join(", ");
  };

  return (
    <View style={styles.daysContainer}>
      <View style={styles.rowContainer}>
        {days.map((day, index) => (
          <Pressable
            style={[
              styles.toggleButton,
              { backgroundColor: selectedDays[index] ? "black" : "grey" },
            ]}
            key={index}
            onPress={() => toggleDay(index)}
          >
            <Text style={styles.buttonText}>{day}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.infoText}>{getDisplayText()}</Text>
      <Text style={styles.infoText}>At</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  daysContainer: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  toggleButton: {
    width: 35,
    height: 35,
    borderRadius: 999,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  infoText: {
    color: "black",
    fontSize: 15,
    padding: 8,
    fontWeight: "600",
    textAlign: "center",
  },
});
