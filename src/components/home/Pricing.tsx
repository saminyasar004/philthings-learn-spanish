import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CircleX } from "lucide-react";
import CrownImg from "@/assets/crown.svg";
import SectionBGVector from "@/assets/pricing-section-bg-vector.svg";
import { cn } from "@/lib/utils";

export default function Pricing() {
	const pricingData = [
		{
			id: 0,
			title: "Free",
			subtitle: "",
			features: [
				{ text: "Limited AI Recommendations", included: true },
				{ text: "Basic Product Suggestions", included: true },
				{ text: "Last 3 Chats Saved", included: true },
				{ text: "Affiliate Link Support", included: true },
				{ text: "No Priority Support", included: false },
				{ text: "No Unlimited Searches", included: false },
			],
			buttonText: "Choose Plan",
		},
		{
			id: 1,
			title: "$100",
			subtitle: "/Per Month",
			features: [
				{ text: "Unlimited AI Recommendations", included: true },
				{ text: "Advanced & Personalized Suggestions", included: true },
				{ text: "Full Conversation History", included: true },
				{ text: "Priority Affiliate Deals", included: true },
				{ text: "AI Memory & Preferences", included: true },
				{ text: "Priority Support", included: true },
			],
			buttonText: "Choose Plan",
		},
		{
			id: 2,
			title: "Enterprise",
			subtitle: "",
			features: [
				{ text: "Limited AI Recommendations", included: true },
				{ text: "Basic Product Suggestions", included: true },
				{ text: "Last 3 Chats Saved", included: true },
				{ text: "Affiliate Link Support", included: true },
				{ text: "No Priority Support", included: false },
				{ text: "No Unlimited Searches", included: false },
			],
			buttonText: "Choose Plan",
		},
	];

	return (
		<section className="py-24">
			<div className="container relative overflow-hidden">
				<div className="w-full flex flex-col items-center justify-center gap-3">
					<SectionHeader
						title="PRICING"
						className="justify-start mb-5"
					/>

					<div className="w-full flex flex-col items-center justify-center gap-3">
						<h2 className="font-semibold text-3xl md:text-5xl text-primary">
							Our Pricing Plan
						</h2>

						<p className="w-full md:w-[60%] text-center font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
							Pick a plan that works for you! Get started with the
							free plan or upgrade to premium for unlimited
							access, personalized recommendations, and exclusive
							perks.
						</p>
					</div>
				</div>

				<div className="w-full py-16 flex flex-col md:flex-row flex-wrap gap-8 items-start justify-center">
					{pricingData.map((pricing, index) => (
						<PricingCard
							key={index}
							id={pricing.id}
							title={pricing.title}
							subtitle={pricing.subtitle}
							features={pricing.features}
							buttonText={pricing.buttonText}
						/>
					))}
				</div>

				<img
					src={SectionBGVector}
					alt="feature-section-bg-vector"
					className="absolute top-5 -right-[0rem] w-[1200px] h-full -z-10"
				/>
			</div>
		</section>
	);
}

function PricingCard({
	id,
	title,
	subtitle,
	features,
	buttonText,
}: {
	id: number;
	title: string;
	subtitle: string;
	features: { text: string; included: boolean }[];
	buttonText: string;
}) {
	return (
		<div className="border border-[#1A237E] rounded-[50px] h-full w-full md:w-[380px] flex flex-col items-center justify-center gap-3 overflow-hidden bg-white">
			<div
				className={cn(
					"w-full flex items-center justify-center p-8",
					id === 1
						? "bg-primary items-start justify-between"
						: "bg-[#F7F8FF]"
				)}
			>
				<h2
					className={cn(
						"font-semibold text-3xl md:text-6xl text-center",
						id === 1 ? "text-warning" : "text-[#1A237E]"
					)}
				>
					{title}
					{subtitle && (
						<span className="text-base font-normal">
							{subtitle}
						</span>
					)}
				</h2>

				{id === 1 && (
					<img src={CrownImg} alt="crown-img" className="max-w-8" />
				)}
			</div>

			<div className="flex flex-col gap-5 pt-8 px-4 w-full">
				{features.map((feature, index) => (
					<div
						key={index}
						className="flex items-center justify-start gap-3"
					>
						{feature.included ? (
							<CheckCircleIcon className="text-warning" />
						) : (
							<CircleX className="text-danger" />
						)}

						<p className="font-lora text-base font-medium text-[#535862]">
							{feature.text}
						</p>
					</div>
				))}
				<Button
					className="mt-16 mb-8 w-full"
					size="lg"
					variant={id === 1 ? "default" : "transparent"}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
}
