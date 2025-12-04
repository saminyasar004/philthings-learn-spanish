import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Book {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
	reviews: number;
}

interface BookCardProps {
	book: Book;
	className?: string;
	actionLabel?: string;
	onActionClick?: (book: Book) => void;
}

export default function BookCard({
	book,
	className,
	actionLabel = "View",
	onActionClick,
}: BookCardProps) {
	return (
		<div
			className={cn(
				"flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100",
				className
			)}
		>
			<div className="relative pt-[140%] bg-gray-100 overflow-hidden group">
				<img
					src={book.image}
					alt={book.title}
					className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<div className="p-4 flex flex-col flex-grow gap-2">
				<h3
					className="font-semibold text-base text-gray-900 line-clamp-2 leading-tight"
					title={book.title}
				>
					{book.title}
				</h3>
				<div className="flex items-center gap-1">
					<div className="flex text-yellow-400">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								size={14}
								fill={
									i < Math.floor(book.rating)
										? "currentColor"
										: "none"
								}
								className={
									i < Math.floor(book.rating)
										? "text-yellow-400"
										: "text-gray-300"
								}
							/>
						))}
					</div>
					<span className="text-xs text-gray-500">
						({book.reviews})
					</span>
				</div>
				<p className="text-sm text-gray-600 line-clamp-3 flex-grow">
					{book.description}
				</p>
				<div className="mt-2 flex items-center justify-between">
					<span className="text-lg font-bold text-gray-900">
						{book.price === 0
							? "Free"
							: `$${book.price.toFixed(2)}`}
					</span>
					<button
						onClick={() => onActionClick?.(book)}
						className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full hover:bg-primary/90 transition-colors"
					>
						{actionLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
