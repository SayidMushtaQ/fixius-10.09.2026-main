"use client";
import useUserRequests from "@/ApiRequests/user";
import ChangeProfilePhoto from "@/components/Dashboard/components/ChangeProfilePhoto";
import { useAuth } from "@/context/AuthContext";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Building2, User as UserIcon } from "lucide-react";

export type InputdDataType = {
  streetAddress?: string;
  company_name: string;
  name: string;
  last_name: string;
  email: string;
  zipCode: string;
  phone: string;
  address: string;
  location?: {
    type: string;
    coordinates: number[];
  };
};

export default function EditProfile() {
  const { userData, getLoginUser } = useAuth();
  const user = userData[0];
  const [zip_codeError, setZipCodeError] = useState<string>("");
  const { UpdateUser } = useUserRequests();

  const initialInput = {
    id: user?._id || "",
    company_name: user?.craftsman?.company_name || "",
    name: user?.name || "",
    last_name: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    zipCode: user?.address?.zipCode?.toString() || "",
    address: user?.address?.placeName || "",
    streetAddress: user?.streetAddress || "",
  };

  const [inputData, setInputData] = useState<InputdDataType>(initialInput);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((p) => ({ ...p, [name]: value }));
  };

  const handleAddressSelect = (data: any) => {
    setInputData((p) => ({
      ...p,
      zipCode: data.zipCode,
      address: data.city,
      streetAddress: data.formattedAddress,
      location: {
        type: "Point",
        coordinates: [data.coordinates.lng, data.coordinates.lat],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputData.phone) {
      toast.error("Geben Sie Ihre Telefonnummer ein");
      return;
    }

    try {
      let updateData: any = {
        id: user?._id,
        phone: inputData.phone,
        name: inputData.name,
        lastName: inputData.last_name,
        streetAddress: inputData.streetAddress,
        address: {
          zipCode: inputData.zipCode,
          placeName: inputData.address,
          coordinates: inputData.location?.coordinates || user?.address?.coordinates
        }
      };

      // user update api request
      await UpdateUser.mutateAsync(updateData, {
        onSuccess(data) {
          toast.success("Profil erfolgreich aktualisiert");
          getLoginUser();
        },
      });
    } catch (error: any) {
      const errorRes = error.response?.data;
      if (errorRes) {
        toast.error(errorRes.error);
      } else toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white p-8 rounded-xl border border-slate-100 shadow-soft">
      <div className="lg:w-1/3 flex flex-col items-center gap-4">
        <ChangeProfilePhoto />
        <p className="text-sm text-slate-500 text-center px-4">
          Laden Sie ein professionelles Foto hoch, um das Vertrauen Ihrer Kunden zu stärken.
        </p>
      </div>

      <form method="POST" className="flex-grow" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <UserIcon className="w-4 h-4 text-primary" />
              Vorname
            </label>
            <input
              disabled
              onChange={handleChange}
              type="text"
              name="name"
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              placeholder="Geben Sie Ihren Namen ein"
              value={inputData.name}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <UserIcon className="w-4 h-4 text-primary" />
              Nachname
            </label>
            <input
              disabled
              name="last_name"
              onChange={handleChange}
              type="text"
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              placeholder="Geben Sie Ihren Nachnamen ein"
              value={inputData.last_name}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Building2 className="w-4 h-4 text-primary" />
              Name des Unternehmens
            </label>
            <input
              name="company_name"
              type="text"
              disabled
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              placeholder="Geben Sie den Namen des Unternehmens ein"
              value={inputData.company_name}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Mail className="w-4 h-4 text-primary" />
              E-Mail
            </label>
            <input
              disabled
              name="email"
              type="email"
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              placeholder="Ihre E-Mail-Adresse"
              value={inputData.email}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Phone className="w-4 h-4 text-primary" />
              Telefon
            </label>
            <input
              name="phone"
              onChange={handleChange}
              type="text"
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-inter font-medium text-slate-900"
              placeholder="Telefonnummer eingeben"
              value={inputData.phone}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <MapPin className="w-4 h-4 text-primary" />
              Adresse suchen (wird automatisch ausgefüllt)
            </label>
            <div className="relative border border-slate-200 rounded-lg h-12 px-4 bg-slate-100 flex items-center cursor-not-allowed">
              <input
                disabled
                type="text"
                className="w-full h-full bg-transparent outline-none text-slate-500 font-inter font-medium cursor-not-allowed"
                value={inputData.streetAddress}
                placeholder="Geben Sie Ihre Adresse ein..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600">Postleitzahl</label>
            <input
              disabled
              type="text"
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              value={inputData.zipCode}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600">Stadt</label>
            <input
              disabled
              type="text"
              className="w-full h-12 border border-slate-200 bg-slate-100 text-slate-500 rounded-lg px-4 cursor-not-allowed font-inter font-medium"
              value={inputData.address}
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={UpdateUser.isPending}
              className="bg-primary hover:bg-black text-white px-8 py-2.5 rounded-lg font-bold font-montserrat transition-all active:scale-95 disabled:opacity-50 shadow-soft"
            >
              {UpdateUser.isPending ? "Speichern..." : "Profil speichern"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
