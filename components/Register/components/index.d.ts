interface InputDataType {
  first_name: string;
  last_name: string;
  company_name: string;
  password: string;
  zip_code: string;
  email_address: string;
  phone_number: string;
  address:
    | string
    | {
        placeName: string;
        zipCode: string;
        coordinates: { lat: number; lng: number };
        formattedAddress: string;
      };
  streetAddress: string;
}
type FormDataErrorType = {
  passwordError?: string;
  zip_codeError?: string;
  email_addressError?: string;
  selectCardDataError?: string;
  phoneError?: string;
  company_nameError?: string;
  last_nameError?: string;
  first_nameError?: string;
  addressError?: string;
  streetAddressError?: string;
};
interface SetInputDataTypeProps {
  setInputData: React.Dispatch<React.SetStateAction<InputDataType>>;
  inputData: InputDataType;
  setInputDataError: React.Dispatch<React.SetStateAction<FormDataErrorType>>;
  inputDataError: FormDataErrorType;
  imageDataPageData: string[];
  setImagePageData: React.Dispatch<React.SetStateAction<string[]>>;
}
//Steps
type StepsDataType = {
  id?: number;
  step: number;
  img: string;
  title: string;
  paragraph: string;
};
