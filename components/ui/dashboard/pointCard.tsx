import type { ReactNode } from "react";

export const PointsCard = ({
  children,
  topDesign = true,
  ICON,
  label,
}: {
  children: ReactNode;
  topDesign?: boolean;
  ICON?: any;

  label?: string;
}) => {
  return (
    <div
      className={`shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all rounded-2xl hover:translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-light-100 overflow-hidden duration-200 min-h-50`}
    >
      {topDesign ? (
        <div className="p-4 relative border border-b-light-100 bg-primary-100 border-t-0 border-r-0 border-l-0">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            {ICON}
            <span>{label}</span>
          </h3>
        </div>
      ) : null}

      {children}
    </div>
  );
};
