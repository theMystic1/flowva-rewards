// streak-week.ts
type DayBadge = {
  weekDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  Title: "M" | "T" | "W" | "T" | "F" | "S" | "S";
  isCurrentDay: boolean;
  isClaimed: boolean;
  date: string; // YYYY-MM-DD (in Africa/Lagos)
};

const MON_TO_SUN: Array<DayBadge["weekDay"]> = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const TITLES: Array<DayBadge["Title"]> = ["M", "T", "W", "T", "F", "S", "S"];

const TZ = "Africa/Lagos";

function dateInTZ(d: Date | string, tz = TZ): Date {
  const s = typeof d === "string" ? new Date(d) : d;
  // Build a new Date from the TZ-adjusted parts to avoid UTC drift
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(s);

  const get = (t: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === t)?.value);
  const y = get("year"),
    m = get("month"),
    d0 = get("day"),
    hh = get("hour"),
    mm = get("minute"),
    ss = get("second");
  return new Date(y, (m ?? 1) - 1, d0 ?? 1, hh ?? 0, mm ?? 0, ss ?? 0);
}

function ymd(d: Date, tz = TZ): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`; // YYYY-MM-DD
}

function mondayBasedIndex(jsGetDay: number): number {
  // JS: 0=Sun..6=Sat  →  Mon=0..Sun=6
  return (jsGetDay + 6) % 7;
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

export function buildWeekBadges(
  streak: number,
  lastClaimedAt?: string | Date | null,
  tz = TZ
): DayBadge[] {
  // Today/yesterday in TZ
  const nowTZ = dateInTZ(new Date(), tz);
  const todayYMD = ymd(nowTZ, tz);
  const todayIndex = mondayBasedIndex(nowTZ.getDay());

  const monday = addDays(
    dateInTZ(new Date(`${todayYMD}T00:00:00`), tz),
    -todayIndex
  );
  const weekDates: string[] = Array.from({ length: 7 }, (_, i) =>
    ymd(addDays(monday, i), tz)
  );

  const badges: DayBadge[] = MON_TO_SUN.map((wd, i) => ({
    weekDay: wd,
    Title: TITLES[i],
    isCurrentDay: i === todayIndex,
    isClaimed: false,
    date: weekDates[i],
  }));

  if (streak <= 0 || !lastClaimedAt) {
    return badges;
  }

  const lastYMD = ymd(dateInTZ(lastClaimedAt, tz), tz);
  const isLastToday = lastYMD === todayYMD;

  const endIndex = isLastToday ? todayIndex : (todayIndex + 6) % 7;

  let remaining = streak;
  let idx = endIndex;
  while (remaining > 0) {
    badges[idx].isClaimed = true;
    remaining--;
    idx = (idx + 6) % 7;
  }

  return badges;
}
