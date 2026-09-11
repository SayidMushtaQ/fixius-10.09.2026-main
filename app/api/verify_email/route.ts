// Import necessary modules and types
import { connectDb } from "@/backend/middleware/db";
import Craftsman from "@/backend/models/CrafstmanModel";
import JobAlert from "@/backend/models/JobAlert";
import JobPost from "@/backend/models/NewJob";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { transporter } from "@/helper/mailTransporter";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleRequest(req, false);
}

export async function POST(req: NextRequest) {
  return handleRequest(req, true);
}

async function handleRequest(req: NextRequest, isPost: boolean) {
  const url = new URL(req.url);
  const origin = process.env.NEXT_PUBLIC_BASE_URL || url.origin;

  try {
    await connectDb();
    let payload: any;

    if (!isPost) {
      payload = Object.fromEntries(url.searchParams.entries());
    } else {
      const body = await req.json();
      payload = body.queryData || body;
    }

    const email = payload.email || "";
    const password = payload.id || "";
    const isReset = payload.reset || "";
    const handyman = payload.handyman || "";
    const craftsmanId = payload.craftsmanId;
    const client = payload.client || "";

    const userDetails = await userDb.findOne({ email: email }).populate({
      path: "address",
      model: PostalCode,
      select: "Postal_Code",
    });

    if (!userDetails) {
      return NextResponse.json({ message: "Benutzer nicht gefunden" }, { status: 404 });
    }

    if (!isReset && userDetails.status) {
      if (isPost) {
        return NextResponse.json({ matched: true, message: "Bereits verifiziert" }, { status: 200 });
      }
      return NextResponse.redirect(`${origin}?email_verification=already_verified`, { status: 302 });
    }

    const isMatched = await bcrypt.compare(password as string, userDetails.otp);

    if (isMatched) {
      if (isReset) {
        await userDb.findByIdAndUpdate(userDetails._id, {
          $set: { password: userDetails.otp, otp: "" },
        });
      } else if (handyman || client) {
        let updateData: any = {
          password: userDetails.otp,
          otp: "",
          status: true,
        };
        if (handyman) {
          const craftsman = await Craftsman.findById(craftsmanId);
          if (!craftsman) return NextResponse.json({ message: "invalid request" }, { status: 400 });
          await JobAlert.create({
            userId: userDetails._id,
            location: [userDetails.address.Postal_Code],
            keywords: craftsman.services,
          });
          updateData = { ...updateData, craftsman: craftsmanId };
        }
        await userDb.findByIdAndUpdate(userDetails._id, {
          $set: updateData,
        });
        
        // Only send this if it's actually a handyman requiring manual review
        if (handyman) {
          await transporter.sendMail({
            from: `'Fixius'<${process.env.NEXT_PUBLIC_EMAIL}>`,
            to: `${email}`,
            subject: `Information: Profilverifizierung erforderlich`,
            html: "<h1>Wir haben Ihr Konto erfolgreich aktiviert. Unser Team wird Ihr Profil in Kürze überprüfen.</h1>",
          });
        }
      }

      if (client) {
        await JobPost.updateMany(
          { userId: userDetails._id, status: "pending" },
          { $set: { status: "open" } }
        );
      }

      if (isPost) {
        return NextResponse.json({ matched: true, role: userDetails.role }, { status: 200 });
      }

      const redirectUrl = `${origin}/dashboard/${userDetails.role}?email_verification=success&eid=${userDetails.email}&id=${password}&reset=${isReset}&handyman=${handyman}&client=${client}&role=${userDetails.role}`;
      
      return NextResponse.redirect(redirectUrl, { status: 302 });
    } else {
      if (isPost) {
        return NextResponse.json({ matched: false, message: "Ungültiges OTP" }, { status: 400 });
      }
      return NextResponse.redirect(`${origin}/?email_verification=failed`, { status: 302 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "E-Mail konnte nicht verifiziert werden" }, { status: 500 });
  }
}
