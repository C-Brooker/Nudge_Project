import { create } from "zustand";

interface profileDetails {
  userId: number;
  username: string;
  experience: number;
  level: number;
  coins: number;
  streak: number;
  habitsCompleted: number;
}
interface ProfileState {
  userId: number | null;
  username: string | null;
  experience: number | null;
  level: number | null;
  coins: number | null;
  streak: number | null;
  habitsCompleted: number | null;
  setProfile: (props: profileDetails) => void;
  addExperience: (experience: number) => void;
  addLevel: (level: number) => void;
  addCoins: (coins: number) => void;
  incrementHabits: () => void;
  setStreak: (streak: number) => void;
  clearProfile: () => void;
  resetStats: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  userId: null,
  username: null,
  experience: null,
  level: null,
  coins: null,
  habitsCompleted: null,
  streak: null,

  setProfile: ({
    userId,
    username,
    experience,
    level,
    coins,
    habitsCompleted,
    streak,
  }: profileDetails) =>
    set({
      userId: userId,
      username: username,
      experience: experience,
      level: level,
      coins: coins,
      habitsCompleted: habitsCompleted,
      streak: streak,
    }),

  addExperience: (experience: number) =>
    set((state) => ({
      experience: Number(state.experience ?? 0) + Number(experience),
    })),

  addLevel: (level: number) => set({ level: level }),

  addCoins: (coins: number) =>
    set((state) => ({
      coins: Number(state.coins ?? 0) + Number(coins),
    })),

  incrementHabits: () =>
    set((state) => ({
      habitsCompleted: (state.habitsCompleted ?? 0) + 1,
    })),

  setStreak: (streak: number) =>
    set((state) => ({
      streak: Math.max(state.streak ?? 0, streak),
    })),

  resetStats: () =>
    set({
      experience: 0,
      level: 1,
      coins: 0,
      streak: 0,
    }),
  clearProfile: () =>
    set({
      userId: null,
      username: null,
      experience: null,
      level: null,
      coins: null,
      habitsCompleted: null,
      streak: null,
    }),
}));
