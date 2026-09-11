import userDb from "@/backend/models/userModel";
import { createError } from "@/backend/utils/errorHandler";
import { verifyToken } from "./verifyJwt";

/**
 * Resolves the caller and asserts the admin role.
 * Throws a CustomError (401/403) that errorResponseAppRouter turns into a response.
 */
export const requireAdmin = async (req: any) => {
  const token = verifyToken(req);
  if (!token?._id) {
    createError("Unauthorized", 401);
  }

  const caller = await userDb.findById(token!._id);
  if (!caller || caller.role !== "admin") {
    createError("Kein Administratorzugriff", 403);
  }

  return caller!;
};
