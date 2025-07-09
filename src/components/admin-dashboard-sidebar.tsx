import Logo from "@/assets/logo.svg";
import UserPlaceholder from "@/assets/user-placeholder.png";
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
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronDown, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { Separator } from "./ui/separator";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AdminSidebarItemProps } from "./common/AdminLayout";

export function AdminDashboardSidebar({
	items,
}: {
	items: AdminSidebarItemProps[];
}) {
	const location = useLocation();
	const navigate = useNavigate();
	const auth = useAuth();

	return (
		<Sidebar className="bg-primary min-h-screen">
			<SidebarContent className="min-h-screen hide-scrollbar">
				<SidebarHeader className="min-h-max h-[10vh]">
					<div className="w-full flex items-center justify-center py-4">
						<Link to="/">
							<img src={Logo} alt="Logo" className="max-w-full" />
						</Link>
					</div>
				</SidebarHeader>

				<Separator className="w-full bg-white" />

				<SidebarGroup className="min-h-[40vh] overflow-y-auto hide-scrollbar mb-4 pt-4 pb-16">
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									{item.children &&
									item.children.length > 0 ? (
										<Collapsible
											defaultOpen
											className="group/collapsible"
										>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton className="hover:bg-[#F8D955] hover:text-black transition-all duration-300 focus-visible:bg-[#F8D955] focus-visible:text-white data-[state=open]:hover:bg-[#F8D955] data-[state=open]:hover:text-black data-[active=true]:bg-[#F8D955] data-[active=true]:text-black">
													<item.icon />
													<span>{item.title}</span>
													<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.children.map(
														(child) => (
															<SidebarMenuSubItem
																key={
																	child.title
																}
															>
																<SidebarMenuSubButton
																	className="hover:bg-[#F8D955] hover:text-black transition-all duration-300 focus-visible:bg-[#F8D955] focus-visible:text-black data-[state=open]:hover:bg-[#F8D955] data-[state=open]:hover:text-black data-[active=true]:bg-[#F8D955] data-[active=true]:text-black"
																	asChild
																	isActive={
																		item.url ===
																		location.pathname
																	}
																>
																	<Link
																		to={
																			child.url
																		}
																		className="hover:bg-[#F8D955] hover:text-black transition-all duration-300"
																	>
																		{child.icon && (
																			<child.icon />
																		)}
																		<span>
																			{
																				child.title
																			}
																		</span>
																	</Link>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)
													)}
												</SidebarMenuSub>
											</CollapsibleContent>
										</Collapsible>
									) : (
										<SidebarMenuButton
											asChild
											className="hover:bg-[#F8D955] data-[active=true]:bg-[#F8D955] data-[active=true]:text-black hover:text-black transition-all duration-300"
											isActive={
												item.url === location.pathname
											}
										>
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarFooter className="w-full min-h-max h-[5vh] flex flex-col items-end justify-end absolute bottom-0 py-4 space-y-24 bg-[#F8D955] text-black">
					<div className="w-full flex gap-2 items-center justify-between">
						<Link to="/profile">
							<div className="flex-1 flex items-center gap-2 px-4">
								<img
									src={UserPlaceholder}
									alt="User Avatar"
									className="max-w-full rounded-full"
								/>
								<h5 className="text-sm font-medium">
									{auth.user?.email || "User"}
								</h5>
							</div>
						</Link>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="border-none hover:bg-transparent text-black/80 hover:text-black text-4xl"
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
									<AlertDialogAction className="bg-danger text-white border-danger hover:text-danger" onClick={() => {
										auth.logout();
										navigate("/");
									}}>
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
