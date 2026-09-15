import type { Dispatch, SetStateAction } from "react";

export type Zip_codePropsType = {
  setServicePopUP: Dispatch<SetStateAction<boolean>>;
  setZip_code: Dispatch<SetStateAction<string>>;
  zip_code: string;
  find_handyman_search: () => void;
  zip_codeError: string;
  setZip_codeError: Dispatch<SetStateAction<string>>;
};

export type ServicePropsType = Zip_codePropsType & {
  setServiceCardData: Dispatch<SetStateAction<string[]>>;
};

export type orderTimeType = {};