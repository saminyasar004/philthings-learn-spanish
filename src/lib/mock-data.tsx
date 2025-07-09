import { Box, LineChart, LinkIcon, LucideProps, Users } from "lucide-react";

export interface UserProps {
	name: string;
	avatarUrl: string;
	email: string;
	subscriptionPlan: string;
	lastActive: string;
	price: number;
	status: string;
	nextBillingDate: string;
	startDate: string;
	billingInformation: string;
	level: string;
}

export const users: UserProps[] = [
	{
		name: "John Doe",
		avatarUrl: "https://i.pravatar.cc/150?img=1",
		email: "john.doe@email.com",
		subscriptionPlan: "Premium Plan",
		lastActive: "6/13/2025, 03:15 PM +06",
		price: 109.99,
		status: "Active",
		nextBillingDate: "7/14/2025",
		startDate: "1/15/2023",
		billingInformation: "Credit Card (****4242)",
		level: "Intermediate",
	},
	{
		name: "Jane Smith",
		avatarUrl: "https://i.pravatar.cc/150?img=2",
		email: "jane.smith@email.com",
		subscriptionPlan: "Basic Plan",
		lastActive: "6/12/2025, 10:45 AM +06",
		price: 29.99,
		status: "Active",
		nextBillingDate: "7/12/2025",
		startDate: "2/10/2023",
		billingInformation: "Credit Card (****7890)",
		level: "Beginner",
	},
	{
		name: "Michael Brown",
		avatarUrl: "https://i.pravatar.cc/150?img=3",
		email: "michael.brown@email.com",
		subscriptionPlan: "Premium Plan",
		lastActive: "6/14/2025, 07:30 AM +06",
		price: 109.99,
		status: "Inactive",
		nextBillingDate: "6/14/2025",
		startDate: "3/5/2023",
		billingInformation: "Credit Card (****1234)",
		level: "Advance",
	},
	{
		name: "Emily Davis",
		avatarUrl: "https://i.pravatar.cc/150?img=4",
		email: "emily.davis@email.com",
		subscriptionPlan: "Basic Plan",
		lastActive: "6/11/2025, 02:20 PM +06",
		price: 29.99,
		status: "Active",
		nextBillingDate: "7/11/2025",
		startDate: "4/1/2023",
		billingInformation: "Credit Card (****5678)",
		level: "Beginner",
	},
	{
		name: "David Wilson",
		avatarUrl: "https://i.pravatar.cc/150?img=5",
		email: "david.wilson@email.com",
		subscriptionPlan: "Premium Plan",
		lastActive: "6/13/2025, 06:50 PM +06",
		price: 109.99,
		status: "Active",
		nextBillingDate: "7/13/2025",
		startDate: "5/15/2023",
		billingInformation: "Credit Card (****9012)",
		level: "Intermediate",
	},
	{
		name: "Sarah Johnson",
		avatarUrl: "https://i.pravatar.cc/150?img=6",
		email: "sarah.johnson@email.com",
		subscriptionPlan: "Basic Plan",
		lastActive: "6/10/2025, 09:15 AM +06",
		price: 29.99,
		status: "Inactive",
		nextBillingDate: "6/10/2025",
		startDate: "6/20/2023",
		billingInformation: "Credit Card (****3456)",
		level: "Beginner",
	},
	{
		name: "Robert Taylor",
		avatarUrl: "https://i.pravatar.cc/150?img=7",
		email: "robert.taylor@email.com",
		subscriptionPlan: "Premium Plan",
		lastActive: "6/14/2025, 08:10 PM +06",
		price: 109.99,
		status: "Active",
		nextBillingDate: "7/14/2025",
		startDate: "7/10/2023",
		billingInformation: "Credit Card (****6789)",
		level: "Advance",
	},
	{
		name: "Lisa Anderson",
		avatarUrl: "https://i.pravatar.cc/150?img=8",
		email: "lisa.anderson@email.com",
		subscriptionPlan: "Basic Plan",
		lastActive: "6/12/2025, 01:30 PM +06",
		price: 29.99,
		status: "Active",
		nextBillingDate: "7/12/2025",
		startDate: "8/5/2023",
		billingInformation: "Credit Card (****4321)",
		level: "Intermediate",
	},
	{
		name: "James Martinez",
		avatarUrl: "https://i.pravatar.cc/150?img=9",
		email: "james.martinez@email.com",
		subscriptionPlan: "Premium Plan",
		lastActive: "6/13/2025, 04:45 PM +06",
		price: 109.99,
		status: "Inactive",
		nextBillingDate: "6/13/2025",
		startDate: "9/1/2023",
		billingInformation: "Credit Card (****8765)",
		level: "Beginner",
	},
	{
		name: "Mary Wilson",
		avatarUrl: "https://i.pravatar.cc/150?img=10",
		email: "mary.wilson@email.com",
		subscriptionPlan: "Basic Plan",
		lastActive: "6/11/2025, 11:20 AM +06",
		price: 29.99,
		status: "Active",
		nextBillingDate: "7/11/2025",
		startDate: "10/15/2023",
		billingInformation: "Credit Card (****2109)",
		level: "Advance",
	},
];

interface ProductProps {
	productName: string;
	category: string;
	productLink: string;
	productPrice: number;
	isHighlighted?: boolean; // Optional property for yellow highlight
}

export const affiliateLinksData: ProductProps[] = [
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
		isHighlighted: true, // Highlighted row
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
		isHighlighted: true, // Highlighted row
	},
	{
		productName: "Smartphone Case",
		category: "Electronics",
		productLink: "https://affiliate-link.com/product123",
		productPrice: 14.0,
	},
];

interface DashboardItemProps {
	title: string;
	value: number;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
	background: string;
	foreground: string;
}

export const dashboardItems: DashboardItemProps[] = [
	{
		title: "Total Users",
		value: 0,
		icon: Users,
		background: "bg-purple-500/10",
		foreground: "text-purple-500",
	},
	{
		title: "Active Users",
		value: 0,
		icon: LineChart,
		background: "bg-green-500/10",
		foreground: "text-green-500",
	},
	{
		title: "Total Conversations",
		value: 0,
		icon: Box,
		background: "bg-amber-500/10",
		foreground: "text-amber-500",
	},
];

export interface NotificationProps {
	id: number;
	title: string;
	description: string;
	timestamp: string;
	dateCategory: string;
	avatarUrl?: string; // Optional for user-related notifications
}

export const notifications: NotificationProps[] = [
	{
		id: 1,
		title: "Welcome to Our AI Shopping Assistant!",
		description:
			"Please ensure you have all necessary documents or items required for the appointment",
		timestamp: "5 min ago",
		dateCategory: "Today",
		avatarUrl: undefined,
	},
	{
		id: 2,
		title: "New Product Recommendations",
		description:
			"Please confirm this appointment and let us know if you have any preferences or special requirements. Looking forward to our session together!",
		timestamp: "2 min ago",
		dateCategory: "Today",
		avatarUrl: undefined,
	},
	{
		id: 3,
		title: "Payment Not Added",
		description:
			"This is to inform you that your recent payment has not been successfully processed. Please review your payment method and ensure that sufficient funds are available or that the provided details are accurate.",
		timestamp: "2 min ago",
		dateCategory: "Today",
		avatarUrl: undefined,
	},
	{
		id: 4,
		title: "Password change email sent",
		description:
			"This is to inform you that your password has been successfully changed for your account.",
		timestamp: "5 min ago",
		dateCategory: "Yesterday",
		avatarUrl: "https://i.pravatar.cc/150?img=1",
	},
	{
		id: 5,
		title: "Subscription Update",
		description:
			"Meeting Reminder: Just a quick heads-up about your meeting tonight at 07:45 PM. Don't forget to prep any necessary materials and jot down any questions or topics you'd like to discuss.",
		timestamp: "2 min ago",
		dateCategory: "Yesterday",
		avatarUrl: "https://i.pravatar.cc/150?img=2",
	},
	{
		id: 6,
		title: "New Update",
		description:
			"This is a reminder about your meeting tonight at 07:45 PM. Please ensure you are prepared.",
		timestamp: "10 min ago",
		dateCategory: "Yesterday",
		avatarUrl: "https://i.pravatar.cc/150?img=3",
	},
	{
		id: 7,
		title: "Account Verification",
		description:
			"Please verify your account to continue using our services.",
		timestamp: "15 min ago",
		dateCategory: "Yesterday",
		avatarUrl: "https://i.pravatar.cc/150?img=4",
	},
];
