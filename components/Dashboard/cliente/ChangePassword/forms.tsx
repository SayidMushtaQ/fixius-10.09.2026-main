import useChangePassword from "@/hooks/useChangePassword";
// import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import {
	MdCheckCircle,
	MdRadioButtonUnchecked,
	MdVisibility,
	MdVisibilityOff,
} from "react-icons/md";

const Forms: React.FC = () => {
	const {
		securityMessages,
		toggleShowPassword,
		handleSubmit,
		handleChange,
		passwords,
		showPassword,
		confirmPasswordErr,
		isFormBtnEnable,
		isSaving,
	} = useChangePassword();

	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div className="mx-auto flex md:gap-8 gap-3 lg:p-8 p-2 md:flex-row flex-col">
					<div className="flex flex-col md:w-1/2  md:mb-4 gap-3">
						<div>
							<label className="block mb-2 font-bold text-gray-700">
								Aktuelles Passwort
							</label>

							<input
								type={showPassword ? "text" : "password"}
								name="currentPassword"
								className="w-full border rounded px-3 py-1 md:py-2"
								onChange={handleChange}
								value={passwords.currentPassword}
								required
							/>
						</div>
						<div>
							<label className="block md:mb-2 font-bold text-gray-700">
								Neues Passwort
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									name="newPassword"
									value={passwords.newPassword}
									className="w-full border rounded px-3 py-1 md:py-2"
									required
									onChange={handleChange}
								/>
								<span
									className="absolute top-2 right-3 cursor-pointer"
									onClick={toggleShowPassword}>
									{showPassword ? (
										<MdVisibilityOff />
									) : (
										<MdVisibility />
									)}
								</span>
							</div>
						</div>
						<div>
							<label className="block  md:mb-2 font-bold text-gray-700">
								Passwort bestätigen
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={passwords.confirmPassword}
								className="w-full border rounded px-3 py-1 md:py-2"
								onChange={handleChange}
								required
							/>
							<p className="text-red-500 text-sm mt-1">
								{confirmPasswordErr && confirmPasswordErr}
							</p>
						</div>
					</div>

					<div className="md:w-1/2 flex flex-col justify-start ">
						<div className="mb-3">
							<label className="block  md:mb-2 font-bold text-gray-700">
								Passwortstärke
							</label>
							<div className="tex-semibold bg-white rounded p-3">
								{securityMessages.map((item, index) => (
									<p
										key={index}
										className={` ${
											item.isSecure && "text-green-500"
										}`}>
										<span className="inline mr-2">
											{item.isSecure ? (
												<MdCheckCircle className="inline" />
											) : (
												<MdRadioButtonUnchecked className="inline" />
											)}
										</span>
										<span>{item.messsage}</span>
									</p>
								))}
							</div>
						</div>

						<div className="flex items-end justify-start">
							<button
								disabled={!isFormBtnEnable || isSaving}
								className={`bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
											font-medium focus:outline-none float-right disabled:cursor-not-allowed 
											disabled:opacity-50`}>
								Speichern
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Forms;
