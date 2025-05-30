import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationTestComponent() {
  const {
    scheduleWeeklyNotifications,
    scheduleTestNotification,
    cancelAllNotifications,
    getScheduledNotifications,
  } = useNotifications();

  const [scheduledCount, setScheduledCount] = useState<number>(0);

  const handleScheduleHabitReminder = async () => {
    try {
      const notificationIds = await scheduleWeeklyNotifications({
        id: "habit-1",
        title: "Time to Exercise! 💪",
        body: "Don't forget your daily workout routine",
        time: new Date(Date.now() + 5000), // 5 seconds from now for testing
        days: [true, true, true, true, true, false, false], // Mon-Fri
        color: "#00ff00",
        data: { habitId: 1, type: "exercise" },
      });

      console.log("Scheduled notifications:", notificationIds);
      Alert.alert(
        "Success",
        `Scheduled ${notificationIds.length} notifications!`
      );

      const scheduled = await getScheduledNotifications();
      setScheduledCount(scheduled.length);
    } catch (error) {
      console.error("Failed to schedule habit reminder:", error);
      Alert.alert("Error", "Failed to schedule notifications");
    }
  };

  const handleScheduleTestNotification = async () => {
    try {
      const notificationId = await scheduleTestNotification(
        "1",
        "2",
        new Date()
      );
      console.log("Scheduled test notification:", notificationId);
      Alert.alert(
        "Success",
        "Test notification scheduled for 2 seconds from now!"
      );

      const scheduled = await getScheduledNotifications();
      setScheduledCount(scheduled.length);
    } catch (error) {
      console.error("Failed to schedule test notification:", error);
      Alert.alert("Error", "Failed to schedule test notification");
    }
  };

  const handleViewScheduledNotifications = async () => {
    try {
      const scheduled = await getScheduledNotifications();
      console.log("All scheduled notifications:", scheduled);
      setScheduledCount(scheduled.length);

      if (scheduled.length === 0) {
        Alert.alert("No Notifications", "You have no scheduled notifications");
      } else {
        const details = scheduled
          .map(
            (notif, index) =>
              `${index + 1}. ${notif.content.title} - ${notif.trigger}`
          )
          .join("\n");

        Alert.alert(
          "Scheduled Notifications",
          `You have ${
            scheduled.length
          } scheduled notifications:\n\n${details.slice(0, 200)}${
            details.length > 200 ? "..." : ""
          }`
        );
      }
    } catch (error) {
      console.error("Failed to get scheduled notifications:", error);
      Alert.alert("Error", "Failed to get scheduled notifications");
    }
  };

  const handleCancelAllNotifications = async () => {
    try {
      await cancelAllNotifications();
      setScheduledCount(0);
      Alert.alert("Success", "All notifications cancelled!");
    } catch (error) {
      console.error("Failed to cancel notifications:", error);
      Alert.alert("Error", "Failed to cancel notifications");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Notification Manager</Text>

      <View style={styles.infoSection}>
        <View style={styles.countInfo}>
          <Text style={styles.label}>Scheduled Notifications:</Text>
          <Text style={styles.countValue}>{scheduledCount}</Text>
        </View>
        <Text style={styles.infoText}>
          Test notifications will appear in 2 seconds. Habit reminders are
          scheduled for the next 5 weekdays.
        </Text>
      </View>

      <View style={styles.buttonSection}>
        <Button
          title="Schedule Test Notification (2s)"
          onPress={handleScheduleTestNotification}
        />

        <View style={styles.buttonSpacing} />

        <Button
          title="Schedule Habit Reminder (Mon-Fri)"
          onPress={handleScheduleHabitReminder}
        />

        <View style={styles.buttonSpacing} />

        <Button
          title="View Scheduled Notifications"
          onPress={handleViewScheduledNotifications}
        />

        <View style={styles.buttonSpacing} />

        <Button
          title="Cancel All Notifications"
          onPress={handleCancelAllNotifications}
          color="#ff6b6b"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoSection: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  countInfo: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    minWidth: 200,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  countValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  buttonSection: {
    width: "100%",
  },
  buttonSpacing: {
    height: 15,
  },
});
