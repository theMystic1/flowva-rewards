import React from "react";

type NumberProgressProps = {
  current: number;
  max: number;
  showLabel?: boolean;
  precision?: number;
  className?: string;
  barClassName?: string;
};

export default function NumberProgress({
  current,
  max,
  showLabel = true,
  precision = 0,
  className = "",
  barClassName = "",
}: NumberProgressProps) {
  const safeMax = Math.max(0, max);
  const ratio = safeMax === 0 ? 0 : current / safeMax;
  const clamped = Math.min(1, Math.max(0, ratio));
  const percent = +(clamped * 100).toFixed(precision);

  return (
    <div className={`w-full`} aria-label="Progress">
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${percent}%`}
        className={`h-2 w-full rounded-full bg-gray-200 overflow-hidden ${className}`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out bg-primary-500 ${barClassName}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* {showLabel && (
        <div className="mt-1 text-xs text-gray-600">{percent}%</div>
      )} */}
    </div>
  );
}
