type SpinnerProps = {
  size?: number;
  thickness?: number;
  label?: string;
  className?: string;
};

export default function Spinner({
  size = 20,
  thickness = 3,
  label = "Loading",
  className = "text-white",
}: SpinnerProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="animate-spin"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
