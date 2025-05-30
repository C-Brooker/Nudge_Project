import { useHabitStore } from "@/stores/useHabitStore";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ProgressButton from "./ProgressButton";
import { useCompletionRewards } from "@/hooks/useCompletionRewards";

interface HabitDetails {
  id: number;
  name: string;
  color: string;
  goal: CountGoal;
}

interface CountGoal {
  type: "Count";
  count: number;
  units: string;
  timeframe: string;
}

export default function HabitInfo({ id, name, color, goal }: HabitDetails) {
  const streak = useHabitStore((h) => h.calculateStreak(id));
  const isCompletedToday = useHabitStore((h) => h.isHabitCompletedToday(id));
  const { completeHabit } = useCompletionRewards();

  const [todayCount, setTodayCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  if (todayCount >= goal.count && !isCompletedToday) {
    setTodayCount(0);
  }

  if (todayCount < goal.count && isCompletedToday) {
    setTodayCount(goal.count);
  }

  const handleProgress = async () => {
    if (isCompleting) return;

    const newCount = todayCount + 1;
    setTodayCount(newCount);

    if (newCount >= goal.count) {
      setIsCompleting(true);
      try {
        const result = await completeHabit(id);
      } catch (error) {
        console.error("Error completing habit:", error);
        setTodayCount(newCount - 1);
      } finally {
        setIsCompleting(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={[styles.runBtn, { backgroundColor: color }]}>
          <Text style={styles.btnLabel}>{name}</Text>
        </View>

        <View style={styles.streak}>
          <MaterialIcons
            size={20}
            name="local-fire-department"
            color="orange"
          />
          <Text style={styles.streakText}>{streak}</Text>
        </View>

        <View style={{ flex: 1 }} />

        <ProgressButton
          goalCount={goal.count}
          currentCount={todayCount}
          color={color}
          onPress={handleProgress}
        />
      </View>

      <Text style={styles.goalText}>
        Today: {todayCount} / {goal.count} {goal.units}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  runBtn: {
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginEnd: 2,
  },

  btnLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },

  streak: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    padding: 10,
    borderRadius: 8,

    alignItems: "center",
  },

  streakText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  goalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
});
