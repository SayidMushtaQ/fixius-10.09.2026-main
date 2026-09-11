import { ICraftsman } from "@/backend/models/CrafstmanModel";
import { IPostalCode } from "@/backend/models/PostalCode";
import { ExtendDoc } from "@/context/AuthContext";

export type Address = {
  placeName: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  formattedAddress?: string;
} & ExtendDoc;
type Craftsman = ICraftsman & ExtendDoc;
interface User {
  name: string;
  role: string;
  lastName: string;
  profile_photo?: string;
  phone: string;
  email: string;
  password?: string;
  otp?: string;
  accessToken?: string;
  craftsman?: Craftsman;
  address?: Address;
  refreshToken?: string;
  createdAt?: string;
  _id?: string;
  status?: boolean;
  streetAddress?: string;
  ip?: string;
  active_status?: string;
}

export default User;
