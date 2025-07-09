import AdminLayout from "@/components/common/AdminLayout";
import AuthLayout from "@/components/common/AuthLayout";
import ChatLayout from "@/components/common/ChatLayout";
import Layout from "@/components/common/Layout";
// import AffiliateLinks from "@/pages/admin/AffiliateLinks";
import AdminDashboard from "@/pages/admin/Dashboard";
import Notification from "@/pages/admin/Notification";
import PrivacyPolicy from "@/pages/admin/PrivacyPolicy";
// import Subscriptions from "@/pages/admin/Subscriptions";
import TermsnCondition from "@/pages/admin/TermsnCondition";
import Users from "@/pages/admin/Users";
import AdminLogin from "@/pages/auth/admin/Login";
import Profile from "@/pages/auth/admin/Profile";
import RecoverPassword from "@/pages/auth/admin/RecoverPassword";
import SetNewPassword from "@/pages/auth/admin/SetNewPassword";
import CreateNewPassword from "@/pages/auth/user/CreateNewPassword";
import ForgotPassword from "@/pages/auth/user/ForgotPassword";
import Login from "@/pages/auth/user/Login";
import PasswordChanged from "@/pages/auth/user/PasswordChanged";
import Signup from "@/pages/auth/user/Signup";
import VerifyOTP from "@/pages/auth/user/VerifyOTP";
import Chat from "@/pages/chat";
import NewChat from "@/pages/chat/New";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export const routes = [
	{
		path: "/",
		element: <Home />,
		layout: Layout,
	},
	// Add more custom routes here
	{
		path: "/admin",
		element: <AdminLogin />,
	},
	{
		path: "/recover-password",
		element: <RecoverPassword />,
	},
	{
		path: "/set-new-password",
		element: <SetNewPassword />,
	},
	{
		path: "/dashboard",
		element: <AdminDashboard />,
		layout: AdminLayout,
	},
	{
		path: "/users",
		element: <Users />,
		layout: AdminLayout,
	},
	// {
	// 	path: "/affiliate-links",
	// 	element: <AffiliateLinks />,
	// 	layout: AdminLayout,
	// },
	// {
	// 	path: "/subscriptions",
	// 	element: <Subscriptions />,
	// 	layout: AdminLayout,
	// },
	{
		path: "/notification",
		element: <Notification />,
		layout: AdminLayout,
	},
	{
		path: "/settings/privacy-policy",
		element: <PrivacyPolicy />,
		layout: AdminLayout,
	},
	{
		path: "/settings/terms-and-condition",
		element: <TermsnCondition />,
		layout: AdminLayout,
	},
	{
		path: "/profile",
		element: <Profile />,
		layout: AuthLayout,
	},
	{
		path: "/login",
		element: <Login />,
		layout: AuthLayout,
	},
	{
		path: "/signup",
		element: <Signup />,
		layout: AuthLayout,
	},
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
		layout: AuthLayout,
	},
	{
		path: "/verify-otp",
		element: <VerifyOTP />,
		layout: AuthLayout,
	},
	{
		path: "/create-new-password",
		element: <CreateNewPassword />,
		layout: AuthLayout,
	},
	{
		path: "/password-changed",
		element: <PasswordChanged />,
		layout: AuthLayout,
	},
	{
		path: "/chat/:id",
		element: <Chat />,
		layout: ChatLayout,
	},
	{
		path: "/chat",
		element: <NewChat />,
		layout: ChatLayout,
	},
	{
		path: "/chat/new",
		element: <NewChat />,
		layout: ChatLayout,
	},
	{
		path: "*",
		element: <NotFound />,
		layout: Layout,
	},
];
