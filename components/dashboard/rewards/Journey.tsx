import Button from "components/auth/btn";
import { FaAward, FaRegCalendar, FaUserPlus } from "react-icons/fa";
import { HiGift } from "react-icons/hi2";
import { PointsCard } from "./pointCard";
import { BsLightning } from "react-icons/bs";
import { CgCalendar } from "react-icons/cg";
import { useUser } from "hooks/useUser";
import { dayRelation, formatNumber } from "lib/helpers";
import { useRewardsDerived } from "hooks/useRewardDerived";
import { buildWeekBadges } from "lib/streak-week";
import { useState } from "react";
import { claimStreakPoint } from "lib/rewards";
import { RewardsCardsSkeleton } from "components/ui/rewardsSkeleton";
import { PointCount, Title } from "./points";
import RewardConfirmModal from "components/ui/modal";
import ClaimReclaimModal from "components/ui/claimModal";
import NumberProgress from "components/ui/progressBar";
import Spinner from "components/ui/spinner";

const Journey = () => {
  const [claiming, setClaiming] = useState(false);
  const [open, setOpen] = useState(false);

  const [anchor, setAnchor] =
    useState<import("components/ui/modal").Anchor>(null);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);

  async function handleSubmit({ email, file }: { email: string; file: File }) {
    // TODO: upload `file` to Supabase storage, create row in `claims` table, etc.
    // await supabase.storage.from('proofs').upload(...)
    // await supabase.from('claims').insert({ email, proof_url, source: 'reclaim' })
    // console.log({ email, file });
  }

  const { isLoading, data, refetch } = useUser();
  const { nextToClaim, loading } = useRewardsDerived("All Rewards");

  if (isLoading || loading) return <RewardsCardsSkeleton count={3} />;

  const handleClaim = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1) Capture the anchor BEFORE any await
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    try {
      setClaiming(true);
      await claimStreakPoint();
      await refetch();

      setAnchor({ rect });
      setOpen(true);
    } catch (error: any) {
      setOpen(true);
      setError(error.message ?? error ?? "Failed");
    } finally {
      setClaiming(false);
    }
  };

  const isToday = dayRelation(data?.last_claimed_at) === "today";

  return (
    <div>
      <Title title=" Your Rewards Journey" />

      <RewardConfirmModal
        open={open}
        status={error ? "error" : "success"} // or "error"
        pointsText={error ? error : ""}
        anchor={anchor}
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        title={error ? "Failed" : "Claimed"}
      />

      <ClaimReclaimModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        points={25}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PointsCard
          ICON={<FaAward className="text-primary-500" />}
          label="Points Balance"
          // iconColor="#9013fe"
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <PointCount point={formatNumber(data?.total_points || 0)} />
              <img
                src="/icons/gold-star.png"
                alt="Star gold coin icon"
                className="w-10"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-dark-300">{nextToClaim?.name}</span>
                <span className="text-dark-300 ">
                  {formatNumber(data?.total_points || 0)} /{" "}
                  {formatNumber(nextToClaim?.qualifying_points || 0)}
                </span>
              </div>
              <NumberProgress
                current={data?.total_points}
                max={nextToClaim?.qualifying_points}
              />

              <span className="text-dark-300 text-xs">
                🚀 Just getting started — keep earning points!
              </span>
            </div>
          </div>
        </PointsCard>
        <PointsCard
          ICON={<FaRegCalendar className="text-cyan-blue" />}
          label="Daily Streak"
        >
          <div className="p-4 flex flex-col gap-3">
            <PointCount point={`${data?.streaks || 0} days`} />

            <WeeklyRow
              streak={data?.streaks}
              last_claimed_at={data?.last_claimed_at}
            />

            <p className="text-sm text-gray-600 text-center mt-3">
              Check in daily to to earn +5 points
            </p>
            <Button disabled={isToday} onClick={(e) => handleClaim(e)}>
              {claiming ? (
                <span>
                  <Spinner /> Claiming...
                </span>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <BsLightning />
                  <span>
                    {isToday
                      ? "Claimed Today's points"
                      : "Claim Today's Points"}
                  </span>
                </div>
              )}
            </Button>
            {/* <Button onClick={handlePopulate}>
              {poulating ? (
                <Spinner />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <BsLightning />
                  <span>Claim Today's Points</span>
                </div>
              )}
            </Button> */}
          </div>
        </PointsCard>
        <PointsCard topDesign={false}>
          <div>
            <div className="p-4 bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] text-white relative overflow-hidden">
              <span className="tabsolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>

              <div className="flex items-center justify-between">
                <h3 className="text-[1.25rem] font-bold relative z-2">
                  Top Tool Spotlight
                </h3>
                <div className="overflow-hidden relative rounded-full size-10 md:size-16">
                  <img src="https://api.flowvahub.com/storage/v1/object/public/icons//reclaim%20(1).png" />
                </div>
              </div>

              <p className="text-lg">
                <strong>Reclaim</strong>
              </p>
            </div>

            <div className="p-4">
              <div className="flex justify-start mb-4">
                <div className="w-6 h-6 animate-pulse bg-primary-100 rounded-md flex items-center justify-center mr-4 shrink-0 text-primary-500">
                  <CgCalendar size={24} className="" />
                </div>

                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-sm">
                    Automate and Optimize Your Schedule
                  </h4>

                  <p className="text-sm text-gray-600">
                    Reclaim.ai is an AI-powered calendar assistant that
                    automatically schedules your tasks, meetings, and breaks to
                    boost productivity. Free to try — earn Flowva Points when
                    you sign up!
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 py-1.25 flex justify-between items-center border border-t-light-100 border-b-0 border-r-0 border-l-0">
              <div>
                <a
                  href="https://reclaim.ai/?utm_campaign=partnerstack&utm_term=ps_16ee8d9da128&pscd=go.reclaim.ai&ps_partner_key=MTZlZThkOWRhMTI4&ps_xid=a2wCEJSBqYOl5I&gsxid=a2wCEJSBqYOl5I&gspk=MTZlZThkOWRhMTI4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <FaUserPlus />
                    Sign up
                  </Button>
                </a>
              </div>
              <div>
                <Button
                  className="bg-[linear-gradient(45deg,#9013FE,#FF8687)]! text-sm!"
                  onClick={() => setOpenModal(true)}
                >
                  <HiGift />
                  Claim 50 points
                </Button>
              </div>
            </div>
          </div>
        </PointsCard>
      </div>
    </div>
  );
};

export default Journey;

// const WeekList

const WeeklyRow = ({
  streak,
  last_claimed_at,
}: {
  streak: number;
  last_claimed_at?: string | null;
}) => {
  const weekdays = buildWeekBadges(streak, last_claimed_at);

  return (
    <div className="flex mt-4 space-x-1 justify-center">
      {weekdays.map((w, i) => (
        <div
          key={i}
          className={[
            "min-h-10 min-w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
            w.isCurrentDay
              ? "ring-2 ring-primary-500 bg-gray-200 text-gray-700"
              : w.isClaimed
                ? "bg-cyan-blue text-white border-4 border-cyan-200"
                : "bg-gray-200 text-gray-500",
          ].join(" ")}
          title={w.date}
        >
          {w.Title}
        </div>
      ))}
    </div>
  );
};
