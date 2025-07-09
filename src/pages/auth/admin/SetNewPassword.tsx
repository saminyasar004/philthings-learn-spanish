import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg";

export default function SetNewPassword() {
	const [isHidePassword, setIsHidePassword] = useState(false);
	const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(false);
	return (
		<div className="w-full h-screen grid grid-cols-2 gap-24">
			<div className="bg-primary flex items-center justify-center h-full">
				<img src={Logo} alt="Logo" className="w-96 max-w-3xl" />
			</div>
			<div className="max-w-3xl h-full flex items-start justify-center flex-col gap-10">
				<div className="w-full flex flex-col items-start justify-start gap-2">
					<h1 className="text-6xl font-semibold text-primary">
						Set New Password
					</h1>
				</div>

				<div className="form w-full flex flex-col items-start gap-6">
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
							htmlFor="password"
							className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
						>
							Confirm Password
						</Label>
						<div className="relative w-full">
							<Input
								id="password"
								type={
									isHideConfirmPassword ? "password" : "text"
								}
								name="password"
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

					<div className="form-group w-full mt-6">
						<Button className="w-full">Confirm</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
