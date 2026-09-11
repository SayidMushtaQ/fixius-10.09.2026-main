"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const useLogin = () => {
	const [isLogin, setIsLogin] = useState(false);
	const router = useRouter();
	const { getLoginUser } = useAuth();

	const login = async (
		email: string,
		password: string,
		redirect: string = "/",
		setToggleLogin: any
		// setEmailVerification: Dispatch<SetStateAction<string>>
	) => {
		try {
			setIsLogin(true);

			const loginResponse = await axios.post("/api/auth/login", {
				email,
				password,
			});

			const userData = loginResponse.data;
			setIsLogin(false);

			if (loginResponse.status === 200) {
				localStorage.setItem(
					"accessToken",
					JSON.stringify(userData?.accessToken)
				);
				localStorage.setItem(
					"refreshToken",
					JSON.stringify(userData.refreshToken)
				);

				// Force auth state reload in context for instant header update
				await getLoginUser();

				setToggleLogin && setToggleLogin(false);

				// Redirect dynamically based on user role if default "/" was targeted
				if (redirect === "/") {
					let targetPath = "/";
					if (userData?.role === "admin") {
						targetPath = "/dashboard/admin";
					} else if (userData?.role === "handwerker") {
						targetPath = "/dashboard/handwerker";
					} else if (userData?.role === "kunde") {
						targetPath = "/dashboard/kunde/auftragsverlauf";
					}
					router.push(targetPath);
				} else {
					router.push(redirect);
				}

				toast.success("Erfolgreich eingeloggt");
				return 200;
				// setEmailVerification("");
				// localStorage.setItem("email_verification", "");
			}
		} catch (error: any) {
			setIsLogin(false);

			if (error.response) {
				// Custom handling for 401 error
				toast.error(error.response.data.message);
			} else {
				console.error(error);
				toast.error("Etwas ist schiefgelaufen, bitte versuche es erneut");
			}
		}
	};

	return { isLogin, login };
};

export default useLogin;
