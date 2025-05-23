import BackNextButtons from "@/components/habit/BackNextButton";
import GoalModal from "@/components/habit/Modals/GoalModal";
import CountModals from "@/components/habit/Modals/CountModals";
import Layout from "@/components/Layout";
import { useCreatorStore } from "@/stores/useCreatorStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import QuitModal from "@/components/habit/Modals/QuitModal";
import SaveModal from "@/components/habit/Modals/SaveModel";

const typeOptions = ["Count", "Quit"];

export default function Goal() {
  const name = useCreatorStore((state) => state.name);
  const color = useCreatorStore((state) => state.color);
  const creator = useCreatorStore((state) => state.getHabitDetails);
  const setGoal = useCreatorStore((state) => state.setGoal);
  const clearGoalAndReminder = useCreatorStore(
    (state) => state.clearGoalAndReminder
  );

  const [type, setType] = useState("Count");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [saveModalVisible, setSaveModelVisible] = useState(false);

  const [count, setCount] = useState(1);
  const [units, setUnits] = useState("Times");
  const [timeframe, setTimeframe] = useState("Day");

  const [isEnabled, setIsEnabled] = useState(true);

  const back = () => {
    router.navigate("/(app)/(tabs)/habit/color");
    clearGoalAndReminder();
  };

  const next = () => {
    if (type == "Quit") {
      handleQuitGoal();
    }
    if (type == "Count") {
      handleCountGoal();
    }
    setSaveModelVisible(true);
    console.log(creator());
  };

  const handleGoalChange = (
    count: number,
    units: string,
    timeframe: string
  ) => {
    setCount(count);
    setUnits(units);
    setTimeframe(timeframe);
  };
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleCountGoal = () => {
    setGoal({
      type: "Count",
      count: count,
      units: units,
      timeframe: timeframe,
    });
  };
  const handleQuitGoal = () => {
    setGoal({ type: "Quit", date: selectedDate, milestones: isEnabled });
  };

  return (
    <Layout style={[{ backgroundColor: color }]} name={name ?? "Habit"}>
      <Text style={styles.textStyle}>Select a Goal for your habit</Text>
      <View style={styles.mainContent}>
        <View style={[styles.inputContainer, { borderBottomWidth: 0.3 }]}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setTypeModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{type}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>Tracking Type</Text>
          <Text style={styles.infoText}>
            Track how long it has been since stopping a bad habit
          </Text>
          <Text style={styles.infoText}>
            Track how often you complete a habit
          </Text>
        </View>

        <View style={styles.subContent}>
          {type === "Quit" ? (
            <View style={styles.quitSection}>
              <Text style={styles.quitLabel}>Starting Date</Text>
              <View style={[styles.inputContainer]}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setDatePickerVisible(true)}
                >
                  <Text style={styles.dropdownText}>
                    {formatDate(selectedDate)}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
                <Text style={styles.infoText}>
                  When did you quit the bad habit?
                </Text>
              </View>
              <View style={styles.milestones}>
                <View style={styles.rowContainer}>
                  <Text style={styles.milestoneLabel}>
                    Milestone Notifications
                  </Text>
                  <Switch
                    style={styles.switch}
                    trackColor={{ false: "#767577", true: "blue" }}
                    thumbColor={isEnabled ? "white" : "black"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <Text style={styles.infoText}>
                  Get notified when you hit certain milestones
                </Text>
              </View>
            </View>
          ) : (
            <CountModals onGoalChange={handleGoalChange} />
          )}
        </View>

        <GoalModal
          visible={typeModalVisible}
          setVisible={setTypeModalVisible}
          options={typeOptions}
          onSelect={setType}
          title="Select Tracking Type"
        />

        <QuitModal
          visible={datePickerVisible}
          setVisible={setDatePickerVisible}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <SaveModal
          visible={saveModalVisible}
          name={name}
          color={color}
          onClose={() => setSaveModelVisible(false)}
        />
      </View>

      <BackNextButtons onBack={back} onNext={next} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: 30,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 40,
  },
  inputContainer: {
    marginVertical: 20,
    paddingBottom: 20,
    alignSelf: "center",
  },
  infoText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  subContent: {
    marginTop: 20,
    borderBottomWidth: 0.4,
  },
  quitSection: {
    alignItems: "center",
  },
  milestones: {
    padding: 20,
    marginBottom: 20,
    borderTopWidth: 0.4,
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
  quitLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    fontWeight: "500",
    fontStyle: "italic",
    borderBottomWidth: 0.3,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
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
    alignSelf: "center",
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
});
