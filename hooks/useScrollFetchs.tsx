"use client";
import React, { useEffect } from "react";

interface ScrollAndFetchParams {
	fetchNextPage: any;
	hasNextPage: boolean;
	isWindowScroll?: boolean;
}
interface ScrollAndFetchResult {
	handleScroll: (event: React.UIEvent<HTMLElement>) => void;
}

const useScrollFetch = ({
	fetchNextPage,
	hasNextPage,
	isWindowScroll = false,
}: ScrollAndFetchParams): ScrollAndFetchResult => {
	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (!isWindowScroll) {
			const target = e.target as HTMLElement;
			if (!target) return;

			const { scrollTop, scrollHeight, clientHeight } = target;

			// Calculate the distance from the bottom of the scroll area
			const distanceFromBottom =
				scrollHeight - (scrollTop + clientHeight);

			// Define a threshold for triggering the action (e.g., 100 pixels)
			const threshold = 1;

			// Check if the distance from the bottom is less than the threshold
			if (distanceFromBottom < threshold) {
				hasNextPage && fetchNextPage();
			}
		}
	};

	const handleWindowScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } =
			document.documentElement;

		// Calculate the distance from the bottom of the scroll area
		const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

		// Define a threshold for triggering the action (e.g., 1 pixel)
		const threshold = 1;

		// Check if the distance from the bottom is less than the threshold and not already loading
		if (distanceFromBottom < threshold) {
			hasNextPage && fetchNextPage();
		}
	};

	useEffect(() => {
		isWindowScroll && window.addEventListener("scroll", handleWindowScroll);

		return () => {
			window.removeEventListener("scroll", handleWindowScroll);
		};
	}, [isWindowScroll, hasNextPage]);

	return {
		handleScroll,
	};
};

export default useScrollFetch;
