import React from "react";
import { EmailErroType, EmailType } from "../cliente/ChangeEmail/index";

export default function ChangeEmail({
	userEmail,
	setUserEmail,
	handleSave_email,
	userError,
}: {
	userEmail: EmailType;
	setUserEmail: React.Dispatch<React.SetStateAction<EmailType>>;
	handleSave_email: () => void;
	userError: EmailErroType;
}) {
	return (
		<div className="bg-white py-10 px-7 rounded-md shadow w-full md:w-3/4 mx-auto">
			<div className="w-full">
				<div className="flex justify-center items-center gap-2 lg:gap-5 w-full lg:flex-row flex-col">
					<div className="mb-5 w-full lg:w-1/2 relative">
						<label
							htmlFor="newEmail"
							className="block text-gray-700  font-bold mb-2">
							Neue E-Mail-Adresse
						</label>
						<input
							id="newEmail"
							type="email"
							className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
							value={userEmail.email}
							onChange={(e) =>
								setUserEmail((pre) => ({
									...pre,
									email: e.target.value,
								}))
							}
							placeholder="Geben Sie Ihre E-Mail-Adresse ein"
							required
						/>
						{userError.email_addressError && (
							<p className="absolute text-sm text-red-500">
								{userError.email_addressError}
							</p>
						)}
					</div>
					<div className="mb-5 w-full lg:w-1/2 relative">
						<label
							htmlFor="confirmEmail"
							className="block text-gray-700  font-bold mb-2">
							E-Mail-Adresse bestätigen
						</label>
						<input
							id="confirmEmail"
							type="email"
							className="w-full px-3 py-3 border border-gray-600 rounded outline-none"
							value={userEmail.cEmail}
							onChange={(e) =>
								setUserEmail((pre) => ({
									...pre,
									cEmail: e.target.value,
								}))
							}
							placeholder="Geben Sie Ihre E-Mail-Adresse ein"
							required
						/>
						{userError.email_doNotMatch && (
							<p className="absolute text-sm text-red-500">
								{userError.email_doNotMatch}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-end items-center">
					<button
						type="submit"
						className=" bg-orange hover:text-black text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4"
						onClick={handleSave_email}>
						Änderungen speichern
					</button>
				</div>
			</div>
		</div>
	);
}
