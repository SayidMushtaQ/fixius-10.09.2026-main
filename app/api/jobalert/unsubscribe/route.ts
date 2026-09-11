import JobAlert from "@/backend/models/JobAlert";
import { connectDb } from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { transporter } from "@/helper/mailTransporter";
import { NextRequest, NextResponse } from "next/server";
import { sendUnsubscriptionConfirmation } from "./unsubscribeEmial";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const otp = req.nextUrl.searchParams.get("otp");
    const email = req.nextUrl.searchParams.get("email");

    if (!otp || !email) {
      return NextResponse.json({ message: "missing credentials" }, { status: 400 });
    }

    const user = await userDb.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    if (user.password !== otp) {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    const jobalert = await JobAlert.findOne({ userId: user._id });
    if (jobalert?.status === "inactive") {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    const updatedJobAlert = await JobAlert.findOneAndUpdate(
      { userId: user._id },
      { status: "inactive" }
    );

    if (!updatedJobAlert) {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    await transporter.sendMail(sendUnsubscriptionConfirmation(email));
    return NextResponse.redirect(new URL("/?job_alert_unsubscription=true", req.url));
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
