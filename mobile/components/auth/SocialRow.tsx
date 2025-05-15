import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SocialRow() {
  return (
    <View style={styles.row}>
      {["apple", "google", "facebook"].map((name) => (
        <TouchableOpacity key={name} style={styles.iconButton}>
          <MaterialCommunityIcons name={name} size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  iconButton: {
    backgroundColor: "#E5E5E5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
});
