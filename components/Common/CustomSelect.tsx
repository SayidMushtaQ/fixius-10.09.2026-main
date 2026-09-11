"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

interface Option {
	value: string;
	label: string;
	imgSrc?: StaticImageData; // Optional image source
}

interface CustomSelectProps {
	value: Option;
	onChange: (value: Option) => void;
	options: Option[];
	isFirstOptionDisabled?: boolean; // Optional prop to disable the first option
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
	value,
	onChange,
	options,
	isFirstOptionDisabled = false, // Default value is false
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (value: Option) => {
		if (!isFirstOptionDisabled || options[0].value !== value.value) {
			onChange(value);
			setIsOpen(false);
		}
	};
	const selectedOption = options.find(
		(option) => option.value === value.value
	);
	return (
		<div className="relative">
			<div
				onClick={handleToggle}
				className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm bg-white py-2 pl-3 pr-10 text-left cursor-pointer focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
				{selectedOption ? (
					<div className="flex items-center">
						{selectedOption.label}
						{selectedOption.imgSrc && (
							<Image
								src={selectedOption.imgSrc}
								alt={selectedOption.label}
								width={100}
								height={100}
								className="w-14 h-8 ml-5"
							/>
						)}
					</div>
				) : (
					"Select Payment Method"
				)}
			</div>
			{isOpen && (
				<div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
					<div className="py-1">
						{options.map((option, index) => (
							<div
								key={option.value}
								onClick={() => handleOptionClick(option)}
								className={`cursor-pointer select-none relative py-2 pl-3 pr-9 flex items-center ${
									index === 0 && isFirstOptionDisabled
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "hover:bg-gray-400 hover:text-white"
								}`}>
								{option.label}
								{option.imgSrc && (
									<Image
										src={option.imgSrc}
										alt={option.label}
										width={100}
										height={100}
										className="w-14 h-8 ml-5"
									/>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
