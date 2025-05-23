import { memo } from "react";
import { View } from "react-native";

export const MonthGrid = memo<{
  days: { id: number; offset: number }[];
  onCellPress: (dayId: number) => void;
}>(({ days, onCellPress }) => (
  <View style={ROW_STYLES[1]}>
    {days.map((d) => (
      <OptimizedCell
        key={d.id}
        viewType="month"
        onPress={() => onCellPress(d.id)}
      />
    ))}
  </View>
));
