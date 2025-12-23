import Button from "components/auth/btn";
import { FaAward, FaRegCalendar, FaUserPlus } from "react-icons/fa";
import { HiGift } from "react-icons/hi2";
import { PointsCard } from "./pointCard";
import NumberProgress from "../progressBar";
import { weekdays } from "constants/constant";
import { BsLightning } from "react-icons/bs";
import { CgCalendar } from "react-icons/cg";
import { PointCount, Title } from "./points";
const Journey = () => {
  return (
    <div>
      <Title title=" Your Rewards Journey" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PointsCard
          ICON={<FaAward className="text-primary-500" />}
          label="Points Balance"
          // iconColor="#9013fe"
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <PointCount point={"10"} />
              <img
                src="/icons/gold-star.png"
                alt="Star gold coin icon"
                className="w-10"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-dark-300">Progress to $5 Gift Card</span>
                <span className="text-dark-300 ">10/100</span>
              </div>
              <NumberProgress current={10} max={100} />

              <span className="text-dark-300 text-xs">
                🚀 Just getting started — keep earning points!
              </span>
            </div>
          </div>
        </PointsCard>
        <PointsCard
          ICON={<FaRegCalendar className="text-[#70D6FF]" />}
          label="Daily Streak"
        >
          <div className="p-4 flex flex-col gap-3">
            <PointCount point={"2 days"} />

            <div className="flex mt-4 space-x-1 justify-center">
              {weekdays.map((w, i) => (
                <div
                  key={i}
                  className={`${w.isClaimed ? "bg-[#70D6FF]! border-4 border-cyan-200 text-white" : w.isCurrentDay ? "ring-2 ring-primary-500 " : "  "} min-h-10 min-w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 bg-gray-200 text-gray-500`}
                >
                  {w.Title}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 text-center mt-3">
              Check in daily to to earn +5 points
            </p>
            <Button>
              <div className="flex items-center justify-center gap-2">
                <BsLightning />
                <span>Claim Today's Points</span>
              </div>
            </Button>
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
                <Button>
                  <FaUserPlus />
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="bg-[linear-gradient(45deg,#9013FE,#FF8687)]! text-sm!">
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
