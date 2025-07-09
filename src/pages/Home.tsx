import AIChatOverview from "@/components/home/AIChatOverview";
import CTA from "@/components/home/CTA";
import Faq from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
	return (
		<>
			<Hero />
			<AIChatOverview />
			<Features />
			{/* <Process /> */}
			<Faq />
			{/* <Pricing /> */}
			<Testimonial />
			{/* <CTA /> */}
		</>
	);
}
