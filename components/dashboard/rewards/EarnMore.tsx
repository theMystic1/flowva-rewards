import type { ChildrenType } from "types/type";
import { BiStar } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
import { useState } from "react";
import ShareStackModal from "components/ui/shareStackModal";
import { Title } from "./points";

const EarnMore = () => {
  const [openStackModal, setOpenStackModal] = useState(false);

  return (
    <div className="space-y-6">
      <ShareStackModal
        open={openStackModal}
        onClose={() => setOpenStackModal(false)}
      />
      <Title title="Earn More Points" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <EarnMoreCard>
          <TopCard
            icon={<BiStar size={20} />}
            header="Refer and win 10,000 points!"
          />
          <BottomCard>
            <div>
              <p className="font-semibold  text-sm ">
                Invite 3 friends by Nov 20 and earn a chance to be one of 5
                winners of <span className="text-primary-500">10,000</span>{" "}
                points. Friends must complete onboarding to qualify.
              </p>
            </div>
          </BottomCard>
        </EarnMoreCard>

        <EarnMoreCard>
          <TopCard
            icon={<IoShareSocialSharp size={20} />}
            header="Share Your Stack"
            subH="Earn +25 pts"
          />
          <BottomCard>
            <div>
              <p className="font-semibold  text-sm ">Share your tool stack</p>
            </div>
            <button
              className="bg-primary-100 hover:text-white hover:bg-primary-500 text-primary-500 py-2 px-4 rounded-full font-semibold text-sm transition-all duration-200 inline-flex items-center gap-2 border-0"
              onClick={() => setOpenStackModal(true)}
            >
              <IoShareSocialSharp size={20} />
              Share
            </button>
          </BottomCard>
        </EarnMoreCard>
      </div>
    </div>
  );
};

export default EarnMore;

const TopCard = ({
  icon,
  header,
  subH,
}: {
  icon: any;
  header: string;
  subH?: string;
}) => {
  return (
    <div className="p-4 border border-b-light-100 border-t-0 border-r-0 border-l-0 bg-white flex items-center gap-3">
      <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(228,144,230,0.1)] text-primary-500">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{header}</h3>
        {subH ? <p className="text-xs text-gray-500">{subH}</p> : null}
      </div>
    </div>
  );
};

const BottomCard = ({ children }: ChildrenType) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
};

const EarnMoreCard = ({ children }: ChildrenType) => {
  return (
    <div className="transition-all hover:border-primary-500 hover:translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] ease-linear duration-200 border border-light-200 rounded-xl overflow-hidden">
      {children}
    </div>
  );
};
