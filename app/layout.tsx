import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FeedbackWidget from "./components/FeedbackWidget";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fixius.de"),
  title: {
    default: "Fixius – Handwerksportal",
    template: "%s | Fixius",
  },
  description: "Finden Sie geprüfte Handwerker und Experten für dein Projekt in ganz Deutschland. Kostenlos und schnell Angebote erhalten.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-inter antialiased bg-main-background text-secondary flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <div className="grow bg-white min-h-screen">{children}</div>
          <FeedbackWidget />
          <Footer />
        </Providers>
        <Script 
          src="https://upload-widget.cloudinary.com/global/all.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
