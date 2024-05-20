import { developerTimezone } from "@/constants/constants";

export function getCurrentHourAndMinuteInDeveloperTimezone() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: developerTimezone,
  });
  return formatter.format(now);
}

export function getCurrentYearInDeveloperTimezone() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: developerTimezone,
  });
  return formatter.format(now);
}