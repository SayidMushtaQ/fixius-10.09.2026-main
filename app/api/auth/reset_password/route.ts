import { connectDb } from "@/backend/middleware/db";
import userDb from "@/backend/models/userModel";
import { generateRandomPassword } from "@/helper/generateRandomPassword";
import { transporter } from "@/helper/mailTransporter";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendResetPassMail } from "./emailOption";

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const { email } = payload;
    
    const user = await userDb.findOne({ email });
    const newPassword = generateRandomPassword(8);
    const hashPassword = await bcrypt.hash(newPassword, 10);

    if (user) {
      await userDb.findByIdAndUpdate(user._id, {
        $set: { password: hashPassword, otp: hashPassword },
      });
      try {
        await transporter.sendMail(sendResetPassMail(user, newPassword));
        return NextResponse.json({
          message: "Wir haben Ihnen eine E-Mail gesendet. Bitte überprüfen Sie Ihren Posteingang.",
        }, { status: 200 });
      } catch (emailError: any) {
        console.error("Email sending failed:", emailError);
        return NextResponse.json({
          message: "Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.",
          error: emailError.message,
        }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "Benutzer nicht gefunden" }, { status: 404 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
