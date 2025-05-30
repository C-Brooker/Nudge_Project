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

interface CreatorState {
  name: string | null;
  color: string;
  goal: CountGoal | QuitGoal | null;
  difficulty: 0 | 1 | 2 | 3 | 4;

  setName: (name: string) => void;
  setColor: (color: string) => void;
  setGoal: (goal: CountGoal | QuitGoal) => void;
  setDifficulty: (difficulty: 0 | 1 | 2 | 3 | 4) => void;

  clearGoal: () => void;
  clearCreator: () => void;

  getHabitDetails: () => {
    name: string | null;
    color: string;
    goal: CountGoal | QuitGoal | null;
    difficulty: 0 | 1 | 2 | 3 | 4;
  };

  validHabit: () => boolean;
}

export const useCreatorStore = create<CreatorState>((set, get) => ({
  name: null,
  color: "#F6F6F6",
  goal: null,
  difficulty: 0,

  setName: (name: string) => set({ name: name }),
  setColor: (color: string) => set({ color: color }),
  setGoal: (goal: CountGoal | QuitGoal) => set({ goal: goal }),
  setDifficulty: (difficulty: 0 | 1 | 2 | 3 | 4) =>
    set({ difficulty: difficulty }),

  clearGoal: () => set({ goal: null }),

  getHabitDetails: () => {
    const { name, color, goal, difficulty } = get();
    return { name, color, goal, difficulty };
  },

  validHabit: () => {
    const { name, color, goal } = get();
    console.log(name, color, goal);
    if (!name) {
      return false;
    }

    if (!color) {
      return false;
    }

    if (!goal) {
      return false;
    }

    return true;
  },

  clearCreator: () =>
    set({
      name: null,
      color: "#F6F6F6",
      goal: null,
      difficulty: 0,
    }),
}));
