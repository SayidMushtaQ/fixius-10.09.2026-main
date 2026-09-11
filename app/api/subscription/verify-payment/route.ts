import { sendPaymentReceivedEmail } from "@/backend/controllers/Subscription/emails/sendEmailAfterConfirm";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import Notification from "@/backend/models/Notifications";
import Plans from "@/backend/models/Plan";
import Subscription from "@/backend/models/Subscription";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { transporter } from "@/helper/mailTransporter";
import { format } from "date-fns";
import { NextRequest, NextResponse, after } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token?.role !== "admin") {
      return NextResponse.json({ message: "invalid request" }, { status: 401 });
    }

    const body = await req.json();
    const subscriptionId = body.subscriptionId;

    if (!subscriptionId) return NextResponse.json({ message: "required params is missing" }, { status: 400 });

    const subscription = await Subscription.findById(subscriptionId).populate({ path: "plan", model: Plans });
    const plan: any = subscription?.plan;

    const start_date = Date.now();
    let end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + plan?.duration_in_days);

    const update = await Subscription.findOneAndUpdate(
      { _id: subscriptionId },
      {
        payment_status: "paid",
        status: "active",
        start_date,
        end_date,
      }
    );

    const craftsman: any = await Craftsman.findOneAndUpdate(
      { _id: update?.craftsmanId },
      {
        current_subscription: update?._id,
      }
    ).populate("user");

    const notification = {
      userId: craftsman.user,
      type: "other",
      content: {
        text: `Glückwunsch! Ihr ${plan?.duration_in_days}-Tage-Abonnement ist aktiv`,
        senderName: "admin",
        link: `/dashboard/handwerker/abonnementverwaltung/?subscriptionId=${subscriptionId}`,
      },
    };

    new Notification(notification).save();

    after(async () => {
      try {
        await transporter.sendMail(
          sendPaymentReceivedEmail(
            craftsman?.user?.email,
            craftsman?.user?.name,
            plan,
            format(start_date, "MM/dd/yyyy"),
            format(end_date, "MM/dd/yyyy")
          )
        );
      } catch (err) {
        console.error("Error sending payment received email in after():", err);
      }
    });

    return NextResponse.json({ data: update, userId: craftsman?.user?._id }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
