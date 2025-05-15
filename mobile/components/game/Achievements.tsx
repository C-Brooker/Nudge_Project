import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ACHIEVEMENTS } from "@/constants/achievements";

type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];

export default function AchievementsList({
  unlockedKeys,
}: {
  unlockedKeys: AchievementKey[];
}) {
  const data = ACHIEVEMENTS.map((def) => ({
    ...def,
    unlocked: unlockedKeys.includes(def.key),
  }));

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
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
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
