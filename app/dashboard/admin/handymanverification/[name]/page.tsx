import { connectDb } from "@/backend/middleware/db";
import Craftsman from "@/backend/models/CrafstmanModel";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";
import CompareDocs from "@/components/Dashboard/admin/HandymanVerification/components/compareDocs";
import VerificationCard from "@/components/Dashboard/admin/HandymanVerification/components/verificationCard";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handwerker-Verifizierung Details | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const supportedExtensions = ["jpg", "jpeg", "png", "gif", "pdf"];
const getFileExtension = (url: string = ""): string | "" => {
  const extension = url.split(".").pop()?.toLowerCase() || "";
  return supportedExtensions.includes(extension) ? extension : "";
};

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function CraftsmanVerificationDetailsPage({ params }: PageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  await connectDb();

  const craftsman = await Craftsman.findOne({
    company_name: decodedName,
  })
    .populate({
      path: "user",
      model: userDb,
      populate: {
        path: "address",
        model: PostalCode,
        select: "Place_Name",
      },
    })
    .exec();

  if (!craftsman) {
    notFound();
  }

  const data = JSON.parse(JSON.stringify(craftsman));
  const documentUrls = data?.documents || [];
  
  // For the display logic from the old version
  const currentDocumentUrl = documentUrls[0]; // Old version used state for this, we can stick to simple for now or mirror full logic
  const fileExtension = currentDocumentUrl ? getFileExtension(currentDocumentUrl.document_link) : "";

  return (
    <main className="w-full">
      <div className="max-w-[700px] mb-10">
        <VerificationCard
          name={data.company_name}
          time={data.createdAt}
          isViewing={true}
          message={data.message}
          documents={documentUrls}
          user={data.user._id}
          status={data.status}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Hochgeladene Dokumente</h2>
          {documentUrls.length > 0 ? (
            <div className="space-y-8">
              {documentUrls.map((doc: any, index: number) => {
                const ext = getFileExtension(doc.document_link);
                return (
                  <div key={index} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                    <p className="font-semibold mb-3">
                      Dokumenttyp:{" "}
                      <Link
                        href={doc.document_link}
                        target="_blank"
                        className="text-blue-500 hover:underline capitalize"
                      >
                        {doc.document_type.split("_").join(" ")}
                      </Link>
                    </p>
                    <div className="bg-gray-50 rounded-lg p-2 flex justify-center items-center min-h-[400px]">
                      {ext === "pdf" ? (
                        <iframe
                          title={`Document Viewer ${index}`}
                          src={doc.document_link}
                          width="100%"
                          height="500px"
                          className="border-none"
                        />
                      ) : (
                        <img
                          src={doc.document_link}
                          alt={`Document ${index}`}
                          className="max-w-full max-h-[600px] object-contain rounded"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Keine Dokumente hochgeladen.</p>
          )}
        </div>

        <div className="lg:w-80">
          <CompareDocs data={data.user} company_name={data.company_name} />
        </div>
      </div>
    </main>
  );
}
