import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export default function RecoverPassword() {
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
								className="w-full pl-12 rounded-3xl bg-[#f7f7fd] font-montserrat"
								placeholder="Enter email"
							/>
							<Mail
								className="text-[#1A237E] absolute top-1/2 -translate-y-1/2 left-5 pointer-events-none"
								size={14}
							/>
						</div>
					</div>

					<div className="form-group w-full">
						<Button className="w-full">Send Link</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
