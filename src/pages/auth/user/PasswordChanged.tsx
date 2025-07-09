import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PasswordChanged() {
	return (
		<div className="max-w-3xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-center justify-center gap-3 text-center">
				<BadgeCheck size={143} fill="#06402B" className="text-white" />

				<h1 className="text-6xl font-semibold text-primary">
					Password Changed!
				</h1>
				<p className="text-lg font-medium font-montserrat text-[#2A2A2A]">
					Your password has been changed <br /> successfully.
				</p>
			</div>

			<div className="form w-full flex flex-col items-start gap-8">
				<div className="form-group w-full">
					<Link to="/login">
						<Button className="w-full">Back to Login</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
