import { useCallback, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

interface NotificationSettings {
  id: string;
  title: string;
  body: string;
  time: Date;
  days?: boolean[];
  color?: string;
  data?: any;
}

// Set up notification handler globally
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  const responseListener = useRef<Notifications.EventSubscription>(null);

  // Set up notification response listener for when user taps notifications
  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
        useRouter().navigate("/(app)/(tabs)/habit/color");
      });

    return () => {
      responseListener.current && responseListener.current.remove();
    };
  }, []);

  // Request permissions
  const requestPermissions = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to receive notifications was denied!");
    }
    return status === "granted";
  }, []);

  // Schedule notifications for specific days of the week
  const scheduleWeeklyNotifications = useCallback(
    async (settings: NotificationSettings) => {
      try {
        await requestPermissions();

        const notificationIds: string[] = [];

        const daysToSchedule = settings.days || [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ];

        for (let dayIndex = 0; dayIndex < daysToSchedule.length; dayIndex++) {
          if (daysToSchedule[dayIndex]) {
            const notificationId =
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: settings.title,
                  body: settings.body,
                  data: { ...settings.data, dayIndex, habitId: settings.id },
                },
                trigger: {
                  type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                  weekday: dayIndex + 1, // 1 = Sunday, 2 = Monday, etc.
                  hour: settings.time.getHours(),
                  minute: settings.time.getMinutes(),
                  repeats: true,
                },
              });
            notificationIds.push(notificationId);
          }
        }

        return notificationIds;
      } catch (error) {
        console.error("Failed to schedule weekly notifications:", error);
        throw error;
      }
    },
    [requestPermissions]
  );

  // Cancel specific notification(s)
  const cancelNotification = useCallback(
    async (notificationId: string | string[]) => {
      try {
        if (Array.isArray(notificationId)) {
          await Promise.all(
            notificationId.map((id) =>
              Notifications.cancelScheduledNotificationAsync(id)
            )
          );
        } else {
          await Notifications.cancelScheduledNotificationAsync(notificationId);
        }
      } catch (error) {
        console.error("Failed to cancel notification:", error);
        throw error;
      }
    },
    []
  );

  // Cancel all notifications
  const cancelAllNotifications = useCallback(async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Failed to cancel all notifications:", error);
      throw error;
    }
  }, []);

  // Schedule a single test notification (for testing)
  const scheduleTestNotification = useCallback(
    async (title: string, body: string, time: Date) => {
      try {
        await requestPermissions();

        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: { test: true, timestamp: new Date().toISOString() },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: time.getHours(),
            minute: time.getMinutes(),
          },
        });

        return notificationId;
      } catch (error) {
        console.error("Failed to schedule test notification:", error);
        throw error;
      }
    },
    [requestPermissions]
  );

  // Get all scheduled notifications (useful for debugging)
  const getScheduledNotifications = useCallback(async () => {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Failed to get scheduled notifications:", error);
      throw error;
    }
  }, []);

  return {
    scheduleWeeklyNotifications,
    cancelNotification,
    cancelAllNotifications,

    scheduleTestNotification,

    getScheduledNotifications,
    requestPermissions,
  };
};
