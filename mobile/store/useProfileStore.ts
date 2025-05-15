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
  IncrementHabit: () => void;
  IncrementStreak: () => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
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

  addExperience: (experience: number) => set({ experience: +experience }),
  addLevel: (level: number) => set({ level: +level }),
  addCoins: (coins: number) => set({ coins: +coins }),

  IncrementHabit: () => set({ level: +1 }),
  IncrementStreak: () => set({ level: +1 }),

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
