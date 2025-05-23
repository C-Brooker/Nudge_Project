import React, { useEffect } from "react";
import Reminder from "@/components/reminder/Reminder";
import { useReminderStore } from "@/stores/useHabitStore";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: 300,
    width: 250,
  },
});
