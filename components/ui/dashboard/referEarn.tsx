import { LuUsers } from "react-icons/lu";
import { Title } from "./points";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { Socials } from "constants/constant";
import { useUser } from "hooks/useUser";
import { RewardsCardsSkeleton } from "../rewardsSkeleton";
import { copyToClipboard } from "lib/helpers";
import { useState } from "react";

const ReferEarn = () => {
  const { isLoading, data } = useUser();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (tx: string) => {
    try {
      await copyToClipboard(tx);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {}
    // Optionally show a toast notification here
  };

  if (isLoading) return <RewardsCardsSkeleton count={3} />;

  return (
    <div className="space-y-6">
      <Title title="Refer & Earn" />

      <div className="shadow-[0_5px_15px_rgba(0,0,0,0.05)]  hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-light-100 overflow-hidden transition-shadow duration-200">
        <div className="p-4 relative border border-b-light-100 bg-primary-100 border-t-0 border-r-0 border-l-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(228,144,230,0.1)] text-primary-500">
              <LuUsers size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-dark-400">Share Your Link</h3>
              <p className="text-sm  text-dark-300">
                Invite friends and earn 25 points when they join!
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-6">
            <div className="flex justify-between mb-4">
              <RefPoinEarned name="Referrals" point={data?.ref_count || 0} />
              <RefPoinEarned
                name="Points Earned"
                point={data?.ref_points || 0}
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg ">
          <p className="text-sm mb-2 text-gray-700">
            Your personal referral link:
          </p>
          <div className="relative">
            <input
              type="text"
              readOnly
              className="flex-1  border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full pr-10"
              value={"https://app.flowvahub.com/signup/?ref=lucky1932"}
            />
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
              onClick={() =>
                handleCopy("https://app.flowvahub.com/signup/?ref=lucky1932")
              }
            >
              {copied ? (
                <IoCheckmark className="text-green-500" size={20} />
              ) : (
                <IoCopyOutline className="text-primary-500" size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 my-4">
          {Socials.map((so, i) => {
            const { Icon, url, color } = so;
            return (
              <a
                href={so.url}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
              >
                <button
                  className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-[18px] transition-transform duration-200 hover:translate-y-0.75"
                  style={{
                    color,
                  }}
                >
                  {<Icon size={24} />}
                </button>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;

const RefPoinEarned = ({ name, point }: { name: string; point: number }) => {
  return (
    <div className="text-center p-2 flex-1">
      <div className="text-[1.5rem] font-semibold text-primary-500">
        {point}
      </div>
      <div className="text-gray-600">{name}</div>
    </div>
  );
};
