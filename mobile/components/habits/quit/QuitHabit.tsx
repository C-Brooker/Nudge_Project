import { StyleSheet, Text, View } from "react-native";
import Timebar from "./Timebar";

interface HabitDetails {
  id: number;
  name: string;
  color: string;
  goal: QuitGoal;
}

interface QuitGoal {
  type: "Quit";
  date: Date;
  milestones: boolean;
}

export default function QuitHabit(habit: HabitDetails) {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.runBtn, { backgroundColor: habit.color }]}>
            <Text style={styles.btnLabel}>{habit.name}</Text>
          </View>
        </View>

        <Timebar quitDate={habit.goal.date} color={habit.color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    margin: 6,
    elevation: 5,
  },

  container: {
    padding: 8,
  },

  top: {
    alignItems: "center",
    marginBottom: 16,
  },

  runBtn: {
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  btnLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
