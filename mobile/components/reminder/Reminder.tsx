import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReminderInfo from "./ReminderInfo";
import Grid from "./Grid";

type ViewType = 0 | 1 | 2;
type Props = { id: string; viewType: ViewType };

const Reminder = memo<Props>(function Reminder({ viewType }) {
  return (
    <View style={styles.card}>
      <ReminderInfo />

      <Text style={styles.subtitle}>Today, 0 / 30 min</Text>

      <Grid viewType={viewType} onCellPress={() => {}} />
    </View>
  );
});

export default Reminder;

/* ------------------------- styles ------------------------- */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    margin: 6,
    elevation: 5,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    borderBottomWidth: 0.5,
    borderColor: "grey",
    paddingBottom: 4,
  },
  gridbox: {
    height: 80,
    width: "100%",
    paddingTop: 8,
    paddingBottom: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  // Optimized year view styles
  yearGridOptimized: {
    position: "relative",
  },
  yearCell: {
    position: "absolute",
    backgroundColor: "#EEE",
    borderWidth: 0.5,
    borderColor: "#DDD",
  },
  yearGridBatched: {
    flex: 1,
  },
});
