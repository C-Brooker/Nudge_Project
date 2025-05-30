export function xpForLevel(level: number): number {
  const baseXp = 100;
  const growthRate = 1.17;

  return Math.floor(baseXp * Math.pow(growthRate, level - 1));
}
