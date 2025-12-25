// hooks/queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllRewards,
  getMe,
  getMyRewards,
  claimRewardAtomic,
} from "lib/rewards";
import { qk } from "lib/queryKeys";
import type { RewardType } from "types/type";

export const useMeQuery = () => {
  return useQuery({
    queryKey: qk.me,
    queryFn: getMe,
    select: (d) => d.user, // structural sharing-friendly
  });
};

export const useRewardsQuery = () => {
  return useQuery({
    queryKey: qk.rewards,
    queryFn: getAllRewards,
    select: (d) => d.rewards as RewardType[],
  });
};

export const useMyRewardsQuery = (userId: string | null) => {
  const enabled = !!userId;
  return useQuery({
    queryKey: qk.myRewards(userId ?? null),
    queryFn: () => getMyRewards(userId!),
    enabled,
    select: (d) => d.myRewards, // [{reward_id}]
  });
};

export const useClaimRewardMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (rewardId: string) => claimRewardAtomic(rewardId),
    onMutate: async (rewardId) => {
      await qc.cancelQueries({ queryKey: qk.me });
      const prevMe = qc.getQueryData<ReturnType<typeof useMeQuery>["data"]>(
        qk.me
      );

      // Optimistic: mark reward as claimed and subtract points in cache
      if (prevMe) {
        qc.setQueryData(qk.me, {
          ...prevMe,
          total_points: Math.max(0, prevMe.total_points), // we’ll finalize after success
        });
      }
      return { prevMe };
    },
    onSuccess: async (_res, _rewardId) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.me }),
        qc.invalidateQueries({ queryKey: qk.rewards }),
        qc.invalidateQueries({
          predicate: (q) => q.queryKey[0] === "myRewards",
        }),
      ]);
    },
    onError: (_err, _rewardId, ctx) => {
      if (ctx?.prevMe) qc.setQueryData(qk.me, ctx.prevMe);
    },
  });
};
