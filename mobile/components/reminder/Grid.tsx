/* Grid.tsx - Maximum Performance with Optimized Cell for All Views */
import React, { memo, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Cell } from "./Cell";

type ViewType = 0 | 1 | 2;
type GridProps = {
  viewType: ViewType;
  onCellPress: (dayId: number) => void;
};

/* ---------------  STATIC CACHES --------------- */
const DAY_MS = 86_400_000;
const COUNTS = [7, 35, 364] as const;

// Pre-calculate all grids at module load time with more efficient structure
const gridCache: Record<number, { id: number; offset: number }[]> = {};
const today = Date.now();

// Pre-populate all caches
COUNTS.forEach((count) => {
  gridCache[count] = Array.from({ length: count }, (_, i) => ({
    id: today - i * DAY_MS,
    offset: i,
  }));
});

const monthBatchCache: { id: number; offset: number }[][] = [];
const monthDays = gridCache[35];
for (let i = 0; i < monthDays.length; i += 7) {
  monthBatchCache.push(monthDays.slice(i, i + 7));
}

const yearBatchCache: { id: number; offset: number }[][] = [];
const yearDays = gridCache[364];
for (let i = 0; i < yearDays.length; i += 60) {
  yearBatchCache.push(yearDays.slice(i, i + 60));
}

// Memoized styles to prevent recreation
const ROW_STYLES = StyleSheet.create({
  week: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  month: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  year: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

// Ultra-optimized cell that never re-renders unless props actually change
const OptimizedCell = memo<{
  dayId: number;
  viewType: "week" | "month" | "year";
  onPress: (dayId: number) => void;
}>(
  ({ dayId, viewType, onPress }) => {
    const handlePress = useCallback(() => onPress(dayId), [dayId, onPress]);
    return <Cell viewType={viewType} onPress={handlePress} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.dayId === nextProps.dayId &&
      prevProps.viewType === nextProps.viewType &&
      prevProps.onPress === nextProps.onPress
    );
  }
);

// Week view - simple row layout with optimized cells
const WeekGrid = memo<{
  onCellPress: (dayId: number) => void;
}>(({ onCellPress }) => {
  const weekDays = gridCache[7]; // Direct reference to cached data

  return (
    <View style={ROW_STYLES.week}>
      {weekDays.map((d) => (
        <OptimizedCell
          key={d.id}
          dayId={d.id}
          viewType="week"
          onPress={onCellPress}
        />
      ))}
    </View>
  );
});

// Month view - optimized with pre-calculated batching
const MonthGrid = memo<{
  onCellPress: (dayId: number) => void;
}>(({ onCellPress }) => {
  return (
    <View style={styles.monthGrid}>
      {monthBatchCache.map((week, weekIndex) => (
        <View key={weekIndex} style={ROW_STYLES.month}>
          {week.map((d) => (
            <OptimizedCell
              key={d.id}
              dayId={d.id}
              viewType="month"
              onPress={onCellPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
});

const YearGrid = memo<{
  onCellPress: (dayId: number) => void;
}>(({ onCellPress }) => {
  return (
    <View style={styles.yearGrid}>
      {yearBatchCache.map((week, weekIndex) => (
        <View key={weekIndex} style={ROW_STYLES.year}>
          {week.map((day) => (
            <OptimizedCell
              key={day.id}
              dayId={day.id}
              viewType="year"
              onPress={onCellPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
});

const Grid = memo<GridProps>(({ viewType, onCellPress }) => {
  const memoizedOnCellPress = useCallback(onCellPress, [onCellPress]);

  switch (viewType) {
    case 0: // Week view
      return <WeekGrid onCellPress={memoizedOnCellPress} />;

    case 1: // Month view
      return <MonthGrid onCellPress={memoizedOnCellPress} />;

    case 2: // Year view
      return <YearGrid onCellPress={memoizedOnCellPress} />;

    default:
      return null;
  }
});

export default Grid;

/* ------------------------- styles ------------------------- */
const styles = StyleSheet.create({
  yearGrid: {
    flex: 1,
  },
  monthGrid: {
    flex: 1,
  },
});
