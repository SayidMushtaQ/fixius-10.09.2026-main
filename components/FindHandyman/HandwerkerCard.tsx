// components/FindHandyman/HandwerkerCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Star } from "lucide-react";
import type { CardData } from "./mapUserToCard";

export default function HandwerkerCard({ card, handyman }: { card: CardData; handyman: string }) {
  return (
    <article className="rounded-[22px] border border-[#e3eaee] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-7">
      <div className="flex gap-5">
        {/* Avatar */}
        {card.photo ? (
          <Image
            src={card.photo}
            alt={card.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ffece4] text-xl font-extrabold text-[#ff5b1f]">
            {card.initials}
          </div>
        )}

        {/* ...everything else stays exactly as in your current HandwerkerCard... */}
      </div>
    </article>
  );
}