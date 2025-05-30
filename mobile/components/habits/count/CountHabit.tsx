import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountInfo from "./CountInfo";
import Grid from "./Grid";

type ViewType = 0 | 1 | 2;

interface HabitDetails {
  id: number;
  name: string;
  color: string;
  streak: number;
  goal: CountGoal;
}

interface CountGoal {
  type: "Count";
  count: number;
  units: string;
  timeframe: string;
}

export default function CountHabit(viewType: ViewType, habit: HabitDetails) {
  return (
    <View style={styles.card}>
      <CountInfo
        id={habit.id}
        name={habit.name}
        color={habit.color}
        goal={habit.goal}
      />

      <View style={styles.gridbox}>
        <Grid viewType={viewType} habitId={habit.id} />
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

  gridbox: {
    minHeight: 72,
    paddingTop: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});
