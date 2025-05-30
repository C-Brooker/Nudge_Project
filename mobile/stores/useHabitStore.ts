import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
//OH LAWD HE BIG
export interface CountGoal {
  type: "Count";
  count: number;
  units: string;
  timeframe: string;
}

export interface QuitGoal {
  type: "Quit";
  date: Date;
  milestones: boolean;
}

export interface CompletionEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
  timestamp?: Date;
}

export interface Habit {
  id: number;
  name: string;
  color: string;
  goal: CountGoal | QuitGoal;
  difficulty: 0 | 1 | 2 | 3 | 4;
  streak: number;
  longestStreak: number;
  completions: CompletionEntry[];
  createdAt: Date;
}

interface HabitStore {
  habits: Habit[];
  nextId: number;

  addHabit: (
    habit: Omit<
      Habit,
      "id" | "createdAt" | "streak" | "longestStreak" | "completions"
    >
  ) => number;
  updateHabit: (
    id: number,
    updates: Partial<Omit<Habit, "id" | "createdAt">>
  ) => void;
  removeHabit: (id: number) => void;
  setHabits: (habits: Habit[]) => void;
  // Completion tracking
  markHabitComplete: (id: number, date?: string) => void;
  markHabitIncomplete: (id: number, date?: string) => void;
  isHabitCompletedToday: (id: number) => boolean;
  isHabitCompletedOnDate: (id: number, date: string) => boolean;

  // Streak management
  calculateStreak: (id: number) => number;
  resetStreak: (id: number) => void;
  getLongestStreakAcrossAllHabits: () => number;

  // Analytics
  getCompletionRate: (id: number, days?: number) => number;
  getHabitStats: (id: number) => {
    currentStreak: number;
    longestStreak: number;
    totalCompletions: number;
    completionRate: number;
  };

  clearAllHabits: () => void;
  getHabitById: (id: number) => Habit | undefined;
  getAllHabits: () => Habit[];
}

// Helper function to get today's date as ISO string
const getTodayISOString = () => {
  return new Date().toISOString().split("T")[0];
};

// Helper function to calculate streak from completions
const calculateStreakFromCompletions = (
  completions: CompletionEntry[]
): number => {
  if (completions.length === 0) return 0;

  // Sort completions by date (newest first)
  const sortedCompletions = [...completions].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  let streak = 0;
  let currentDate = new Date();

  for (const completion of sortedCompletions) {
    const completionDate = new Date(completion.date);
    const daysDiff = Math.floor(
      (currentDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === streak && completion.completed) {
      streak++;
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      nextId: 1,

      addHabit: (habitData) => {
        const newId = get().nextId;
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habitData,
              id: newId,
              streak: 0,
              longestStreak: 0,
              completions: [],
              createdAt: new Date(),
            },
          ],
          nextId: state.nextId + 1,
        }));
        return newId;
      },

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        })),

      setHabits: (habits) => set({ habits }),
      markHabitComplete: (id, date = getTodayISOString()) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;

            const existingCompletionIndex = habit.completions.findIndex(
              (c) => c.date === date
            );
            let updatedCompletions;

            if (existingCompletionIndex >= 0) {
              updatedCompletions = habit.completions.map((completion, index) =>
                index === existingCompletionIndex
                  ? { ...completion, completed: true, timestamp: new Date() }
                  : completion
              );
            } else {
              updatedCompletions = [
                ...habit.completions,
                { date, completed: true, timestamp: new Date() },
              ];
            }

            const newStreak =
              calculateStreakFromCompletions(updatedCompletions);
            const newLongestStreak = Math.max(habit.longestStreak, newStreak);

            return {
              ...habit,
              completions: updatedCompletions,
              streak: newStreak,
              longestStreak: newLongestStreak,
            };
          }),
        })),

      markHabitIncomplete: (id, date = getTodayISOString()) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;

            const existingCompletionIndex = habit.completions.findIndex(
              (c) => c.date === date
            );
            let updatedCompletions;

            if (existingCompletionIndex >= 0) {
              updatedCompletions = habit.completions.map((completion, index) =>
                index === existingCompletionIndex
                  ? { ...completion, completed: false }
                  : completion
              );
            } else {
              updatedCompletions = [
                ...habit.completions,
                { date, completed: false },
              ];
            }

            const newStreak =
              calculateStreakFromCompletions(updatedCompletions);

            return {
              ...habit,
              completions: updatedCompletions,
              streak: newStreak,
            };
          }),
        })),

      isHabitCompletedToday: (id) => {
        const habit = get().getHabitById(id);
        if (!habit) return false;

        const today = getTodayISOString();
        const todayCompletion = habit.completions.find((c) => c.date === today);
        return todayCompletion?.completed || false;
      },

      isHabitCompletedOnDate: (id, date) => {
        const habit = get().getHabitById(id);
        if (!habit) return false;

        const completion = habit.completions.find((c) => c.date === date);
        return completion?.completed || false;
      },

      calculateStreak: (id) => {
        const habit = get().getHabitById(id);
        if (!habit) return 0;

        return calculateStreakFromCompletions(habit.completions);
      },

      resetStreak: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, streak: 0 } : habit
          ),
        })),

      getLongestStreakAcrossAllHabits: () => {
        const habits = get().habits;

        if (habits.length === 0) return 0;

        const longestStreaks = habits.map((habit) => habit.longestStreak);
        return Math.max(...longestStreaks);
      },

      getCompletionRate: (id, days = 30) => {
        const habit = get().getHabitById(id);
        if (!habit) return 0;

        const endDate = new Date();
        const startDate = new Date(
          endDate.getTime() - days * 24 * 60 * 60 * 1000
        );

        let totalDays = 0;
        let completedDays = 0;

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const dateString = d.toISOString().split("T")[0];
          const completion = habit.completions.find(
            (c) => c.date === dateString
          );

          totalDays++;
          if (completion?.completed) {
            completedDays++;
          }
        }

        return totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
      },

      getHabitStats: (id) => {
        const habit = get().getHabitById(id);
        if (!habit) {
          return {
            currentStreak: 0,
            longestStreak: 0,
            totalCompletions: 0,
            completionRate: 0,
          };
        }

        const totalCompletions = habit.completions.filter(
          (c) => c.completed
        ).length;
        const completionRate = get().getCompletionRate(id, 30);

        return {
          currentStreak: habit.streak,
          longestStreak: habit.longestStreak,
          totalCompletions,
          completionRate,
        };
      },

      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      clearAllHabits: () =>
        set({
          habits: [],
          nextId: 1,
        }),

      getHabitById: (id) => {
        const state = get();
        return state.habits.find((habit) => habit.id === id);
      },

      getAllHabits: () => {
        return get().habits;
      },
    }),
    {
      name: "habits-storage",
      storage: createJSONStorage(() => AsyncStorage, {
        serialize: (state) => {
          return JSON.stringify({
            state: {
              ...state,
              habits: state.habits.map((habit) => ({
                ...habit,
                createdAt: habit.createdAt.toISOString(),
                completions: habit.completions.map((completion) => ({
                  ...completion,
                  timestamp: completion.timestamp?.toISOString(),
                })),
                goal:
                  habit.goal.type === "Quit"
                    ? { ...habit.goal, date: habit.goal.date.toISOString() }
                    : habit.goal,
              })),
            },
          });
        },
        deserialize: (str: string) => {
          const parsed = JSON.parse(str);
          return {
            ...parsed.state,
            habits: parsed.state.habits.map((habit: any) => ({
              ...habit,
              createdAt: new Date(habit.createdAt),
              completions:
                habit.completions?.map((completion: any) => ({
                  ...completion,
                  timestamp: completion.timestamp
                    ? new Date(completion.timestamp)
                    : undefined,
                })) || [],
              goal:
                habit.goal.type === "Quit"
                  ? { ...habit.goal, date: new Date(habit.goal.date) }
                  : habit.goal,
            })),
          };
        },
      }),
    }
  )
);
export const createHabitFromCreator = (creatorData: {
  name: string | null;
  color: string;
  goal: CountGoal | QuitGoal | null;
  difficulty: 0 | 1 | 2 | 3 | 4;
}) => {
  if (!creatorData.name || !creatorData.goal) {
    throw new Error("Name and goal are required to create a habit");
  }

  return {
    name: creatorData.name,
    color: creatorData.color,
    goal: creatorData.goal,
    difficulty: creatorData.difficulty,
  };
};
