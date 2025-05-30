import { StyleSheet, TouchableOpacity, View } from "react-native";
import SegmentedCircle from "./SegmentedCircle";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProgressButton({
  goalCount,
  currentCount,
  color,
  onPress,
  disabled = false,
}: {
  goalCount: number;
  currentCount: number;
  color: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const isComplete = currentCount >= goalCount;

  return (
    <View style={styles.progressButtonContainer}>
      <SegmentedCircle
        totalSegments={Math.min(goalCount, 20)}
        completedSegments={Math.min(currentCount, goalCount)}
        color={color}
        size={54}
      />

      <TouchableOpacity
        style={[
          styles.centerButton,
          { backgroundColor: isComplete ? color : "#F7F7F7" },
        ]}
        onPress={onPress}
      >
        {isComplete ? (
          <MaterialIcons name="check" size={24} color="white" />
        ) : (
          <MaterialIcons name="add" size={24} color="#333" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  progressButtonContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    width: 42,
    height: 42,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    zIndex: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
