import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HTMLView from "react-native-htmlview";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface EntryBubble {
  createdAt: string;
  content: string;
  habit: string | null;
  color: string;
}
export default React.memo(function EntryBubble({
  createdAt,
  content,
  habit,
  color,
}: EntryBubble) {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${day} ${time}`;
  }
  return (
    <TouchableOpacity onLongPress={() => console.log("cat")}>
      <View style={styles.row}>
        <View style={styles.editRow}>
          <Text style={styles.entryDate}>{formatDate(createdAt)}</Text>
          <MaterialIcons
            name="edit"
            size={20}
            color={"white"}
            style={[styles.icons, { backgroundColor: "black" }]}
          />
        </View>

        <MaterialIcons
          name="delete"
          size={20}
          color={"white"}
          style={[styles.icons, { backgroundColor: "red" }]}
        />
      </View>
      <View style={styles.entryWrapper}>
        <View style={[styles.bubble, { backgroundColor: color ?? "#E5E5E5" }]}>
          {habit ? (
            <View style={styles.habitPill}>
              <Text style={styles.habitText}>{habit}</Text>
            </View>
          ) : null}

          <HTMLView value={content} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  entryWrapper: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  entryDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  icons: {
    borderRadius: 100,
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 4,
    gap: 10,
  },

  bubble: {
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 12,
    elevation: 5,
  },
  habitPill: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  habitText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
  },
});
