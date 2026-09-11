export type Zip_codePropsType = {
    setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
    setZip_code: React.Dispatch<React.SetStateAction<string>>;
    zip_code: string;
    find_handyman_search: () => void;
    zip_codeError: string;
    setZip_codeError: React.Dispatch<React.SetStateAction<string>>;
  }
export type ServicePropsType = Zip_codePropsType &{
  setServiceCardData: React.Dispatch<React.SetStateAction<string[]>>;
}
export type orderTimeType = {

}