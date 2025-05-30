export interface AchievementDef {
  key: string;
  name: string;
  habits?: number;
  level?: number;
  streak?: number;
  coins?: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { key: "habit_1", name: "Complete 1 Habit", habits: 1 },
  { key: "habit_5", name: "Complete 5 Habits", habits: 5 },
  { key: "habit_10", name: "Complete 10 Habits", habits: 10 },
  { key: "habit_50", name: "Complete 50 Habits", habits: 50 },
  { key: "habit_100", name: "Complete 100 Habits", habits: 100 },
  { key: "habit_500", name: "Complete 500 Habits", habits: 500 },
  { key: "habit_1000", name: "Complete 1000 Habits", habits: 1000 },

  { key: "level_1", name: "Reach Level 1", level: 1 },
  { key: "level_5", name: "Reach Level 5", level: 5 },
  { key: "level_10", name: "Reach Level 10", level: 10 },
  { key: "level_50", name: "Reach Level 50", level: 50 },
  { key: "level_100", name: "Reach Level 100", level: 100 },
  { key: "level_500", name: "Reach Level 500", level: 500 },
  { key: "level_1000", name: "Reach Level 1000", level: 1000 },

  { key: "streak_1", name: "Hit a 1 day streak", streak: 1 },
  { key: "streak_3", name: "Hit a 3 day streak", streak: 3 },
  { key: "streak_7", name: "Hit a 7 day streak", streak: 7 },
  { key: "streak_30", name: "Hit a 30 day streak", streak: 30 },
  { key: "streak_180", name: "Hit a 180 day streak", streak: 180 },
  { key: "streak_365", name: "Hit a 365 day streak", streak: 365 },

  { key: "coin_1", name: "Have 1 Coin", coins: 1 },
  { key: "coin_10", name: "Have 10 Coins", coins: 10 },
  { key: "coin_100", name: "Have 100 Coins", coins: 100 },
  { key: "coin_1000", name: "Have 1000 Coins", coins: 1000 },
  { key: "coin_10000", name: "Have 10000 Coins", coins: 10000 },
  { key: "coin_100000", name: "Have 100000 Coins", coins: 100000 },
  { key: "coin_1000000", name: "Have 1000000 Coins", coins: 1000000 },

  { key: "all_achievements", name: "Complete every achievement" },
];
