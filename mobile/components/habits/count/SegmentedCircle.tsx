import { StyleSheet, View } from "react-native";

export default function SegmentedCircle({
  totalSegments,
  completedSegments,
  color,
  size = 50,
}: {
  totalSegments: number;
  completedSegments: number;
  color: string;
  size?: number;
}) {
  const segments = [];

  for (let i = 0; i < totalSegments; i++) {
    const isCompleted = i < completedSegments;
    const rotation = (360 / totalSegments) * i;

    segments.push(
      <View
        key={i}
        style={[
          styles.segment,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: isCompleted ? 3 : 1,
            borderColor: isCompleted ? color : "#E0E0E0",
            transform: [{ rotate: `${rotation}deg` }],
          },
        ]}
      />
    );
  }

  return (
    <View style={[styles.segmentContainer, { width: size, height: size }]}>
      {segments}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  segment: {
    position: "absolute",
    borderStyle: "dashed",
    opacity: 0.8,
  },
});
