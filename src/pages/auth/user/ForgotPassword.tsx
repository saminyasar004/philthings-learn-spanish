import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-start justify-start gap-2">
				<h1 className="text-6xl font-semibold text-primary">
					Forgot Password?
				</h1>
				<p className="text-lg font-normal text-[#2A2A2A]">
					Don't worry! It occurs. Please enter the email address
					linked with your account.
				</p>
			</div>

			<div className="form w-full flex flex-col items-start gap-8">
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
						/>
						<Mail
							className="text-primary absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
							size={14}
						/>
					</div>
				</div>

				<div className="form-group w-full">
					<Button className="w-full">Send</Button>
				</div>

				<div className="form-group w-full flex items-center justify-center gap-2">
					<p>Remember Password?</p>
					<Link to="/login" className="text-primary underline">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
