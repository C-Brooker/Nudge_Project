import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/stores/useAuthStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const isLoggedIn = useAuthStore((s) => s.accessToken);
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
    if (hydrated) SplashScreen.hideAsync();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, hydrated]);

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView>
        {isLoggedIn ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)/(tabs)" />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(guest)/(tabs)" />
          </Stack>
        )}

        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
