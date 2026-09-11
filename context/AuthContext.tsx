"use client";
import User from "@/backend/controllers/user/interface";
import { IPostalCode } from "@/backend/models/PostalCode";
import useApiCaller from "@/hooks/useApiCaller";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
export interface ExtendDoc {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface ContactDetails {
  email: string;
  name: string;
  phone: string;
}

type Address = IPostalCode & ExtendDoc;

interface AdditionalDetails {
  how_many_floors: string;
  how_many_rooms: string;
  square_meters: string;
}

interface ServiceTitle {
  other_title: string;
  service_title: string;
  square_meters: string;
}

interface IJobProps {
  _id: string;
  category: string;
  listingId: number;
  status: string;
  additional_details: AdditionalDetails;
  additional_job_description: string;
  contactDetails: ContactDetails;
  location: Address;
  images: string[];
  serviceTitle: ServiceTitle;
  working_schedule: string;
  created_at: Date;
  updated_at: Date;
}

export type IUserProps = User & ExtendDoc;

interface AuthContextProps {
  userData: IUserProps[];
  userPostedJob: IJobProps[];
  setUserData: Dispatch<SetStateAction<IUserProps[]>>;
  setUserPostedJob: Dispatch<SetStateAction<IJobProps[]>>;
  getUserPostedJob: () => Promise<void>;
  email_verification: String;
  setEmail_verification: Dispatch<SetStateAction<string>>;
  isAuthUserLoading: boolean;
  setIsAuthUserLoading?: Dispatch<SetStateAction<boolean>>;
  getLoginUser: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userData, setUserData] = useState<IUserProps[]>([]);

  const [isAuthUserLoading, setIsAuthUserLoading] = useState<boolean>(true);
  const [userPostedJob, setUserPostedJob] = useState<IJobProps[]>([]);
  const [email_verification, setEmail_verification] = useState<string>("");
  const apiCaller = useApiCaller();
  const accessToken =
    typeof window !== "undefined"
      ? (localStorage.getItem("accessToken") as string)
      : "";
  // console.log({accessToken});
  let parsedToken: unknown;
  if (accessToken !== "") {
    parsedToken = JSON.parse(accessToken);
  } else parsedToken = null;

  const getUserPostedJob = async () => {
    try {
      if (!userData[0]?._id && !localStorage.getItem("userId_for_admin_req") && !parsedToken) return;

      const simulatedUserId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId_for_admin_req")
          : null;
      let url = `/jobpost?pageSize=100&pageNumber=1`;
      if (simulatedUserId) {
        url += `&userId=${simulatedUserId}`;
      }

      const response = await apiCaller.get(url);
      if (response.status === 200) {
        setUserPostedJob(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginUser = async () => {
    try {
      const getLoggedInUserData = await apiCaller.get("/auth/login");
      if (getLoggedInUserData.status === 200) {
        if (getLoggedInUserData.data !== "") {
          setUserData([getLoggedInUserData.data]);
        } else {
          setUserData([]);
        }
        setIsAuthUserLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthUserLoading(false);
    }
  };
  // * get user data logic * //
  useEffect(() => {
    if (!accessToken) return;
    if (accessToken) {
      // retrive user data
      getLoginUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // * get user posted job logic * //
  useEffect(() => {
    getUserPostedJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // useEffect(() => {
  // 	const state: string = localStorage.getItem(
  // 		"email_verification"
  // 	) as string;
  // 	setEmail_verification(state);
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        userPostedJob,
        setUserPostedJob,
        setUserData,
        getUserPostedJob,
        email_verification,
        setEmail_verification,
        isAuthUserLoading,
        getLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Auth Context provider");
  }
  return context;
};
