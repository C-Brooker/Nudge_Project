import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Layout from "@/components/Layout";
import { useEntryStore, Entry } from "@/stores/useEntryStore";
import EntryBubble from "@/components/entry/EntryBubble";
import { useRouter } from "expo-router";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

export default function JournalScreen() {
  const router = useRouter();
  const entries = useEntryStore((state) => state.entries);
  const removeEntry = useEntryStore((state) => state.removeEntry);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [habitFilter, setHabitFilter] = useState<string>("all");

  const habits = ["Running", "Swimming", "Eating", "Fishing", "Walking"];

  const addEntry = () => {
    router.replace("/(app)/(tabs)/entry");
  };

  const editEntry = () => {
    router.replace("/(app)/(tabs)/entry");
  };

  const deleteEntry = () => {
    if (selectedEntry) {
      removeEntry(selectedEntry);
      hideMenu();
    }
  };

  const showMenu = (id: number) => {
    setSelectedEntry(id);
    actionSheetRef.current?.show();
  };
  const hideMenu = () => {
    setSelectedEntry(null);
    actionSheetRef.current?.hide();
  };

  const filteredEntries = useMemo(() => {
    return habitFilter === "all"
      ? entries
      : entries.filter((e) => e.habit === habitFilter);
  }, [entries, habitFilter]);

  const renderEntry = ({ item }: { item: Entry }) => (
    <EntryBubble
      id={item.id}
      createdAt={item.createdAt}
      content={item.content}
      habit={item.habit}
      color={item.color}
      onShortPress={() => hideMenu()}
      onLongPress={(id: number) => {
        showMenu(id);
      }}
      selected={selectedEntry == item.id}
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
      <Pressable onPress={() => hideMenu()}>
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
      </Pressable>

      <TouchableOpacity style={styles.fab} onPress={addEntry}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        isModal={false}
        backgroundInteractionEnabled={true}
        closeOnTouchBackdrop={true}
        gestureEnabled={true}
        overdrawSize={0}
        containerStyle={{
          height: 100,
          borderWidth: 1,
        }}
        snapPoints={[60]}
        initialSnapIndex={0}
        onTouchBackdrop={() => actionSheetRef.current?.hide()}
        onBeforeClose={() => setSelectedEntry(null)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <TouchableOpacity style={[styles.sheetButton]} onPress={editEntry}>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sheetButton, { backgroundColor: "red" }]}
            onPress={deleteEntry}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </Layout>
  );
}

const styles = StyleSheet.create({
  filterScroll: {
    paddingLeft: 8,
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
    right: 24,
    bottom: 24,
    backgroundColor: "#111827",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  sheetButton: {
    backgroundColor: "#111827",
    width: 60,
    height: 60,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
