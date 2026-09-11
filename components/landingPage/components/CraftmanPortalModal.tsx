"use client";
import Login from "@/components/Login";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

// Modal Styles
const customStyles: any = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "600px",
		width: "100%",
		padding: "20px",
	},
};

// Required by React Modal

interface CraftsmanPortalModalProps {
	isOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CraftsmanPortalModal: React.FC<CraftsmanPortalModalProps> = ({
	isOpen,
	setModalIsOpen,
}) => {
	React.useEffect(() => {
		// Prevent scrolling on the background when the modal is open
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		// Cleanup
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const [isLogin, setIsLogin] = useState(false);
	if (isLogin) {
		return <Login setToggleLogin={setIsLogin} />;
	}
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={() => setModalIsOpen(false)}
			className="overflow-auto mx-auto mt-20 md:my-32 relative p-6 rounded-md bg-white shadow-lg z-100 outline-none max-h-[90vh]"
			overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
			<button
				className="absolute top-5 right-5 text-gray-600 hover:text-red-500 focus:outline-none"
				onClick={() => setModalIsOpen(false)}>
				<FaTimes />
			</button>
			<div className="text-center mt-3">
				<p className="mb-4 font-bold">
					Um auf weitere Jobangebote zuzugreifen, laden wir Sie ein, sich anzumelden oder ein Konto zu erstellen.
				</p>

				<div className="flex flex-col gap-4 justify-between">
					<div>
						<h3 className="font-semibold mb-2">
							Bereits registriert?
						</h3>
						<p className="max-w-[300px] m-auto">
							Wenn Sie bereits ein Konto bei uns haben, können Sie sich hier anmelden, um fortzufahren.
						</p>
						<button
							onClick={() => {
								setIsLogin(true);
								setModalIsOpen(false);
							}}
							className="globalbtn mt-2">
							Anmelden
						</button>
					</div>
					<hr />
					<div>
						<h3 className="font-semibold mb-2">
							Noch nicht registriert?
						</h3>
						<p className="max-w-[300px] mx-auto mb-4">
							Kein Problem! Sie können sich einfach als Handwerker registrieren, um auf Hunderte von Aufträgen und weitere großartige Funktionen zuzugreifen.
						</p>
						<Link href={"/registrieren"} className="globalbtn">
							Jetzt kostenlos registrieren
						</Link>
					</div>
				</div>

				<div className="mt-6">
					<h3 className="font-bold  text-left mb-2">
						Warum bei uns registrieren?
					</h3>
					<p className="list-disc text-left list-inside flex flex-col gap-1 font-semibold">
						<span>
							- Zugang zu einer Vielzahl von Aufträgen aus verschiedenen Branchen und Standorten.
						</span>
						<span>
							- Persönliches Profil zur Präsentation Ihrer Fähigkeiten und Erfahrungen.
						</span>
						<span>
							- Benachrichtigungen über neue Aufträge, die zu Ihren Fähigkeiten passen.
						</span>
						<span>
							- Möglichkeit, sich mit potenziellen Kunden zu vernetzen und Ihr Geschäft auszubauen.
						</span>
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default CraftsmanPortalModal;
