"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Small client-only wrapper that applies the standard scroll-into-view
 * fade/slide animation. Keeping this isolated lets the surrounding section
 * components stay as server components (their markup no longer ships as
 * client JS — only this wrapper does).
 */
type RevealProps = {
  children: ReactNode;
  className?: string;
  /** animation start offset on the Y axis (px). Use 0 with `x` for horizontal. */
  y?: number;
  x?: number;
  /** start scale (defaults to 1 = no scale animation). */
  scale?: number;
  delay?: number;
  /** rendered element/tag, e.g. "div" | "h2" | "p". Defaults to "div". */
  as?: "div" | "h2" | "h3" | "p" | "span" | "li";
};

export default function Reveal({
  children,
  className,
  y = 20,
  x = 0,
  scale = 1,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = (motion as any)[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
