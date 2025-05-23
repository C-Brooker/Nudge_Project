import { create } from "zustand";
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
interface HabitDetails {
  name: string | null;
  color: string;
  goal: CountGoal | QuitGoal | null;
  reminder: Reminder | null;
  difficulty: 0 | 1 | 2;
}

interface CreatorState {
  name: string | null;
  color: string;
  goal: CountGoal | QuitGoal | null;
  reminder: Reminder | null;
  difficulty: 0 | 1 | 2;

  setName: (name: string) => void;
  setColor: (color: string) => void;
  setGoal: (goal: CountGoal | QuitGoal) => void;
  setReminder: (reminder: Reminder) => void;
  setDifficulty: (difficulty: 0 | 1 | 2) => void;

  clearGoalAndReminder: () => void;
  clearCreator: () => void;

  getHabitDetails: () => {
    name: string | null;
    color: string;
    goal: CountGoal | QuitGoal | null;
    reminder: Reminder | null;
    difficulty: 0 | 1 | 2;
  };
}

export const useCreatorStore = create<CreatorState>((set, get) => ({
  name: null,
  color: "#F6F6F6",
  goal: null,
  reminder: null,
  difficulty: 0,

  setName: (name: string) => set({ name: name }),
  setColor: (color: string) => set({ color: color }),
  setGoal: (goal: CountGoal | QuitGoal) => set({ goal: goal }),
  setReminder: ({ days, time, enabled }: Reminder) =>
    set({ reminder: { days, time, enabled } }),
  setDifficulty: (difficulty: 0 | 1 | 2) => set({ difficulty: difficulty }),

  clearGoalAndReminder: () => set({ goal: null, reminder: null }),

  getHabitDetails: () => {
    const { name, color, goal, reminder, difficulty } = get();
    return { name, color, goal, reminder, difficulty };
  },

  clearCreator: () =>
    set({
      name: null,
      color: "#F6F6F6",
      goal: null,
      reminder: null,
      difficulty: 0,
    }),
}));
