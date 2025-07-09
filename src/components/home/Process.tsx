import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import ProcessVector from "@/assets/process-section-question-vector.svg";
import ProcessStep1 from "@/assets/process-step-1.svg";
import ProcessStep2 from "@/assets/process-step-2.svg";
import ProcessStep3 from "@/assets/process-step-3.svg";
import ProcessStep4 from "@/assets/process-step-4.svg";

export default function Process() {
	const processSteps = [
		{
			id: 1,
			image: ProcessStep1,
			title: "sign up",
			color: "#FFD700",
			description:
				"Create your account in seconds and get immediate access to the AI Chatbot.",
		},
		{
			id: 2,
			image: ProcessStep2,
			title: "ask questions",
			color: "#6A0DAD",
			description:
				"Chat with our AI about products, get recommendations, and shopping advice.",
		},
		{
			id: 3,
			image: ProcessStep3,
			title: "product recommendation",
			color: "#F54BA6",
			description:
				"Follow personalized recommendations and make informed purchasing decisions.",
		},
		{
			id: 4,
			image: ProcessStep4,
			title: "shop & save",
			color: "#1A237E",
			description:
				"Click the provided links to shop from trusted retailers and enjoy exclusive deals!",
		},
	];

	return (
		<section className="py-24">
			<div className="container">
				<div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-8">
					<div className="md:col-span-5">
						<SectionHeader
							title="PROCESSES"
							className="justify-center lg:justify-start mb-14"
						/>

						<div className="w-full flex flex-col items-center lg:items-start justify-center gap-3 text-center lg:text-left">
							<h2 className="font-semibold text-3xl md:text-5xl text-primary">
								How it works
							</h2>

							<p className="w-full font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
								Smart, Fast & Personalized Shopping with AI{" "}
							</p>

							<p className="w-full md:w-5/6 font-montserrat text-base md:text-lg text-[#373737] leading-relaxed mb-5">
								Finding the right product has never been easier!
								Just ask, and our AI instantly analyzes your
								needs to recommend the best options. Whether
								you're looking for gadgets, skincare, or home
								essentials, we provide tailored suggestions with
								direct purchase links—saving you time and
								effort!
							</p>

							<Button>Get Started</Button>
						</div>
					</div>

					<div className="w-full flex items-center justify-center">
						<img src={ProcessVector} alt="process-vector" />
					</div>
				</div>

				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-20">
					{processSteps.map((step, index) => (
						<div className="flex flex-col gap-3" key={index}>
							<div className="flex items-center justify-center">
								<img src={step.image} alt="step image" />
							</div>

							<div className="flex items-center flex-col gap-2">
								<h3
									style={{
										color: step.color,
									}}
									className="relative text-3xl uppercase text-center font-bold py-4 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:contents-[''] after:w-24 after:h-[0.2rem] after:rounded-lg after:bg-current"
								>
									{step.title}
								</h3>

								<p className="text-sm text-center w-3/4 font-montserrat">
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
