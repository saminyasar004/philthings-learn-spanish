import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
	BadgeDollarSign,
	Bell,
	CircleGauge,
	HandCoins,
	Settings,
	UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AdminDashboardSidebar } from "../admin-dashboard-sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface AdminSidebarItemProps {
	title: string;
	header: string;
	description: string;
	url: string;
	icon?: React.ComponentType<{ className?: string }>;
	isSidebar: boolean;
	children?: AdminSidebarItemProps[];
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	const auth = useAuth();
	const navigate = useNavigate();
	// Menu items.
const sidebarMenuItems: AdminSidebarItemProps[] = [
		{
			title: "Dashboard",
			header: getGreeting(auth),
			description: "Here's your dashboard overview.",
			url: "/dashboard",
			icon: CircleGauge,
			isSidebar: true,
		},
		// {
		// 	title: "Users",
		// 	header: "Users",
		// 	description: "Here's your dashboard overview.",
		// 	url: "/users",
		// 	icon: UsersRound,
		// 	isSidebar: true,
		// },
		// {
		// 	title: "Affiliate Links",
		// 	header: "Affiliate Links",
		// 	description:
		// 		"Manage and track your affiliate marketing partnerships.",
		// 	url: "/affiliate-links",
		// 	icon: HandCoins,
		// 	isSidebar: true,
		// },
		// {
		// 	title: "Subscriptions",
		// 	header: "Subscriptions",
		// 	description: "",
		// 	url: "/subscriptions",
		// 	icon: BadgeDollarSign,
		// 	isSidebar: true,
		// },
		{
			title: "Settings",
			header: "",
			description: "",
			url: "/settings",
			icon: Settings,
			isSidebar: true,
			children: [
				{
					title: "Privacy Policy",
					header: "Privacy Policy",
					description: "",
					url: "/settings/privacy-policy",
					isSidebar: true,
				},
				{
					title: "Terms and Condition",
					header: "Terms & Condition",
					description: "",
					url: "/settings/terms-and-condition",
					isSidebar: true,
				},
			],
		},
		{
			title: "Notification",
			header: "Notification",
			description: "",
			url: "/notification",
			icon: Bell,
			isSidebar: false,
		},
	];

	const [currentItem, setCurrentItem] = useState<
		AdminSidebarItemProps | undefined
	>(undefined);


useEffect(() => {
		const findCurrentItem = () => {
			return sidebarMenuItems.find((item) => {
				if (item?.children?.length) {
					const childMatch = item.children.find(
						(child) => child.url === location.pathname
					);
					if (childMatch) {
						return childMatch;
					}
				} else {
					return item.url === location.pathname;
				}
			});
		};

		const newCurrentItem = findCurrentItem();
		if (newCurrentItem) {
			setCurrentItem(newCurrentItem);
		} else {
			// Fallback to a default item if no match (e.g., Dashboard)
			setCurrentItem(sidebarMenuItems[0]);
		}
	}, [location.pathname]);

	function getGreeting(auth: ReturnType<typeof useAuth>): string {
		const hour = new Date().getHours();
		let greeting = "Good morning";
		if (hour >= 12 && hour < 17) {
			greeting = "Good afternoon";
		} else if (hour >= 17) {
			greeting = "Good evening";
		}
		const userEmail = auth.user?.email || "User";
		return `${greeting}, ${userEmail}`;
	}

	return (
		<SidebarProvider className="h-screen relative">
			<AdminDashboardSidebar
				items={sidebarMenuItems.filter((item) => item.isSidebar)}
			/>
			<main className="p-4 w-full bg-[#fefefe]">
				<SidebarTrigger />
				<div className="container">
					<div className="header w-full flex items-center justify-between pb-6">
						<div className="header space-y-2">
							<h1 className="font-semibold text-3xl text-primary">
								{(currentItem?.children &&
									currentItem?.children.find(
										(child) =>
											child.url === location.pathname
									)?.header) ||
									currentItem?.header}
							</h1>
							{currentItem?.description &&
								currentItem.description.length > 0 && (
									<p className="text-[#2A2A2A] font-montserrat text-sm">
										{currentItem.description}
									</p>
								)}
						</div>
						<div className="flex items-center gap-4">
							<Link
								to="/notification"
								className="flex items-center gap-2 p-2 rounded-lg bg-[#F9F9F9] hover:bg-gray-100 transition-colors"
							>
								<Bell className="text-primary" />
								<span className="text-black font-lora font-medium">
									12
								</span>
							</Link>
							<button
								onClick={() => {
									auth.logout();
									navigate("/");
								}}
								className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
					{children}
				</div>
			</main>
		</SidebarProvider>
	);
}
