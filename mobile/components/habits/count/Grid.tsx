import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useHabitStore } from "@/stores/useHabitStore";
import Cell from "./Cell";

type ViewType = 0 | 1 | 2;

interface HabitGridProps {
  habitId: number;
  viewType: ViewType;
}

const HabitGrid = memo<HabitGridProps>(({ habitId, viewType }) => {
  const habit = useHabitStore((state) => state.getHabitById(habitId));

  const dates = useMemo(() => {
    const today = new Date();
    const dayCount = viewType == 0 ? 7 : viewType == 1 ? 28 : 364;
    const dateArray: string[] = [];

    for (let i = dayCount - 1; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      dateArray.push(date.toISOString().split("T")[0]);
    }

    return dateArray;
  }, [viewType]);

  if (!habit) return null;

  const getGridConfig = () => {
    switch (viewType) {
      case 0:
        return { columns: 7, containerStyle: styles.weekContainer };
      case 1:
        return { columns: 7, containerStyle: styles.monthContainer };
      case 2:
        return { columns: 52, containerStyle: styles.yearContainer };
    }
  };

  const { columns, containerStyle } = getGridConfig();

  const rows = [];
  for (let i = 0; i < dates.length; i += columns) {
    const rowDates = dates.slice(i, i + columns);
    rows.push(
      <View key={i} style={styles.row}>
        {rowDates.map((date) => (
          <Cell
            key={date}
            date={date}
            habitId={habitId}
            habitColor={habit.color}
            viewType={viewType}
          />
        ))}
      </View>
    );
  }

  return <View style={containerStyle}>{rows}</View>;
});

export default HabitGrid;

const styles = StyleSheet.create({
  weekContainer: {
    alignItems: "center",
    padding: 6,
  },
  monthContainer: {
    alignItems: "center",
    padding: 6,
  },
  yearContainer: {
    padding: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
