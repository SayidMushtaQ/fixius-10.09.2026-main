type ActionTypeString = string;
type SetStringStateAction = React.Dispatch<
	React.SetStateAction<ActionTypeString>
>;
type Page1DataType = {
	service_title: ActionTypeString;
	other_title: ActionTypeString;
	square_meters: ActionTypeString;
};
type NumberOfElementType = {
	square_meters: ActionTypeString;
	how_many_rooms: ActionTypeString;
	how_many_floors: ActionTypeString;
};
interface CommonPropType {
	setPage1Data: React.Dispatch<React.SetStateAction<Page1DataType>>;
	page1Data: Page1DataType;
	handleTitleError: SetStringStateAction;
}

type InstructionBarPropsType = CommonPropType & {
	title: ActionTypeString;
	id: number;
};
type PagePropsType = CommonPropType & {
	titleError: ActionTypeString;
	serviceTitle: string[];
};
type LocationOfJobPage = {
	setLocationDataPage: SetStringStateAction;
	locationDataPage: ActionTypeString;
	locationDataPageError: ActionTypeString;
	setlocationDataPageError: SetStringStateAction;
	setAddressId: SetStringStateAction;
	addressId: ActionTypeString;
	setIsNextBtnDisable: SetBooleanStateAction;
};
type WorkingSchedulePropsType = {
	setWorking_SchedulePage: Dispatch<SetStateAction<ActionTypeString>>;
	working_SchedulePage: ActionTypeString;
	working_SchedulePageError: ActionTypeString;
	setWorking_SchedulePageError: SetStringStateAction;
};
interface ContactDetailsPageDataType {
	name: ActionTypeString;
	email: ActionTypeString;
	phone: ActionTypeString;
	password: ActionTypeString;
	address: ActionTypeString;
}
interface ContactDetailsPageDataTypeError {
	nameError: ActionTypeString;
	emailError: ActionTypeString;
	phoneError: ActionTypeString;
}
type ContactDetailsPropsTypePag = {
	setContactDetailsPage: React.Dispatch<
		React.SetStateAction<ContactDetailsPage6DataType>
	>;
	contactDetailsPageError: ContactDetailsPage6DataTypeError;
	contactDetailsPage: ContactDetailsPage6DataType;
	setIsNextBtnDisable: SetBooleanStateAction;
	isNextBtnDisable: boolean;
};
interface serviceCardPopUPDataType {
	serviceTitle: Page1DataType;
	additional_details: NumberOfElementType;
	additional_job_description: ActionTypeString;
	images: ActionTypeString[];
	location: ActionTypeString;
	working_schedule: ActionTypeString;
	contactDetails: ContactDetailsPageDataType;
}
