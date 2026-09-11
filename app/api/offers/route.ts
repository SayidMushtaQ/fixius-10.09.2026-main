import createOffer from "@/backend/controllers/Offers/CreateOffer";
import getOffersByUser from "@/backend/controllers/Offers/GetOffer";
import updateOffer from "@/backend/controllers/Offers/UpdateOffer";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import Craftsman from "@/backend/models/CrafstmanModel";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let userId = token._id;
    if (token?.role === "handwerker") {
      userId = token.craftsman || userId; 
    }
    if (token.role === "admin") {
      const id = req.nextUrl.searchParams.get("userid");
      if (!id) return NextResponse.json({ message: "invalid req" }, { status: 400 });
      userId = id;
    }

    const pageSize = Number(req.nextUrl.searchParams.get("pageSize")) || 10;
    const pageNumber = Number(req.nextUrl.searchParams.get("pageNumber")) || 1;

    const response = await getOffersByUser(userId, { pageNumber, pageSize });

    return NextResponse.json({
      message: "data successfully fetched",
      ...response,
    }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (token?.role === "handwerker") {
      let userId = token.craftsman;
      if (!userId) {
        const craftsman = await Craftsman.findOne({ user: token._id });
        if (craftsman) userId = craftsman._id;
      }
      let objId = token._id;
      
      const body = await req.json();
      const { client, price, job } = body;
      if (!client || !price || !job) {
        return NextResponse.json({ message: "required params is missing" }, { status: 400 });
      }

      const response = await createOffer({ ...body, userId, objId });
      return NextResponse.json({
        message: "Oferta creada con éxito",
        response,
      }, { status: 201 });
    }
    
    return NextResponse.json({ message: "request is not authorized" }, { status: 401 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let userId = token._id;
    const body = await req.json();
    const { offerId, jobId, data = {} } = body;

    if (!offerId && Object.keys(data).length === 0) {
      return NextResponse.json({ message: "Required params is missing" }, { status: 400 });
    }
    if (data.status === "accepted" && !jobId) {
      return NextResponse.json({ message: "Se requiere una identificación de trabajo para aceptar la oferta" }, { status: 400 });
    }

    if (token.role === "handwerker") {
      if (data.status !== "withdrawn" && data.status !== undefined) {
        return NextResponse.json({ message: `Handyman no puede actualizar esto ${data.status}` }, { status: 401 });
      }
      userId = token.craftsman;
      if (!userId) {
        const craftsman = await Craftsman.findOne({ user: token._id });
        if (craftsman) userId = craftsman._id;
      }
    }

    const response = await updateOffer({
      offerId,
      jobId,
      userId,
      data,
    });

    return NextResponse.json({
      messag: "Oferta actualizada con éxito",
      data: response,
    }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
