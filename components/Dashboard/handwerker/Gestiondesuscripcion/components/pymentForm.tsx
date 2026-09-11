"use client";
import { CustomSelect } from "@/components/Common/CustomSelect";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import { useQueryClient } from "@tanstack/react-query";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import bankImg from "./Screenshot_4-removebg-preview.png";
import ViewAndConfirm from "./veiwAndConfirm";
import PaymentInstructions from "./viewPaymentInstruction";

interface FormDetails {
  accountHolderName: string;
  bankName: string;
  iban: string;
}

interface Option {
  value: string;
  label: string;
  imgSrc?: StaticImageData; // Optional image source
}

const BankTransferForm = ({
  subscription: plan,
  closeModal,
}: {
  subscription: any;
  closeModal: any;
}) => {
  const [isNext, setIsNext] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleClientError = clientError();
  const [subscription, setSubscrition] = useState<any>(null);
  const { userData } = useAuth();
  const user = userData[0];
  const queryClient = useQueryClient();
  const [formDetails, setFormDetails] = useState<FormDetails>({
    accountHolderName: "",
    bankName: "",
    iban: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<Option>({
    value: "",
    label: "",
    imgSrc: undefined,
  });

  const handlePaymentMethodChange = (value: Option) => {
    setPaymentMethod(value);
  };
  const handleClick = () => {
    setIsNext(true);
  };

  const handleConfirm = async (CreateSubscritpion: any) => {
    try {
      const data = {
        planId: plan._id,
        payment_details: {
          payment_method: "bank_transfer",
          // bank_details: formDetails,
        },
      };

      await CreateSubscritpion.mutateAsync(data, {
        onSuccess(data: any) {
          setIsConfirmed(true);
          setSubscrition(data);
          queryClient.invalidateQueries({ queryKey: ["getSubscription"] });
          toast.success(
            "Wir haben eine E-Mail mit den Zahlungsanweisungen gesende"
          );
        },
      });
    } catch (error) {
      handleClientError(error);
    }
  };

  const options: Option[] = [
    { value: "", label: "Wählen Sie die Zahlungsmethode" },
    {
      value: "bank_transfer",
      label: "Transferencia Bancaria",
      imgSrc: bankImg,
    },
    // Add more payment methods here if needed
  ];

  return (
    <>
      {!isConfirmed ? (
        <>
          {!isNext ? (
            <div className="p-4 mx-auto max-w-full lg:w-[500px]">
              <div className="block mb-8">
                <p className="text-gray-700 text-lg">Zahlungsmethode:</p>

                <CustomSelect
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  options={options}
                  isFirstOptionDisabled={true}
                />
              </div>

              <div>
                <label className="block">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="mt-1 block bg-orange text-white w-full p-2 border border-gray-300 rounded-md text-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    Weiter
                  </button>
                </label>
              </div>
            </div>
          ) : (
            <ViewAndConfirm
              subscriptionDetails={plan}
              // formDetails={formDetails}
              paymentMethod={paymentMethod}
              onConfirm={handleConfirm}
              // onEdit={() => setIsNext(false)}
            />
          )}
        </>
      ) : (
        <PaymentInstructions
          name={user?.name}
          plan={plan}
          paymentId={subscription?.paymentId}
        />
      )}
    </>
  );
};

export default BankTransferForm;
