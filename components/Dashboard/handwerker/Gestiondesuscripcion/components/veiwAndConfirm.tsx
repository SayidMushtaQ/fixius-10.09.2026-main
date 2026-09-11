import usePlanRequest from "@/ApiRequests/plan";
import Image from "next/image";
import React from "react";

interface FormDetails {
  accountHolderName: string;
  bankName: string;
  iban: string;
}

interface ViewAndConfirmProps {
  // formDetails: FormDetails;
  // onEdit: () => void;
  onConfirm: any;
  subscriptionDetails: any;
  paymentMethod: any;
}

const ViewAndConfirm: React.FC<ViewAndConfirmProps> = ({
  // formDetails,
  subscriptionDetails,
  // onEdit,
  onConfirm,
  paymentMethod,
}) => {
  const { CreateSubscritpion } = usePlanRequest();

  return (
    <div className="p-4 mx-auto max-w-full lg:max-w-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          Abonnementdetails
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-gray-700 text-lg">
                  Name des Abonnements:
                </td>
                <td className="border px-4 py-2 text-gray-700 text-lg">
                  {subscriptionDetails?.name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-700 text-lg">
                  Preis:
                </td>
                <td className="border px-4 py-2 text-gray-700 text-lg">
                  EUR{subscriptionDetails?.price}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-700 text-lg">
                  Zahlungsart
                </td>
                <td className="border px-4 py-2 text-gray-700 text-lg flex items-center gap-2">
                  {paymentMethod.label}{" "}
                  <Image
                    width={100}
                    height={50}
                    className="w-[50px]"
                    src={paymentMethod.imgSrc}
                    alt={paymentMethod.label}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full">
        <button
          type="button"
          disabled={CreateSubscritpion.isPending}
          onClick={() => onConfirm(CreateSubscritpion)}
          className="mt-4 disabled:opacity-50 p-2 bg-green-500 w-full text-white rounded-md shadow-sm hover:bg-green-600"
        >
          Bestellung bestätigen
        </button>
      </div>
    </div>
  );
};

export default ViewAndConfirm;
