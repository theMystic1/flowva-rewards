import * as React from "react";

type BlockProps = {
  className?: string;
  rounded?: string;
};

export const SkeletonBlock: React.FC<BlockProps> = ({
  className = "",
  rounded = "rounded-md",
}) => (
  <div
    aria-hidden="true"
    className={`relative overflow-hidden bg-gray-200 ${rounded} ${className}`}
  >
    <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

export const SkeletonLine = ({
  w = "w-32",
  h = "h-3",
  className = "",
}: {
  w?: string;
  h?: string;
  className?: string;
}) => <SkeletonBlock className={`${w} ${h} ${className}`} rounded="rounded" />;

export const SkeletonPill = ({ w = "w-24" }: { w?: string }) => (
  <SkeletonBlock className={`${w} h-8`} rounded="rounded-full" />
);

export const SkeletonStyles = () => (
  <style>{`
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
);
