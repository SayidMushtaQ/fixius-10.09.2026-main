"use client";

import dynamic from "next/dynamic";
import type { ComponentType, RefAttributes } from "react";
import type Slider from "react-slick";
import type { Settings } from "react-slick";

/**
 * Drop-in replacement for `import Slider from "react-slick"` that defers the
 * (heavy) react-slick bundle + its CSS until the slider actually renders on the
 * client. Use this on auth-gated / interaction-gated views where the carousel
 * content does not need to be server-rendered for SEO.
 *
 * Public, SEO-relevant carousels (homepage, public profiles) should keep
 * importing `react-slick` directly so their slides are server-rendered.
 */
// `next/dynamic` erases the underlying component's ref type, so we re-assert it
// here. react-slick's default export is a class, so a ref to it exposes the
// imperative `slickNext()` / `slickPrev()` methods callers rely on.
const LazySlider = dynamic(() => import("./SlickSlider"), {
  ssr: false,
}) as ComponentType<Settings & RefAttributes<Slider>>;

export default LazySlider;
