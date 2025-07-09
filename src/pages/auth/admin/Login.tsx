import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg";
import { useAuth } from "@/Context/AuthContext";

export default function AdminLogin() {
	const [isHidePassword, setIsHidePassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="w-full h-screen grid grid-cols-2 gap-24">
			<div className="bg-primary flex items-center justify-center h-full">
				<img src={Logo} alt="Logo" className="w-96 max-w-3xl" />
			</div>
			<div className="max-w-3xl h-full flex items-start justify-center flex-col gap-10">
				<div className="w-full flex flex-col items-start justify-start gap-2">
					<h1 className="text-6xl font-semibold text-primary">
						Login
					</h1>
				</div>

				<div className="form w-full flex flex-col items-start gap-6">
					<div className="form-group space-y-2 w-full">
						<Label
							htmlFor="email"
							className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
						>
							Your Email
						</Label>
						<div className="relative w-full">
							<Input
								id="email"
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
								placeholder="Enter email"
							/>
							<Mail
								className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
								size={14}
							/>
						</div>
					</div>

					<div className="form-group space-y-2 w-full">
						<Label
							htmlFor="password"
							className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
						>
							Password
						</Label>
						<div className="relative w-full">
							<Input
								id="password"
								type={isHidePassword ? "password" : "text"}
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
								placeholder="Enter password"
							/>
							<LockKeyhole
								className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
								size={14}
							/>
							{isHidePassword ? (
								<Eye
									onClick={() =>
										setIsHidePassword(!isHidePassword)
									}
									className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
									size={14}
								/>
							) : (
								<EyeOff
									onClick={() =>
										setIsHidePassword(!isHidePassword)
									}
									className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
									size={14}
								/>
							)}
						</div>
					</div>

					<div className="form-group w-full flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Checkbox className="" id="remember-me" />
							<Label
								htmlFor="remember-me"
								className="cursor-pointer font-montserrat text-[#2A2A2A]"
							>
								Remember Me
							</Label>
						</div>

						<Link
							to="/recover-password"
							className="text-[#6A0DAD] font-montserrat text-sm font-medium"
						>
							Forgot Password?
						</Link>
					</div>

					<div className="form-group w-full">
						<Button 
							className="w-full" 
							onClick={async (e) => {
								e.preventDefault();
								setIsLoading(true);
								setError(null);
								try {
									await login(email, password);
									navigate("/dashboard");
								} catch (err) {
									setError(err instanceof Error ? err.message : "Login failed. Please try again.");
								} finally {
									setIsLoading(false);
								}
							}}
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
						{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
