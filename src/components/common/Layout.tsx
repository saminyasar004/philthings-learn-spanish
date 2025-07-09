import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Layout({ children }) {
	return (
		<>
			<Sonner />
			<Header />
			{children}
			<Footer />
		</>
	);
}
