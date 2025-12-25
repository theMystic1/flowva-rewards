import supabase from "supabase/supabase";
import type { RewardType } from "types/type";
import { getUserById } from "./auth";
import { dayRelation, formatDateToCustomISO } from "./helpers";

export async function getAllRewards(): Promise<{ rewards: RewardType[] }> {
  const { data, error } = await supabase.from("rewards").select("*");
  if (error) throw new Error(error.message);
  return { rewards: data ?? [] };
}

export async function getMyRewards(
  userId: string
): Promise<{ myRewards: { reward_id: string }[] }> {
  const { data, error } = await supabase
    .from("user_rewards")
    .select("reward_id")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return { myRewards: data ?? [] };
}

export async function getMe(): Promise<{
  user: { id: string; total_points: number };
}> {
  // Replace with your supabase auth + profile load
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user)
    throw new Error(error?.message || "Not authenticated");
  const { data: profile, error: e2 } = await supabase
    .from("users")
    .select("id,total_points")
    .eq("id", data.user.id)
    .single();
  if (e2) throw new Error(e2.message);
  return { user: profile };
}

export async function claimRewardAtomic(
  rewardId: string
): Promise<{ newPoints: number }> {
  const { user } = await getMe();
  const { data: rewardRow, error: e1 } = await supabase
    .from("rewards")
    .select("qualifying_points")
    .eq("id", rewardId)
    .single();
  if (e1) throw new Error(e1.message);

  if (user.total_points < rewardRow.qualifying_points) {
    throw new Error("Not enough points");
  }

  const { error: e2 } = await supabase
    .from("user_rewards")
    .insert({ user_id: user.id, reward_id: rewardId });
  if (e2) throw new Error(e2.message);

  const newPoints = user.total_points - rewardRow.qualifying_points;
  const { error: e3 } = await supabase
    .from("users")
    .update({ total_points: newPoints })
    .eq("id", user.id);
  if (e3) throw new Error(e3.message);

  return { newPoints };
}

export async function claimStreakPoint() {
  // 1) Load current user
  const user = await getUserById();
  if (!user?.id) {
    throw { code: 401, message: "Not authenticated" };
  }

  // 2) Decide new streak value + guard double-claim
  const rel = user.last_claimed_at
    ? dayRelation(user.last_claimed_at)
    : "other";

  if (rel === "today") {
    throw { code: 400, message: "You have already claimed for today" };
  }

  const nextStreak = rel === "yesterday" ? (user.streaks ?? 0) + 1 : 1;

  // 3) Persist
  const newDate = formatDateToCustomISO(new Date());
  const { data, error } = await supabase
    .from("users")
    .update({
      streaks: nextStreak,
      last_claimed_at: newDate,
      streak_points: user.streak_points + 5,
      total_points: user.total_points + 5,
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw { code: 500, message: "Failed to claim streak" };
  }

  return data;
}
