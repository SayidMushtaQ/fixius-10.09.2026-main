"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
	contentLabel?: string;
	shouldCloseOnOverlayClick?: boolean;
	shouldCloseOnEsc?: boolean;
	style?: {
		overlay?: React.CSSProperties;
		content?: React.CSSProperties;
	};
}

/**
 * Drop-in replacement for react-modal using native <dialog> or portal.
 * Supports the same props: isOpen, onRequestClose, className, overlayClassName, style, etc.
 */
export default function Modal({
	isOpen,
	onRequestClose,
	children,
	className = "w-fit overflow-hidden mx-auto p-6 rounded-md bg-white shadow-lg z-100 outline-none",
	overlayClassName = "fixed inset-0 flex items-center justify-center bg-black/50",
	shouldCloseOnOverlayClick = true,
	shouldCloseOnEsc = true,
	style,
}: ModalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Handle ESC key
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				if (shouldCloseOnEsc) {
					onRequestClose();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, shouldCloseOnEsc, onRequestClose]);

	if (!isOpen || !mounted) return null;

	return createPortal(
		<div
			className="fixed inset-0 w-screen h-screen flex bg-transparent p-0 m-0 z-9999"
			style={{ position: "fixed", inset: 0 }}
		>
			<div
				className={overlayClassName}
				style={style?.overlay}
				onClick={(e) => {
					if (shouldCloseOnOverlayClick && e.target === e.currentTarget) {
						onRequestClose();
					}
				}}
			>
				<div className={className} style={style?.content} onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
		</div>,
		document.body
	);
}

