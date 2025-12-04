import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import BookCard, { Book } from "./BookCard";
import DownloadAuthModal from "./DownloadAuthModal";

const LIBRARY_BOOKS: Book[] = Array.from({ length: 10 }).map((_, i) => ({
	id: `lib-${i}`,
	title: `Spanish Masterclass Vol. ${i + 1}`,
	description:
		"Exclusive PDF content for premium subscribers. Deep dive into advanced topics.",
	image: `https://placehold.co/400x600/d1f5e0/373737?text=PDF+Book+${i + 1}`,
	price: 0, // Subscription based, maybe show "Free" or "Premium"
	rating: 4.0 + (i % 10) / 10,
	reviews: 10 + i * 5,
}));

export default function BookLibrary() {
	const { isAuthenticated } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);

	const handleDownload = (book: Book) => {
		if (!isAuthenticated) {
			setSelectedBook(book);
			setIsModalOpen(true);
		} else {
			// Proceed with download logic (mocked for now)
			console.log(`Downloading ${book.title}`);
			alert(`Starting download for: ${book.title}`);
		}
	};

	const handleAuthConfirm = (email: string) => {
		console.log(`User email: ${email} for book: ${selectedBook?.title}`);
		// Here you would typically trigger the download or auth flow
		alert(
			`Email ${email} received. Starting download for ${selectedBook?.title}`
		);
		setIsModalOpen(false);
	};

	return (
		<section className="py-24 bg-[#f8f9fa]">
			<div className="container">
				<div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
					<h2 className="font-semibold text-3xl md:text-5xl text-primary">
						Free Online Book Library
					</h2>
					<p className="w-[60%] font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
						Access our exclusive collection of PDF learning
						materials. Subscribe to unlock full access.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
					{LIBRARY_BOOKS.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							actionLabel="Download"
							onActionClick={handleDownload}
						/>
					))}
				</div>
			</div>

			<DownloadAuthModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onConfirm={handleAuthConfirm}
			/>
		</section>
	);
}
