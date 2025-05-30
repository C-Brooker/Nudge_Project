import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MaterialIcons } from "@expo/vector-icons";

interface Habit {
  id: number;
  name: string;
  color: string;
  goal: any;
  difficulty: 0 | 1 | 2 | 3 | 4;
  streak: number;
  longestStreak: number;
  completions: any[];
  createdAt: Date;
}

interface CollapsibleSectionProps {
  title: string;
  data: Habit[];
  renderItem: ({ item }: { item: Habit }) => React.ReactElement;
  keyPrefix: string;
  isExpanded: boolean;
  onToggle: () => void;
  extraData?: any;
}

export default function CollapsibleSection({
  title,
  data,
  renderItem,
  keyPrefix,
  isExpanded,
  onToggle,
  extraData,
}: CollapsibleSectionProps) {
  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionHeaderRight}>
          <Text style={styles.habitCount}>{data.length}</Text>
          <MaterialIcons
            name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#666"
          />
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View>
          <FlashList
            data={data}
            keyExtractor={(item) => `${keyPrefix}-${item.id}`}
            renderItem={renderItem}
            estimatedItemSize={120}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={extraData}
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

  habitCount: {
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

  listContent: {
    paddingBottom: 8,
  },
});
