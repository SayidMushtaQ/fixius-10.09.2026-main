const NavLinks = [
  {
    id: 1,
    title: "Reparaturservice",
    url: "/",
    linkTitle: "Startseite des Reparaturservice",
  },
  {
    id: 2,
    title: "Startseite",
    url: "/",
    linkTitle: "Startseite des Reparaturservice",
  },
  {
    id: 3,
    title: "Auftrag veröffentlichen",
    url: "/auftrag-erstellen",
    linkTitle: "Klicke hier, um 'Auftrag veröffentlichen' zu besuchen",
  },
  {
    id: 4,
    title: "So funktioniert es",
    url: "/sofunktioniertes",
    linkTitle: "Klicke hier, um 'So funktioniert es' zu besuchen",
  },
  {
    id: 5,
    title: "Anmelden",
    url: "/",
    linkTitle: "Klicke hier, um zur Anmeldeseite zu gelangen",
  },
  {
    id: 6,
    title: "Als Handwerker registrieren",
    url: "/registrieren",
    linkTitle: "Klicke hier, um dich als Handwerker zu registrieren",
  },
  {
    id: 7,
    title: "Unternehmensverzeichnis",
    url: "/handwerker-finden",
    linkTitle: "Klicke hier, um das Unternehmensverzeichnis zu sehen",
  },
];

const ServiceCards = [
  {
    id: 1,
    icon: "/Serviceicon/moebelmontage.svg",
    shortText: "Möbelmontage",
    slug: "moebelmontage",
  },
  {
    id: 2,
    icon: "/Serviceicon/klimatechniker.svg",
    shortText: "Klimatechniker",
    slug: "klimatechniker",
  },
  {
    id: 3,
    icon: "/Serviceicon/maurer.svg",
    shortText: "Maurer",
    slug: "maurer",
  },
  {
    id: 4,
    icon: "/Serviceicon/gebaeudereiniger.svg",
    shortText: "Gebäudereiniger",
    slug: "gebaeudereiniger",
  },
  {
    id: 5,
    icon: "/Serviceicon/architekt.svg",
    shortText: "Architekt",
    slug: "architekt",
  },
  {
    id: 6,
    icon: "/Serviceicon/schreiner.svg",
    shortText: "Schreiner",
    slug: "schreiner",
  },
  {
    id: 7,
    icon: "/Serviceicon/kaminbauer.svg",
    shortText: "Kaminbauer",
    slug: "kaminbauer",
  },
  /* {
    id: 8,
    icon: "/Serviceicon/empresas-construccion.svg",
    shortText: "Empresas de construcción",
    slug: "architekt",
  },
  */
  {
    id: 9,
    icon: "/Serviceicon/betonbohrungen.svg",
    shortText: "Betonbohrungen & Betonsägen",
    slug: "betonbohrungen",
  },
  {
    id: 11,
    icon: "/Serviceicon/autowerkstatt.svg",
    shortText: "Autowerkstatt",
    slug: "autowerkstatt",
  },
  {
    id: 12,
    icon: "/Serviceicon/trockenbauer.svg",
    shortText: "Trockenbauer",
    slug: "trockenbauer",
  },
  {
    id: 13,
    icon: "/Serviceicon/abbruchunternehmen.svg",
    shortText: "Abbruchunternehmen",
    slug: "abbruchunternehmen",
  },
  {
    id: 14,
    icon: "/Serviceicon/elektriker.svg",
    shortText: "Elektriker",
    slug: "elektriker",
  },
  {
    id: 15,
    icon: "/Serviceicon/erdarbeiten.svg",
    shortText: "Erdarbeiten",
    slug: "erdarbeiten",
  },
  {
    id: 16,
    icon: "/Serviceicon/zaunbauer.svg",
    shortText: "Zaunbauer",
    slug: "zaunbauer",
  },
  {
    id: 17,
    icon: "/Serviceicon/bodenleger.svg",
    shortText: "Bodenleger",
    slug: "bodenleger",
  },
  {
    id: 18,
    icon: "/Serviceicon/glaser.svg",
    shortText: "Glaser",
    slug: "glaserei",
  },
  {
    id: 19,
    icon: "/Serviceicon/heizungsbauer.svg",
    shortText: "Heizungsbauer",
    slug: "heizungsbauer",
  },
  {
    id: 21,
    icon: "/Serviceicon/raumausstatter.svg",
    shortText: "Raumausstatter",
    slug: "raumausstatter",
  },
  {
    id: 22,
    icon: "/Serviceicon/kuechenbauer.svg",
    shortText: "Küchenbauer",
    slug: "kuechenbauer",
  },
  {
    id: 23,
    icon: "/Serviceicon/gartenbauer.svg",
    shortText: "Gartenbauer",
    slug: "gartenbauer",
  },
  {
    id: 24,
    icon: "/Serviceicon/umzugsunternehmen.svg",
    shortText: "Umzugsunternehmen",
    slug: "umzugsunternehmen",
  },
  {
    id: 25,
    icon: "/Serviceicon/metallbauer.svg",
    shortText: "Metallbauer",
    slug: "metallbauer",
  },
  {
    id: 26,
    icon: "/Serviceicon/stuckateur.svg",
    shortText: "Stuckateur / Verputzer",
    slug: "stuckateur",
  },
  {
    id: 27,
    icon: "/Serviceicon/pflasterer.svg",
    shortText: "Pflasterer",
    slug: "pflasterer",
  },
  {
    id: 28,
    icon: "/Serviceicon/poolbauer.svg",
    shortText: "Poolbauer",
    slug: "poolbauer",
  },
  {
    id: 29,
    icon: "/Serviceicon/maler-lackierer.svg",
    shortText: "Maler & Lackierer",
    slug: "maler",
  },
  {
    id: 30,
    icon: "/Serviceicon/sanitaer.svg",
    shortText: "Sanitär Installateur",
    slug: "sanitaer",
  },
  {
    id: 31,
    icon: "/Serviceicon/dachdecker.svg",
    shortText: "Dachdecker",
    slug: "dachdecker",
  },
  {
    id: 32,
    icon: "/Serviceicon/geruestbauer.svg",
    shortText: "Gerüstbauer",
    slug: "geruestbauer",
  },
  {
    id: 33,
    icon: "/Serviceicon/treppenbauer.svg",
    shortText: "Treppenbauer",
    slug: "treppenbauer",
  },
  {
    id: 34,
    icon: "/Serviceicon/polsterer.svg",
    shortText: "Polsterer",
    slug: "polsterer",
  },
  {
    id: 35,
    icon: "/Serviceicon/fliesenleger.svg",
    shortText: "Fliesenleger",
    slug: "fliesenleger",
  },
  {
    id: 37,
    icon: "/Serviceicon/brunnenbauer.svg",
    shortText: "Brunnenbauer",
    slug: "brunnenbauer",
  },

  {
    id: 38,
    icon: "/Serviceicon/fensterbauer.svg",
    shortText: "Fensterbauer",
    slug: "fensterbauer",
  },
  {
    id: 39,
    icon: "/Serviceicon/holzschutz.svg",
    shortText: "Holz & Bautenschutz",
    slug: "holzschutz",
  },
  {
    id: 40,
    icon: "/Serviceicon/interior-designers.svg",
    shortText: "Innenarchitekt",
    slug: "innenarchitekt",
  },
];

const CraftManData = [
  {
    id: 1,
    name: "Thomas",
    job: "Maler & Lackierer",
    img: "/NewImages/painter.png",
  },
  {
    id: 2,
    name: "Erik",
    job: "Elektriker",
    img: "/NewImages/electrician.png",
  },
  {
    id: 3,
    name: "Emilia",
    job: "Schreinerin",
    img: "/NewImages/carpenter.png",
  },
  {
    id: 4,
    name: "Matteo",
    job: "Sanitär-Profi",
    img: "/NewImages/plumber.png",
  },
];

const FooterData = {
  Impressum: [
    {
      id: 1,
      title: "Impressum",
      link: "/pie/rechtlicher-hinweis",
    },
  ],
  Datenschutzrichtlinie: [
    {
      id: 2,
      title: "Datenschutzrichtlinie",
      link: "/pie/datenschutzrichtlinie",
    },
  ],
  Nutzungsbedingungen: [
    {
      id: 3,
      title: "Nutzungsbedingungen",
      link: "/pie/nutzungsbedingungen",
    },
  ],
  CookieRichtlinie: [
    {
      id: 4,
      title: "Cookie-Richtlinie",
      link: "/pie/cookie-richtlinie",
    },
  ],
  Agb: [
    {
      id: 5,
      title: "Agb",
      link: "/pie/agb",
    },
  ],
};
const StepsCardsData = [
  {
    id: 1,
    step: 1,
    img: "/Schritte/Schritt1.svg",
    title: "Auftrag erstellen",
    paragraph:
      "Erstellen Sie einen Auftrag und erhalten Sie kostenlose Angebote.",
  },
  {
    id: 2,
    step: 2,
    img: "/Schritte/Schritt2.svg",
    title: "Angebote von Handwerkern erhalten",
    paragraph: "Erhalten Sie Angebote von passenden Anbietern.",
  },
  {
    id: 3,
    step: 3,
    img: "/Schritte/Schritt3.svg",
    title: "Handwerker auswählen und Projekt starten",
    paragraph:
      "Wählen Sie den passenden Handwerker aus und starten Sie Ihr Projekt.",
  },
];
const RegisterNow = {
  id: 1,
  title: "Jetzt registrieren, erreichen Sie lokale Kunden!",
  paragraph:
    "Registrieren Sie Ihr Unternehmen jetzt und erreichen Sie Kundschaft in Ihrer Umgebung. Präsentieren Sie Ihre Dienstleistungen als erfahrener Profi in den Bereichen Maurerarbeiten, Malerei, Verputzen, Bau, Renovierung usw. Registrieren Sie sich noch heute und werben Sie erfolgreich für Ihr Geschäft.",
};

export {
  CraftManData,
  FooterData,
  NavLinks,
  RegisterNow,
  ServiceCards,
  StepsCardsData,
};
