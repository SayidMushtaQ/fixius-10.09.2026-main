import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import userDb from "@/backend/models/userModel";
import { transporter } from "@/helper/mailTransporter";
import { sendChangePassMail } from "@/helper/sendConfirmEmailForChangePass";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;
    
    // Manual validation replacing express-validator
    const errors: any[] = [];
    if (!currentPassword) {
      errors.push({ msg: "Old password is required", path: "currentPassword" });
    }
    if (!newPassword || newPassword.length < 8 || newPassword.length > 12) {
      errors.push({ msg: "New password must be between 8 and 12 characters long", path: "newPassword" });
    }
    if (newPassword && !/[A-Z]/.test(newPassword)) {
      errors.push({ msg: "New password must contain at least one uppercase letter", path: "newPassword" });
    }
    if (newPassword && !/[a-z]/.test(newPassword)) {
      errors.push({ msg: "New password must contain at least one lowercase letter", path: "newPassword" });
    }
    if (newPassword && !/\d/.test(newPassword)) {
      errors.push({ msg: "New password must contain at least one number", path: "newPassword" });
    }
    if (newPassword && !/\W/.test(newPassword)) {
      errors.push({ msg: "New password must contain at least one special character", path: "newPassword" });
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await connectDb();
    const tokenUser = verifyToken(req);

    if (tokenUser) {
      const user = await userDb.findById(tokenUser._id);
      
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const isMatched = await bcrypt.compare(currentPassword, user.password);
      if (isMatched) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userDb.findByIdAndUpdate(user._id, {
          $set: { password: hashPassword },
        });
        await transporter.sendMail(sendChangePassMail(user));

        return NextResponse.json({ message: "Passwort erfolgreich geändert" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Aktuelles Passwort ungültig" }, { status: 401 });
      }
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
