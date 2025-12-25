// pages/Rewards.tsx
import { useRef, useState } from "react";
import { useClaimRewardMutation } from "hooks/queries";
import type { FilterType, RewardType } from "types/type";
import { RewardsCardsSkeleton } from "components/ui/rewardsSkeleton";
import Spinner from "components/ui/spinner";
import { useRewardsDerived } from "hooks/useRewardDerived";
import { rewardSlides } from "constants/constant";
import { useSlider } from "hooks/useSlider";
import RewardConfirmModal, { type Anchor } from "components/ui/modal";

const RewardsPage = () => {
  const [filter, setFilter] = useState<FilterType>("All Rewards");
  const { loading, error, me, claimedIds, visible, nextToClaim, metadata } =
    useRewardsDerived(filter);
  const { activeIndex, ink, setTabRef, setActiveIndex, listRef } = useSlider();

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="ant-tabs-nav"
      >
        <div className="ant-tabs-nav-wrap ant-tabs-nav-wrap-ping-right">
          <div
            className="ant-tabs-nav-list relative overflow-x-auto whitespace-nowrap scrollbar-hidden"
            ref={listRef}
          >
            {rewardSlides.map((sl, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={sl.slide}
                  ref={(el) => setTabRef(el, i)}
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    setActiveIndex(i);
                    setFilter(sl.slide as FilterType);
                  }}
                  className={`ant-tabs-tab ${active ? "ant-tabs-tab-active" : ""}`}
                >
                  <span className="ant-tabs-tab-btn">
                    {sl.slide}
                    <span
                      className={`ml-2 text-xs rounded-full h-5 px-2 inline-flex justify-center items-center   font-semibold ${active ? "bg-primary-500/10 text-primary-500" : " bg-[#E2E8F0] text-[#CBD5E0]"}`}
                    >
                      {sl.slide === "All Rewards"
                        ? metadata.totalRewards
                        : sl.slide === "Locked"
                          ? metadata.totalLocked
                          : sl.slide === "Unlocked"
                            ? metadata.totalUnlockedRewards
                            : sl.slide === "Coming Soon"
                              ? metadata.totalIncoming
                              : 0}
                    </span>
                  </span>
                </button>
              );
            })}
            <div
              className="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
              style={{
                position: "absolute",
                bottom: 0,
                left: ink.left,
                width: ink.width,
                height: "2.5px",
                transition: "left .3s ease, width .3s ease",
              }}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <RewardsCardsSkeleton count={6} />
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-6">
          {visible.map((reward) => (
            <RewardCard
              key={reward.id}
              mePoints={me?.total_points!}
              reward={reward}
              isClaimed={claimedIds.has(reward.id!)}
              isNext={nextToClaim?.id === reward.id}
              nextPoints={nextToClaim?.qualifying_points ?? null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RewardCard = ({
  reward,
  mePoints,
  isClaimed,
  isNext,
  nextPoints,
}: {
  reward: RewardType;
  mePoints: number;
  isClaimed: boolean;
  isNext: boolean;
  nextPoints: number | null;
}) => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] =
    useState<import("components/ui/modal").Anchor>(null);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useClaimRewardMutation();

  async function onClaim(e: React.MouseEvent<HTMLButtonElement>) {
    // 1) Capture the anchor BEFORE any await
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    setError("");
    try {
      await mutateAsync(reward.id!);

      setAnchor({ rect });
      setOpen(true);
    } catch (err: any) {
      setAnchor({ rect });
      setOpen(true);

      setError(err.message ?? err ?? "Failed");
    }
  }

  const qualifies = isNext && nextPoints != null && mePoints >= nextPoints;
  const disabled = isClaimed || !qualifies;

  const label = isClaimed ? "Claimed" : disabled ? "Locked" : "Claim";

  return (
    <div
      className={[
        "border border-[#E9D4FF] bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-md",
        disabled ? "opacity-70 cursor-not-allowed" : "",
      ].join(" ")}
      aria-disabled={disabled}
    >
      <RewardConfirmModal
        open={open}
        status={error ? "error" : "success"} // or "error"
        pointsText={error ? error : reward.name}
        anchor={anchor}
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        title={error ? "Failed" : "Claimed"}
      />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center m-[0_auto_1rem] text-[1.5rem] text-primary-500 bg-light-200">
        {reward.emoji}
      </div>

      <h4 className="text-center text-[1.1rem] font-semibold mb-2">
        {reward.name}
      </h4>
      <p className="text-center text-[0.9rem] text-[#2D3748] mb-4">
        {reward.description}
      </p>

      <p className="flex items-center justify-center text-primary-500 font-semibold mb-4">
        ⭐ {reward.qualifying_points} pts
      </p>

      <button
        type="button"
        disabled={disabled || isPending}
        onClick={(e) => onClaim(e)}
        className={[
          "w-full text-white font-semibold p-3 rounded-lg transition",
          disabled || isPending ? "bg-[#d7e0ed]" : "bg-primary-500",
        ].join(" ")}
      >
        {isPending ? <Spinner label="Claiming..." /> : label}
      </button>
    </div>
  );
};

export default RewardsPage;
