import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const RewardsHeader = () => {
  return (
    <div className="fixed bg-gray-50 w-full left-60 right-0 top-0 z-50 p-4">
      <div className=" bg-gray-50 flex justify-between items-center w-full">
        <div className="flex items-center">
          <button className="lg:hidden">
            <GiHamburgerMenu />
          </button>
          <h1 className="text-xl md:text-[1.5rem] font-medium ">Rewards Hub</h1>
        </div>

        <div className="mt-2">
          <div className="notification-container group">
            <button className="notification-bell has-unread">
              <FaBell
                className="svg-inline--fa fa-bell text-[#2D3748] group-hover:text-primary-500"
                size={20}
              />
              <span className="notification-badge">2</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-dark-300 ">
        Earn points, unlock rewards, and celebrate your progress!
      </p>
    </div>
  );
};

export default RewardsHeader;
