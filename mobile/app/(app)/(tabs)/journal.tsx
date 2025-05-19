import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@/components/Layout";
import { useEntryStore, Entry } from "@/stores/useEntryStore";
import EntryBubble from "@/components/EntryBubble";
import { useRouter } from "expo-router";

export default function JournalScreen() {
  const habits = ["Running", "Swimming", "Eating", "Fishing", "Walking"];
  const entries = useEntryStore((state) => state.entries);
  console.log(entries);
  const router = useRouter();
  const [habitFilter, setHabitFilter] = useState<string>("all");

  const addEntry = () => {
    router.replace("/(app)/(tabs)/entry");
  };

  const filteredEntries = useMemo(() => {
    return habitFilter === "all"
      ? entries
      : entries.filter((e) => e.habit === habitFilter);
  }, [entries, habitFilter]);

  const renderEntry = ({ item }: { item: Entry }) => (
    <EntryBubble
      createdAt={item.createdAt}
      content={item.content}
      habit={item.habit}
      color={item.color}
    />
  );

  return (
    <Layout name="Journal">
      <View style={styles.toolbarRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            habitFilter === "all" && styles.activeFilter,
          ]}
          onPress={() => setHabitFilter("all")}
        >
          <Text
            style={[
              styles.filterLabel,
              habitFilter === "all" && styles.activeFilterLabel,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {habits.map((h) => (
            <TouchableOpacity
              key={h}
              style={[
                styles.filterButton,
                habitFilter === h && styles.activeFilter,
              ]}
              onPress={() => setHabitFilter(h)}
            >
              <Text
                style={[
                  styles.filterLabel,
                  habitFilter === h && styles.activeFilterLabel,
                ]}
              >
                {h}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Journal entries list */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        style={styles.listSize}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="edit" size={24} color="#9CA3AF" />
            <Text style={styles.emptyText}>New Note</Text>
          </View>
        }
        renderItem={renderEntry}
      />

      <TouchableOpacity style={styles.fab} onPress={addEntry}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  filterScroll: {
    paddingLeft: 8, // space between “All” and first habit
    paddingRight: 12,
  },
  toolbarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: "#111827",
  },
  filterLabel: {
    fontSize: 14,
    color: "#111827",
  },
  activeFilterLabel: {
    color: "white",
  },

  listSize: {
    width: "100%",
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },

  emptyContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#111827",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
