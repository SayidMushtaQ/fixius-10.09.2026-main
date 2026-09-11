import JobPost from "@/backend/models/NewJob";
import userDb from "@/backend/models/userModel";
import { createError, errorResponse } from "@/backend/utils/errorHandler";
import { generateRandomPassword } from "@/helper/generateRandomPassword";
import getIpAddress from "@/helper/getIpAddress";
import { transporter } from "@/helper/mailTransporter";
import { sendMailSailerOption } from "@/helper/sendConfirmationEmailConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser } from "../user/createUser";
import User from "../user/interface";
import { sendJobAlertEmails } from "../JobAlert/matchJobs";
import { NextResponse, after } from "next/server";

const createJob = async (req: any) => {
  try {
    let body;
    if (typeof req.json === "function") {
      body = await req.json();
    } else {
      body = req.body;
    }
    
    let { newData } = body;
    // Moderation state is admin-only; never accept it from the client.
    if (newData && typeof newData === "object") {
      delete newData.isBlocked;
      delete newData.blockedReason;
      delete newData.blockedAt;
      delete newData.blockedBy;
    }
    const authHeader = req.headers.get ? req.headers.get("authorization") : req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const ipAddress = getIpAddress(req as any);
    const { contactDetails } = newData;
    const { name, phone, email, password: passwd, address } = contactDetails;

    const nameToUse = name || email.split("@")[0] || "Kunde";
    if (!phone || !email) {
      return NextResponse.json({ message: "Telefon und E-Mail sind erforderlich" }, { status: 400 });
    }

    let parsedAddress = address;
    if (address && typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (e) {
        console.error("Failed to parse address JSON", e);
        return NextResponse.json({ message: "Ungültiges Adressformat" }, { status: 400 });
      }
    }

    const listingId = Math.round(Math.random() * 10000000);
    const password = generateRandomPassword(12);
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    let userData = await userDb.findOne({ email });

    const createNewJob = async (userObj: any) => {
      const userAddress = userObj.address;
      if (!userAddress || !userAddress.coordinates) {
        throw new Error("Se requiere ubicación válida");
      }
      const newJobData = {
        ...newData,
        listingId,
        location: {
          place_name: userAddress.placeName,
          zip_code: userAddress.zipCode,
          type: "Point",
          coordinates: [
            userAddress.coordinates.lng,
            userAddress.coordinates.lat,
          ],
        },
        userId: userObj._id,
        status: userObj.status ? "open" : "pending",
      };
      return await new JobPost(newJobData).save();
    };

    if (token) {
      let decoded: any;
      try {
        decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string);
      } catch (err) {
        return NextResponse.json({ message: "Token inválido" }, { status: 401 });
      }

      if (!userData && decoded?._id) {
        userData = await userDb.findById(decoded._id);
      } else if (userData && decoded?._id && userData._id.toString() !== decoded._id) {
        userData = await userDb.findById(decoded._id);
      }

      if (!userData) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      if (userData.role !== "kunde") {
        return NextResponse.json({
          info: "Solo las clientas pueden publicar trabajos",
          success: 0,
          status: 401,
        }, { status: 401 });
      }

      const newJob = await createNewJob(userData);
      after(async () => {
        try {
          await sendJobAlertEmails(newJob._id);
        } catch (err) {
          console.error("Error sending job alerts in after():", err);
        }
      });

      return NextResponse.json({
        newJob,
        success: 1,
        status: 201,
        info: "Job erfolgreich veröffentlicht",
      }, { status: 201 });
    }

    if (!userData) {
      const userObj: User = {
        name: nameToUse,
        phone,
        email,
        address: parsedAddress,
        accessToken: "",
        refreshToken: "",
        role: "kunde",
        lastName: "",
        password: "",
        otp: hashedPassword,
        ip: ipAddress as string,
      };

      userData = await createUser(userObj);
      const newJob = await createNewJob(userData);

      after(async () => {
        try {
          await Promise.all([
            transporter.sendMail(sendMailSailerOption(email, password)),
            sendJobAlertEmails(newJob._id)
          ]);
        } catch (err) {
          console.error("Error sending user verify email / job alerts in after():", err);
        }
      });

      return NextResponse.json({
        info: "Wir haben Ihnen eine E-Mail gesendet. Bitte überprüfen Sie Ihr Konto",
        success: 1,
        status: 200,
      }, { status: 200 });
    }

    if (!userData.status) {
      await userDb.findByIdAndUpdate(userData._id, {
        $set: { otp: hashedPassword },
      });
      after(async () => {
        try {
          await transporter.sendMail(sendMailSailerOption(email, password));
        } catch (err) {
          console.error("Error sending verification email in after():", err);
        }
      });
      return NextResponse.json({
        info: "Wir haben Ihnen eine E-Mail gesendet. Bitte überprüfen Sie zuerst Ihr Konto",
        success: 1,
        status: 200,
      }, { status: 200 });
    }

    if (passwd && userData) {
      const isMatched = await bcrypt.compare(passwd, userData.password);

      if (isMatched) {
        if (userData.role === "kunde") {
          const newJob = await createNewJob(userData);
          after(async () => {
            try {
              await sendJobAlertEmails(newJob._id);
            } catch (err) {
              console.error("Error sending job alerts in after():", err);
            }
          });

          const accessToken = jwt.sign(
            { _id: userData._id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "365d" },
          );

          const refreshToken = jwt.sign(
            { _id: userData._id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "365d" },
          );

          await userDb.findByIdAndUpdate(userData._id, {
            accessToken,
            refreshToken,
            role: "kunde",
          });

          return NextResponse.json({
            info: "Job erfolgreich veröffentlicht",
            success: 1,
            status: 200,
            accessToken,
            refreshToken,
            user_details: userData,
          }, { status: 200 });
        }
        return NextResponse.json({
          info: "Solo las clientas pueden publicar trabajos",
          success: 0,
          status: 401,
        }, { status: 401 });
      }
      return NextResponse.json({
        info: "Contraseña no válida!Inicie sesión con contraseña válida",
        success: 0,
        status: 401,
      }, { status: 401 });
    }

    console.log("CreateJob Fallback: User exists but password logic not triggered", { hasPassword: !!passwd, hasUser: !!userData });
    return NextResponse.json({
      message: "Ungültige Anfrage. Passwort erforderlich für bestehende Benutzer.",
      success: 0,
      status: 400,
    }, { status: 400 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Interner Serverfehler" }, { status: 500 });
  }
};
export default createJob;
