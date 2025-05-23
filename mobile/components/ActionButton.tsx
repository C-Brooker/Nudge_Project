import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";

import type { ComponentProps } from "react";
type ActionButtonProps = {
  style?: StyleProp<ViewStyle>;
  name: ComponentProps<typeof MaterialIcons>["name"];
  onPress?: () => void;
};

export default function ActionButton({
  style,
  name,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.fab, style]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <MaterialIcons name={name} size={24} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#111827",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
