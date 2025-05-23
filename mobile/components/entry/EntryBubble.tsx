import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HTMLView from "react-native-htmlview";
import React, { useEffect, useRef } from "react";

interface EntryBubble {
  id: number;
  createdAt: string;
  content: string;
  habit: string | null;
  color: string;
  onLongPress: (id: number) => void;
  onShortPress: () => void;
}
export default React.memo(function EntryBubble({
  id,
  createdAt,
  content,
  habit,
  color,
  onShortPress,
  onLongPress,
  selected = false,
}: EntryBubble & { selected?: boolean }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.98,
            duration: 25,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 25,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [selected, scaleAnim]);

  const handleLongPress = () => {
    onLongPress(id);
  };

  const handleShortPress = () => {
    onShortPress();
  };

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
    <Pressable onPress={handleShortPress}>
      <View style={styles.row}>
        <View style={styles.editRow}>
          <Text style={styles.entryDate}>{formatDate(createdAt)}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleShortPress}
        onLongPress={handleLongPress}
        style={[styles.entryWrapper]}
        activeOpacity={0.3}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View
            style={[
              styles.bubble,
              { backgroundColor: color ?? "#E5E5E5" },
              selected && styles.selectedBubble,
            ]}
          >
            {habit ? (
              <View style={styles.habitPill}>
                <Text style={styles.habitText}>{habit}</Text>
              </View>
            ) : null}

            <HTMLView value={content} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  entryWrapper: {
    alignSelf: "flex-start",
    borderRadius: 12,
  },
  entryDate: {
    marginTop: 15,
    fontSize: 12,
    color: "#6B7280",
  },
  iconText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 100,
    width: 85,
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
  },
  selectedBubble: {
    borderWidth: 2,
    borderColor: "black",
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
