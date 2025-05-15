import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import * as Notifications from "expo-notifications";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/useAuthStore";
import AppInit from "@/services/authService";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === "light"
      ? {
          ...MD3DarkTheme,
          colors: { ...MD3DarkTheme.colors, background: "black" },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: "white" },
        };
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (!loaded) {
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <AppInit>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(app)/(tabs)" />
          <Stack.Screen name="(guest)/(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </AppInit>
  );
}
