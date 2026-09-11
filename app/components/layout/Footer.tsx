import { FooterData } from "@/constants/landingPage";
import Link from "next/link";
import Image from "next/image";
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10 overflow-hidden relative">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="Container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Logo whiteAccent={true} className="h-10 w-auto" />
            </Link>
            <p className="font-inter text-slate-400 leading-relaxed text-sm font-medium">
              Suchen Sie einen speziellen Service für Ihr Zuhause? Unsere
              Plattform verbindet Sie mit erfahrenen Handwerkern für jedes
              Projekt.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: BsFacebook, href: "#" },
                { Icon: BsTwitter, href: "#" },
                { Icon: BsInstagram, href: "#" },
                { Icon: BsLinkedin, href: "#" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center group border border-white/5"
                >
                  <social.Icon className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="font-inter text-xs font-bold mb-6 text-white uppercase tracking-widest">
              Rechtliches
            </h3>
            <ul className="space-y-4">
              {(FooterData["Impressum"] || [])
                .concat(FooterData["Datenschutzrichtlinie"] || [])
                .concat(FooterData["Agb"] || [])
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className="font-inter text-slate-400 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="font-inter text-xs font-bold mb-6 text-white uppercase tracking-widest">
              Bedingungen
            </h3>
            <ul className="space-y-4">
              {FooterData["Nutzungsbedingungen"]
                .concat(FooterData["CookieRichtlinie"])
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className="font-inter text-slate-400 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Handwerker Area */}
          <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/5">
            <h3 className="font-inter text-xs font-bold text-white uppercase tracking-widest">Für Handwerker</h3>
            <p className="font-inter text-slate-400 text-sm font-medium">
              Erreichen Sie neue Kunden in Ihrer Region und steigern Sie Ihren
              Umsatz.
            </p>
            <Link href="/registrieren" className="font-inter btn-primary w-full py-3 text-center text-sm font-bold block rounded-lg">
              Jetzt registrieren
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium">
          <p className="font-inter">
            © 2025 Fixius. Alle Rechte vorbehalten. 
            <span className="hidden sm:inline mx-2 text-slate-700">|</span> 
            <span>Premium Handwerker-Plattform.</span>
          </p>
          <div className="font-inter flex gap-6">
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-primary transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
