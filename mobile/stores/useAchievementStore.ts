import { create } from "zustand";
import { ACHIEVEMENTS } from "../constants/achievements";

type AchievementKey = (typeof ACHIEVEMENTS)[number]["key"];

interface AchievementState {
  unlockedKeys: AchievementKey[];
  has: (key: AchievementKey) => boolean;
  setUnlocked: (keys: AchievementKey[]) => void;
  unlockOne: (key: AchievementKey) => void;
  checkAchievements: (
    stats: any,
    unlockedKeys: AchievementKey[]
  ) => AchievementKey[];
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

  checkAchievements: (stats, unlockedKeys) => {
    const newAchievements: AchievementKey[] = [];

    ACHIEVEMENTS.forEach((achievement) => {
      if (unlockedKeys.includes(achievement.key)) return;

      let shouldUnlock = false;

      if (achievement.habits && stats.totalCompletions >= achievement.habits) {
        shouldUnlock = true;
      }

      if (achievement.level && stats.level >= achievement.level) {
        shouldUnlock = true;
      }

      if (achievement.streak && stats.longestStreak >= achievement.streak) {
        shouldUnlock = true;
      }

      if (achievement.coins && stats.coins >= achievement.coins) {
        shouldUnlock = true;
      }

      if (achievement.key === "all_achievements") {
        const totalAchievements = ACHIEVEMENTS.length - 1;
        const completedAchievements =
          unlockedKeys.length + newAchievements.length;
        if (completedAchievements >= totalAchievements) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock) {
        newAchievements.push(achievement.key);
      }
    });

    return newAchievements;
  },

  loadFromApi: async () => {
    const resp = await fetch("/api/achievements/unlocked");
    const data: { keys: AchievementKey[] } = await resp.json();
    set({ unlockedKeys: data.keys });
  },

  clearAchievements: () => set({ unlockedKeys: [] }),
}));
