import { LogOut, MoreHorizontal, Pencil, Trash2, Upload } from "lucide-react";
import Logo from "@/assets/logo.svg";
import UserPlaceholder from "@/assets/user-placeholder.png";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

// Interface for chat history items
interface ChatItem {
	id: number;
	title: string;
	created_at: string;
}

export function ChatSidebar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentChatId, setCurrentChatId] = useState<number | null>(null);
	
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const refreshChatHistory = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("accessToken");
			const headers = token ? { Authorization: `Bearer ${token}` } : {};
			const response = await axios.get(
				"http://192.168.10.124:2100/api/v1/chatbot/practice_chat/get_user_chats/",
				{ headers }
			);
			// Sort chats by created_at descending (newest first)
			const sortedChats = response.data.sort((a: ChatItem, b: ChatItem) => 
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
			setChatHistory(sortedChats);
		} catch (error) {
			console.error("Error fetching chat history:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		refreshChatHistory();
	}, []);

	useEffect(() => {
		const currentPath = window.location.pathname;
		const chatIdMatch = currentPath.match(/\/chat\/(\d+)/);
		if (chatIdMatch) {
			setCurrentChatId(parseInt(chatIdMatch[1], 10));
		} else {
			setCurrentChatId(null);
		}
	}, [window.location.pathname]);

	const handleChatSelect = (chatId: number) => {
		navigate(`/chat/${chatId}`);
	};
	
	// Expose refresh function to window for external components to trigger refresh
	(window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory = refreshChatHistory;

	return (
		<Sidebar className="bg-primary min-h-screen">
			<SidebarContent className="min-h-screen hide-scrollbar">
				<SidebarHeader className="min-h-max h-[10vh]">
					<div className="w-full flex items-center justify-center pt-4">
						<Link to="/">
							<img src={Logo} alt="Logo" className="max-w-full" />
						</Link>
					</div>

					<div className="w-full flex flex-col gap-4 py-2 px-2">
<Button 
	variant="gray" 
	className="w-full text-base" 
	onClick={() => {
		if (typeof (window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory === 'function') {
			(window as { refreshChatHistory?: () => Promise<void> }).refreshChatHistory();
		}
		navigate('/chat');
	}}
>
	Start New Chat
</Button>

						<Input
							className="bg-transparent border border-white text-white rounded-lg placeholder:text-white font-montserrat pl-4"
							placeholder="Search"
						/>
					</div>
				</SidebarHeader>

				<SidebarGroup className="min-h-[40vh] overflow-y-auto hide-scrollbar mb-4 pb-16">
					<SidebarGroupLabel className="font-semibold text-base pb-5">
						Chat History
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{loading ? (
								<div className="text-white text-center">Loading...</div>
							) : chatHistory.length === 0 ? (
								<div className="text-white text-center">No chats found</div>
							) : (
								chatHistory.map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton onClick={() => handleChatSelect(item.id)} className={currentChatId === item.id ? "bg-white/20" : ""}>
											<span className="font-montserrat text-sm font-normal">
												{item.title}
											</span>
										</SidebarMenuButton>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<SidebarMenuAction>
													<MoreHorizontal />
												</SidebarMenuAction>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												side="right"
												align="start"
											>
												<DropdownMenuItem>
													<span className="flex gap-2 font-montserrat cursor-pointer">
														<Upload size={24} />
														Share
													</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<span className="flex gap-2 font-montserrat cursor-pointer">
														<Pencil size={24} />
														Rename
													</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<span className="flex gap-2 font-montserrat cursor-pointer text-danger">
														<Trash2 size={24} />
														Delete
													</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</SidebarMenuItem>
								))
							)}
						</SidebarMenu>
					</SidebarGroupContent>

					<SidebarGroupContent>
						<div className="w-full flex items-center justify-center my-8">
							<Button
								variant="transparent"
								className="text-white rounded-full flex items-center justify-between gap-6 border border-white hover:bg-white hover:text-primary"
							>
								Delete History
								<Trash2 className="text-danger" />
							</Button>
						</div>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarFooter className="w-full min-h-max h-[5vh] flex flex-col items-end justify-end absolute bottom-0 py-4 space-y-24 bg-primary">
					<div className="w-full flex gap-2 items-center justify-between">
						<div className="flex-1 flex items-center gap-2 px-4">
							<img
								src={UserPlaceholder}
								alt="User Avatar"
								className="max-w-full rounded-full"
							/>

							<h5 className="text-sm font-medium">{user?.email || "User"}</h5>
						</div>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="border-none hover:bg-transparent text-white/80 hover:text-white text-4xl"
								>
									<LogOut />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Leave the site?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to log out? You
										will be signed out of your account, and
										any unsaved changes may be lost. You can
										log back in anytime with your
										credentials.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction onClick={handleLogout} className="bg-danger text-white border-danger hover:text-danger">
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</SidebarFooter>
			</SidebarContent>
		</Sidebar>
	);
}
