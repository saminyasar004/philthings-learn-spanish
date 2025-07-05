import { Button } from "@/components/ui/button";

export default function VerifyOTP() {
	const otp = 123456;

	return (
		<div className="max-w-4xl h-svh flex flex-col items-start justify-center gap-5">
			<div className="w-full flex flex-col items-center justify-center gap-2">
				<h1 className="text-6xl font-semibold text-primary text-center">
					Use The Best Ai-New Account Verification
				</h1>
				<p className="text-lg font-montserrat font-medium text-[#2A2A2A]">
					Enter the code sent to{" "}
					<span className="text-primary underline">
						someone.example@gmail.com
					</span>
				</p>
			</div>

			<div className="form w-[60%] mx-auto flex flex-col items-start gap-8 py-5">
				<div className="form-group w-full grid grid-cols-6 gap-5">
					{otp
						.toString()
						.split("")
						.map((digit, index) => (
							<div
								key={index}
								className="h-16 rounded-lg text-3xl font-bold text-primary border-2 border-primary flex items-center justify-center"
							>
								{digit}
							</div>
						))}
				</div>

				<div className="form-group w-full">
					<Button className="w-full">Enter Site</Button>
				</div>

				<div className="form-group w-full flex items-center justify-center gap-2 space-x-4">
					<p>Did not receive the code?</p>
					<Button
						variant="link"
						size="icon"
						className="text-primary underline text-base font-medium"
					>
						Resend
					</Button>
				</div>
			</div>
		</div>
	);
}
