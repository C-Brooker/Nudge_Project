/* HomeScreen.tsx */
import React, { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Reminder from "@/components/reminder/Reminder";
import ActionButton from "@/components/ActionButton";
import Layout from "@/components/Layout";
import { useEntryStore } from "@/stores/useEntryStore";
import { router } from "expo-router";

type View = 0 | 1 | 2; // 0 = week, 1 = month, 2 = year
const nextView = (v: View): View => ((v + 1) % 3) as View;

export default function HomeScreen() {
  const [view, setView] = useState<View>(0);
  const entries = useEntryStore((s) => s.entries);

  const switchView = useCallback(() => setView(nextView), []);
  const renderItem = useCallback(
    ({ item }: any) => <Reminder {...item} viewType={view} />,
    [view]
  );

  const addHabit = () => {
    router.navigate("/(app)/(tabs)/habit/name");
  };

  return (
    <Layout name="Habits">
      <FlashList
        data={entries}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        estimatedItemSize={120}
        contentContainerStyle={styles.listContent}
        extraData={view}
        ListEmptyComponent={<Text />}
      />

      <ActionButton name="grid-view" onPress={switchView} />
      <ActionButton name="add" style={styles.btmright} onPress={addHabit} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingBottom: 130, backgroundColor: "#E5E5E5" },
  btmright: { position: "absolute", right: 24, bottom: 24 },
});
