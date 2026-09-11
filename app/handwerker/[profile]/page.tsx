import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDb } from "@/backend/middleware/db";
import Craftsman from "@/backend/models/CrafstmanModel";
import userDb from "@/backend/models/userModel";
import Review from "@/backend/models/ReviewModel";
import OfferDb from "@/backend/models/Offer";
import ProfileIndex from "@/components/Profile";
import { Providers } from "@/app/providers"; // Ensure providers are available for ChatContext etc.
import { ChatProvider } from "@/context/ChatContext";

type Props = {
  params: { profile: string };
};

// Internal data fetching for Server Component
async function getProfileData(profile: string) {
  await connectDb();
  
  try {
    const craftMan = await Craftsman.findOne({
      company_name: profile,
    })
      .populate({
        path: "user",
        model: userDb,
        select: "name lastName phone zipCode profile_photo streetAddress address",
      })
      .populate({
        path: "reviews",
        model: Review,
        match: { status: "active" },
        populate: {
          path: "client",
          model: userDb,
          select: "name lastName profile_photo",
        }
      })
      .lean();

    if (craftMan) {
      const completedJobsCount = await OfferDb.countDocuments({
        craftman: (craftMan as any)._id,
        status: "accepted",
      });
      (craftMan as any).completedJobsCount = completedJobsCount;
    }

    return craftMan;
  } catch (error) {
    console.error("Error fetching profile from DB:", error);
    return null;
  }
}

// Generate metadata for the profile
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profile: profileParam } = await params;
  const profile = decodeURIComponent(profileParam);
  const data = await getProfileData(profile);

  if (!data) return { title: "Handwerker Profil" };

  const address = (data as any).user?.address?.Place_Name || "Ihrer Nähe";

  return {
    title: `Profil von ${profile} in ${address} - Qualitäts-Reparaturdienste`,
    description: `Suchen Sie einen zuverlässigen Handwerker? Entdecken Sie das Profil von ${profile} in ${address}. Lesen Sie Bewertungen und nehmen Sie direkt Kontakt auf.`,
    robots: "index, follow",
    alternates: {
      canonical: `/handwerker/${profileParam}`,
    }
  };
}

export default async function ProfilePage({ params }: Props) {
  const { profile: profileParam } = await params;
  const profile = decodeURIComponent(profileParam);
  const profileData = await getProfileData(profile);

  if (!profileData) {
    return notFound();
  }

  const address = (profileData as any).user?.address?.Place_Name || "";

  // Structure JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.fixius.de/handwerker/${profileParam}#localbusiness`,
    name: profile,
    url: `https://www.fixius.de/handwerker/${profileParam}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
      addressCountry: "DE",
    },
    image: (profileData as any).user?.profile_image || "https://www.fixius.de/logo.jpg",
    priceRange: "$$",
    isPartOf: {
      "@id": "https://www.fixius.de/#website",
    },
  };

  return (
    <main className="min-h-screen bg-mainBackground pb-20">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ChatProvider>
        <div className="Container">
          {/* Reuse the existing ProfileIndex component which handles the sub-sections */}
          <ProfileIndex profileData={profileData} />
        </div>
      </ChatProvider>
    </main>
  );
}
