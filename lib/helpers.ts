export const isEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isStrongPwd = (pwd: string) =>
  pwd.length >= 8 &&
  /[A-Z]/.test(pwd) &&
  /[a-z]/.test(pwd) &&
  /[0-9]/.test(pwd) &&
  /[@$!%*?&]/.test(pwd);

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatDateToCustomISO = (date: Date): string => {
  const iso = date.toISOString();
  const [datePart, timePart] = iso.split("T");
  const [time, tz] = timePart.split("Z");
  const [hms, ms] = time.split(".");
  const microseconds = ms.padEnd(6, "0"); // Pad milliseconds to 6 digits for microseconds
  return `${datePart} ${hms}.${microseconds}+00`;
};

type Input = Date | string | number;

const dayKey = (d: Input, timeZone?: string): string => {
  const date = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone, // e.g. "Africa/Lagos" (optional)
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const isToday = (d: Input, timeZone?: string): boolean => {
  const now = new Date();
  return dayKey(d, timeZone) === dayKey(now, timeZone);
};

export const isYesterday = (d: Input, timeZone?: string): boolean => {
  const now = new Date();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  return dayKey(d, timeZone) === dayKey(yest, timeZone);
};

export const dayRelation = (
  d: Input,
  timeZone?: string
): "today" | "yesterday" | "other" => {
  if (isToday(d, timeZone)) return "today";
  if (isYesterday(d, timeZone)) return "yesterday";
  return "other";
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    // Fallback for older browsers could be added here if needed
  }
};
