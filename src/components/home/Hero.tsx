import { Button } from "@/components/ui/button";
import ArrowPath from "@/assets/arrow-path.svg";
import PaperFly from "@/assets/paperfly.svg";
import ColorPallete from "@/assets/color-pallete.svg";
import Plus from "@/assets/plus.svg";
import DoodlesGroup from "@/assets/doodles-group.svg";

export default function Hero() {
	return (
		<section className="py-12 md:py-24">
			<div className="container relative flex flex-col gap-8">
				<div className="w-full flex flex-col gap-1 items-center text-center md:pt-6 mb-12">
					<h1 className="text-3xl md:text-6xl font-bold text-primary">
						Learn. Live. Love. Spanish Way
					</h1>

					<p className="w-[50%] text-base md:text-lg font-montserrat text-[#373737] py-2 md:py-3">
						Experience Spanish not just as a language, but as a way
						of life filled with passion, culture, and connection.
					</p>

					<Button>Get Started</Button>
				</div>
				<div className="w-full flex items-center justify-center">
					<img
						src={DoodlesGroup}
						alt="doodles-group"
						className="max-w-full"
					/>
				</div>

				<img
					src={PaperFly}
					alt="color-pallete"
					className="max-w-full absolute left-32 top-8"
				/>
				<img
					src={ArrowPath}
					alt="color-pallete"
					className="max-w-full absolute left-0 top-32"
				/>

				<img
					src={ColorPallete}
					alt="color-pallete"
					className="max-w-full absolute right-5 top-0"
				/>
				<img
					src={Plus}
					alt="color-pallete"
					className="max-w-full absolute right-52 top-52"
				/>
			</div>
		</section>
	);
}
