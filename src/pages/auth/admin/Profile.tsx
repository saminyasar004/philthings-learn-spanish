import UserPlaceholder from "@/assets/user-placeholder-2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LockKeyhole, PenLine, UserRound } from "lucide-react";
import { useState } from "react";

export default function Profile() {
	const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(false);
	const [isHideNewPassword, setIsHideNewPassword] = useState(false);
	const [isHideConfirmNewPassword, setIsHideConfirmNewPassword] =
		useState(false);

	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex items-center justify-start gap-4">
				<div className="rounded-full relative">
					<img
						src={UserPlaceholder}
						alt="User Avatar"
						className="max-w-full"
					/>

					<span className="absolute right-0 bottom-5 w-10 h-10 p-2 flex items-center justify-center bg-primary text-warning rounded-full cursor-pointer">
						<PenLine size={18} />
					</span>
				</div>
				<h5 className="text-4xl font-medium text-primary">Pappu Don</h5>
			</div>

			<div className="form w-full flex flex-col items-start gap-6">
				<Tabs className="max-w-5xl" defaultValue="edit-profile">
					<TabsList>
						<TabsTrigger value="edit-profile">
							Edit Profile
						</TabsTrigger>
						<TabsTrigger value="change-password">
							Change Password
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="edit-profile"
						className="w-[500px] py-6 space-y-4"
					>
						<h3 className="text-primary font-semibold text-2xl">
							Edit Your Profile
						</h3>

						<div className="form-group space-y-2 w-full">
							<Label
								htmlFor="username"
								className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
							>
								Username
							</Label>
							<div className="relative w-full">
								<Input
									id="username"
									type="text"
									name="name"
									className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
									placeholder="Enter username"
								/>
								<UserRound
									className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
									size={14}
								/>
							</div>
						</div>

						<div className="form-group w-full">
							<Button className="w-full">Save & Change</Button>
						</div>
					</TabsContent>
					<TabsContent
						value="change-password"
						className="w-[500px] py-6 space-y-4"
					>
						<h3 className="text-primary font-semibold text-2xl">
							Edit Your Password
						</h3>

						<div className="form-group space-y-2 w-full">
							<Label
								htmlFor="confirm-password"
								className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
							>
								Confirm Password
							</Label>
							<div className="relative w-full">
								<Input
									id="confirm-password"
									type={
										isHideConfirmPassword
											? "password"
											: "text"
									}
									name="confirm-password"
									className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
									placeholder="Enter new password"
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

						<div className="form-group space-y-2 w-full">
							<Label
								htmlFor="new-password"
								className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
							>
								New Password
							</Label>
							<div className="relative w-full">
								<Input
									id="new-password"
									type={
										isHideNewPassword ? "password" : "text"
									}
									name="new-password"
									className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
									placeholder="Confirm new password"
								/>
								<LockKeyhole
									className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
									size={14}
								/>
								{isHideNewPassword ? (
									<Eye
										onClick={() =>
											setIsHideNewPassword(
												!isHideNewPassword
											)
										}
										className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
										size={14}
									/>
								) : (
									<EyeOff
										onClick={() =>
											setIsHideNewPassword(
												!isHideNewPassword
											)
										}
										className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
										size={14}
									/>
								)}
							</div>
						</div>

						<div className="form-group space-y-2 w-full">
							<Label
								htmlFor="confirm-new-password"
								className="font-lora font-normal text-base text-[#06402B] cursor-pointer"
							>
								Confirm New Password
							</Label>
							<div className="relative w-full">
								<Input
									id="confirm-new-password"
									type={
										isHideConfirmNewPassword
											? "password"
											: "text"
									}
									name="confirm-new-password"
									className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
									placeholder="Enter new password"
								/>
								<LockKeyhole
									className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
									size={14}
								/>
								{isHideConfirmNewPassword ? (
									<Eye
										onClick={() =>
											setIsHideConfirmNewPassword(
												!isHideConfirmNewPassword
											)
										}
										className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
										size={14}
									/>
								) : (
									<EyeOff
										onClick={() =>
											setIsHideConfirmNewPassword(
												!isHideConfirmNewPassword
											)
										}
										className="text-[#431D5A] absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
										size={14}
									/>
								)}
							</div>
						</div>

						<div className="form-group w-full">
							<Button className="w-full">Save & Change</Button>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
