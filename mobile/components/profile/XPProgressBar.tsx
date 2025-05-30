import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useProfileStore } from "@/stores/useProfileStore";
import { xpForLevel } from "@/constants";

export default function XPProgressBar() {
  const { experience, level } = useProfileStore();

  const currentXP = experience ?? 0;
  const currentLevel = level ?? 1;

  const xpForCurrentLevel = currentLevel > 1 ? xpForLevel(currentLevel) : 0;
  const xpForNextLevel = xpForLevel(currentLevel + 1);

  const xpInCurrentLevel = currentXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;

  const progressPercentage = Math.min(
    (xpInCurrentLevel / xpNeededForNextLevel) * 100,
    100
  );

  return (
    <View style={styles.container}>
      <Text style={styles.xpText}>
        {xpInCurrentLevel} / {xpNeededForNextLevel} XP
      </Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginVertical: 4,
    marginBottom: 20,
  },

  xpText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 6,
  },

  progressBarContainer: {
    width: "100%",
    paddingHorizontal: 4,
  },

  progressBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
    minWidth: 2,
  },
});
