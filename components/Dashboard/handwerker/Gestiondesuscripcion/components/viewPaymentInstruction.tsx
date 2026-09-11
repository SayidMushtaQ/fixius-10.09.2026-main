import React from "react";


interface BankDetails {
bankName: string;
iban: string;
swiftCode: string;
}


interface PlanDetails {
duration_in_days: number;
price: number;
}


interface BankDetailsEmailProps {
name: string;
plan: PlanDetails;
paymentId: string;
}


const BankDetailsEmail: React.FC<BankDetailsEmailProps> = ({
name,
plan,
paymentId,
}) => {
return (
<div className="max-w-full mx-auto font-sans">
<div className="max-w-lg mx-auto p-6">
<div className="mb-8 text-center">
<h1 className="text-xl font-bold mb-2">Zahlungsanweisungen</h1>
</div>


<p className="mb-2">Sehr geehrte/r {name},</p>


<p className="mb-4">
Vielen Dank für Ihre Buchung des {plan?.duration_in_days * 30}-Tage-Pakets auf unserem Handwerker-Portal! Bitte überweisen Sie den unten angegebenen Betrag auf das genannte Bankkonto und vergessen Sie nicht, die folgende Zahlungs-ID als Verwendungszweck anzugeben:
</p>


<p className="mb-2">
<strong>Zahlungs-ID:</strong>{" "}
<span className="text-red-400">{paymentId}</span>
</p>


<p className="mb-4">
<strong>Betrag:</strong> €{plan?.price}
</p>


<div className="p-2 bg-gray-100 rounded-lg mb-4">
<h2 className="font-bold mb-2">Bankdaten</h2>
<p className="mb-2">
<span className="font-semibold">Bankname:</span>{" "}
{process.env.NEXT_PUBLIC_BANK_NAME}
</p>
<p className="mb-2">
<span className="font-semibold">IBAN:</span>{" "}
{process.env.NEXT_PUBLIC_IBAN}
</p>
<p className="">
<span className="font-semibold">BIC/SWIFT-Code:</span>{" "}
{process.env.NEXT_PUBLIC_SWIFT_CODE}
</p>
</div>


<p className="mb-2">
Sobald Ihre Zahlung bei uns eingegangen ist, wird Ihr Abonnement automatisch aktiviert. Sollten Sie Fragen haben oder Unterstützung benötigen, können Sie uns jederzeit kontaktieren.
</p>


<p className="mb-4">Vielen Dank für Ihre Zusammenarbeit!</p>


<hr className="border-t border-gray-300 mb-4" />


<p>
Mit freundlichen Grüßen,
<br />
Ihr Team des Handwerker-Serviceportals
</p>
</div>
</div>
);
};


export default BankDetailsEmail;