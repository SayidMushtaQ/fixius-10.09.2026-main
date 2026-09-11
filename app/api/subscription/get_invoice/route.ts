import { verifyToken } from "@/backend/middleware/verifyJwt";
import { errorResponseAppRouter } from "@/backend/utils/errorHandler";
import generatePDFPayReceipt from "@/helper/invoicTemplate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = verifyToken(req);
    const body = await req.json();
    const { client, subscription } = body;

    if (!client?._id && !subscription) {
      return NextResponse.json({ message: "Required params are missing" }, { status: 400 });
    }

    const pdfBuffer = generatePDFPayReceipt({
      client,
      subscription,
    });

    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    
    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice${Date.now()}.pdf`,
      }
    });
  } catch (error: any) {
    return errorResponseAppRouter(error);
  }
}
