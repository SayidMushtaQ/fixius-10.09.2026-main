import { format, isSameDay, isSameYear } from "date-fns";

const getFormatTime = (time: Date) => {
	const dateObj = new Date(time);
	const now = new Date();

	if (isNaN(dateObj.getTime())) return "";

	if (isSameDay(dateObj, now)) {
		return format(dateObj, "p"); // 'LT' equivalent
	} else if (!isSameYear(dateObj, now)) {
		return format(dateObj, "PPp"); // 'LLL' equivalent
	} else {
		return format(dateObj, "MMM do") + " at " + format(dateObj, "p");
	}
};

export default getFormatTime;
