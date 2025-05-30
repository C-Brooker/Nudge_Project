import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ACHIEVEMENTS } from "@/constants/achievements";

type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];

export default function AchievementsList({
  unlockedKeys,
}: {
  unlockedKeys: AchievementKey[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = ACHIEVEMENTS.map((def) => ({
    ...def,
    unlocked: unlockedKeys.includes(def.key),
  }));

  const unlockedCount = data.filter((item) => item.unlocked).length;

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <FontAwesome
        name="star"
        size={24}
        style={[styles.icon, { opacity: item.unlocked ? 1 : 0.4 }]}
      />
      <Text style={[styles.text, { opacity: item.unlocked ? 1 : 0.6 }]}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.sectionHeaderRight}>
          <Text style={styles.achievementCount}>
            {unlockedCount}/{data.length}
          </Text>
          <MaterialIcons
            name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
    overflow: "hidden",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.2,
    borderColor: "#666",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },

  sectionHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  achievementCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    textAlign: "center",
  },

  listContainer: {
    paddingBottom: 8,
  },

  list: {
    padding: 16,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    marginRight: 12,
  },

  text: {
    fontSize: 16,
  },
});
