import { UnifiedServiceContent } from "@/components/handwerker-in-der-naehe";
import { serviceSchemas } from "@/lib/serviceSchemas";

interface CraftsmanComponentProps {
  searchDefaultField: string;
}

type ComponentType = React.FC<CraftsmanComponentProps>;

type ComponentMap = {
  [key: string]: {
    Component: ComponentType;
    title: string;
  };
};

const createServiceComponent = (slug: string): ComponentType => {
  return ({ searchDefaultField }: CraftsmanComponentProps) => {
    const data = serviceSchemas[slug];
    if (!data) return <div>Service not found</div>;
    return <UnifiedServiceContent serviceData={data} searchDefaultField={searchDefaultField} />;
  };
};

export const components: ComponentMap = {
  maurer: {
    Component: createServiceComponent("maurer"),
    title: "Maurer in der Nähe",
  },
  schreiner: {
    Component: createServiceComponent("schreiner"),
    title: "Schreiner in der Nähe",
  },
  geruestbauer: {
    Component: createServiceComponent("geruestbauer"),
    title: "Gerüstbauer in der Nähe",
  },
  treppenbauer: {
    Component: createServiceComponent("treppenbauer"),
    title: "Treppenbauer in der Nähe",
  },
  gartenbauer: {
    Component: createServiceComponent("gartenbauer"),
    title: "Gartenbauer in der Nähe",
  },
  pflasterer: {
    Component: createServiceComponent("pflasterer"),
    title: "Pflasterer in der Nähe",
  },
  poolbauer: {
    Component: createServiceComponent("poolbauer"),
    title: "Poolbauer in der Nähe",
  },
  brunnenbauer: {
    Component: createServiceComponent("brunnenbauer"),
    title: "Brunnenbauer in der Nähe",
  },
  zaunbauer: {
    Component: createServiceComponent("zaunbauer"),
    title: "Zaunbauer in der Nähe",
  },
  fensterbauer: {
    Component: createServiceComponent("fensterbauer"),
    title: "Fensterbauer in der Nähe",
  },
  glaserei: {
    Component: createServiceComponent("glaserei"),
    title: "Glaser in der Nähe",
  },
  raumausstatter: {
    Component: createServiceComponent("raumausstatter"),
    title: "Raumausstatter in der Nähe",
  },
  innenarchitekt: {
    Component: createServiceComponent("innenarchitekt"),
    title: "Innenarchitekten in der Nähe",
  },
  trockenbauer: {
    Component: createServiceComponent("trockenbauer"),
    title: "Trockenbauer in der Nähe",
  },
  elektriker: {
    Component: createServiceComponent("elektriker"),
    title: "Elektriker in der Nähe",
  },
  architekt: {
    Component: createServiceComponent("architekt"),
    title: "Architekt in der Nähe",
  },
  erdarbeiten: {
    Component: createServiceComponent("erdarbeiten"),
    title: "Erdarbeiten in der Nähe",
  },
  umzugsunternehmen: {
    Component: createServiceComponent("umzugsunternehmen"),
    title: "Umzugsunternehmen in der Nähe",
  },
  metallbauer: {
    Component: createServiceComponent("metallbauer"),
    title: "Metallbauer in der Nähe",
  },
  heizungsbauer: {
    Component: createServiceComponent("heizungsbauer"),
    title: "Heizungsbauer in der Nähe",
  },
  sanitaer: {
    Component: createServiceComponent("sanitaer"),
    title: "Sanitär Installateur in der Nähe",
  },
  bodenleger: {
    Component: createServiceComponent("bodenleger"),
    title: "Bodenleger in der Nähe",
  },
  kuechenbauer: {
    Component: createServiceComponent("kuechenbauer"),
    title: "Küchenbauer in der Nähe",
  },
  betonbohrungen: {
    Component: createServiceComponent("betonbohrungen"),
    title: "Betonbohrungen & Betonsägen in der Nähe",
  },
  maler: {
    Component: createServiceComponent("maler"),
    title: "Maler & Lackierer in der Nähe",
  },
  kaminbauer: {
    Component: createServiceComponent("kaminbauer"),
    title: "Kaminbauer in der Nähe",
  },
  gebaeudereiniger: {
    Component: createServiceComponent("gebaeudereiniger"),
    title: "Gebäudereiniger in der Nähe",
  },
  moebelmontage: {
    Component: createServiceComponent("moebelmontage"),
    title: "Möbelmontage in der Nähe",
  },
  abbruchunternehmen: {
    Component: createServiceComponent("abbruchunternehmen"),
    title: "Abbruchunternehmen in der Nähe",
  },
  holzschutz: {
    Component: createServiceComponent("holzschutz"),
    title: "Holzschutz in der Nähe",
  },
  autowerkstatt: {
    Component: createServiceComponent("autowerkstatt"),
    title: "Autowerkstatt in der Nähe",
  },
  polsterer: {
    Component: createServiceComponent("polsterer"),
    title: "Polsterer in der Nähe",
  },
  dachdecker: {
    Component: createServiceComponent("dachdecker"),
    title: "Dachdecker in der Nähe",
  },
  stuckateur: {
    Component: createServiceComponent("stuckateur"),
    title: "Stuckateur / Verputzer in der Nähe",
  },
  klimatechniker: {
    Component: createServiceComponent("klimatechniker"),
    title: "Klimatechniker in der Nähe",
  },
  klimaanlagenbauer: {
    Component: createServiceComponent("klimaanlagenbauer"),
    title: "Klimaanlagen-Techniker in der Nähe",
  },
  fliesenleger: {
    Component: createServiceComponent("fliesenleger"),
    title: "Fliesenleger in der Nähe",
  },
  // Spanish aliases for URL consistency with officos-2
  "emprsas-de-valores": {
    Component: createServiceComponent("zaunbauer"),
    title: "Zaunbauer in der Nähe",
  },
  "empresas-de-vidriera": {
    Component: createServiceComponent("glaserei"),
    title: "Glaser in der Nähe",
  },
  "empresas-de-mudanzas": {
    Component: createServiceComponent("umzugsunternehmen"),
    title: "Umzugsunternehmen in der Nähe",
  },
};
