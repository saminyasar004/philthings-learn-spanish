import { Button } from "@/components/ui/button";

export default function CTA() {
	return (
		<section className="py-40">
			<div className="container relative overflow-hidden">
				<div className="w-full flex flex-col items-center justify-center gap-3">
					<div className="w-full flex flex-col items-center justify-center gap-3 text-center">
						<h2 className="w-full md:w-[60%] font-semibold text-3xl md:text-5xl text-primary leading-normal">
							Ready to Transform Your Shopping Experience?
						</h2>

						<p className="w-full md:w-[57%] text-center font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
							Take the next step towards smarter shopping! Whether
							you start with our free plan or upgrade to premium,
							enjoy personalized recommendations and effortless
							browsing. Make shopping easier, faster, and more
							rewarding today!
						</p>

						<Button className="my-10">Get Started</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
