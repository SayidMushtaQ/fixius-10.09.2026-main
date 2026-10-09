// components/FindHandyman/mapUserToCard.ts
export type CardData = {
  id?: string;
  name: string;
  initials: string;
  photo?: string;
  verified: boolean;
  place: string;
  zip: string;
  description: string;
  rating: number;
  reviewCount: number;
  services: string[];
  profileHref: string;
};

export const SAMPLE_DESCRIPTION =
  "Wir bieten professionelle und qualitativ hochwertige Handwerksdienste an. Kontaktieren Sie uns für ein Angebot und um Ihr Projekt zu starten.";

export function getInitials(name: string) {
  return (
    name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map((w) => w[0]?.toUpperCase()).join("") || "HW"
  );
}

export function mapUserToCard(user: any): CardData {
  const c = user?.craftsman || {};
  const name = c.company_name || user?.name || "Handwerker";

  const services: string[] = Array.isArray(c.services)
    ? c.services
    : String(c.services || "").split(/[,|]/).map((s) => s.trim()).filter(Boolean);

  return {
    id: String(user?._id || ""),
    name,
    initials: getInitials(name),
    photo: user?.profile_photo,
    verified: c.status === "verified",
    // tolerate both shapes in case the API still returns the old key
    place: user?.address?.placeName ?? user?.address?.Place_Name ?? "",
    zip: String(user?.address?.zipCode ?? ""),
    description: c.description || SAMPLE_DESCRIPTION,
    rating: Number(user?.avgRating) || 0,
    reviewCount: Array.isArray(c.reviews) ? c.reviews.length : 0,
    services: services.slice(0, 4),
    profileHref: c.company_name
      ? `/handwerker/${encodeURIComponent(c.company_name)}`
      : "/handwerker",
  };
}