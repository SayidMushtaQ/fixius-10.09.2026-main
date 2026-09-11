"use client";
/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary modules and components
import ModalStruc from "@/components/Common/ModalStruc";
import { useAuth } from "@/context/AuthContext";
import { useSocketContext } from "@/context/SocketContext";
import getFormatTime from "@/helper/getChatFormatTime";
import useApiCaller from "@/hooks/useApiCaller";
import useChat from "@/hooks/useChat";
import useScrollToBottom from "@/hooks/useScrollToBottom";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import UploadDocumens from "../handwerker/Messages/uploadDocument";

function renderLinks(text: any) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const parts = text.split(urlRegex); // Split text into parts using URLs as delimiters
	const elements = []; // Array to hold JSX elements

	// Iterate through parts
	for (let i = 0; i < parts.length; i++) {
		if (parts[i].match(urlRegex)) {
			// If the part is a URL, render it as a link
			elements.push(
				<Link
					className="text-blue-500"
					href={parts[i]}
					key={i}
					target="_blank"
					rel="noopener noreferrer">
					{parts[i].includes(process.env.NEXT_PUBLIC_BASE_URL)?'View Documents':parts[i]}
				</Link>
			);
		} else {
			// Otherwise, render the part as plain text
			elements.push(parts[i]);
		}
	}

	// Return the array of JSX elements
	return elements;
}

// Example usage:
// const message = "Check out this website: https://www.example.com";
// const renderedMessage = renderLinks(message);
// console.log(renderedMessage);

// Messages component
export default function Messages({
	convId,
	message,
	lastMessage,
	sender = {},
}: {
	lastMessage: any;
	message: any;
	sender: any;
	convId: string;
}) {
	// Constants and states
	const maxLength = 30;
	const [expanded, setExpanded] = useState(false);
	const [replyVisible, setReplyVisible] = useState(false);
	const [smsSender, setSmsSender] = useState(sender);
	// Hooks and context
	const apiCaller = useApiCaller();
	const { messagesContainerRef, scrollToBottom } = useScrollToBottom();
	const { socket } = useSocketContext();
	const queryClient = useQueryClient();
	const { userData } = useAuth();
	const {
		sendMessage,
		inputMessage,
		setInputMessage,
		updateSeenStatus,
		isSending,
	} = useChat();

	const user = userData[0];

	const [openDoucumentUpload, setOpenDocumentUpload] = useState(false);
	// Toggle reply section visibility
	const toggleReplySection = () => {
		setReplyVisible(!replyVisible);
	};

	// Toggle accordion (message details) visibility
	const toggleAccordion = async () => {
		setExpanded(!expanded);
		if (!lastMessage?.seenBy.includes(user?._id)) {
			await updateSeenStatus(convId);
		}
	};

	// Handle form submission for sending messages
	const handleInputMessageSent = async (e: FormEvent) => {
		e.preventDefault();
		if (inputMessage) {
			await sendMessage(convId, sender?._id);
		}
	};

	// Handle input changes
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputMessage(e.target.value);
	};

	// Received messages state
	const [receivedMessages, setReceivedMessages] = useState<any>({});
	useEffect(() => {
		// Listen for "getMessage" event from the server
		socket?.on("getMessage", ({ message }: any) => {
			setReceivedMessages(message);
		});

		// Clean up the event listener when the component unmounts
		return () => {
			socket?.off("getMessage");
		};
	}, [socket]);

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: ["getMessages"],
			refetchType: "active",
		});

		if (receivedMessages?.convId === convId && expanded) {
			updateSeenStatus(convId);
		}
	}, [receivedMessages]);

	useEffect(() => {
		scrollToBottom();
	}, [message]);

	useEffect(() => {
		scrollToBottom();
	});

	const [isSenderLoading, setIsSenderLoading] = useState(false);
	useEffect(() => {
		!smsSender.profile_photo &&
			setSmsSender((p: any) => ({
				...p,
				profile_photo:
					"https://www.svgrepo.com/show/496485/profile-circle.svg",
			}));
	}, [sender]);
	// Render the component

	return (
		<div
			id={convId}
			className="px-10 py-5 bg-white w-full border border-gray-300 rounded-lg">
			{!isSenderLoading && (
				<div className="accordion relative">
					<div className="accordion-item">
						<div className="accordion-header w-full flex justify-between items-center gap-20">
							<h1 className="font-bold flex gap-2 text-orange items-center font-bold">
								<Image
									src={smsSender?.profile_photo}
									alt="profiel photo"
									width={50}
									height={50}
									className="rounded-full w-12 h-12"
								/>
								{sender?.role === "handwerker" ? (
									<Link
										href={{
											pathname: "/handwerker/[profile]",
											query: { from: "messages" }, // Add your state data here
										}}
										as={`/handwerker/${smsSender?.name}`}
										className="text-xl">
										{smsSender?.name}
									</Link>
								) : (
									<span className="text-xl">
										{smsSender?.name}
									</span>
								)}
							</h1>
							<p
								className={`${
									!lastMessage?.seenBy.includes(user?._id) &&
									"font-bold"
								}`}>
								{lastMessage?.text.length > maxLength
									? lastMessage?.text.slice(
											0,
											maxLength - 3
									  ) + "..."
									: lastMessage?.text}
								<span>
									{" "}
									({getFormatTime(lastMessage.createdAt)})
								</span>
							</p>
							<span
								className="text-gray-500 cursor-pointer"
								onClick={toggleAccordion}>
								{expanded ? (
									<BiChevronDown fontSize={40} />
								) : (
									<BiChevronRight fontSize={40} />
								)}
							</span>
						</div>

						{expanded && (
							<div className="accordion-content scroll-smooth ">
								<div className="flex justify-between">
									<span className="font-bold text-2xl">
										{/* {lastMessage?.createdAt} */}
									</span>{" "}
									{/* <span className="flex gap-2">
										<BsEnvelope />
										<BsTrash /> <BsChatDots />
									</span> */}
								</div>
								<div
									ref={messagesContainerRef}
									id="message-container"
									className={`flex flex-col gap-2 my-4 max-h-[500px] overflow-x-hidden overflow-y-auto `}>
									{message?.map((m: any, ind: number) => {
										return (
											<p
												key={m._id}
												id={m._id}
												className={`max-w-[300px] py-2 px-4 relative w-fit rounded-xl shadow-xl group ${
													sender._id !== m.sender
														? "ml-auto bg-[#ff691880] "
														: "text-black"
												}`}>
												<span className="text-wrap">
													{renderLinks(m.text)}
												</span>
												<span
													className={`text-center text-[11px] flex items-center justify-center text-black w-20 p-1 rounded shadow absolute top-1 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300  ${
														sender._id !== m.sender
															? "-left-20"
															: " -right-20"
													} `}>
													{getFormatTime(m.createdAt)}
												</span>
											</p>
										);
									})}
								</div>

								{sender.role === "admin" ? (
									user.craftsman?.status !== "verified" && (
										<button
											className="globalbtn"
											onClick={() =>
												setOpenDocumentUpload(true)
											}>
											{" "}
											Dokumente hochladen
										</button>
									)
								) : (
									<form
										onSubmit={handleInputMessageSent}
										className="input-container w-full bg-white flex justify-between border-2 p-2 rounded">
										<input
											onChange={handleInputChange}
											className="input-field focus:outline-none w-full visited:outline-none"
											type="text"
											value={inputMessage}
											name="message"
											placeholder="Escribe tu respuesta..."
										/>
										<button
											type="submit"
											disabled={isSending}
											className="send-icon cursor-pointer">
											&#10148;
										</button>
									</form>
								)}
							</div>
						)}
					</div>
				</div>
			)}

			<ModalStruc
				isOpen={openDoucumentUpload}
				closeModal={() => setOpenDocumentUpload(false)}>
				<UploadDocumens
					onClose={() => setOpenDocumentUpload(false)}
					convId={convId}
					receiverId={sender._id}
					company_name={user.craftsman?.company_name as string}
				/>
			</ModalStruc>
		</div>
	);
}
