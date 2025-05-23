import React, { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

// Pre-computed styles for all three view types
const PRESET_STYLES = {
  week: StyleSheet.create({
    cell: {
      backgroundColor: "#EEE",
      borderWidth: 0.5,
      borderColor: "#DDD",
      width: 50,
      height: 50,
      margin: 1.5,
      overflow: "hidden",
      elevation: 0,
    },
  }),
  month: StyleSheet.create({
    cell: {
      backgroundColor: "#EEE",
      borderWidth: 0.5,
      borderColor: "#DDD",
      width: 50,
      height: 10,
      margin: 2,
      overflow: "hidden",
      elevation: 0,
    },
  }),
  year: StyleSheet.create({
    cell: {
      backgroundColor: "#EEE",
      borderWidth: 0.5,
      borderColor: "#DDD",
      width: 6,
      height: 7,
      margin: 1,
      overflow: "hidden",
      elevation: 0,
    },
  }),
};

// Pre-computed ripple configs
const PRESET_RIPPLES = {
  week: { color: "#999", radius: 25 },
  month: { color: "#999", radius: 25 },
  year: { color: "#999", radius: 4 },
};

type ViewType = "week" | "month" | "year";

export const Cell = memo<{
  viewType: ViewType;
  onPress: () => void;
}>(
  ({ viewType, onPress }) => (
    <Pressable
      onPress={onPress}
      style={PRESET_STYLES[viewType].cell}
      android_ripple={PRESET_RIPPLES[viewType]}
      unstable_pressDelay={0}
      hitSlop={viewType === "year" ? 2 : 1}
    />
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.viewType === nextProps.viewType &&
      prevProps.onPress === nextProps.onPress
    );
  }
);
