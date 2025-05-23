import CountModal from "@/components/habit/Modals/NumberModal";
import GoalModal from "@/components/habit/Modals/GoalModal";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const unitsOptions = ["Times", "Minutes", "Hours"];
const timeframeOptions = ["Day", "Week", "Month", "Year"];

interface GoalModalsProps {
  onGoalChange?: (count: number, units: string, timeframe: string) => void;
}

export default function GoalModals({ onGoalChange }: GoalModalsProps) {
  const [count, setCount] = useState(1);
  const [units, setUnits] = useState<string>("Times");
  const [timeframe, setTimeframe] = useState<string>("Day");

  // Modal states
  const [unitsModalVisible, setUnitsModalVisible] = useState(false);
  const [timeframeModalVisible, setTimeframeModalVisible] = useState(false);
  const [countModalVisible, setCountModalVisible] = useState(false);

  const incrementTimes = () => {
    const newCount = count + 1;
    setCount(newCount);
    onGoalChange?.(newCount, units, timeframe);
  };

  const decrementTimes = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onGoalChange?.(newCount, units, timeframe);
  };

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    onGoalChange?.(newCount, units, timeframe);
  };

  const handleUnitsChange = (newUnits: string) => {
    setUnits(newUnits);
    onGoalChange?.(count, newUnits, timeframe);
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    onGoalChange?.(count, units, newTimeframe);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Select the tracking criteria for your habit
      </Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.dropdown, styles.flexDropdown]}
          onPress={() => setCountModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{count}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, styles.flexDropdown]}
          onPress={() => setUnitsModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{units ?? "Time(s)"}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Per Text */}
      <Text style={styles.perText}>Per</Text>

      {/* Time frame Dropdown */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setTimeframeModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{timeframe ?? "Day"}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <GoalModal
        visible={unitsModalVisible}
        setVisible={setUnitsModalVisible}
        options={unitsOptions}
        onSelect={handleUnitsChange}
        title="Select Units"
      />

      <GoalModal
        visible={timeframeModalVisible}
        setVisible={setTimeframeModalVisible}
        options={timeframeOptions}
        onSelect={handleTimeframeChange}
        title="Select TimeFrame"
      />

      <CountModal
        visible={countModalVisible}
        setVisible={setCountModalVisible}
        title="How many Times"
        count={count}
        setCount={handleCountChange}
        incrementTimes={incrementTimes}
        decrementTimes={decrementTimes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 20,
  },
  infoText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  dropdown: {
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48,
    width: 200,
  },
  flexDropdown: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  perText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
});
