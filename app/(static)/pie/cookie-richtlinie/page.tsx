import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie | Fixius",
  description: "Informationen über die Verwendung von Cookies auf Fixius.",
  robots: "index, follow",
};

export default function CookieRichtliniePage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/80">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-4 border-b pb-4 border-gray-100">Cookie-Richtlinie</h1>
      <p className="text-sm text-gray-500 mb-8 italic">Letzte Aktualisierung: Mai 2025</p>

      <section className="space-y-4 mb-10">
        <p>
          Bei Fixius verwenden wir Cookies, um Ihre Browser-Erfahrung zu verbessern und den Inhalt der Website zu personalisieren.
        </p>
        <p>
          Cookies sind kleine Textdateien, die in Ihrem Browser gespeichert werden und es ermöglichen, Ihre Präferenzen zu speichern und die Navigation auf unserer Website zu verbessern.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-secondary">Arten von Cookies, die wir verwenden:</h2>
        <ul className="space-y-4 list-disc pl-5">
          <li>
            <strong className="text-secondary">Technische Cookies:</strong> Notwendig für das grundlegende Funktionieren der Website. Diese Cookies sind unerlässlich, damit Sie navigieren und die Funktionen der Website nutzen können.
          </li>
          <li>
            <strong className="text-secondary">Analytische Cookies:</strong> Ermöglichen es uns, das Verhalten der Benutzer auf der Website zu analysieren, um unsere Dienste zu verbessern. Wir verwenden Tools wie Google Analytics.
          </li>
          <li>
            <strong className="text-secondary">Drittanbieter-Cookies:</strong> Wir verwenden Cookies von Drittanbietern wie Google Analytics, um Informationen über die Nutzung unserer Website zu erhalten.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <p>
          Sie können Ihren Browser so konfigurieren, dass gespeicherte Cookies abgelehnt oder gelöscht werden. Dies kann jedoch die Funktionalität unserer Website beeinträchtigen.
        </p>
        <p>
          Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer Richtlinie zu.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">Rechte der Benutzer</h2>
        <p>
          Gemäß den geltenden Datenschutzgesetzen haben Sie das Recht, auf Ihre personenbezogenen Daten zuzugreifen, diese zu berichtigen und zu löschen sowie deren Verarbeitung einzuschränken. Wenn Sie eines dieser Rechte ausüben oder weitere Informationen erhalten möchten, können Sie uns unter{" "}
          <a href="mailto:info@fixius.es" className="text-primary hover:underline font-bold">info@fixius.es</a>{" "}
          kontaktieren.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">Verwaltung von Cookies</h2>
        <p>
          Wenn Sie Ihre Cookie-Einstellungen verwalten möchten, können Sie dies über die Einstellungen Ihres Browsers tun. Im Folgenden finden Sie Links zu Anleitungen zur Verwaltung von Cookies in den gängigsten Browsern:
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <a href="https://support.google.com/accounts/answer/61416?hl=de" target="_blank" className="text-primary hover:underline font-medium">Google Chrome</a>
          <a href="https://support.mozilla.org/de/kb/cookies-informationen-websites-auf-ihrem-computer" target="_blank" className="text-primary hover:underline font-medium">Mozilla Firefox</a>
          <a href="https://support.microsoft.com/de-de/microsoft-edge/cookies-in-microsoft-edge-l%C3%B6schen-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" className="text-primary hover:underline font-medium">Microsoft Edge</a>
        </div>
      </section>

      <section className="mt-8 pt-6 border-t border-gray-100">
        <p>
          Weitere Informationen darüber, wie wir Ihre personenbezogenen Daten verarbeiten und Ihre Privatsphäre schützen, finden Sie in unserer{" "}
          <a href="/pie/datenschutzrichtlinie" className="text-primary hover:underline font-bold">Datenschutzrichtlinie</a>.
        </p>
      </section>
    </article>
  );
}
