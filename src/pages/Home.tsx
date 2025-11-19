import AIChatOverview from "@/components/home/AIChatOverview";
import CTA from "@/components/home/CTA";
import Faq from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import Testimonial from "@/components/home/Testimonial";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
	const location = useLocation();

	useEffect(() => {
		// If there's a hash in the URL, scroll to that element and account for the sticky header height
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		const el = document.getElementById(id);
		if (el) {
			const header = document.querySelector('header');
			const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
			const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8; // small padding
			window.scrollTo({ top, behavior: 'smooth' });
		}
	}, [location.hash]);
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
