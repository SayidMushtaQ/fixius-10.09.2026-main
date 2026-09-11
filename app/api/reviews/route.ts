import { createReview } from "@/backend/controllers/Reviews/createReview";
import { deleteReviewById } from "@/backend/controllers/Reviews/deactivateReview";
import { getReviewsByUserId } from "@/backend/controllers/Reviews/getReviews";
import { updateReview } from "@/backend/controllers/Reviews/updateReview";
import { connectDb } from "@/backend/middleware/db";
import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let userId = token._id;
    const pageSize = Number(req.nextUrl.searchParams.get("pageSize")) || 10;
    const pageNumber = Number(req.nextUrl.searchParams.get("pageNumber")) || 1;
    
    if (token.role === "handwerker") userId = token.craftsman;
    
    const reviews = await getReviewsByUserId(userId, { pageNumber, pageSize });
    return NextResponse.json({ message: "Los datos obtenidos con éxito", ...reviews }, { status: 200 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (token.role !== "kunde") {
      return NextResponse.json({ message: "No es un usuario válido para la revisión posterior" }, { status: 401 });
    }

    const payload = await req.json();
    const { offerId, rating, comment } = payload;
    if (!offerId || !rating || !comment) {
      return NextResponse.json({ message: "required params is missing" }, { status: 400 });
    }

    const response = await createReview(offerId, rating, comment);
    return NextResponse.json({ message: "Revisión publicada", response }, { status: 201 });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = await req.json();
    if (token.role === "client" || token.role === "kunde") {
      const { reviewId, data } = payload;
      const { rating, comment } = data;
      const response = await updateReview(reviewId, token._id, rating, comment);
      return NextResponse.json({ message: "Revisión actualizada", data: response }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Solo la cliente puede actualizar la revisión." }, { status: 401 });
    }
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const token = verifyToken(req);
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.searchParams.get("_id");
    if (!id) return NextResponse.json({ message: "Id required" }, { status: 400 });

    if (token.role === "client" || token.role === "kunde") {
      const response = await deleteReviewById(id, token._id);
      return NextResponse.json({ message: "Revisión eliminada", data: response }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Solo la cliente puede eliminar la revisión." }, { status: 401 });
    }
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
