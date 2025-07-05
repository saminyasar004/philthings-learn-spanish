import Logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { MoveRight } from "lucide-react";

export default function Footer() {
	const footerNavMenus = [
		{
			title: "Legal Information",
			links: [
				{
					name: "Privacy / Policy",
					path: "/privacy-policy",
				},
				{
					name: "Terms & Condition",
					path: "/terms-and-conditions",
				},
			],
		},
		{
			title: "Navigation Links",
			links: [
				{
					name: "Home",
					path: "/",
				},
				{
					name: "Features",
					path: "/features",
				},
				{
					name: "FAQ",
					path: "/faq",
				},
				{
					name: "Pricing",
					path: "/pricing",
				},
			],
		},
	];

	return (
		<footer className="bg-primary text-white py-10 lg:py-20">
			<div className="container grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 text-center lg:text-left">
				<div className="logo col-span-1 lg:col-span-2 flex flex-col gap-4 items-center lg:items-start">
					<Link to="/">
						<img
							className="w-20 h-20 lg:w-28 lg:h-28"
							src={Logo}
							alt="Logo"
						/>
					</Link>

					<p className="text-base lg:text-lg font-normal">
						Your personal AI shopping assistant that helps{" "}
						<br className="hidden lg:block" />
						you find the perfect products.
					</p>
				</div>

				{footerNavMenus.map((navSection, index) => (
					<div
						className="menu w-full flex flex-col gap-3 items-center lg:items-start"
						key={index}
					>
						<h5 className="font-medium text-xl lg:text-2xl">
							{navSection.title}
						</h5>

						<ul className="w-full flex flex-col gap-2 pt-2 text-sm lg:text-base text-[#F8D955]">
							{navSection.links.map((navLink, index) => (
								<li key={index}>
									<Link to={navLink.path}>
										{navLink.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}

				<div className="flex flex-col gap-4 items-center lg:items-start">
					<h5 className="font-medium text-xl lg:text-2xl">
						Subscribe
					</h5>

					<div className="flex gap-0 items-center justify-center lg:justify-start w-full">
						<Input
							type="email"
							name="email"
							className="h-12 lg:h-14 pl-4 lg:pl-6 w-3/4 rounded-r-none outline-none border-none text-primary focus:ring-0 focus:border-0 focus:outline-none font-montserrat font-medium text-sm lg:text-base"
							placeholder="Email address"
						/>
						<button className="bg-[#F8D955] text-black flex items-center justify-center px-3 lg:px-4 h-12 lg:h-14 rounded-r-md">
							<MoveRight size={24} className="lg:w-30 lg:h-30" />
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
