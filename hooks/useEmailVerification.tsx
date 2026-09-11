"use client";
// hooks/useEmailVerification.js
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useLogin from "./useLogin";

const useEmailVerification = () => {
	const [succesModalIsOpen, setSuccesModalIsOpen] = useState<string>("");

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { setUserData, isAuthUserLoading } = useAuth();

	const verifyStatus = searchParams ? searchParams.get("email_verification") : null;
	const email = searchParams ? searchParams.get("eid") : null;
	const isReset = searchParams ? searchParams.get("reset") : null;
	const password = searchParams ? searchParams.get("id") : null;
	const role = searchParams ? searchParams.get("role") : null;

	const { login } = useLogin();

	useEffect(() => {
		const deleteQuery = (targetPath: string) => {
			if (!searchParams) return;
			const params = new URLSearchParams(searchParams.toString());
			params.delete("email_verification");
			params.delete("eid");
			params.delete("id");
			params.delete("reset");
			const newQuery = params.toString();
			router.replace(newQuery ? `${targetPath}?${newQuery}` : targetPath);
		};

		if (role) {
			setUserData((p) => {
				if (p.length === 0) {
					return [{ role: role as string } as any];
				}
				return p.map((i) => ({ ...i, role: role as string }));
			});
		}

		if (verifyStatus === "success" && email && password && pathname) {
			const targetRedirect = pathname === "/dashboard/kunde"
				? "/dashboard/kunde/auftrag-einstellen"
				: pathname;
			login(
				email as string,
				password as string,
				targetRedirect,
				undefined
			).then((res) => {
				setSuccesModalIsOpen(password as string);
				res === 200 && deleteQuery(targetRedirect);
			});
		} else if (verifyStatus === "failed") {
			toast.error("Verification failed");
			deleteQuery("/");
		} else if (verifyStatus === "already_verified") {
			deleteQuery("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [verifyStatus]);

	return { verifyStatus, succesModalIsOpen, setSuccesModalIsOpen };
};

export default useEmailVerification;
