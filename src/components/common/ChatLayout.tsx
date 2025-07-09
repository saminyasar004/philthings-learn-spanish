import React, { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MoveUp } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ChatLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { id } = useParams();
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);

	useEffect(() => {
		if (id) {
			const fetchChatMessages = async () => {
				setIsLoading(true);
				try {
					const token = localStorage.getItem("accessToken");
					const headers = token ? { Authorization: `Bearer ${token}` } : {};
					const response = await axios.get(
						`http://192.168.10.124:2100/api/v1/chatbot/practice_chat/messages/${id}/`,
						{ headers }
					);

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
									id: msg.id * 10 + 1,
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
					setIsLoading(false);
				}
			};

			fetchChatMessages();
		} else {
			setMessages([]);
		}
	}, [id]);

	const handleSendMessage = async () => {
		if (!inputValue.trim()) return;
		console.log("handleSendMessage triggered with input:", inputValue);
		setIsLoading(true);
		try {
			const chatId = localStorage.getItem("chat_id");
			const token = localStorage.getItem("accessToken");
			const headers = token ? { Authorization: `Bearer ${token}` } : {};
			const userMessage = { sender: "user", text: inputValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
			setMessages(prev => [...prev, userMessage]);
			
			const response = await axios.post(
				"http://192.168.10.124:2100/api/v1/chatbot/practice_chat/create/",
				{
					chat_id: chatId ? parseInt(chatId) : null,
					message: inputValue,
				},
				{ headers }
			);
			const data = response.data;
			setInputValue("");
			setMessages(prev => [
				...prev,
				{ sender: "agent", text: data.result, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			if (axios.isAxiosError(error)) {
				console.error("Axios error details:", {
					message: error.message,
					code: error.code,
					response: error.response ? {
						status: error.response.status,
						data: error.response.data
					} : null
				});
				alert(`Failed to send message. Error: ${error.message}. Check console for more details.`);
			} else {
				alert("Failed to send message. An unexpected error occurred. Check console for more details.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SidebarProvider className="h-screen relative">
			<ChatSidebar />
			<main className="p-4 w-full">
				<SidebarTrigger />
				<div className="w-full">
					<div className="header sticky min-h-max h-[10vh] py-4">
						<h1 className="font-montserrat font-semibold text-3xl text-primary">
							Spanish Chat
						</h1>
					</div>

					<div className="container">
						{React.cloneElement(children as React.ReactElement, { messages, setMessages })}

						{(messages.length > 0 || id) && (
							<div className="controllbar w-full relative pl-24 mt-10">
								<Input
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									placeholder="Ask your question..."
									className="bg-transparent w-full h-14 font-montserrat text-lg"
									onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
								/>

								<Button
									size="icon"
									className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
									onClick={handleSendMessage}
									disabled={isLoading || !inputValue.trim()}
								>
									<MoveUp />
								</Button>
							</div>
						)}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
}
