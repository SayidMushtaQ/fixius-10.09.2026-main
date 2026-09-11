const navigation = [
    {
        id: 1,
        linkText: "Auftragsliste",
        img: "/Dashboard/oficial/orders.svg",
        href: "/dashboard/handwerker/auftragsangebote",
    },
    {
        id: 2,
        linkText: "Profilverwaltung",
        img: "/Dashboard/oficial/editProfile.svg",
        href: "/dashboard/handwerker/profil-bearbeiten",
    },
    {
        id: 3,
        linkText: "Passwort",
        img: "/Dashboard/cliente/password.svg",
        href: "/dashboard/handwerker/passwort",
    },
    {
        id: 4,
        linkText: "Nachrichten",
        img: "/Dashboard/oficial/messages.svg",
        href: "/dashboard/handwerker/nachrichten",
    },
    {
        id: 5,
        linkText: "Auftragsverlauf",
        img: "/Dashboard/oficial/orders.svg",
        href: "/dashboard/handwerker/bestellungen",
    },
    {
        id: 6,
        linkText: "Bewertungen & Feedback",
        img: "/Dashboard/oficial/paymentPackages.svg",
        href: "/dashboard/handwerker/bewertungen-und-kommentare",
    },
    {
        id: 7,
        linkText: "Abonnementverwaltung",
        img: "/Dashboard/oficial/messages.svg",
        href: "/dashboard/handwerker/abonnementverwaltung",
    },
    {
        id: 8,
        linkText: "Zahlungseinstellungen",
        img: "/Dashboard/oficial/messages.svg",
        href: "/dashboard/handwerker/zahlungseinstellungen",
    },
    {
        id: 9,
        linkText: "Job-Benachrichtigungen",
        img: "/Dashboard/oficial/paymentPackages.svg",
        href: "/dashboard/handwerker/auftragsalarm",
    },
];

const statuses = ["terminiert", "offen", "abgelehnt", "zurückgezogen", "akzeptiert"];

const statusMap = {
    pending: "offen",
    accepted: "akzeptiert",
    rejected: "abgelehnt",
    completed: "terminiert",
    withdrawn: "zurückgezogen",
    open: "offen"
};

const handymanPofileImgsSrc = [
    "/Dashboard/oficial/handyman-profile-1.svg",
    "/Dashboard/oficial/handyman-profile-2.svg",
    "/Dashboard/oficial/handyman-profile-3.svg",
    "/Dashboard/oficial/handyman-profile-3.svg",
];

export { handymanPofileImgsSrc, navigation, statuses, statusMap };
