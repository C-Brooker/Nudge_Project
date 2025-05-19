import { create } from "zustand";
import { ACHIEVEMENTS } from "../constants/achievements";

type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];

interface AchievementState {
  unlockedKeys: AchievementKey[];
  has: (key: AchievementKey) => boolean;
  setUnlocked: (keys: AchievementKey[]) => void;
  unlockOne: (key: AchievementKey) => void;
  loadFromApi: () => Promise<void>;
  clearAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  unlockedKeys: ["habit_1"],

  has: (key) => get().unlockedKeys.includes(key),

  setUnlocked: (keys) => set({ unlockedKeys: keys }),

  unlockOne: (key) => {
    const { unlockedKeys } = get();
    if (!unlockedKeys.includes(key)) {
      set({ unlockedKeys: [...unlockedKeys, key] });
    }
  },

  loadFromApi: async () => {
    const resp = await fetch("/api/achievements/unlocked");
    const data: { keys: AchievementKey[] } = await resp.json();
    set({ unlockedKeys: data.keys });
  },

  clearAchievements: () => set({ unlockedKeys: [] }),
}));
