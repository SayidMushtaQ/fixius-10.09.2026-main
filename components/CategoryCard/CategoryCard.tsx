"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  icon: string;
  title: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * Vertical Category Card - Used for the landing page grid/slider
 */
export function CategoryCard({ icon, title, href, onClick, className }: CategoryCardProps) {
  const content = (
    <>
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-primary/10 mb-1">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="w-10 h-auto transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
      </div>
      <span className="text-center text-xs sm:text-sm font-medium text-slate-900 transition-colors group-hover:text-primary leading-tight line-clamp-2 min-h-10 flex items-center justify-center break-words hyphens-auto [overflow-wrap:anywhere] px-1">
        {title}
      </span>
    </>
  );

  const cardClassName = cn(
    "group flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4 md:p-5 w-full h-full",
    "transition-all duration-200 ease-in-out",
    "hover:border-primary/30 hover:shadow-md hover:shadow-primary/5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cardClassName}>
      {content}
    </button>
  );
}

interface CategoryCardCompactProps extends CategoryCardProps {
  count?: number;
}

/**
 * Horizontal Category Card - Used for search and list pages
 */
export function CategoryCardCompact({
  icon,
  title,
  href,
  onClick,
  count,
  className,
}: CategoryCardCompactProps) {
  const content = (
    <>
      {/* Icon Container - square with light accent on hover */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-primary/10">
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="w-8 h-auto transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0 text-left">
        <span className="block text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">
          {title}
        </span>
        {typeof count === "number" && (
          <span className="text-xs text-slate-500">
            {count} {count === 1 ? "Unternehmen" : "Unternehmen"}
          </span>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all group-hover:bg-primary">
        <ArrowRight size={14} className="text-slate-300 transition-all group-hover:text-white" />
      </div>
    </>
  );

  const cardClassName = cn(
    "group flex items-center gap-4 rounded-xl bg-white p-4 w-full",
    "border border-transparent shadow-sm",
    "transition-all duration-200 ease-out",
    "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cardClassName}>
      {content}
    </button>
  );
}
