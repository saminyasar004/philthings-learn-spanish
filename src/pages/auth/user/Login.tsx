import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Button  } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext"; 
import { AuthProvider } from "@/Context/AuthContext";

function LoginPage() {
	const [isHidePassword, setIsHidePassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/chat"); 
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-start justify-start gap-2">
				<h1 className="text-6xl font-semibold text-primary">
					Use The Best AI
				</h1>
				<p className="text-lg font-normal text-[#2A2A2A]">
					Please enter your credentials below
				</p>
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
							className="w-full pl-12 rounded-3xl bg-[#ebf0ee] font-montserrat"
							placeholder="Enter email"
							value={email}
              				onChange={(e) => setEmail(e.target.value)}
						/>
						<Mail
							className="text-primary absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
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
							className="w-full pl-12 rounded-3xl bg-[#ebf0ee] font-montserrat"
							placeholder="Enter password"
							value={password}
              				onChange={(e) => setPassword(e.target.value)}
						/>
						<LockKeyhole
							className="text-primary absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
							size={14}
						/>
						{isHidePassword ? (
							<Eye
								onClick={() =>
									setIsHidePassword(!isHidePassword)
								}
								className="text-primary absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						) : (
							<EyeOff
								onClick={() =>
									setIsHidePassword(!isHidePassword)
								}
								className="text-primary absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						)}
					</div>
				</div>

				<div className="form-group w-full flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Checkbox className="" id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
						<Label
							htmlFor="remember-me"
							className="cursor-pointer font-montserrat text-[#2A2A2A]"
						>
							Remember Me
						</Label>
					</div>

					<Link
						to="/forgot-password"
						className="text-primary font-montserrat text-sm font-medium"
					>
						Forgot Password?
					</Link>
				</div>

				<div className="form-group w-full">
					<Button className="w-full" onClick={handleLogin}>Login</Button>
				</div>

				<div className="form-group w-full flex items-center justify-center gap-2">
					<p>Don't have an account?</p>
					<Link to="/signup" className="text-primary underline">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
}
export default function Login() {
  return <LoginPage />;
}
