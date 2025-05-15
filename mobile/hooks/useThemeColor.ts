/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "react-native-paper";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ReactNativePaper.Theme["colors"]
) {
  const theme: any = useTheme();
  const colorScheme = useColorScheme() as "light" | "dark";

  return (props[colorScheme] as string) ?? theme.colors[colorName];
}
