import Switcher1 from "@/components/Common/Switch";
import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import stripelogo from "./2560px-Stripe_Logo__revised_2016.svg-removebg-preview.png";
import banklogo from "./bank.png";

export default function SubscriptionManagement() {
  const cardsData = [
    {
      cardType: "VISA",
      cardNumber: "***** 5555",
      text: "Filippo Di Trapani",
      expiryDate: "07/22",
      imgSrc: "/Dashboard/oficial/paypal-logo.svg",
      checked: true,
      shortDesc: "Ein weiteres PayPal-Konto hinzufügen",
    },
    {
      cardType: "VISA",
      cardNumber: "***** 5555",
      text: "Filippo Di Trapani",
      expiryDate: "07/22",
      imgSrc: banklogo,
      checked: false,
      shortDesc: "Eine weitere Kredit- oder Debitkarte hinzufügen",
    },
    {
      cardType: "VISA",
      cardNumber: "***** 5555",
      text: "Filippo Di Trapani",
      expiryDate: "07/22",
      imgSrc: stripelogo,
      checked: false,
      shortDesc: "Eine weitere Kredit- oder Debitkarte hinzufügen",
    },
  ];
  return (
    <div className="w-full lg:max-w-7xl mx-auto px-4 lg:px-10 py-10">
      <h1 className="text-2xl lg:text-3xl font-bold font-outfit text-slate-950 mb-8">
        <span className="text-primary italic">Verwalte deine Zahlungen: </span> Entdecke
        die Zahlungseinstellungen
      </h1>
      <div className="lg:grid lg:grid-cols-12 flex flex-col gap-8">
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-6">
            {cardsData.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex gap-2 bg-white w-full shadow-soft p-6 rounded-xl border border-slate-100 transition-all hover:border-primary/20"
                  style={{ minHeight: 120 }}
                >
                  <div className="flex w-1/5 items-center gap-2">
                    <Switcher1
                      isChecked={item.checked}
                      setIsChecked={() => {}}
                      handleAction={() => {}}
                    />
                  </div>
                  <div className="flex w-4/5 justify-between items-center text-[#00000092]">
                    <div></div>
                    <div>
                      <Image
                        alt={""}
                        width={118}
                        height={44}
                        src={item?.imgSrc}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-3 w-full bg-slate-50 p-4 rounded-xl border border-slate-100">
              <BiInfoCircle className="text-slate-400" fontSize={24} />{" "}
              <span className="text-slate-500 text-sm leading-relaxed font-inter font-medium">
                Indem du diese Kreditkarte speicherst, akzeptierst du unsere
                Nutzungsbedingungen und autorisierst wiederkehrende Zahlungen,
                bis du dein Abonnement kündigst, was jederzeit möglich ist.
              </span>
            </div>
            <div>
              <button className="px-6 py-2.5 text-white bg-primary rounded-lg font-bold font-montserrat transition-all hover:bg-black shadow-soft">
                Senden
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-6 shadow-soft overflow-hidden break-words sticky top-6">
            <h2 className="border-b pb-4 mb-4 border-slate-200 font-bold text-slate-950 font-outfit text-lg">
              Abonnementdetails
            </h2>
            <div className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed font-inter font-medium">
                Vielen Dank, dass du unseren Abonnementservice gewählt hast. Dein
                Abonnement umfasst Zugriff auf Premium-Inhalte, exklusive
                Funktionen und regelmäßige Updates.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-inter font-medium">
                Um dein Abonnement zu verwalten oder Änderungen vorzunehmen, kannst du dies hier tun.
              </p>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-slate-400 text-xs font-inter">SUPPORT</p>
                <p className="text-primary font-bold font-inter text-sm mt-1">support@officios24.de</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
