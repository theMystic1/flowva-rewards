// lib/queryKeys.ts
export const qk = {
  me: ["me"] as const,
  rewards: ["rewards"] as const,
  myRewards: (userId: string | null) => ["myRewards", userId] as const,
};
