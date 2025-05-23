import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reuse the same interfaces from your creator store
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

interface Reminder {
  days: boolean[];
  time: Date;
  enabled: boolean;
}

// Define a complete Habit interface
interface Habit {
  id: number;
  name: string;
  color: string;
  goal: CountGoal | QuitGoal;
  reminder: Reminder | null;
  difficulty: 0 | 1 | 2;
  createdAt: Date;
}

interface HabitStore {
  habits: Habit[];
  nextId: number;

  // Core CRUD operations
  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void;
  updateHabit: (
    id: number,
    updates: Partial<Omit<Habit, "id" | "createdAt">>
  ) => void;
  removeHabit: (id: number) => void;
  clearAllHabits: () => void;

  getHabitById: (id: number) => Habit | undefined;
  getHabitsWithReminders: () => Habit[];
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      nextId: 1,

      addHabit: (habitData) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habitData,
              id: state.nextId,
              createdAt: new Date(),
            },
          ],
          nextId: state.nextId + 1,
        })),

      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        })),

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

      getHabitsWithReminders: () => {
        const state = get();
        return state.habits.filter((habit) => habit.reminder?.enabled);
      },
    }),
    {
      name: "habits-storage",
      storage: createJSONStorage(() => AsyncStorage),
      serialize: (state) => {
        return JSON.stringify({
          ...state,
          habits: state.habits.map((habit) => ({
            ...habit,
            createdAt: habit.createdAt.toISOString(),
            goal:
              habit.goal.type === "Quit"
                ? { ...habit.goal, date: habit.goal.date.toISOString() }
                : habit.goal,
            reminder: habit.reminder
              ? { ...habit.reminder, time: habit.reminder.time.toISOString() }
              : null,
          })),
        });
      },
      deserialize: (str: string) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          habits: parsed.habits.map((habit: any) => ({
            ...habit,
            createdAt: new Date(habit.createdAt),
            goal:
              habit.goal.type === "Quit"
                ? { ...habit.goal, date: new Date(habit.goal.date) }
                : habit.goal,
            reminder: habit.reminder
              ? { ...habit.reminder, time: new Date(habit.reminder.time) }
              : null,
          })),
        };
      },
    }
  )
);

// Helper function to create a habit from creator store data
export const createHabitFromCreator = (creatorData: {
  name: string | null;
  color: string;
  goal: CountGoal | QuitGoal | null;
  reminder: Reminder | null;
  difficulty: 0 | 1 | 2;
}) => {
  if (!creatorData.name || !creatorData.goal) {
    throw new Error("Name and goal are required to create a habit");
  }

  return {
    name: creatorData.name,
    color: creatorData.color,
    goal: creatorData.goal,
    reminder: creatorData.reminder,
    difficulty: creatorData.difficulty,
  };
};
