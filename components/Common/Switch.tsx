const Switcher1 = ({
	isChecked,
	setIsChecked,
	handleAction = () => {},
}: {
	isChecked: boolean;
	setIsChecked: any;
	handleAction: any;
}) => {
	const handleCheckboxChange = () => {
		setIsChecked((prevState: any) => !prevState); // Ensure state updates are based on previous state
		handleAction(!isChecked);
	};
	return (
		<div>
			<label className="flex cursor-pointer items-center">
				<div className="relative">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleCheckboxChange}
						className="sr-only"
					/>
					<div
						className={`block h-8 w-14 rounded-full ${
							isChecked ? "bg-green-500" : "bg-red-500"
						}`}></div>
					<div
						className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
							isChecked
								? "translate-x-full bg-orange"
								: "bg-red-400"
						}`}></div>
				</div>
			</label>
		</div>
	);
};

export default Switcher1;
