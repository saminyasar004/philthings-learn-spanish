import { Toaster as Sonner } from "@/components/ui/sonner";
import TopVectorImg from "@/assets/auth-page-top.svg";
import BottomVectorImg from "@/assets/auth-page-bottom.svg";

export default function AuthLayout({ children }) {
	return (
		<section className="min-h-screen overflow-x-hidden">
			<Sonner />
			<div className=" flex items-center justify-center h-full relative overflow-hidden">
				<img
					src={TopVectorImg}
					alt="top-vector"
					className="absolute -top-40 -right-[50rem] w-full h-full -z-20"
				/>
				{children}
				<img
					src={BottomVectorImg}
					alt="top-vector"
					className="absolute top-64 -left-[50rem] w-full h-full -z-20"
				/>
			</div>
		</section>
	);
}
