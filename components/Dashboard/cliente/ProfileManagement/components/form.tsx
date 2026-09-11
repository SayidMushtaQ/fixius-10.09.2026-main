"use client";
import usePostalRequests from "@/ApiRequests/postal";
import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type formDataProps = {
  _id: string;
  name: string;
  lastName: string;
  zipCode?: string;
  phoneNumber: string;
};

export default function ProfileManagementForm() {
  const [isDataSaving, setIsDataSaving] = useState<boolean>(false);
  const { userData, setUserData, userPostedJob } = useAuth();
  const { GetPostalsBySearch } = usePostalRequests();
  const [search, setSearch] = useState<any>();
  const { data, refetch, isLoading } = GetPostalsBySearch(search);
  const { UpdateUser } = useUserRequests();
  const { mutateAsync } = UpdateUser;
  const [addressId, setAddressId] = useState<string>("");
  const [formData, setFormData] = useState<formDataProps>(() => {
    const defaultFormData: formDataProps = {
      _id: "",
      name: userData[0]?.name || "",
      lastName: userData[0]?.lastName || "",
      zipCode: userData[0]?.address?.zipCode,
      phoneNumber: userData[0]?.phone || "",
    };

    return defaultFormData;
  });

  const isFormBtnDisable =
    !formData.name &&
    !formData.lastName &&
    !formData.zipCode &&
    !formData.phoneNumber;

  const firstJob = userPostedJob?.slice(0, 1);
  // const firstJobZipCode = firstJob[0]?.location?.zip_code; // Adjusted or removed if not used

  const zipCode = userData[0]?.address?.zipCode?.toString();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "zipCode") {
      if (!value) return setSearch(undefined);
      if (value.length >= 5) {
        setSearch(value);
      } else {
        setSearch(undefined);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (formData._id) return;

    setFormData((prevData) => ({
      ...prevData,
      _id: userData[0]?._id,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsDataSaving(true);
      const updateData = {
        ...formData,
        phone: formData.phoneNumber,
        address: addressId,
      };
      await mutateAsync(updateData, {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          setFormData(data.user);
          setUserData([data.user]);
        },
        onSettled(data, error, variables, context) {
          // toast.error(data);
        },
        /* onError(error, variables, context) {
					toast.error(error.message);
				}, */
      });

      // Reset the form data
      setFormData({
        _id: userData[0]?._id || "",
        name: userData[0]?.name || "",
        lastName: userData[0]?.lastName || "",
        zipCode: userData[0]?.address?.zipCode,
        phoneNumber: userData[0]?.phone || "",
      });

      setIsDataSaving(false);
    } catch (error) {
      setIsDataSaving(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData({
      _id: userData[0]?._id,
      name: userData[0]?.name,
      lastName: userData[0]?.lastName,
      zipCode: userData[0]?.address?.zipCode,
      phoneNumber: userData[0]?.phone,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData[0]]);

  return (
    <div className="w-4/5 space-y-3">
      <form method="POST" onSubmit={handleFormSubmit}>
        <div className=" mx-auto  p-8 ">
          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-2 font-bold  text-gray-700">
                Name
              </label>
              <input
                disabled
                type="text"
                name="name"
                className="w-full border cursor-not-allowed rounded px-3 py-2 "
                value={formData.name || ""}
                placeholder="Ingrese su nombre"
              />
            </div>
            {/* no se necesita ahora */}
            <div className="w-full md:w-1/2 md:pl-2">
              <label className="block mb-2 font-bold text-gray-700">
                Nachname
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full border rounded px-3 py-2"
                value={formData.lastName || ""}
                placeholder="Geben Sie Ihren Nachnamen ein (optional"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-2 font-bold text-gray-700">
                E-Mail-Adresse eingeben
              </label>
              <input
                type="email"
                name="email"
                className="w-full border rounded px-3 py-2 cursor-not-allowed"
                value={userData[0]?.email || ""}
                placeholder="Ingrese su E-Mail-Adresse eingeben"
                disabled
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 relative">
              <label className="block mb-2 font-bold text-gray-700">
                Postleitzahl
              </label>
              <input
                type="text"
                name="zipCode"
                className="w-full border rounded px-3 py-2"
                value={formData.zipCode || ""}
                placeholder="Ingrese su código postal"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block mb-2 font-bold text-gray-700">
                Telefonnummer
              </label>
              <input
                type="number"
                name="phoneNumber"
                className="w-full border rounded px-3 py-2"
                value={formData.phoneNumber || ""}
                placeholder="Ingrese su número de teléfono"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 flex items-end justify-center md:justify-end">
              <label className="block mb-2 font-bold text-gray-700"></label>

              <button
                disabled={isFormBtnDisable || isDataSaving}
                className="bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl font-medium focus:outline-none float-right disabled:cursor-not-allowed disabled:opacity-50"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
