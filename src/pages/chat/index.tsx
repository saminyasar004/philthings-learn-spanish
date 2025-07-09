import Logo from "@/assets/logo.svg";
import UserPlaceholder from "@/assets/user-placeholder.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chat() {
	const { id } = useParams();
	const [messages, setMessages] = useState<
		{ id: number; text: string; sender: string; time: string }[]
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchChatMessages = async () => {
			try {
				const token = localStorage.getItem("accessToken");
				const headers = token ? { Authorization: `Bearer ${token}` } : {};
				const response = await axios.get(
					`http://192.168.10.124:2100/api/v1/chatbot/practice_chat/messages/${id}/`,
					{ headers }
				);

				console.log("Raw API Response:", response.data);

				interface ApiMessage {
					id: number;
					chat: number;
					user?: string;
					bot?: string;
					created_at: string;
				}

				const formattedMessages = response.data
					.sort(
						(a: ApiMessage, b: ApiMessage) =>
							new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					)
					.flatMap((msg: ApiMessage) => {
						const items: {
							id: number;
							text: string;
							sender: string;
							time: string;
						}[] = [];

						const time = new Date(msg.created_at).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit"
						});

						if (msg.user && msg.user.trim() !== "") {
							items.push({
								id: msg.id * 10 + 1, // to keep unique keys
								text: msg.user,
								sender: "user",
								time
							});
						}

						if (msg.bot && msg.bot.trim() !== "") {
							items.push({
								id: msg.id * 10 + 2,
								text: msg.bot,
								sender: "agent",
								time
							});
						}

						return items;
					});

				setMessages(formattedMessages);
			} catch (error) {
				console.error("Error fetching chat messages:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchChatMessages();
	}, [id]);

	return (
		<ScrollArea className="h-[70vh] w-full pl-24 pr-8 hide-scrollbar">
			{loading ? (
				<div className="text-center text-gray-500">Loading messages...</div>
			) : messages.length === 0 ? (
				<div className="text-center text-gray-500">No messages found for this chat</div>
			) : (
				<div className="space-y-4">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${
								message.sender === "agent" ? "justify-start" : "justify-end"
							}`}
						>
							{message.sender === "agent" && (
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
									<img
										src={Logo}
										alt="Logo"
										className="max-w-full max-h-full"
									/>
								</div>
							)}
							<div
								className={cn(
									"max-w-[70%] p-3 rounded-lg space-y-2 shadow",
									message.sender === "agent"
										? "bg-primary text-white"
										: "bg-white text-black"
								)}
							>
								<p className="text-sm font-medium break-words">
									{message.text}
								</p>
								<p
									className={cn(
										"text-xs mt-1",
										message.sender === "agent"
											? "text-white/80"
											: "text-gray-500"
									)}
								>
									{message.time}
								</p>
							</div>
							{message.sender === "user" && (
								<div className="w-8 h-8 bg-[#FDF9F9] rounded-full flex items-center justify-center ml-2">
									<img
										src={UserPlaceholder}
										alt="User Avatar"
										className="max-w-full max-h-full"
									/>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</ScrollArea>
	);
}
