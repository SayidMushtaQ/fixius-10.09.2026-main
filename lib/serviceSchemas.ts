/**
 * Service Schema Configuration for JSON-LD
 *
 * This file contains all service definitions and schema generation utilities
 * for creating production-grade JSON-LD markup matching fixius.de quality.
 */

const BASE_URL = "https://www.fixius.de";
const LOGO_URL = `${BASE_URL}/logo.jpg`;
const PHONE = "+49123456789"; 
const EMAIL = "info@fixius.de";
const FOUNDING_DATE = "2024";
const FOUNDER_NAME = "Fixius Team";

export interface ServiceOffer {
  name: string;
  description: string;
}

export interface ServiceSchemaConfig {
  name: string;
  alternateName: string;
  titleSuffix?: string; // e.g. "Klima- & Kältetechnik"
  description: string;
  image: string;
  offers: ServiceOffer[];
}

/**
 * Service schema configurations for all trades
 * Each service has 4 specific offerings with professional German descriptions
 */
export const serviceSchemas: Record<string, ServiceSchemaConfig> = {
  klimatechniker: {
    name: "Klimatechniker",
    alternateName: "Fixius Klimatechniker",
    titleSuffix: "Klima- & Kältetechnik",
    description:
      "Ihr Klimatechniker – Installation, Wartung und Reparatur von Klimaanlagen und Kälteanlagen. Fixius vermittelt schnell und zuverlässig regionale Klimatechniker und Kältefachbetriebe. Fixius bietet keine Klimatechnik-Leistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/klimatechnik.webp",
    offers: [
      {
        name: "Klimaanlagen-Installation",
        description:
          "Fachgerechte Installation von Klimaanlagen für Wohn- und Gewerbeobjekte.",
      },
      {
        name: "Wartung & Service",
        description:
          "Regelmäßige Wartung, Reinigung und Funktionsprüfung von Klima- und Kälteanlagen.",
      },
      {
        name: "Reparatur von Klimaanlagen",
        description:
          "Schnelle Fehlerdiagnose und Reparatur defekter Klima- und Kältesysteme.",
      },
      {
        name: "Kältetechnik",
        description:
          "Planung, Installation und Instandhaltung von Kälteanlagen und Kühltechnik.",
      },
    ],
  },
  elektriker: {
    name: "Elektriker",
    alternateName: "Fixius Elektriker",
    titleSuffix: "Elektroinstallation & Reparaturen",
    description:
      "Ihr Elektriker – Elektroinstallationen, Reparaturen und Modernisierungen. Fixius vermittelt schnell und zuverlässig regionale Elektrobetriebe. Fixius bietet keine Elektroarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/elektriker.webp",
    offers: [
      {
        name: "Elektroinstallation",
        description:
          "Fachgerechte Installation von Leitungen, Steckdosen, Schaltern und Beleuchtungssystemen.",
      },
      {
        name: "Reparaturen & Wartung",
        description:
          "Schnelle Fehlerbehebung, Wartung und Instandhaltung elektrischer Anlagen.",
      },
      {
        name: "Smart Home & Automation",
        description:
          "Installation von Smart-Home-Systemen, Automatisierung und Steuerung von Gebäudetechnik.",
      },
      {
        name: "Beleuchtung & Sicherheitstechnik",
        description:
          "Planung und Montage von Beleuchtungssystemen, Alarmanlagen und Sicherheitsbeleuchtung.",
      },
    ],
  },
  maurer: {
    name: "Maurer",
    alternateName: "Fixius Maurer",
    titleSuffix: "Maurerarbeiten & Bauhilfe",
    description:
      "Ihr Maurer-Service – professionelle Maurerarbeiten, Reparaturen und Bauhilfe. Fixius vermittelt schnell und zuverlässig regionale Maurerbetriebe. Fixius bietet keine Maurerarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Maurer in der Region.",
    image: "/images/services/maurerarbeiten.webp",
    offers: [
      {
        name: "Maurerarbeiten",
        description:
          "Fachgerechte Maurerarbeiten wie Mauern, Verputzen und Ausbesserungen.",
      },
      {
        name: "Mauerreparaturen",
        description:
          "Reparatur von Rissen, beschädigten Wänden und Mauerwerk durch erfahrene Maurer.",
      },
      {
        name: "Durchbrüche & Öffnungen",
        description:
          "Herstellung von Wanddurchbrüchen für Türen, Fenster oder Leitungen inkl. Absicherung.",
      },
      {
        name: "Verputzarbeiten",
        description:
          "Innen- und Außenputzarbeiten für Wände, Decken und Fassaden.",
      },
    ],
  },
  schreiner: {
    name: "Schreiner",
    alternateName: "Fixius Schreiner",
    titleSuffix: "Maßanfertigungen & Holzarbeiten",
    description:
      "Ihr Schreiner – individuelle Maßanfertigungen, Möbelbau und Holzarbeiten. Fixius vermittelt schnell und zuverlässig regionale Schreinereien und Tischlerbetriebe. Fixius bietet keine Schreinerleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/schreinerarbeiten.webp",
    offers: [
      {
        name: "Möbelbau nach Maß",
        description:
          "Individuelle Anfertigung von Möbeln nach Maß – Schränke, Regale, Küchen und Einbauten.",
      },
      {
        name: "Holzarbeiten",
        description: "Fachgerechte Holzarbeiten im Innen- und Außenbereich.",
      },
      {
        name: "Fenster- & Türenbau",
        description:
          "Anfertigung, Einbau und Reparatur von Holzfenstern und Holztüren.",
      },
      {
        name: "Reparaturen & Anpassungen",
        description:
          "Reparatur, Anpassung und Aufarbeitung bestehender Holzmöbel und Bauteile.",
      },
    ],
  },
  trockenbauer: {
    name: "Trockenbauer",
    alternateName: "Fixius Trockenbauer",
    titleSuffix: "Trockenbau & Innenausbau",
    description:
      "Ihr Trockenbauer – professionelle Trockenbauarbeiten, Decken-, Wand- und Bodensysteme. Fixius vermittelt schnell und zuverlässig regionale Trockenbauunternehmen. Fixius bietet keine Trockenbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/trockenbau.webp",
    offers: [
      {
        name: "Innenwände & Trennwände",
        description:
          "Errichtung von Trockenbau-Innenwänden, Trennwänden und Raumteilern.",
      },
      {
        name: "Deckenbau",
        description:
          "Fachgerechter Bau von abgehängten Decken und Systemdecken.",
      },
      {
        name: "Boden & Estricharbeiten",
        description:
          "Trockenestrich, Unterbodenaufbau und Vorbereitungen für Bodenbeläge.",
      },
      {
        name: "Sanierungen & Renovierungen",
        description:
          "Trockenbauarbeiten bei Renovierung, Umbau und Sanierung von Wohn- und Gewerbeobjekten.",
      },
    ],
  },
  kaminbauer: {
    name: "Kaminbauer",
    alternateName: "Fixius Kaminbauer",
    titleSuffix: "Kaminbau & Ofenmontage",
    description:
      "Ihr Kaminbauer – professioneller Kaminbau, Ofenmontage und Sanierung. Fixius vermittelt schnell und zuverlässig regionale Kaminbauer und Ofenbaubetriebe. Fixius bietet keine Kaminbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/kaminbau.webp",
    offers: [
      {
        name: "Kaminbau",
        description:
          "Individueller Bau und Einbau von Kaminen nach geltenden Vorschriften.",
      },
      {
        name: "Ofenmontage",
        description:
          "Fachgerechte Montage von Kaminöfen, Holzöfen und Pelletöfen durch Fachbetriebe.",
      },
      {
        name: "Kaminsanierung",
        description:
          "Sanierung und Modernisierung bestehender Kamine und Abgasanlagen.",
      },
      {
        name: "Abgas- & Schornsteinlösungen",
        description:
          "Planung und Umsetzung von Abgasführungen und Schornsteinsystemen.",
      },
    ],
  },
  gebaeudereiniger: {
    name: "Gebäudereiniger",
    alternateName: "Fixius Gebäudereiniger",
    titleSuffix: "Gebäudereinigung & Reinigungsservice",
    description:
      "Ihr Gebäudereiniger – professionelle Gebäudereinigung, Unterhaltsreinigung und Spezialreinigung. Fixius vermittelt schnell und zuverlässig regionale Gebäudereiniger. Fixius bietet keine Reinigungsleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Reinigungsbetriebe in der Region.",
    image: "/images/services/gebaeudereinigung.webp",
    offers: [
      {
        name: "Unterhaltsreinigung",
        description:
          "Regelmäßige Reinigung von Büros, Praxen und Gewerbeflächen.",
      },
      {
        name: "Glas- & Fensterreinigung",
        description:
          "Streifenfreie Reinigung von Fenstern, Glasfassaden und Wintergärten.",
      },
      {
        name: "Grundreinigung",
        description:
          "Intensive Reinigung von Böden, Sanitäranlagen und schwer zugänglichen Bereichen.",
      },
      {
        name: "Baureinigung",
        description:
          "Bauendreinigung und Baugrobreinigung nach Neubau oder Renovierung.",
      },
    ],
  },
  moebelmontage: {
    name: "Möbelmontage",
    alternateName: "Fixius Möbelmontage",
    titleSuffix: "24h Montageservice",
    description:
      "Ihr Möbelmontage-Service – professionelle Montage von Möbeln, Küchen und Einrichtungsgegenständen. Fixius vermittelt schnell und zuverlässig regionale Monteure. Fixius bietet keine Möbelmontagen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Montageservices in der Region.",
    image: "/images/services/moebelmontage.webp",
    offers: [
      {
        name: "Möbelmontage",
        description:
          "Fachgerechte Montage von Möbeln aller Art – Schränke, Betten, Regale und Kommoden.",
      },
      {
        name: "Küchenmontage",
        description:
          "Professionelle Montage und Aufbau von Küchen durch erfahrene Monteure.",
      },
      {
        name: "Demontage & Abbau",
        description:
          "Sorgfältige Demontage von Möbeln für Umzug, Entsorgung oder Wiederaufbau.",
      },
      {
        name: "Möbelreparatur",
        description:
          "Kleine Reparaturen, Nachjustierungen und Befestigungen an bestehenden Möbeln.",
      },
    ],
  },
  abbruchunternehmen: {
    name: "Abbruchunternehmen",
    alternateName: "Fixius Abbruchunternehmen",
    titleSuffix: "Abbruch & Rückbau",
    description:
      "Ihr Abbruchunternehmen – professionelle Abbrucharbeiten, Rückbau und Entsorgung. Fixius vermittelt schnell und zuverlässig regionale Abbruchbetriebe. Fixius bietet keine Abbrucharbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/abbruch.webp",
    offers: [
      {
        name: "Abbruch & Rückbau",
        description:
          "Kontrollierter Abbruch von Gebäuden, Hallen und Bauwerken inklusive fachgerechtem Rückbau.",
      },
      {
        name: "Entkernung",
        description:
          "Entkernung von Gebäuden, Entfernung von Innenausbauten, Decken, Wänden und Installationen.",
      },
      {
        name: "Abfall & Entsorgung",
        description:
          "Fachgerechte Entsorgung von Bauschutt, Materialien und Recycling von Baustoffen.",
      },
      {
        name: "Spezialabbau",
        description:
          "Abbruch von Industrieanlagen, Maschinen oder schwer zugänglichen Bauteilen.",
      },
    ],
  },
  erdarbeiten: {
    name: "Erdarbeiten",
    alternateName: "Fixius Erdarbeiten",
    titleSuffix: "Baggerarbeiten & Tiefbau",
    description:
      "Ihr Spezialist für Erdarbeiten – Aushub, Baggerarbeiten und Tiefbau. Fixius vermittelt schnell und zuverlässig regionale Fachkräfte für Erd- und Tiefbauarbeiten. Fixius bietet keine Erdarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/erdarbeiten.webp",
    offers: [
      {
        name: "Aushub & Baggerarbeiten",
        description:
          "Präziser Aushub für Baugruben, Fundamente und Leitungsgräben.",
      },
      {
        name: "Tiefbauarbeiten",
        description:
          "Erschließung, Kanalbau und Tiefbauarbeiten für private und gewerbliche Projekte.",
      },
      {
        name: "Planierung & Geländeprofilierung",
        description:
          "Geländemodellierung, Planierung und Vorbereitung für Bauvorhaben.",
      },
      {
        name: "Erd- & Baustofftransport",
        description:
          "Transport und Verteilung von Erde, Kies, Sand und anderen Baumaterialien.",
      },
    ],
  },
  bodenleger: {
    name: "Bodenleger",
    alternateName: "Fixius Bodenleger",
    titleSuffix: "Bodenbeläge & Fußbodenarbeiten",
    description:
      "Ihr Bodenleger – professionelle Verlegung von Laminat, Parkett, Vinyl und Teppichböden. Fixius vermittelt schnell und zuverlässig regionale Dienstleister für Bodenbelagsarbeiten. Fixius bietet keine Bodenlegerleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/bodenbelag.webp",
    offers: [
      {
        name: "Laminat & Parkett",
        description:
          "Fachgerechte Verlegung von Laminat- und Parkettböden für Wohn- und Gewerberäume.",
      },
      {
        name: "Vinyl & Designbeläge",
        description:
          "Verlegung von Vinyl, Designbelägen und modernen Bodenlösungen.",
      },
      {
        name: "Teppich & Textilböden",
        description:
          "Verlegung von Teppichen und textilen Bodenbelägen nach Maß.",
      },
      {
        name: "Bodenvorbereitung & Reparaturen",
        description:
          "Untergrundvorbereitung, Ausgleich, Reparaturen und Renovierung bestehender Böden.",
      },
    ],
  },
  betonbohrungen: {
    name: "Betonbohrungen & Betonsägen",
    alternateName: "Fixius Betonbohrungen",
    // Text file title: "Betonbohrungen & Betonsägen [City]" (No explicit suffix in name, but description says "Ihr Fachbetrieb...").
    // Wait, name in file: "Betonbohrungen & Betonsägen Elsnig"
    // I will add a generic suffix? The file doesn't have a distinct suffix after "Elsnig" like others.
    // Ah, wait. "Betonbohrungen & Betonsägen Elsnig". Just that.
    // I will leave titleSuffix empty or undefined.
    description:
      "Ihr Fachbetrieb für Betonbohrungen und Betonsägen – präzise Kernbohrungen, Wand- und Deckenschnitte. Fixius vermittelt schnell und zuverlässig regionale Fachbetriebe für Betonbohr- und Sägetechnik. Fixius bietet keine Betonbohr- oder Betonsägearbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/betonbohrungen.webp",
    offers: [
      {
        name: "Kernbohrungen",
        description:
          "Präzise Kernbohrungen in Beton, Stahlbeton und Mauerwerk für Leitungen und Installationen.",
      },
      {
        name: "Betonsägen",
        description:
          "Exakte Wand-, Decken- und Bodenschnitte mit moderner Sägetechnik.",
      },
      {
        name: "Wand- & Deckendurchbrüche",
        description:
          "Herstellung von Durchbrüchen für Türen, Fenster, Treppen oder technische Anlagen.",
      },
      {
        name: "Rückbau & Demontage",
        description:
          "Kontrollierter Rückbau von Betonbauteilen inklusive fachgerechter Entsorgung.",
      },
    ],
  },
  autowerkstatt: {
    name: "Autowerkstatt",
    alternateName: "Fixius Autowerkstatt",
    titleSuffix: "Kfz-Service & Reparaturen",
    description:
      "Ihre Autowerkstatt – Kfz-Reparaturen, Wartung und Diagnose. Fixius vermittelt schnell und zuverlässig regionale Autowerkstätten. Fixius bietet keine Werkstattleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Kfz-Betriebe in der Region.",
    image: "/images/services/autowerkstatt.webp",
    offers: [
      {
        name: "Kfz-Reparaturen",
        description:
          "Fachgerechte Reparatur von PKW und Transportern aller Marken.",
      },
      {
        name: "Inspektion & Wartung",
        description:
          "Regelmäßige Wartung und Inspektion nach Herstellervorgaben.",
      },
      {
        name: "Fehlerdiagnose",
        description: "Moderne Fahrzeugdiagnose zur schnellen Fehlerermittlung.",
      },
      {
        name: "Bremsen- & Reifenservice",
        description: "Reifenwechsel, Bremsenservice und Achsprüfung.",
      },
    ],
  },
  zaunbauer: {
    name: "Zaunbauer",
    alternateName: "Fixius Zaunbauer",
    titleSuffix: "Zäune, Tore & Gartengestaltung",
    description:
      "Ihr Zaunbauer – professionelle Montage von Zäunen, Toren und Gartenelementen. Fixius vermittelt schnell und zuverlässig regionale Zaunbauer. Fixius bietet keine Zaunbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/zaunbau.webp",
    offers: [
      {
        name: "Zäune & Sichtschutz",
        description:
          "Montage von Metall-, Holz- und Doppelstabmattenzäunen sowie Sichtschutzzäunen.",
      },
      {
        name: "Toranlagen & Schranken",
        description:
          "Planung, Lieferung und Montage von Einfahrtstoren, Gartentoren und Schrankenanlagen.",
      },
      {
        name: "Gartenelemente & Geländer",
        description:
          "Montage von Geländern, Gabionen, Pergolen und weiteren Gartenelementen.",
      },
      {
        name: "Reparatur & Wartung",
        description:
          "Reparatur, Austausch und Wartung von Zäunen, Toren und Gartenelementen.",
      },
    ],
  },
  glaserei: {
    name: "Glaser",
    alternateName: "Fixius Glaser",
    titleSuffix: "Glasbau & Verglasungen",
    description:
      "Ihr Glaser – professionelle Glasarbeiten, Verglasungen und Glasreparaturen. Fixius vermittelt schnell und zuverlässig regionale Glasereien. Fixius bietet keine Glasbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/glasbau.webp",
    offers: [
      {
        name: "Fenster- & Türverglasung",
        description:
          "Montage und Austausch von Fenstern, Glastüren und Rahmenverglasungen.",
      },
      {
        name: "Glasreparatur",
        description:
          "Reparatur von beschädigtem Glas, Bruchstellen und Sicherheitsverglasungen.",
      },
      {
        name: "Dusch- & Raumverglasung",
        description:
          "Fachgerechte Montage von Duschkabinen, Trennwänden und Glasraumlösungen.",
      },
      {
        name: "Sonderanfertigungen",
        description:
          "Maßgeschneiderte Glaslösungen für Möbel, Geländer und Architekturprojekte.",
      },
    ],
  },
  raumausstatter: {
    name: "Raumausstatter",
    alternateName: "Fixius Raumausstatter",
    titleSuffix: "Innenraumgestaltung & Dekoration",
    description:
      "Ihr Raumausstatter – professionelle Innenraumgestaltung, Polsterarbeiten und Dekoration. Fixius vermittelt schnell und zuverlässig regionale Raumausstatter. Fixius bietet keine Raumausstattungsleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/raumausstattung.webp",
    offers: [
      {
        name: "Polster- & Möbelarbeiten",
        description:
          "Neubezug, Reparatur und individuelle Polsterarbeiten für Möbelstücke aller Art.",
      },
      {
        name: "Vorhänge & Dekoration",
        description:
          "Maßgeschneiderte Vorhänge, Gardinen, Rollos und Raumdekorationen.",
      },
      {
        name: "Bodenbeläge",
        description:
          "Verlegung von Teppich, Laminat, Parkett oder Designbelägen.",
      },
      {
        name: "Raumgestaltung & Beratung",
        description:
          "Individuelle Beratung und Umsetzung von Raumkonzepten, Farbgestaltung und Einrichtung.",
      },
    ],
  },
  architekt: {
    name: "Architekt",
    alternateName: "Fixius Architekt",
    titleSuffix: "Planung & Baukonzepte",
    description:
      "Ihr Architekturbüro – professionelle Planung, Baukonzepte und Beratung. Fixius vermittelt schnell und zuverlässig regionale Architekten. Fixius bietet keine Architektenleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Architekten in der Region.",
    image: "/images/services/architektur.webp",
    offers: [
      {
        name: "Architekturplanung",
        description:
          "Individuelle Entwurfs- und Ausführungsplanung für Wohn- und Gewerbeobjekte.",
      },
      {
        name: "Bauanträge & Genehmigungen",
        description:
          "Erstellung und Einreichung von Bauanträgen sowie Begleitung im Genehmigungsverfahren.",
      },
      {
        name: "Sanierungsplanung",
        description:
          "Planung von Umbauten, Modernisierungen und energetischen Sanierungen.",
      },
      {
        name: "Bauberatung",
        description:
          "Unabhängige Beratung zu Bauvorhaben, Kosten, Materialien und Ausführung.",
      },
    ],
  },
  geruestbauer: {
    name: "Gerüstbauer",
    alternateName: "Fixius Gerüstbauer",
    titleSuffix: "Gerüstbau & Montage",
    description:
      "Ihr Gerüstbauer – professionelle Gerüstmontage für Bauprojekte, Renovierungen und Veranstaltungen. Fixius vermittelt schnell und zuverlässig regionale Gerüstbauer. Fixius bietet keine Gerüstbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/geruestbau.webp",
    offers: [
      {
        name: "Baugerüste",
        description:
          "Aufbau und Abbau von Baugerüsten für Neubauten, Sanierungen und Renovierungen.",
      },
      {
        name: "Fassadengerüste",
        description:
          "Montage von Fassadengerüsten für Maler-, Putz- oder Dacharbeiten.",
      },
      {
        name: "Veranstaltungsgerüste",
        description: "Aufbau von Gerüsten für Bühnen, Tribünen und Events.",
      },
      {
        name: "Gerüstprüfung & Sicherheit",
        description:
          "Regelmäßige Sicherheitsprüfungen, Wartung und Einweisung der Gerüste.",
      },
    ],
  },
  treppenbauer: {
    name: "Treppenbauer",
    alternateName: "Fixius Treppenbauer",
    titleSuffix: "Treppenbau & Montage",
    description:
      "Ihr Treppenbauer – professionelle Treppenplanung, Fertigung und Montage. Fixius vermittelt schnell und zuverlässig regionale Treppenbauer. Fixius bietet keine Treppenbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/treppenbau.webp",
    offers: [
      {
        name: "Holztreppen & Maßanfertigung",
        description:
          "Fertigung und Montage von Holztreppen nach Maß, inklusive Geländer und Handläufe.",
      },
      {
        name: "Metall- & Stahltreppen",
        description:
          "Planung, Fertigung und Montage von Treppen aus Metall oder Stahl.",
      },
      {
        name: "Renovierung & Sanierung",
        description:
          "Sanierung, Modernisierung und Anpassung bestehender Treppenanlagen.",
      },
      {
        name: "Treppenmontage & Zubehör",
        description:
          "Montage von Treppen, Geländern, Handläufen sowie Treppenbeleuchtung und Zubehör.",
      },
    ],
  },
  gartenbauer: {
    name: "Gartenbauer",
    alternateName: "Fixius Gartenbauer",
    titleSuffix: "Garten- & Landschaftsbau",
    description:
      "Ihr Gartenbauer – professionelle Garten- und Landschaftsgestaltung, Pflege und Pflanzarbeiten. Fixius vermittelt schnell und zuverlässig regionale Gartenbauer. Fixius bietet keine Gartenbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/gartenbau.webp",
    offers: [
      {
        name: "Gartengestaltung",
        description:
          "Planung und Umsetzung von Gärten, Beeten, Wegen und Terrassen.",
      },
      {
        name: "Pflanz- & Rasenarbeiten",
        description:
          "Anlage von Rasenflächen, Bepflanzungen und Hecken sowie deren Pflege.",
      },
      {
        name: "Teiche & Wasseranlagen",
        description:
          "Gestaltung von Teichen, Wasserspielen und kleinen Gewässeranlagen.",
      },
      {
        name: "Pflege & Wartung",
        description:
          "Regelmäßige Pflege, Schnittarbeiten und Instandhaltung von Gärten und Grünflächen.",
      },
    ],
  },
  pflasterer: {
    name: "Pflasterer",
    alternateName: "Fixius Pflasterer",
    titleSuffix: "Pflasterarbeiten & Außenanlagen",
    description:
      "Ihr Pflasterer – professionelle Pflasterarbeiten, Terrassen, Einfahrten und Wege. Fixius vermittelt schnell und zuverlässig regionale Pflasterer. Fixius bietet keine Pflasterarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/pflasterarbeiten.webp",
    offers: [
      {
        name: "Terrassen & Wege",
        description:
          "Anlage und Pflasterung von Terrassen, Gehwegen und Zufahrten.",
      },
      {
        name: "Einfahrten & Parkplätze",
        description:
          "Professionelle Pflasterarbeiten für private und gewerbliche Einfahrten und Parkplätze.",
      },
      {
        name: "Naturstein & Betonpflaster",
        description:
          "Verlegung von Naturstein-, Beton- und Klinkerpflaster für langlebige Außenflächen.",
      },
      {
        name: "Reparatur & Sanierung",
        description:
          "Sanierung, Ausbesserung und Instandhaltung bestehender Pflasterflächen.",
      },
    ],
  },
  poolbauer: {
    name: "Poolbauer",
    alternateName: "Fixius Poolbauer",
    titleSuffix: "Poolbau & Schwimmbadinstallation",
    description:
      "Ihr Poolbauer – professionelle Planung, Bau und Wartung von Swimmingpools. Fixius vermittelt schnell und zuverlässig regionale Poolbauer. Fixius bietet keine Poolbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/poolbau.webp",
    offers: [
      {
        name: "Poolplanung & Beratung",
        description:
          "Individuelle Planung und Beratung für private und gewerbliche Swimmingpools.",
      },
      {
        name: "Poolbau & Montage",
        description:
          "Fachgerechter Bau und Installation von Pools, Becken und Technik.",
      },
      {
        name: "Pooltechnik & Wartung",
        description:
          "Installation und Wartung von Pumpen, Filtern, Heizung und Abdeckungssystemen.",
      },
      {
        name: "Poolrenovierung & Reparatur",
        description:
          "Sanierung, Reparatur und Modernisierung bestehender Pools und Schwimmbadanlagen.",
      },
    ],
  },
  brunnenbauer: {
    name: "Brunnenbauer",
    alternateName: "Fixius Brunnenbauer",
    titleSuffix: "Brunnenbau & Wasseranlagen",
    description:
      "Ihr Brunnenbauer – professionelle Planung, Bau und Wartung von Brunnen and Wasseranlagen. Fixius vermittelt schnell und zuverlässig regionale Brunnenbauer. Fixius bietet keine Brunnenbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/brunnenbau.webp",
    offers: [
      {
        name: "Brunnenplanung & Beratung",
        description:
          "Individuelle Planung und Beratung für private und gewerbliche Brunnenprojekte.",
      },
      {
        name: "Brunnenbau & Installation",
        description:
          "Fachgerechter Bau und Installation von Trinkbrunnen, Zierbrunnen und Gartenbrunnen.",
      },
      {
        name: "Pumpen & Wassertechnik",
        description:
          "Installation und Wartung von Pumpen, Filtersystemen und Wassertechnik.",
      },
      {
        name: "Brunnenrenovierung & Reparatur",
        description:
          "Sanierung, Reparatur und Modernisierung bestehender Brunnenanlagen.",
      },
    ],
  },
  fensterbauer: {
    name: "Fensterbauer",
    alternateName: "Fixius Fensterbauer",
    titleSuffix: "Fenster & Türen",
    description:
      "Ihr Fensterbauer – professionelle Montage, Reparatur und Austausch von Fenstern und Türen. Fixius vermittelt schnell und zuverlässig regionale Fensterbauer. Fixius bietet keine Fenster- oder Türenarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/fensterbau.webp",
    offers: [
      {
        name: "Fenstermontage & Reparatur",
        description:
          "Montage von Neubau- und Ersatzfenstern sowie Reparatur beschädigter Fenster.",
      },
      {
        name: "Türenmontage & Austausch",
        description:
          "Installation, Austausch und Reparatur von Innen- und Außentüren.",
      },
      {
        name: "Rollläden & Sonnenschutz",
        description:
          "Montage und Reparatur von Rollläden, Jalousien und Sonnenschutzlösungen.",
      },
      {
        name: "Wartung & Sicherheit",
        description:
          "Regelmäßige Wartung, Abdichtung und Einbruchschutz für Fenster und Türen.",
      },
    ],
  },
  innenarchitekt: {
    name: "Innenarchitekt",
    alternateName: "Fixius Innenarchitekt",
    // Note: Didn't find specific new text in file, keeping old one but adding disclaimer pattern
    titleSuffix: "Innenraumplanung & Raumgestaltung",
    description:
      "Ihr Innenarchitekt – professionelle Innenraumplanung und Raumgestaltung. Fixius vermittelt schnell und zuverlässig regionale Innenarchitekten. Fixius bietet keine Innenarchitektenleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/innenarchitektur.webp",
    offers: [
      {
        name: "Raumplanung",
        description: "Individuelle Planung und Gestaltung von Innenräumen.",
      },
      {
        name: "Möbeldesign",
        description: "Entwurf maßgefertigter Möbel und Einbauten.",
      },
      {
        name: "Farbkonzepte",
        description: "Entwicklung harmonischer Farbkonzepte für Räume.",
      },
      {
        name: "Projektbegleitung",
        description: "Begleitung von Umbau- und Renovierungsprojekten.",
      },
    ],
  },
  umzugsunternehmen: {
    name: "Umzugsunternehmen",
    alternateName: "Fixius Umzugsunternehmen",
    titleSuffix: "Umzüge & Transport",
    description:
      "Ihr Umzugsunternehmen – professionelle Umzüge, Möbeltransport und Entrümpelung. Fixius vermittelt schnell und zuverlässig regionale Umzugsunternehmen. Fixius bietet keine Umzugsleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/umzug.webp",
    offers: [
      {
        name: "Privatumzüge",
        description: "Organisation und Durchführung von privaten Umzügen.",
      },
      {
        name: "Firmenumzüge",
        description:
          "Professionelle Umzüge für Büros, Praxen und gewerbliche Einrichtungen.",
      },
      {
        name: "Möbeltransport & Einlagerung",
        description:
          "Transport, Demontage, Montage und optionale Lagerung von Möbeln.",
      },
      {
        name: "Entrümpelung & Entsorgung",
        description:
          "Fachgerechte Entrümpelung, Entsorgung und Recycling von Haushalts- oder Firmeninventar.",
      },
    ],
  },
  metallbauer: {
    name: "Metallbauer",
    alternateName: "Fixius Metallbauer",
    titleSuffix: "Metallbau & Konstruktionen",
    description:
      "Ihr Metallbauer – professionelle Metallkonstruktionen, Geländer, Tore und Stahlbau. Fixius vermittelt schnell und zuverlässig regionale Metallbauer. Fixius bietet keine Metallbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/metallbau.webp",
    offers: [
      {
        name: "Geländer & Treppen",
        description:
          "Fertigung und Montage von Treppen, Handläufen und Geländern aus Metall.",
      },
      {
        name: "Tore & Zäune",
        description:
          "Herstellung und Montage von Metalltoren, Gartenzäunen und Einfahrten.",
      },
      {
        name: "Stahl- & Metallkonstruktionen",
        description:
          "Planung und Bau von Stahlkonstruktionen für Gebäude, Hallen und Projekte.",
      },
      {
        name: "Reparaturen & Wartung",
        description:
          "Instandsetzung, Reparatur und Pflege bestehender Metallbaukonstruktionen.",
      },
    ],
  },
  heizungsbauer: {
    name: "Heizungsbauer",
    alternateName: "Fixius Heizungsbauer",
    titleSuffix: "Heizungsinstallation & Wartung",
    description:
      "Ihr Heizungsbauer – Installation, Wartung und Reparatur von Heizungsanlagen. Fixius vermittelt schnell und zuverlässig regionale Heizungsbetriebe. Fixius bietet keine Heizungsarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/heizung.webp",
    offers: [
      {
        name: "Heizungsinstallation",
        description:
          "Fachgerechte Installation von Gas-, Öl- und Pelletheizungen sowie modernen Heizsystemen.",
      },
      {
        name: "Wartung & Inspektion",
        description:
          "Regelmäßige Wartung, Überprüfung und Effizienzoptimierung von Heizungsanlagen.",
      },
      {
        name: "Reparaturen & Notdienst",
        description:
          "Schnelle Behebung von Störungen und Notfallreparaturen bei Heizungsproblemen.",
      },
      {
        name: "Sanierung & Modernisierung",
        description:
          "Erneuerung, Umbau und Modernisierung bestehender Heizungsanlagen für Effizienz und Komfort.",
      },
    ],
  },
  sanitaer: {
    name: "Sanitär Installateur",
    alternateName: "Fixius Sanitär",
    titleSuffix: "Sanitärinstallation & Badplanung",
    description:
      "Ihr Sanitär Installateur – Installation, Wartung und Reparatur von Sanitäranlagen. Fixius vermittelt schnell und zuverlässig regionale Sanitärbetriebe. Fixius bietet keine Sanitärarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/sanitaer.webp",
    offers: [
      {
        name: "Sanitärinstallation",
        description:
          "Fachgerechte Installation von Wasserleitungen, Armaturen, Waschbecken, Toiletten und Duschen.",
      },
      {
        name: "Badplanung & Modernisierung",
        description:
          "Planung, Umbau und Modernisierung von Bädern nach individuellen Wünschen.",
      },
      {
        name: "Reparaturen & Notdienst",
        description:
          "Schnelle Behebung von Rohrbrüchen, Lecks, verstopften Abflüssen und Notfällen.",
      },
      {
        name: "Wartung & Rohrleitungen",
        description:
          "Regelmäßige Wartung, Kontrolle und Optimierung von Sanitär- und Rohrleitungssystemen.",
      },
    ],
  },
  kuechenbauer: {
    name: "Küchenbauer",
    alternateName: "Fixius Küchenbauer",
    titleSuffix: "Küchenmontage & Planung",
    description:
      "Ihr Küchenbauer – individuelle Küchenplanung, Montage und Reparatur. Fixius vermittelt schnell und zuverlässig regionale Küchenbauer. Fixius bietet keine Küchenbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/kuechenbau.webp",
    offers: [
      {
        name: "Küchenmontage",
        description:
          "Fachgerechte Montage von Küchenmöbeln, Arbeitsplatten und Einbaugeräten.",
      },
      {
        name: "Küchenplanung",
        description:
          "Individuelle Planung und Beratung für maßgeschneiderte Küchenlösungen.",
      },
      {
        name: "Reparatur & Austausch",
        description:
          "Reparatur, Austausch und Modernisierung von Küchenmöbeln und Geräten.",
      },
      {
        name: "Küchenerweiterung & Umbau",
        description:
          "Erweiterung bestehender Küchen, Umbau und Anpassung an neue Anforderungen.",
      },
    ],
  },
  maler: {
    name: "Maler & Lackierer",
    alternateName: "Fixius Maler",
    titleSuffix: "Malerarbeiten & Lackierungen",
    description:
      "Ihr Maler & Lackierer – professionelle Malerarbeiten, Lackierungen und Renovierungen. Fixius vermittelt schnell und zuverlässig regionale Malerbetriebe. Fixius bietet keine Malerleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/malerarbeiten.webp",
    offers: [
      {
        name: "Innenanstrich & Renovierung",
        description:
          "Streichen, Tapezieren und Renovierung von Innenräumen für Wohn- und Gewerbeobjekte.",
      },
      {
        name: "Fassaden & Außenanstrich",
        description:
          "Professionelle Anstriche und Beschichtungen von Fassaden, Wänden und Außenbereichen.",
      },
      {
        name: "Lackierarbeiten",
        description:
          "Lackieren von Türen, Fenstern, Möbeln und Metalloberflächen.",
      },
      {
        name: "Spezialtechniken & Dekoration",
        description:
          "Tapezierungen, Spachteltechniken, Lasuren und dekorative Oberflächenbehandlungen.",
      },
    ],
  },
  holzschutz: {
    name: "Holzschutz",
    alternateName: "Fixius Holzschutz",
    titleSuffix: "Holzschutz & Bautenschutz",
    description:
      "Ihr Spezialist für Holz- & Bautenschutz – professionelle Holzbehandlung, Bautenschutzmaßnahmen und Schädlingsprävention. Fixius vermittelt schnell und zuverlässig regionale Fachbetriebe für Holz- & Bautenschutz. Fixius bietet keine Schutzmaßnahmen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/holzschutz.webp",
    offers: [
      {
        name: "Holzschutz & Holzbehandlung",
        description:
          "Behandlung von Holz gegen Feuchtigkeit, Pilze, Schädlinge und Witterungseinflüsse.",
      },
      {
        name: "Bautenschutz & Abdichtung",
        description:
          "Abdichtungen, Schutzanstriche und Maßnahmen gegen Feuchtigkeitsschäden an Gebäuden.",
      },
      {
        name: "Schädlingsbekämpfung & Prävention",
        description:
          "Erkennung, Bekämpfung und Prävention von Holzwürmern, Termiten und anderen Schädlingen.",
      },
      {
        name: "Sanierung & Instandhaltung",
        description:
          "Sanierung von beschädigtem Holz, Schutz von tragenden Bauteilen und vorbeugende Wartung.",
      },
    ],
  },
  polsterer: {
    name: "Polsterer",
    alternateName: "Fixius Polsterer",
    titleSuffix: "Polsterarbeiten & Möbelrestaurierung",
    description:
      "Ihr Polsterer – professionelle Polsterarbeiten, Neubezug von Möbeln und Restaurierung. Fixius vermittelt schnell und zuverlässig regionale Polsterer. Fixius bietet keine Polsterleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/polsterarbeiten.webp",
    offers: [
      {
        name: "Möbelpolsterung",
        description:
          "Neubezug, Aufpolsterung und Reparatur von Polstermöbeln aller Art.",
      },
      {
        name: "Sitzmöbel & Polsterarbeiten",
        description:
          "Anfertigung und Anpassung von Sitzpolstern für Stühle, Bänke und Sofas.",
      },
      {
        name: "Möbelrestaurierung",
        description:
          "Restaurierung alter Möbelstücke, Austausch beschädigter Polsterteile und Aufarbeitung von Oberflächen.",
      },
      {
        name: "Sonderanfertigungen & Maßarbeit",
        description:
          "Individuelle Polsterlösungen nach Kundenwunsch für Möbel und Innenräume.",
      },
    ],
  },
  dachdecker: {
    name: "Dachdecker",
    alternateName: "Fixius Dachdecker",
    titleSuffix: "Dacharbeiten & Dachsanierung",
    description:
      "Ihr Dachdecker – professionelle Dacharbeiten, Reparaturen und Sanierungen. Fixius vermittelt schnell und zuverlässig regionale Dachdecker. Fixius bietet keine Dacharbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/dachdeckerarbeiten.webp",
    offers: [
      {
        name: "Dachmontage & Eindeckung",
        description:
          "Montage von neuen Dächern, Eindeckung mit Ziegeln, Schiefer oder Metall.",
      },
      {
        name: "Dachreparatur & Notdienst",
        description:
          "Reparatur von undichten Dächern, Sturmschäden und Notfalleinsätze.",
      },
      {
        name: "Dachsanierung & Modernisierung",
        description:
          "Sanierung alter Dächer, Austausch von Dachmaterialien und Dämmarbeiten.",
      },
      {
        name: "Flachdach & Abdichtung",
        description:
          "Installation und Reparatur von Flachdächern, Abdichtungen und Isolierungen.",
      },
    ],
  },
  stuckateur: {
    name: "Stuckateur / Verputzer",
    alternateName: "Fixius Stuckateur",
    titleSuffix: "Verputz & Stuckarbeiten",
    description:
      "Ihr Stuckateur – professionelle Verputzarbeiten, Stuckgestaltung und Fassadenarbeiten. Fixius vermittelt schnell und zuverlässig regionale Stuckateure. Fixius bietet keine Stuck- oder Verputzarbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/stuckateur.webp",
    offers: [
      {
        name: "Innenputz & Wandgestaltung",
        description:
          "Verputzen von Innenwänden, Decken und kreative Wandgestaltungen.",
      },
      {
        name: "Außenputz & Fassaden",
        description:
          "Professionelle Fassadenverputze, Wärmedämmverbundsysteme und Außenanstriche.",
      },
      {
        name: "Stuck & Dekor",
        description:
          "Stuckarbeiten, Gesimse, Zierleisten und dekorative Gestaltungselemente.",
      },
      {
        name: "Sanierung & Reparatur",
        description:
          "Instandsetzung von Rissen, alten Putzflächen und beschädigten Stuckelementen.",
      },
    ],
  },
  klimaanlagenbauer: {
    name: "Klimaanlagen-Techniker",
    alternateName: "Fixius Klimaanlagen-Techniker",
    // Note: This was not explicit in file, using old data with updated pattern
    titleSuffix: "Installation & Wartung", // Inferred
    description:
      "Ihr Klimaanlagen-Techniker – professionelle Installation und Wartung von Klimaanlagen. Fixius vermittelt schnell und zuverlässig regionale Klimatechniker. Fixius bietet keine Klimatechnik-Leistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/klimaanlage.webp",
    offers: [
      {
        name: "Split-Klimaanlagen",
        description:
          "Installation von Split-Klimageräten für Wohn- und Gewerberäume.",
      },
      {
        name: "Zentrale Klimaanlagen",
        description: "Planung und Installation zentraler Klimasysteme.",
      },
      {
        name: "Wartung",
        description: "Regelmäßige Wartung und Reinigung von Klimaanlagen.",
      },
      {
        name: "Reparatur",
        description: "Schnelle Reparatur defekter Klimaanlagen.",
      },
    ],
  },
  fliesenleger: {
    name: "Fliesenleger",
    alternateName: "Fixius Fliesenleger",
    titleSuffix: "Fliesenarbeiten & Verlegung",
    description:
      "Ihr Fliesenleger – professionelle Fliesenverlegung, Mosaikarbeiten und Badgestaltung. Fixius vermittelt schnell und zuverlässig regionale Fliesenleger. Fixius bietet keine Fliesenlegearbeiten direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/fliesenarbeiten.webp",
    offers: [
      {
        name: "Fliesenverlegung",
        description:
          "Fachgerechte Verlegung von Keramik-, Naturstein- und Mosaikfliesen.",
      },
      {
        name: "Badsanierung & Gestaltung",
        description:
          "Renovierung und Modernisierung von Bädern inklusive Fliesenarbeiten.",
      },
      {
        name: "Boden- & Wandfliesen",
        description:
          "Verlegung von Boden- und Wandfliesen in Wohn- und Geschäftsräumen.",
      },
      {
        name: "Reparatur & Instandhaltung",
        description:
          "Ausbesserung beschädigter Fliesen, Fugenarbeiten und Pflege bestehender Fliesenflächen.",
      },
    ],
  },
  // Spanish aliases for URL consistency with officos-2
  "emprsas-de-valores": {
    name: "Zaunbauer",
    alternateName: "Fixius Zaunbauer",
    titleSuffix: "Zäune, Tore & Gartengestaltung",
    description:
      "Ihr Zaunbauer – professionelle Montage von Zäunen, Toren und Gartenelementen. Fixius vermittelt schnell und zuverlässig regionale Zaunbauer. Fixius bietet keine Zaunbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/zaunbau.webp",
    offers: [
      {
        name: "Zäune & Sichtschutz",
        description:
          "Montage von Metall-, Holz- und Doppelstabmattenzäunen sowie Sichtschutzzäunen.",
      },
      {
        name: "Toranlagen & Schranken",
        description:
          "Planung, Lieferung und Montage von Einfahrtstoren, Gartentoren und Schrankenanlagen.",
      },
      {
        name: "Gartenelemente & Geländer",
        description:
          "Montage von Geländern, Gabionen, Pergolen und weiteren Gartenelementen.",
      },
      {
        name: "Reparatur & Wartung",
        description:
          "Reparatur, Austausch und Wartung von Zäunen, Toren und Gartenelementen.",
      },
    ],
  },
  "empresas-de-vidriera": {
    name: "Glaser",
    alternateName: "Fixius Glaser",
    titleSuffix: "Glasbau & Verglasungen",
    description:
      "Ihr Glaser – professionelle Glasarbeiten, Verglasungen und Glasreparaturen. Fixius vermittelt schnell und zuverlässig regionale Glasereien. Fixius bietet keine Glasbauleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/glasbau.webp",
    offers: [
      {
        name: "Fenster- & Türverglasung",
        description:
          "Montage und Austausch von Fenstern, Glastüren und Rahmenverglasungen.",
      },
      {
        name: "Glasreparatur",
        description:
          "Reparatur von beschädigtem Glas, Bruchstellen und Sicherheitsverglasungen.",
      },
      {
        name: "Dusch- & Raumverglasung",
        description:
          "Fachgerechte Montage von Duschkabinen, Trennwänden und Glasraumlösungen.",
      },
      {
        name: "Sonderanfertigungen",
        description:
          "Maßgeschneiderte Glaslösungen für Möbel, Geländer und Architekturprojekte.",
      },
    ],
  },
  "empresas-de-mudanzas": {
    name: "Umzugsunternehmen",
    alternateName: "Fixius Umzugsunternehmen",
    titleSuffix: "Umzüge & Transport",
    description:
      "Ihr Umzugsunternehmen – professionelle Umzüge, Möbeltransport und Entrümpelung. Fixius vermittelt schnell und zuverlässig regionale Umzugsunternehmen. Fixius bietet keine Umzugsleistungen direkt an. Wir vermitteln Kunden an erfahrene, unabhängige Fachbetriebe in der Region.",
    image: "/images/services/umzug.webp",
    offers: [
      {
        name: "Privatumzüge",
        description: "Organisation und Durchführung von privaten Umzügen.",
      },
      {
        name: "Firmenumzüge",
        description:
          "Professionelle Umzüge für Büros, Praxen und gewerbliche Einrichtungen.",
      },
      {
        name: "Möbeltransport & Einlagerung",
        description:
          "Transport, Demontage, Montage und optionale Lagerung von Möbeln.",
      },
      {
        name: "Entrümpelung & Entsorgung",
        description:
          "Fachgerechte Entrümpelung, Entsorgung und Recycling von Haushalts- oder Firmeninventar.",
      },
    ],
  },
};

/**
 * Generate Organization schema for a service
 */
export function generateOrganizationSchema(
  serviceKey: string,
  city?: string,
  locations?: Array<{
    zip: string | number;
    lat: number;
    lon: number;
    placeName: string;
  }>,
  latitude?: number,
  longitude?: number,
  region?: string,
) {
  const config = serviceSchemas[serviceKey];
  if (!config) {
    return null;
  }

  const cityText = city ? ` ${city}` : "";
  const locationText = city ? ` in ${city}` : "";

  // Construct name using optional suffix or fallback
  const nameSuffix = config.titleSuffix
    ? ` – ${config.titleSuffix}`
    : ` – ${config.name}`;
  const orgName = `${config.name}${cityText}${nameSuffix}`;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: orgName,
    alternateName: `${config.alternateName}${cityText}`,
    url: `${BASE_URL}/handwerker-finden/${serviceKey}`,
    logo: LOGO_URL,
    // Insert location into description.
    // If description has "–", insert location before it, otherwise just prepend?
    // The new descriptions provided already have a predictable structure: "Ihr [Service] – ..."
    // We want "Ihr [Service] in [City] – ..."
    description: config.description.replace(" –", `${locationText} –`),
    telephone: PHONE,
    email: EMAIL,
    foundingDate: FOUNDING_DATE,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "Kundendienst",
      availableLanguage: ["de"],
    },
    makesOffer: config.offers.map((offer) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offer.name,
        description: offer.description,
      },
    })),
  };

  // Add locations if provided
  if (locations && locations.length > 0) {
    schema.location = locations.map((loc) => ({
      "@type": "Place",
      name: `${city || loc.placeName} (${loc.zip})`,
      hasMap: `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lon}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city || loc.placeName,
        postalCode: loc.zip.toString(),
        ...(region && { addressRegion: region }),
        addressCountry: {
          "@type": "Country",
          name: "Deutschland",
        },
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lon,
      },
    }));
  } else if (city) {
    // Fallback if no specific locations list but city is provided
    schema.location = {
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        ...(region && { addressRegion: region }),
        addressCountry: {
          "@type": "Country",
          name: "Deutschland",
        },
      },
      ...(latitude &&
        longitude && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: latitude,
            longitude: longitude,
          },
          hasMap: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        }),
    };
  }

  return schema;
}

/**
 * Generate CollectionPage schema with breadcrumbs
 */
export function generateCollectionPageSchema(
  serviceKey: string,
  serviceTitle: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://www.fixius.de/handwerker-finden/${serviceKey}#webpage`,
    url: `https://www.fixius.de/handwerker-finden/${serviceKey}`,
    name: serviceTitle,
    description: `Suchst du einen ${serviceTitle}? Finde geprüfte Profis in deiner Nähe.`,
    inLanguage: "de-DE",
    isPartOf: {
      "@id": "https://www.fixius.de/#website",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Handwerker finden",
          item: `${BASE_URL}/handwerker-finden`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: serviceTitle,
          item: `${BASE_URL}/handwerker-finden/${serviceKey}`,
        },
      ],
    },
  };
}

/**
 * Generate generic Service JSON-LD (used for Service Hubs)
 */
export function generateServiceJsonLd(serviceKey: string) {
  const config = serviceSchemas[serviceKey];
  if (!config) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    alternateName: config.alternateName,
    url: `${BASE_URL}/${serviceKey}-in-der-naehe`,
    logo: LOGO_URL,
    image: `${BASE_URL}${config.image}`,
    description: config.description,
    telephone: PHONE,
    email: EMAIL,
    foundingDate: FOUNDING_DATE,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "Kundendienst",
      availableLanguage: "de",
    },
    makesOffer: config.offers.map((offer) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offer.name,
        description: offer.description,
      },
    })),
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
    },
  };
}
