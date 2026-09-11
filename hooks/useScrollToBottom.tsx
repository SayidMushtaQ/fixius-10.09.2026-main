"use client";
import { useRef } from "react";

function useScrollToBottom() {
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (messagesContainerRef.current) {
			messagesContainerRef?.current?.scrollTo({
				top: messagesContainerRef.current.scrollHeight,
        behavior:'smooth'
			});
		}
	};

	return { messagesContainerRef, scrollToBottom };
}

export default useScrollToBottom;
