import { StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { IconButton, Button } from "react-native-paper";
import { IconSymbol } from "./ui/IconSymbol";

export default function Reminder() {
  return (
    <ThemedView style={styles.reminderCard}>
      {/* Top Section: Button & Stats */}
      <View style={styles.topSection}>
        <Button
          mode="contained"
          style={styles.reminderButton}
          labelStyle={styles.buttonLabel}
        >
          Run
        </Button>
        <View style={styles.streakbox}>
          <ThemedText style={styles.statText}>0</ThemedText>
          <IconSymbol size={20} name="flame" color={"grey"} />
        </View>
        <View style={styles.flexSpacer} />
        <IconButton
          icon="plus"
          containerColor="white"
          size={30}
          style={styles.squareButton}
        />
      </View>

      {/* Task Description */}
      <ThemedText style={styles.reminderText}>Today, 0 / 30 min</ThemedText>

      {/* Fill in with the date stuff */}
      <View style={styles.trackbox} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  reminderCard: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    margin: 12,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  reminderButton: {
    backgroundColor: "#8B42C9", // Purple color
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  buttonLabel: {
    color: "white",
    fontSize: 14,
  },

  streakbox: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 2,
  },

  statText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 600,
    color: "#333",
  },

  flexSpacer: {
    flex: 1, // Pushes the + button to the right
  },

  squareButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
  },

  reminderText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 600,
    color: "#555",
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },

  trackbox: {
    marginTop: 8,
    height: 10, // Placeholder for progress bar
    backgroundColor: "#D8BFD8", // Light purple to match the style
    borderRadius: 5,
  },
});
