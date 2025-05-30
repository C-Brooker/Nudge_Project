import React, { useCallback, useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CountHabit from "@/components/habits/count/CountHabit";
import QuitHabit from "@/components/habits/quit/QuitHabit";
import ActionButton from "@/components/ActionButton";
import Layout from "@/components/Layout";
import Collapsible from "@/components/habits/Collapsible";
import { router } from "expo-router";
import { useHabitStore } from "@/stores/useHabitStore";

type viewType = 0 | 1 | 2;
const nextView = (v: viewType): viewType => ((v + 1) % 3) as viewType;

interface CountGoal {
  type: "Count";
  count: number;
  units: string;
  timeframe: string;
}

interface QuitGoal {
  type: "Quit";
  date: Date;
  milestones: boolean;
}

interface Habit {
  id: number;
  name: string;
  color: string;
  goal: CountGoal | QuitGoal;
  difficulty: 0 | 1 | 2 | 3 | 4;
  streak: number;
  longestStreak: number;
  completions: any[];
  createdAt: Date;
}

export default function HomeScreen() {
  const [view, setView] = useState<viewType>(0);
  const habits = useHabitStore((s) => s.habits);

  const [expandedSections, setExpandedSections] = useState({
    day: true,
    week: true,
    month: true,
    quit: true,
  });

  const filteredHabits = useMemo(() => {
    const dayHabits = habits.filter(
      (habit) => habit.goal.type === "Count" && habit.goal.timeframe === "Day"
    );

    const weekHabits = habits.filter(
      (habit) => habit.goal.type === "Count" && habit.goal.timeframe === "Week"
    );

    const monthHabits = habits.filter(
      (habit) => habit.goal.type === "Count" && habit.goal.timeframe === "Month"
    );

    const quitHabits = habits.filter((habit) => habit.goal.type === "Quit");

    return {
      day: dayHabits,
      week: weekHabits,
      month: monthHabits,
      quit: quitHabits,
    };
  }, [habits]);

  const switchView = useCallback(() => {
    setView(nextView);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderCountHabit = useCallback(
    ({ item }: { item: Habit }) =>
      CountHabit(view, {
        id: item.id,
        name: item.name,
        color: item.color,
        streak: item.streak,
        goal: item.goal as CountGoal,
      }),
    [view]
  );

  const renderQuitHabit = useCallback(
    ({ item }: { item: Habit }) => (
      <QuitHabit
        id={item.id}
        name={item.name}
        color={item.color}
        goal={item.goal as QuitGoal}
      />
    ),
    []
  );

  const addHabit = () => {
    router.navigate("/(app)/(tabs)/habit/name");
  };

  const sectionsToShow = useMemo(
    () =>
      [
        {
          key: "day" as const,
          title: "Daily Habits",
          data: filteredHabits.day,
          renderItem: renderCountHabit,
        },
        {
          key: "week" as const,
          title: "Weekly Habits",
          data: filteredHabits.week,
          renderItem: renderCountHabit,
        },
        {
          key: "month" as const,
          title: "Monthly Habits",
          data: filteredHabits.month,
          renderItem: renderCountHabit,
        },
        {
          key: "quit" as const,
          title: "Quit Habits",
          data: filteredHabits.quit,
          renderItem: renderQuitHabit,
        },
      ].filter((section) => section.data.length > 0),
    [filteredHabits, renderCountHabit, renderQuitHabit]
  );

  return (
    <Layout name="Habits">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {sectionsToShow.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="track-changes" size={64} color="#CCC" />
            <Text style={styles.emptyStateTitle}>No Habits Yet</Text>
            <Text style={styles.emptyStateText}>
              Create your first habit to get started on your journey!
            </Text>
          </View>
        ) : (
          sectionsToShow.map((section) => (
            <Collapsible
              key={section.key}
              title={section.title}
              data={section.data}
              renderItem={section.renderItem}
              keyPrefix={section.key}
              isExpanded={expandedSections[section.key]}
              onToggle={() => toggleSection(section.key)}
              extraData={view}
            />
          ))
        )}
      </ScrollView>

      <ActionButton
        name="grid-view"
        style={styles.btmleft}
        onPress={switchView}
      />
      <ActionButton name="add" style={styles.btmright} onPress={addHabit} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },

  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyStateText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 24,
  },
  btmleft: {
    position: "absolute",
    left: 24,
    bottom: 24,
  },
  btmright: {
    position: "absolute",
    right: 24,
    bottom: 24,
  },
});
