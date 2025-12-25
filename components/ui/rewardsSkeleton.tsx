// components/RewardsCardsSkeleton.tsx
type Props = { count?: number };
export function RewardsCardsSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gray-200 animate-pulse" />
          <div className="mx-auto mb-2 h-5 w-40 rounded bg-gray-200 animate-pulse" />
          <div className="mx-auto mb-4 h-4 w-56 rounded bg-gray-200 animate-pulse" />
          <div className="mx-auto mb-6 h-4 w-24 rounded bg-gray-200 animate-pulse" />
          <div className="h-10 w-full rounded-xl bg-gray-200 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
