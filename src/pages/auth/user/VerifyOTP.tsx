import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

export default function VerifyOTP() {
	const [otpDigits, setOtpDigits] = useState(Array(4).fill(""));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (index: number, value: string) => {
		if (value.length <= 1 && /^[0-9]*$/.test(value)) {
			const newOtpDigits = [...otpDigits];
			newOtpDigits[index] = value;
			setOtpDigits(newOtpDigits);
			
			// Move focus to the next input if a digit is entered
			if (value && index < 3) {
				const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
				if (nextInput) nextInput.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
			const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
			if (prevInput) prevInput.focus();
		}
	};

	const { verifyOtp } = useAuth();
	
	const handleVerifyOtp = async () => {
		const otp = otpDigits.join("");
		if (otp.length !== 4) {
			setError("Please enter a complete 4-digit OTP.");
			return;
		}
		setError("");
		setLoading(true);
		try {
			const authFlow = localStorage.getItem('authFlow');
			const isPasswordReset = authFlow === 'passwordReset';
			const emailKey = isPasswordReset ? 'resetEmail' : 'signupEmail';
			const email = localStorage.getItem(emailKey) || "";
			const result = await verifyOtp(email, otp);
			if (result.success) {
				// Redirect based on flow
				if (isPasswordReset) {
					navigate("/create-new-password");
				} else {
					navigate("/login");
				}
			} else {
				setError(result.message || "Failed to verify OTP");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-center justify-center gap-2">
				<h1 className="text-6xl font-semibold text-primary text-center">
					Use The Best Ai-New Account Verification
				</h1>
				<p className="text-lg font-montserrat font-medium text-[#2A2A2A]">
					Enter the code sent to{" "}
					<span className="text-[#6A0DAD]">
						someone.example@gmail.com
					</span>
				</p>
			</div>

			<div className="form w-[60%] mx-auto flex flex-col items-start gap-8 py-5">
				{error && (
					<div className="form-group w-full text-center text-red-500">
						{error}
					</div>
				)}
				<div className="form-group w-full grid grid-cols-4 gap-5">
					{Array.from({ length: 4 }).map((_, index) => (
						<input
							key={index}
							type="text"
							maxLength={1}
							data-index={index}
							value={otpDigits[index]}
							onChange={(e) => handleInputChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							className="h-16 rounded-lg text-3xl font-bold text-primary border-2 border-primary flex items-center justify-center text-center"
						/>
					))}
				</div>

				<div className="form-group w-full">
					<Button 
						className="w-full" 
						onClick={handleVerifyOtp} 
						disabled={loading}
					>
						{loading ? "Verifying..." : "Enter Site"}
					</Button>
				</div>

				<div className="form-group w-full flex items-center justify-center gap-2 space-x-4">
					<p>Did not receive the code?</p>
					<Button
						variant="link"
						size="icon"
						className="text-[#6A0DAD] text-base font-medium"
					>
						Resend
					</Button>
				</div>
			</div>
		</div>
	);
}
