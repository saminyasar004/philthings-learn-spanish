import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import BookCard, { Book } from "./BookCard";

const MOCK_BOOKS: Book[] = [
	{
		id: "1",
		title: "Spanish for Beginners",
		description:
			"The complete guide to learning Spanish from scratch. Perfect for travelers and students.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Spanish+Beginners",
		price: 19.99,
		rating: 4.5,
		reviews: 128,
	},
	{
		id: "2",
		title: "Advanced Spanish Grammar",
		description:
			"Master the complexities of Spanish grammar with this comprehensive workbook.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Advanced+Grammar",
		price: 24.99,
		rating: 4.8,
		reviews: 85,
	},
	{
		id: "3",
		title: "Spanish Short Stories",
		description:
			"Improve your reading comprehension with these engaging short stories for intermediate learners.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Short+Stories",
		price: 14.99,
		rating: 4.2,
		reviews: 210,
	},
	{
		id: "4",
		title: "Conversational Spanish",
		description:
			"Learn to speak naturally and fluently in everyday situations.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Conversational",
		price: 29.99,
		rating: 4.7,
		reviews: 340,
	},
	{
		id: "5",
		title: "Spanish Vocabulary Builder",
		description:
			"Expand your vocabulary with over 2000 essential words and phrases.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Vocabulary",
		price: 12.99,
		rating: 4.0,
		reviews: 95,
	},
	{
		id: "6",
		title: "Travel Spanish Guide",
		description:
			"Essential phrases and tips for your next trip to Spain or Latin America.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Travel+Guide",
		price: 16.5,
		rating: 4.6,
		reviews: 150,
	},
	{
		id: "7",
		title: "Spanish Culture & History",
		description:
			"Dive deep into the rich history and diverse cultures of the Spanish-speaking world.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Culture+History",
		price: 22.0,
		rating: 4.9,
		reviews: 60,
	},
	{
		id: "8",
		title: "Business Spanish",
		description: "Professional language skills for the global marketplace.",
		image: "https://placehold.co/400x600/e8f4f0/373737?text=Business+Spanish",
		price: 35.0,
		rating: 4.4,
		reviews: 45,
	},
];

export default function BookCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, align: "start", slidesToScroll: 1 },
		[Autoplay({ delay: 3000, stopOnInteraction: false })]
	);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<section className="py-24 bg-white relative group">
			<div className="container relative">
				<div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
					<h2 className="font-semibold text-3xl md:text-5xl text-primary">
						Premium Books
					</h2>
					<p className="w-[60%] font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
						Explore our curated collection of top-rated Spanish
						learning resources from Amazon.
					</p>
				</div>

				<div className="relative">
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex -ml-4">
							{MOCK_BOOKS.map((book) => (
								<div
									key={book.id}
									className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_20%] pl-4 min-w-0"
								>
									<BookCard book={book} actionLabel="View" />
								</div>
							))}
						</div>
					</div>

					<button
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
						onClick={scrollPrev}
						aria-label="Previous slide"
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
						onClick={scrollNext}
						aria-label="Next slide"
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>
		</section>
	);
}
