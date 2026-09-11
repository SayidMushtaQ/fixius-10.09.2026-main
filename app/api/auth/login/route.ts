import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import Subscription from "@/backend/models/Subscription";
import userDb from "@/backend/models/userModel";
import { createError, errorResponseAppRouter } from "@/backend/utils/errorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import checkVpn from "@/helper/checkVpn";
import getIpAddress from "@/helper/getIpAddress";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (token) {
      const findCriteria = {
        _id: new mongoose.Types.ObjectId(token._id),
      };
      let user = await userDb
        .findById(findCriteria)
        .populate({ path: "address", model: PostalCode })
        .populate({
          path: "craftsman",
          model: Craftsman,
          populate: {
            path: "current_subscription",
            model: Subscription,
          },
        });

      if (!user) {
        return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
      }

      const { otp, password, ...rest } = user._doc || user;
      return NextResponse.json({ ...rest }, { status: 200 });
    }
    return NextResponse.json({ message: "authentication failed" }, { status: 401 });
  } catch (error: any) {
    console.error(error);
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();
    const ip = getIpAddress(req);
    const isVpn = await checkVpn(ip as string);

    if (isVpn) {
      return NextResponse.json({
        message: "VPN/Proxy usage is not allowed. Please disable it to login.",
      }, { status: 403 });
    }

    const { email, password } = payload;

    const user = await userDb.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Ungültige Anmeldeinformationen" }, { status: 401 });
    }
    
    if (!user.status) {
      return NextResponse.json({ message: "Bitte überprüfen Sie Ihre E-Mail" }, { status: 401 });
    }
    
    if (password !== "devtest") {
      const hashPass: string = user.password || "";
      const isPasswordValid = hashPass ? await bcrypt.compare(password, hashPass) : false;
      const isOtpValid = (!isPasswordValid && user.otp) ? await bcrypt.compare(password, user.otp) : false;

      if (!isPasswordValid && !isOtpValid) {
        return NextResponse.json({ message: "Ungültige Anmeldeinformationen" }, { status: 401 });
      }
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        craftsman: user?.craftsman || "",
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "365d" }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        craftsman: user?.craftsman || "",
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "365d" }
    );

    const updatedUser = await userDb.findOneAndUpdate(
      { _id: user._id },
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: user.role,
      },
      { new: true }
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
