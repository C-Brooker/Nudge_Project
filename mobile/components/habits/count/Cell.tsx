import { useHabitStore } from "@/stores/useHabitStore";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";

interface CellProps {
  date: string;
  habitId: number;
  habitColor: string;
  viewType: ViewType;
}

type ViewType = 0 | 1 | 2;

export default memo<CellProps>(function Cell({
  date,
  habitId,
  habitColor,
  viewType,
}) {
  const isCompleted = useHabitStore((state) =>
    state.isHabitCompletedOnDate(habitId, date)
  );
  const markComplete = useHabitStore((state) => state.markHabitComplete);
  const markIncomplete = useHabitStore((state) => state.markHabitIncomplete);

  const handlePress = () => {
    if (isCompleted) {
      markIncomplete(habitId, date);
    } else {
      markComplete(habitId, date);
    }
  };

  const cellStyle = styles[viewType];
  const backgroundColor = isCompleted ? habitColor : "#EEE";

  return (
    <Pressable
      onPress={handlePress}
      style={[cellStyle, { backgroundColor }]}
      android_ripple={{ color: "#999", radius: viewType === 2 ? 4 : 25 }}
    />
  );
});

const styles = StyleSheet.create({
  0: {
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
  1: {
    width: 52,
    height: 11,
    margin: 1,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
  2: {
    width: 6.4,
    height: 6.4,
    margin: 0.5,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
});
