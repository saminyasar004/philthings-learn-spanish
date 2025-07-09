import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { toast } from "sonner";
import { AuthProvider } from "@/Context/AuthContext";

function SignupPage() {
	const [isHidePassword, setIsHidePassword] = useState(false);
	const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!name || !email || !password) {
			toast.error("Please fill in all required fields");
			return;
		}
		
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		
		if (!agreedToTerms) {
			toast.error("You must agree to the terms and privacy policy");
			return;
		}
		
		setLoading(true);
		try {
			await signup(name, email, password);
			localStorage.setItem('signupEmail', email); // Store email for OTP verification
			toast.success("Signup successful! Please check your email for verification code.");
			navigate("/verify-otp"); // Adjust the route as needed
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "Signup failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-start justify-start gap-2">
				<h1 className="text-6xl font-semibold text-primary">
					Create Account
				</h1>
				<p className="text-lg font-normal text-[#2A2A2A]">
					Please enter information and click the button. We will send
					an email with a verification code for you to enter
				</p>
			</div>

			<div className="form w-full flex flex-col items-start gap-6">
				<div className="form-group space-y-2 w-full">
					<Label
						htmlFor="name"
						className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
					>
						Your Name
					</Label>
					<div className="relative w-full">
						<Input
							id="name"
							type="text"
							name="name"
							className="w-full pl-12 rounded-3xl bg-[#ebf0ee] font-montserrat"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Mail
							className="text-primary absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
							size={14}
						/>
					</div>
				</div>

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
							placeholder="Enter new password"
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

				<div className="form-group space-y-2 w-full">
					<Label
						htmlFor="confirmPassword"
						className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
					>
						Confirm Password
					</Label>
					<div className="relative w-full">
						<Input
							id="confirmPassword"
							type={isHideConfirmPassword ? "password" : "text"}
							name="confirmPassword"
							className="w-full pl-12 rounded-3xl bg-[#ebf0ee] font-montserrat"
							placeholder="Confirm new password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<LockKeyhole
							className="text-primary absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
							size={14}
						/>
						{isHideConfirmPassword ? (
							<Eye
								onClick={() =>
									setIsHideConfirmPassword(
										!isHideConfirmPassword
									)
								}
								className="text-primary absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						) : (
							<EyeOff
								onClick={() =>
									setIsHideConfirmPassword(
										!isHideConfirmPassword
									)
								}
								className="text-primary absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						)}
					</div>
				</div>

				<div className="form-group w-full flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Checkbox className="" id="terms" checked={agreedToTerms}
							onCheckedChange={(checked) => setAgreedToTerms(checked === true)}/>
						<Label
							htmlFor="terms"
							className="cursor-pointer font-montserrat text-[#2A2A2A]"
						>
							I agree to all terms and privacy policy
						</Label>
					</div>
				</div>

				<div className="form-group w-full">
					<Button className="w-full" onClick={handleSubmit}
						disabled={loading}>{loading ? "Signing up..." : "Signup"}</Button>
				</div>

				<div className="form-group w-full flex items-center justify-center gap-2">
					<p>Already have an account?</p>
					<Link to="/login" className="text-primary underline">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
export default function Signup() {
  return (
    <AuthProvider>
      <SignupPage />
    </AuthProvider>
  );
}
