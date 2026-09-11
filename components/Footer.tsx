import { FooterData } from "@/constants/landingPage";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";

const FooterNavigation = () => (
  <React.Fragment>
    <nav className="m-2 space-y-7 min-w-fit">
      <h2 className="text-2xl font-bold">Impressum</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData["Impressum"].map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7 min-w-fit">
      <h2 className="text-2xl font-bold">Datenschutzrichtlinie</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData["Datenschutzrichtlinie"].map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7 min-w-fit">
      <h2 className="text-2xl font-bold">Nutzungsbedingungen</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData["Nutzungsbedingungen"].map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7 min-w-fit">
      <h2 className="text-2xl font-bold">Cookie-Richtlinie</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {FooterData["CookieRichtlinie"].map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <nav className="m-2 space-y-7 min-w-fit">
      <h2 className="text-2xl font-bold">AGB</h2>
      <div className="text-gray-500">
        <ul className="list-none space-y-2">
          {(FooterData["Agb"] || []).map(({ id, title, link }) => (
            <FooterLinks key={id} title={title} link={link} />
          ))}
        </ul>
      </div>
    </nav>
    <div />
  </React.Fragment>
);

const FooterLinks = ({ title, link }: { title: string; link: string }) => {
  return (
    <li>
      <Link href={link} title={title} aria-label={title}>
        {title}
      </Link>
    </li>
  );
};

export default function Footer() {
  return (
    <footer className="w-full bg-mainBackground">
      <div className="flex gap-10 mb-20 pl-[30px] container py-3 pt-10 flex-wrap mx-auto">
        <section className="grow-0 space-y-7 sm:basis-1/4">
          <h2 className="text-2xl font-bold">Reparaturservice</h2>
          <p className="text-gray-500">
            Suchen Sie einen speziellen Service für Ihr Zuhause? Unsere
            Plattform ermöglicht es Ihnen, aus einer Vielzahl von
            Dienstleistungen zu wählen und verbindet Sie mit einem geschickten
            Handwerker, der Ihnen bei der Durchführung der Arbeiten helfen kann.
            Wählen Sie einfach den benötigten Service aus und beschreiben Sie
            die Aufgabe detailliert.
          </p>
        </section>
        <div className="flex flex-wrap sm:basis-1/4 flex-1 justify-between">
          <FooterNavigation />
        </div>
      </div>
      <div className="border-t-2">
        <div className="container mx-auto py-5 px-4 gap-4 text-center text-gray-500">
          <div className="text-sm">
            <span>© 2025 Fixius. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
