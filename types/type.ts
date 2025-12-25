import type { Session, User, UserIdentity } from "@supabase/supabase-js";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AuthCardType = { header: string; description: string };
export type ChildrenType = {
  children: ReactNode;
};
export type InputType = {
  label: string;
  type: "email" | "text" | "password";
  value: string;
  onHandleChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  onShowPassword?: SetStateAction<Dispatch<boolean>>;
  showPassword?: boolean;
};

export type RewardType = {
  id?: string;
  name: string;
  qualifying_points: number;
  description: string;
  status: string;
  emoji: string;
};

export type UseUserState = {
  loading: boolean;
  user: UserType | null;
  session: Session | null;
  error: unknown;
};

export type UserType = {
  avatar_url: string;
  created_at: string;
  email: string;
  id: string;
  last_claimed_at: null;
  name: string;
  ref_code: string;
  ref_count: null;
  ref_points: null;
  rewards: null;
  streak_points: null;
  streaks: null;
  total_points: null;
};

export type UserRewardsType = {
  id: string;
  created_at: string;
  user_id: string;
  reward_id: string;
};

export type MyRewardType = {
  status: string;
  rewards: UserRewardsType;
};
export type FilterType = "All Rewards" | "Unlocked" | "Locked" | "Coming Soon";
