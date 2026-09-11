import { differenceInDays } from "date-fns";

export const isNewJob = (created_at: Date) => {
  const created = new Date(created_at);
  const now = new Date();
  
  if (isNaN(created.getTime())) return false;

  const daysDifference = differenceInDays(now, created);

  if (daysDifference >= 1) {
    return false;
  } else {
    return true;
  }
};
