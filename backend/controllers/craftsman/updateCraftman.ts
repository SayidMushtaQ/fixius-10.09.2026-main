import { verifyToken } from "@/backend/middleware/verifyJwt";
import Notification from "@/backend/models/Notifications";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next/types";
import { CraftmanDetails } from ".";
import Craftsman from "../../models/CrafstmanModel";
import { createApproval } from "../Approval";

// Function to update Craftsman details by user ID
export const UpdateCraftManById = async (data: CraftmanDetails) => {
  try {
    // Find and update Craftsman details
    const update = await Craftsman.findOneAndUpdate(
      { user: data.user },
      { $set: data },
      { new: true } // Return the updated document
    );

    return update;
  } catch (error) {
    throw error;
  }
};

// API route handler to update Craftsman details
const updateCraftsman = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let payload = req.body;
    const token = verifyToken(req);

    // Check role based on token and modify payload accordingly
    if (token?.role === "kunde") {
      createError("invalid request", 400);
    }

    if (token?.role === "handwerker") {
      // Remove status and message fields if role is handyman
      payload?.status && delete payload.status;
      payload?.message && delete payload.message;
      payload.user = token?._id;
    }

    if (token?.role === "admin") {
      // Validate required fields for admin role
      (!payload?.user || !payload?.status) &&
        createError("Falta los parámetros requeridos 'estado o usuario'", 400);

      if (payload?.status === "declined" && !payload?.message) {
        createError("Falta el 'mensaje' de parámetros requeridos", 400);
      }

      // Update payload with required fields
      payload = {
        status: payload?.status,
        message: payload.message || "",
        user: payload.user, //for identification
      };
    }

    // Update Craftsman details
    const result = await UpdateCraftManById(payload);

    // Send notification and create approval if role is admin
    if (token?.role === "admin") {
      if (payload.status === "verified") {
        await userDb.findByIdAndUpdate(result.user, {
          active_status: "active",
        });
      }
      const Noti = {
        userId: result.user,
        type: "verification",
        content: {
          text:
            result.status === "verified"
              ? "Glückwunsch! Ihre Verifizierung ist abgeschlossen"
              : `Tut uns leid! Ihre Verifizierung wurde abgelehnt. Grund: ${result.message}`,
          senderName: "",
          link: "/dashboard/handwerker/",
        },
      };

      // Create notification
      Notification.create(Noti);

      // Create approval
      createApproval({
        approver: token._id,
        requested_user: result.user,
        approval_action: result.status,
      });
    }

    // Send success response
    res.status(200).json({
      message: "Datos actualizados con éxito",
    });
  } catch (error: any) {
    // Handle errors
    errorResponse(res, error);
  }
};

export default updateCraftsman;
