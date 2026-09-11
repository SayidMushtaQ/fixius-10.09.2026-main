"use client";

import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import LoginInputs from "./components/LoginInputs";

export default function Login({ setToggleLogin }: { setToggleLogin: any }) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const { login } = useLogin();
	const router = useRouter();

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email) {
			setEmailError("E-Mail wird benötigt");
			return;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Die E-Mail-Adresse ist ungültig");
			return;
		}
		if (!password) {
			setPasswordError("Passwort wird benötigt");
			return;
		} else if (password.length <= 5) {
			setPasswordError("Die Passwortlänge muss mindestens 6 Zeichen betragen.");
			return;
		}
		if (emailError === "" && passwordError === "") {
			try {
				await login(email, password, "/", setToggleLogin);
			} catch (error) {
				console.log(error);
				setIsLogin(false);
				toast.error("Netzwerkfehler, bitte erneut versuchen!");
			}
		}
	};

	if (!mounted) return null;

	return createPortal(
		<div className="fixed inset-0 z-99999 flex items-center justify-center">
			{/* Backdrop glass effect */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={() => setToggleLogin(false)}
				className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
			/>

			{/* Modal content */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 20 }}
				className="relative w-full max-w-md mx-4 z-10"
			>
				<div className="bg-white rounded-4xl shadow-premium overflow-hidden relative">
					{/* Close button inside modal for better integration */}
					<button
						onClick={() => setToggleLogin(false)}
						className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-secondary transition-all"
					>
						<AiOutlineClose size={24} />
					</button>

					<div className="p-2">
						<LoginInputs
							email={email}
							setEmail={setEmail}
							setPassword={setPassword}
							password={password}
							handleSubmit={handleSubmit}
							emailError={emailError}
							passwordError={passwordError}
							setEmailError={setEmailError}
							setPasswordError={setPasswordError}
						/>
					</div>
				</div>
			</motion.div>
		</div>,
		document.body
	);
}

