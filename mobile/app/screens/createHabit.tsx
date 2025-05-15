import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Form from "@/components/auth/Form";
import {
  ReminderFields,
  ReminderSchema,
} from "@/components/auth/ReminderFormConfig";
import * as Notifications from "expo-notifications";
import { useReminderStore } from "@/store/useReminderStore";

const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to receive notifications was denied!");
  }
};
const scheduleNotification = async (reminderSettings) => {
  await requestPermissions();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: reminderSettings.name,
      color: "#c90076",
      vibrate: [250, 0, 250, 50, 500, 500, 50, 100],
      body: reminderSettings.description,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: reminderSettings.time.getHours(),
      minute: reminderSettings.time.getMinutes(),
      //repeats: true, #
    },
  });
};

const handleSubmit = (data: FormData) => {
  const addReminder = useReminderStore.getState().addReminder;
  addReminder(data);
  scheduleNotification(data);
};

export default function HabitScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Form
        schema={ReminderSchema}
        fields={ReminderFields}
        onSubmit={handleSubmit}
      />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignContent: "center",
    height: 200,
    marginTop: 100,
  },
});
