import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import Logo from "@/assets/logo.svg";
import UserPlaceholder from "@/assets/user-placeholder.png";

export default function NewChat({ messages = [], setMessages = () => {} }: { messages?: { sender: string; text: string; time: string }[]; setMessages?: React.Dispatch<React.SetStateAction<{ sender: string; text: string; time: string }[]>> }) {
	const [isLoading, setIsLoading] = useState(false);
	const auth = useAuth();

	// Removed automatic chat start on component mount
	// Chat creation will be handled in handleSendMessage when the first message is sent

	const handleStartChat = async () => {
		setIsLoading(true);
		try {
			const token = localStorage.getItem("accessToken");
			const headers = token ? { Authorization: `Bearer ${token}` } : {};
			const response = await axios.post(
				"http://172.252.13.96:5000/api/v1/chatbot/practice_chat/create/",
				{
					chat_id: null,
					message: "yes",
				},
				{ headers }
			);
			const data = response.data;
			// Save chat_id to local storage
			localStorage.setItem("chat_id", data.chat_id.toString());
			// Show alert with message
			alert(data.message);
			// Add AI response to messages
			setMessages([
				{ sender: "agent", text: data.result, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
			]);
			// Refresh chat history in sidebar
			if (typeof (window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory === 'function') {
				(window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory();
			}
		} catch (error) {
			console.error("Error creating new chat:", error);
			alert("Failed to create a new chat. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Function to be called from an external input box to send messages
	const handleSendMessage = async (messageText) => {
		if (!messageText.trim()) return;
		setIsLoading(true);
		try {
			let chatId = localStorage.getItem("chat_id");
			const token = localStorage.getItem("accessToken");
			const headers = token ? { Authorization: `Bearer ${token}` } : {};
			
			// If no chat_id exists or messages are empty, start a new chat
			if (!chatId && messages.length === 0) {
				await handleStartChat();
				chatId = localStorage.getItem("chat_id"); // Get the new chat_id after starting chat
				console.log("New chat ID saved to localStorage:", chatId); // Debug log to verify chat ID
				// Refresh chat history in sidebar after starting a new chat
				if (typeof (window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory === 'function') {
					(window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory();
				}
			}
			
			// Add user message to the conversation
			const userMessage = { sender: "user", text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
			setMessages(prev => [...prev, userMessage]);
			
			const response = await axios.post(
				"http://172.252.13.96:5000/api/v1/chatbot/practice_chat/create/",
				{
					chat_id: chatId ? parseInt(chatId) : null,
					message: messageText,
				},
				{ headers }
			);
			const data = response.data;
			// Add AI response to messages
			setMessages(prev => [
				...prev,
				{ sender: "agent", text: data.result, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
			]);
			// Refresh chat history after every message to ensure updates
			if (typeof (window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory === 'function') {
				(window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory();
			}
		} catch (error) {
			console.error("Error sending message:", error);
			alert("Failed to send message. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col h-full">
			<div className="flex-1 flex flex-col items-center justify-center text-center py-24">
				{messages.length === 0 ? (
					<>
						<h1 className="w-[40%] text-5xl text-primary font-bold leading-snug">
							Welcome to Your AI Spanish Learning Assistant
						</h1>
						<p className="w-[50%] font-montserrat text-lg text-[#979797] leading-relaxed">
							I can help you with any words or phrases you find difficult,
							explain meanings, pronunciation, and usage, and support you as
							you improve your Spanish skills
						</p>
						<Button onClick={handleStartChat} disabled={isLoading}>
							{isLoading ? "Starting Chat..." : "Start Chat"}
						</Button>
					</>
				) : (
					<div className="w-full pl-24 pr-8 flex flex-col gap-4">
						<div className="space-y-4">
							{messages.map((message, index) => (
								<div key={index} className={`flex w-full ${message.sender === "agent" ? "justify-start items-start" : "justify-end items-end"}`}>
									{message.sender === "agent" && (
										<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
											<img src={Logo} alt="AI Assistant" />
										</div>
									)}
									<div className={`max-w-[70%] p-3 rounded-lg space-y-2 ${message.sender === "agent" ? "bg-primary text-white ml-2" : "bg-white text-black mr-2"} shadow`}>
										<p className="text-left text-sm font-medium break-words">
											{message.text}
										</p>
										<p className={`text-left text-xs mt-1 ${message.sender === "agent" ? "text-white/80" : "text-gray-500"}`}>
											{message.time}
										</p>
									</div>
									{message.sender === "user" && (
										<div className="w-8 h-8 bg-[#FDF9F9] rounded-full flex items-center justify-center ml-2">
											<img src={UserPlaceholder} alt="User Avatar" />
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
