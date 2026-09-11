"use client";
import useAuthRequests from "@/ApiRequests/auth";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
// Validation functions
const checkLengthAndComplexity = (password: string) => {
	const lengthCondition = password.length >= 8 && password.length <= 12;
	const complexityCondition =
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/\d/.test(password) &&
		/\W/.test(password);
	return lengthCondition && complexityCondition;
};

const checkMixOfCharacters = (password: string) => {
	const uppercaseCondition = /[A-Z]/.test(password);
	const lowercaseCondition = /[a-z]/.test(password);
	const numberCondition = /\d/.test(password);
	const specialCharacterCondition = /\W/.test(password);
	return (
		uppercaseCondition &&
		lowercaseCondition &&
		numberCondition &&
		specialCharacterCondition
	);
};

const checkNoObviousInformation = (password: string) => {
	const obviousInformation = [
		"password",
		"123",
		"qwerty",
		"admin",
		"letmein",
		"welcome",
		"secret",
		"password123",
		"admin123",
		"letmein123",
		"welcome123",
		"adminadmin",
		"test",
		"user",
		"login",
		"pass",
		"abc123",
		"iloveyou",
		"football",
		"baseball",
		"sunshine",
		"master",
		"monkey",
		"shadow",
		"qazwsx",
		"password1",
		"1234",
		"abcd",
		"password12",
		"qwerty123",
		"password1234",
		"qwertyuiop",
		"12345678",
		"adminadmin",
		"password!",
		"123456789",
		"admin1234",
		"password!",
		"admin12345",
		"admin123456",
		"admin1234567",
		"admin12345678",
		"admin123456789",
		// Add more obvious words as needed
	];
	// Add more obvious information
	return !obviousInformation.some((info) =>
		password.toLowerCase().includes(info)
	);
};

// const checkUniquePassword = (password: string) => {
// 	const oldPasswords = ["oldPassword1", "oldPassword2"]; // Add more old passwords
// 	return !oldPasswords.includes(password);
// };

interface SecurityMessage {
	name: string;
	isSecure: boolean;
	messsage: string;
}
interface PasswordChangeProps {
	passwords: Passwrods;
	// setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const messages = [
	{
		name: "checkNoObvious",
		isSecure: false,
		messsage: "Keine Verwendung offensichtlicher Informationen.",
	},
	{
		name: "checkUnique",
		isSecure: false,
		messsage: "Einzigartig, keine Wiederholung alter Passwörter.",
	},
	{
		name: "checkMixChar",
		isSecure: false,
		messsage:
			"Verwenden Sie eine Kombination aus Buchstaben, Zahlen und Sonderzeichen in Groß- und Kleinschreibung.",
	},
	{
		name: "checkLenth",
		isSecure: false,
		messsage: "Erfüllt die Länge und Komplexität von 8–12 Zeichen.",
	},
];
export interface Passwrods {
	newPassword: string;
	currentPassword: string;
	confirmPassword: string;
}

export const initialPasswords = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};
const useChangePassword = (currentPassword: string = "") => {
	const [securityMessages, setSecurityMessages] =
		useState<SecurityMessage[]>(messages);
	const updateSecurityMassages = (newPassword: string) => {
		setSecurityMessages((prevMessages) =>
			prevMessages.map((message, index) => {
				switch (index) {
					case 0: // checkNoObvious
						return {
							...message,
							isSecure:
								newPassword === ""
									? false
									: checkNoObviousInformation(newPassword),
						};
					case 1: // checkUnique
						return {
							...message,
							isSecure: prevMessages[0].isSecure
								? passwords.currentPassword !== newPassword
								: false,
						};
					case 2: // checkMixChar
						return {
							...message,
							isSecure:
								prevMessages[1].isSecure && newPassword !== ""
									? checkMixOfCharacters(newPassword)
									: false,
						};
					case 3: // checkLength
						return {
							...message,
							isSecure:
								newPassword !== ""
									? checkLengthAndComplexity(newPassword)
									: false,
						};

					default:
						return message;
				}
			})
		);
	};
	const [passwords, setPasswords] = useState<Passwrods>(initialPasswords);
	const setInitialSecurityMessage = () => setSecurityMessages(messages);

	// Function to check if a security condition is fulfilled
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
		const newPassword = value;
		name === "newPassword" && updateSecurityMassages(newPassword);
		name === "confirmPassword"
			? matchConfirmPass(newPassword)
			: setConfirmPasswordErr("");
	};

	const [showPassword, setShowPassword] = useState(false);
	const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>("");
	const matchConfirmPass = (confirmPass: string) => {
		if (passwords.newPassword !== confirmPass) {
			setConfirmPasswordErr(
				"Bestätigen Sie, dass das Passwort nicht mit dem neuen Passwort übereinstimmt"
			);
		} else {
			setConfirmPasswordErr("");
		}
	};

	const toggleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const { changPassword } = useAuthRequests();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await changPassword.mutateAsync(passwords, {
				onSuccess(data, variables, context) {
					toast.success(data.message);
					setPasswords(initialPasswords);
					setInitialSecurityMessage();
				},
			});
		} catch (error: any) {
			console.log(error);
			toast.error(error?.response?.data.message);
			setPasswords(initialPasswords);
			setInitialSecurityMessage();
		}
	};

	const isFormBtnEnable =
		(securityMessages.every((e) => e.isSecure) &&
			confirmPasswordErr === "") ||
		false;

	useEffect(() => {
		setPasswords((pre) => ({ ...pre, currentPassword }));
	}, [currentPassword]);
	return {
		securityMessages,
		toggleShowPassword,
		handleSubmit,
		handleChange,
		passwords,
		showPassword,
		confirmPasswordErr,
		isFormBtnEnable,
		isSaving: changPassword.isPending,
		isSuccess: changPassword.isSuccess,
	};
};

export default useChangePassword;
