"use client";
import { useState } from "react";

const InputForEdit = ({
	identifier,
	value,
	onSubmit,
    isUpdating
}: {
	identifier: string;
	value: string;
	onSubmit: any;
    isUpdating:boolean
}) => {
	const [newValue, setNewValue] = useState(value);
	return (
		<div className="w-full flex h-full flex-col gap-2">
			<b className="text-center">Bearbeiten {identifier}</b>
			<div>
				{" "}
				<input
					placeholder={value}
					className="border p-2 rounded w-full border-gray-500"
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
					type={
						identifier === "phone"
							? "number"
							: identifier === "email"
							? "email"
							: "text"
					}
				/>
			</div>
			<button
				className="globalbtn disabled:opacity-50"
                disabled={isUpdating}
				onClick={() => onSubmit(newValue, identifier)}>
				Ändern
			</button>
		</div>
	);
};
export default InputForEdit;
