import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { transporter } from "@/helper/mailTransporter";
import { NextApiRequest, NextApiResponse } from "next/types";
import { sendBankDetailsEmail } from "./emails/PaymentDetailsTemplate";
export const createSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { planId, payment_details, craftsman, _id: userId } = req.body; //planId and payment details comes from client
    // console.log(payment_details);
    // Check if required parameters are present
    if (!craftsman || !planId || !payment_details) {
      const missingParams: string[] = [];
      if (!craftsman) missingParams.push("craftsmanId");
      if (!planId) missingParams.push("planId");
      if (!payment_details?.payment_method)
        missingParams.push("payment_method");

      if (
        payment_details?.payment_method === "bank_transfer" &&
        !payment_details?.bank_details
      ) {
        missingParams.push("bank details");
      }

      createError(
        `Required parameters are missing: ${missingParams.join(", ")}`,
        400
      );
    }

    const plan = await Plans.findById(planId);
    if (!plan) {
      return createError("Plan not found", 404);
    }
    // Calculate end date based on plan duration
    const start_date = Date.now();
    let end_date = new Date(start_date); // Assuming start_date is provided in the request
    end_date.setDate(end_date.getDate() + plan.duration_in_days);

    const paymentId = `pmt${Date.now()}`;
    // Create a new subscription
    const newSubscription = new Subscription({
      craftsmanId: craftsman,
      plan,
      start_date,
      end_date,
      payment_details,
      paymentId: paymentId,
    });

    // Save the new subscription to the database
    await newSubscription.save();

    // send payment details
    const user = await userDb.findById(userId);
    await transporter.sendMail(
      sendBankDetailsEmail(user.email, user.name, plan, paymentId)
    );
    res.status(201).json(newSubscription);
  } catch (error: any) {
    console.error(error);
    errorResponse(res, error);
  }
};
