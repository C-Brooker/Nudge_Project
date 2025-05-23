import { MaterialIcons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReminderInfo() {
  return (
    <View style={styles.top}>
      <TouchableOpacity style={styles.runBtn}>
        <Text>Run</Text>
      </TouchableOpacity>

      <View style={styles.streak}>
        <Text style={styles.streakText}>0</Text>
        <MaterialIcons size={20} name="local-fire-department" color="grey" />
      </View>

      <View style={{ flex: 1 }} />
      <MaterialIcons name="add" size={30} style={styles.plus} />
    </View>
  );
}
const styles = StyleSheet.create({
  top: { flexDirection: "row", alignItems: "center" },

  runBtn: {
    backgroundColor: "#8B42C9",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  btnLabel: { color: "white", fontSize: 14 },

  streak: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    padding: 8,
    borderRadius: 8,
    marginLeft: 2,
  },
  streakText: { marginLeft: 8, fontSize: 16, fontWeight: "600", color: "#333" },
  plus: { borderRadius: 8, borderWidth: 1, borderColor: "#CCC" },
});
