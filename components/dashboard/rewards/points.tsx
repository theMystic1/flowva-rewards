import EarnMore from "./EarnMore";
import Journey from "./Journey";
import ReferEarn from "./referEarn";

const Points = () => {
  return (
    <div>
      <Journey />
      <EarnMore />
      <ReferEarn />
    </div>
  );
};

export default Points;

export const PointCount = ({ point }: { point: string }) => {
  return (
    <div className="font-extrabold text-[36px] text-primary-600 m-[10px_0]">
      {point}
    </div>
  );
};

export const Title = ({ title }: { title: string }) => {
  return (
    <h2 className=" text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-primary-500 pl-3 font-semibold">
      {title}
    </h2>
  );
};
