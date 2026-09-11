import RegisterCraftMan from "@/backend/controllers/craftsman/createCraftman";
import { connectDb } from "@/backend/middleware/db";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import getIpAddress from "@/helper/getIpAddress";
import checkVpn from "@/helper/checkVpn";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const payload = await req.json();

    if (payload.role === "handwerker") {
      const ipAddress = getIpAddress(req);
      const isVpn = await checkVpn(ipAddress as string);

      if (isVpn) {
        return NextResponse.json({
          message: "VPN/Proxy usage is not allowed. Please disable it to register.",
        }, { status: 403 });
      }

      const response = await RegisterCraftMan(payload, ipAddress as string);
      if (response) {
        return NextResponse.json({
          message: "Wir haben Ihnen eine E-Mail gesendet. Bitte überprüfen Sie Ihren Posteingang",
        }, { status: 200 });
      } else {
        throw new Error("Registration response empty");
      }
    }
    
    return NextResponse.json({ message: "Invalid role or request" }, { status: 400 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
