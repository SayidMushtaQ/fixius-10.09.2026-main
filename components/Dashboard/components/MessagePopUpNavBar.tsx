"use client";
import { useAuth } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import getFormatTime from "@/helper/getChatFormatTime";
import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";
import React, { useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";

export function MessagePopUpNavBar({
	name,
	message_short,
	href,
	totalMessage,
	time,
}: {
	name: string;
	message_short: string;
	href: string;
	totalMessage: number;
	time: Date;
}) {
	return (
		<div className=" relative w-[15rem] sm:w-[20rem] space-y-3">
			<Link
				href={href}
				className="cursor-pointer hover:bg-gray-100  px-3 py-2 block">
				<h1 className="text-xl font-semibold ">
					{name}{" "}
					{totalMessage && (
						<span className="absolute top-2 text-[14px] right-2 w-5 h-5 flex items-center justify-center bg-orange text-white px-[8px] rounded-full">
							{totalMessage}
						</span>
					)}
				</h1>
				<span>
					{" "}
					{message_short} ({getFormatTime(time)}){" "}
				</span>
			</Link>
		</div>
	);
}

const MessageNotification = ({
	messageToggle,
	setMessageToggle,
	removeOtherBar,
}: {
	messageToggle: Boolean;
	setMessageToggle: React.Dispatch<React.SetStateAction<Boolean>>;
	removeOtherBar: () => void;
}) => {
	const { unseenConversations } = useChatContext();
	const { userData } = useAuth();
	const user = userData[0];
	const ref = useRef<HTMLDivElement>(null);
	const handleOutsideClick = () => {
		setMessageToggle(false);
	};
	useOutsideClick(ref, handleOutsideClick);
	return (
		<div className="relative" ref={ref}>
			<HiOutlineMail
				className="text-2xl cursor-pointer "
				onClick={() => {
					setMessageToggle(!messageToggle);
					removeOtherBar();
				}}
			/>
			{unseenConversations?.length > 0 && (
				<span className="absolute -top-4 -right-2 bg-orange text-white px-[8px] rounded-full">
					{unseenConversations.length}
				</span>
			)}
			{messageToggle && (
				<div className="absolute -right-10 top-8">
					<div className="bg-white shadow-md  rounded border border-gray-200">
						{unseenConversations?.map((conv) => (
							<MessagePopUpNavBar
								key={conv?._id}
								totalMessage={conv.messages.length}
								name={conv?.participants?.name}
								message_short={
									conv.messages[conv.messages.length - 1].text
								}
								time={conv.updatedAt}
								href={
									conv?.href ||
									`/dashboard/${user?.role}/nachrichten/`
								}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageNotification;
