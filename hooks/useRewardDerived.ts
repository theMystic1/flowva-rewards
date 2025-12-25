import { useMemo } from "react";
import { useMeQuery, useMyRewardsQuery, useRewardsQuery } from "./queries";
import type { RewardType } from "types/type";

export type FilterType = "All Rewards" | "Locked" | "Unlocked" | "Coming Soon";

export function useRewardsDerived(filter: FilterType) {
  const meQ = useMeQuery();
  const rewardsQ = useRewardsQuery();
  const myRewardsQ = useMyRewardsQuery(meQ.data?.id ?? null);

  // console.log(filter);

  const loading = meQ.isLoading || rewardsQ.isLoading || myRewardsQ.isLoading;
  const error =
    meQ.error?.message || rewardsQ.error?.message || myRewardsQ.error?.message;

  const { claimedIds, visible, nextToClaim, metadata } = useMemo(() => {
    const rewards = rewardsQ.data ?? [];
    const myRewards = myRewardsQ.data ?? [];
    const claimed = new Set(myRewards.map((r) => r.reward_id));
    const unclaimed = rewards.filter((r) => !claimed.has(r?.id!));
    const next = unclaimed[0] ?? null;

    const isEnoughToPay =
      (meQ.data?.total_points || 0) >= next?.qualifying_points;

    const claimedRewards = rewards.filter((r) => claimed.has(r?.id!));
    let unlocked = [...claimedRewards];

    if (isEnoughToPay) unlocked = [...claimedRewards, next];

    const Locked = isEnoughToPay
      ? unclaimed.filter((r) => r.id !== next.id || r.status === "incoming")
      : unclaimed;

    const soon = rewards.filter((r) => r.status === "incoming");
    let v: RewardType[] = rewards;
    if (filter === "Locked") v = Locked;
    if (filter === "Unlocked") v = unlocked;
    if (filter === "Coming Soon") v = soon;

    return {
      claimedIds: claimed,
      visible: v,
      nextToClaim: next,
      metadata: {
        totalRewards: rewards.length,
        totalUnlockedRewards: unlocked.length,
        totalLocked: Locked.length,
        totalIncoming: soon.length,
      },
    };
  }, [rewardsQ.data, myRewardsQ.data, filter]);

  return {
    loading,
    error: error || null,
    me: meQ.data ?? null,
    claimedIds,
    visible,
    nextToClaim,
    metadata,
  };
}
