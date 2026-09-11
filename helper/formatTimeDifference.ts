import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export const formatTimeDifference = (createdAt: string | Date): string => {
  if (!createdAt) return "vor wenigen Sekunden";
  
  let dateStr = typeof createdAt === "string" ? createdAt : createdAt.toISOString();
  
  // If the date string lacks a timezone indicator, append 'Z' to treat it as UTC
  // This fixes the bug where dates stored in UTC but returned without 'Z' are parsed as local time
  if (!dateStr.endsWith('Z') && !dateStr.includes('+') && !dateStr.match(/-\d{2}:\d{2}$/)) {
    dateStr += 'Z';
  }

  const created = new Date(dateStr);
  const now = new Date();

  // Try parsing from UTC if it's not a local time string, assuming DB stores UTC string
  if (isNaN(created.getTime())) {
    return "vor wenigen Sekunden";
  }

  const secondsDifference = differenceInSeconds(now, created);
  const minutesDifference = differenceInMinutes(now, created);
  const hoursDifference = differenceInHours(now, created);
  const daysDifference = differenceInDays(now, created);

  // If the job was just created or time is slightly in the future due to server clock sync
  if (secondsDifference < 60 || secondsDifference < 0) {
    return "vor wenigen Sekunden";
  } else if (minutesDifference < 60) {
    return `vor ${minutesDifference} Min.`;
  } else if (hoursDifference < 24) {
    return `vor ${hoursDifference} Std.`;
  } else {
    return `vor ${daysDifference} Tagen`;
  }
};
