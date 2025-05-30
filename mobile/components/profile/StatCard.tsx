import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface StatProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value: number;
}

export default function StatCard({ name, icon, value }: StatProps) {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={24} color="white" />
      <View style={styles.cardStats}>
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={styles.valueStyle}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    paddingVertical: 15,
    backgroundColor: "black",
    borderRadius: 10,
    width: 180,
    alignItems: "center",
  },
  cardStats: {
    width: 130,
    marginStart: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    fontWeight: "500",
    color: "white",
  },
  valueStyle: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
});
