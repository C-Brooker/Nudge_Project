import { useHabitStore } from "@/stores/useHabitStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useAchievementStore } from "@/stores/useAchievementStore";
import { xpForLevel } from "@/constants";

interface Habit {
  id: number;
  difficulty: 0 | 1 | 2 | 3 | 4;
  streak: number;
  longestStreak: number;
  completions: any[];
}

interface RewardResult {
  coinsEarned: number;
  experienceEarned: number;
  leveledUp: boolean;
  newLevel?: number;
  achievementsUnlocked: string[];
}

export function useCompletionRewards() {
  const {
    habits,
    markHabitComplete,
    getHabitById,
    getLongestStreakAcrossAllHabits,
  } = useHabitStore();
  const {
    coins,
    experience,
    level,
    addCoins,
    addExperience,
    addLevel,
    incrementHabits,
    setStreak,
  } = useProfileStore();
  const { unlockedKeys, unlockOne, checkAchievements } = useAchievementStore();

  const calculateRewards = (habit: Habit) => {
    const baseCoins = [5, 10, 15, 25, 40][habit.difficulty];
    const baseXP = [10, 20, 35, 50, 75][habit.difficulty];
    const streakMultiplier = 1 + Math.floor(habit.streak / 5) * 0.1;

    return {
      coins: Math.floor(baseCoins * streakMultiplier),
      experience: Math.floor(baseXP * streakMultiplier),
    };
  };

  const checkLevelUp = (newExperience: number, currentLevel: number) => {
    const xpNeededForNextLevel = xpForLevel(currentLevel + 1);
    if (newExperience >= xpNeededForNextLevel) {
      let newLevel = currentLevel;
      let totalXpNeeded = xpNeededForNextLevel;

      while (newExperience >= totalXpNeeded) {
        newLevel++;
        totalXpNeeded = xpForLevel(newLevel + 1);
      }

      return { leveledUp: true, newLevel };
    }

    return { leveledUp: false };
  };

  const completeHabit = async (habitId: number): Promise<RewardResult> => {
    const originalHabit = habits.find((h) => h.id === habitId);
    if (!originalHabit) {
      throw new Error("Habit not found");
    }

    await markHabitComplete(habitId);

    const updatedHabit = getHabitById(habitId);
    if (!updatedHabit) {
      throw new Error("Habit not found after completion");
    }

    const rewards = calculateRewards(updatedHabit);
    addCoins(rewards.coins);
    addExperience(rewards.experience);
    incrementHabits();
    setStreak(getLongestStreakAcrossAllHabits());

    const newExperience = (experience ?? 0) + rewards.experience;
    const newCoins = (coins ?? 0) + rewards.coins;
    const currentLevel = level ?? 1;

    const levelResult = checkLevelUp(newExperience, currentLevel);
    let finalLevel = currentLevel;
    if (levelResult.leveledUp && levelResult.newLevel) {
      addLevel(levelResult.newLevel);
      finalLevel = levelResult.newLevel;
    }

    const allHabits = habits;
    const updatedStats = {
      habits: allHabits,
      totalCompletions: allHabits.reduce(
        (sum, h) => sum + h.completions.filter((c) => c.completed).length,
        0
      ),
      longestStreak: Math.max(...allHabits.map((h) => h.longestStreak), 0),
      totalHabits: allHabits.length,
      coins: newCoins,
      experience: newExperience,
      level: finalLevel,
    };

    const newAchievements = checkAchievements(updatedStats, unlockedKeys);
    newAchievements.forEach((achievementKey) => {
      unlockOne(achievementKey);
    });

    return {
      coinsEarned: rewards.coins,
      experienceEarned: rewards.experience,
      leveledUp: levelResult.leveledUp,
      newLevel: levelResult.newLevel,
      achievementsUnlocked: newAchievements,
    };
  };

  return {
    completeHabit,
    calculateRewards,
  };
}
