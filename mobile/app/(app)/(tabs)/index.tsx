import React, { useEffect } from "react";
import Reminder from "@/components/Reminder";
import { useReminderStore } from "@/stores/useReminderStore";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedView>
        <Reminder />
      </ThemedView>
    </ThemedView>
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
