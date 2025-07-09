import Logo from "@/assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
	const location = useLocation();

	const navMenus = [
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
		// {
		// 	name: "ChatAI",
		// 	path: "/chat",
		// },
	];

	return (
		<header className="border border-b border-[#E9E9E9] bg-white/50 py-3 sticky top-0 z-50 backdrop-blur-lg shadow-sm transition-all duration-300 ease-in-out">
			<div className="container grid grid-cols-2 lg:grid-cols-3 gap-2">
				<div className="logo w-full flex items-center justify-start">
					<Link to="/">
						<img className="w-14 h-14" src={Logo} alt="Logo" />
					</Link>
				</div>
				<div className="nav-menu hidden lg:flex items-center justify-center">
					<ul className="w-full flex items-center justify-center gap-12 text-lg font-semibold">
						{navMenus.map((navMenu, index) => (
							<Link
								to={navMenu.path}
								key={index}
								className={cn(
									location.pathname === navMenu.path &&
										"text-primary",
									"hover:text-primary transition-all duration-300"
								)}
							>
								<li>{navMenu.name}</li>
							</Link>
						))}
					</ul>
				</div>
				<div className="auth-menu hidden lg:flex items-center justify-end gap-4">
					<Link to="/signup">
						<Button variant="transparent">Sign UP</Button>
					</Link>
					<Link to="/login">
						<Button>Login</Button>
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="lg:hidden flex items-center justify-end">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[250px]">
							<div className="flex flex-col gap-4 mt-4">
								{navMenus.map((navMenu, index) => (
									<Link
										to={navMenu.path}
										key={index}
										className={cn(
											location.pathname ===
												navMenu.path && "text-primary",
											"hover:text-primary transition-all duration-300 text-lg font-semibold"
										)}
										onClick={() => {}}
									>
										{navMenu.name}
									</Link>
								))}

								<div className="auth-menu flex items-center justify-end gap-4">
									<Button variant="transparent">
										Sign UP
									</Button>
									<Button>Login</Button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
