import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNewPassword() {
	const [isHidePassword, setIsHidePassword] = useState(false);
	const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-start justify-start gap-3">
				<h1 className="text-6xl font-semibold text-primary">
					Create New Password
				</h1>
				<p className="text-lg font-normal text-[#2A2A2A]">
					Your new password must be unique from those previously used.
				</p>
			</div>

			<div className="form w-full flex flex-col items-start gap-8">
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
							placeholder="Enter new password"
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
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
							placeholder="Confirm new password"
						/>
						<LockKeyhole
							className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
							size={14}
						/>
						{isHideConfirmPassword ? (
							<Eye
								onClick={() =>
									setIsHideConfirmPassword(
										!isHideConfirmPassword
									)
								}
								className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						) : (
							<EyeOff
								onClick={() =>
									setIsHideConfirmPassword(
										!isHideConfirmPassword
									)
								}
								className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
								size={14}
							/>
						)}
					</div>
				</div>

				<div className="form-group w-full">
					<Button 
						className="w-full" 
						onClick={handleResetPassword}
						disabled={loading || !password || !confirmPassword}
					>
						{loading ? "Resetting..." : "Reset Password"}
					</Button>
				</div>

				{message && (
					<div className="form-group w-full text-center text-green-600">
						<p>{message}</p>
					</div>
				)}

				{error && (
					<div className="form-group w-full text-center text-red-600">
						<p>{error}</p>
					</div>
				)}
			</div>
		</div>
	);

	async function handleResetPassword() {
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setError("");
		setMessage("");
		setLoading(true);
		try {
			// Assuming the access token is stored in localStorage after OTP verification
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				throw new Error("Access token not found. Please retry the password reset process.");
			}
			
			const response = await fetch("http://192.168.10.124:2100/api/v1/accounts/reset-password/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`
				},
				body: JSON.stringify({ new_password: password }),
			});
			
			if (!response.ok) {
				throw new Error("Failed to update password. Please try again.");
			}
			
			const data = await response.json();
			setMessage(data.message || "Password updated successfully.");
			setTimeout(() => {
				navigate("/login");
			}, 2000); // Redirect to login after 2 seconds
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred while updating the password.");
		} finally {
			setLoading(false);
		}
	}
}
