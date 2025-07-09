import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

export default function RecoverPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const { requestPasswordReset } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccessMessage(null);

		try {
			const result = await requestPasswordReset(email);
			if (result.success) {
				localStorage.setItem('resetEmail', email);
				localStorage.setItem('authFlow', 'passwordReset');
				setSuccessMessage(result.message || "Password reset email sent successfully");
				setTimeout(() => {
					navigate("/verify-otp");
				}, 2000);
			} else {
				setError(result.message || "Failed to send password reset email");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-screen grid grid-cols-2 gap-24">
			<div className="bg-primary flex items-center justify-center h-full">
				<img src={Logo} alt="Logo" className="w-96 max-w-3xl" />
			</div>
			<div className="max-w-3xl h-full flex items-start justify-center flex-col gap-10">
				<div className="w-full flex flex-col items-start justify-start gap-2">
					<h1 className="text-6xl font-semibold text-primary">
						Recover Password
					</h1>
				</div>

				<div className="form w-full flex flex-col items-start gap-6">
					{error && (
						<div className="w-full p-2 text-red-600 bg-red-100 rounded-md">
							{error}
						</div>
					)}
					{successMessage && (
						<div className="w-full p-2 text-green-600 bg-green-100 rounded-md">
							{successMessage}
						</div>
					)}
					<form onSubmit={handleSubmit} className="w-full flex flex-col items-start gap-6">
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
									disabled={loading}
								/>
								<Mail
									className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
									size={14}
								/>
							</div>
						</div>

						<div className="form-group w-full">
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Sending..." : "Send Link"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
