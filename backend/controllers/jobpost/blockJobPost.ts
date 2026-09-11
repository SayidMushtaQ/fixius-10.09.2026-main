import JobPost from "@/backend/models/NewJob";
import { createError } from "@/backend/utils/errorHandler";

/**
 * Blocks or unblocks an ad. Admin-only — the caller must already be
 * authorised via requireAdmin. Unlike updateJobPost this is deliberately
 * NOT scoped to the ad owner.
 */
export const setJobPostBlocked = async (
  id: string,
  {
    blocked,
    reason,
    adminId,
  }: { blocked: boolean; reason?: string; adminId: string },
) => {
  if (!id) {
    createError("Object id is undefined", 400);
  }

  const updates = blocked
    ? {
        $set: {
          isBlocked: true,
          blockedReason: reason?.trim() || "",
          blockedAt: new Date(),
          blockedBy: adminId,
        },
      }
    : {
        $set: { isBlocked: false },
        $unset: { blockedReason: "", blockedAt: "", blockedBy: "" },
      };

  const job = await JobPost.findByIdAndUpdate(id, updates, { new: true });

  if (!job) {
    createError("Anzeige nicht gefunden", 404);
  }

  return job;
};
