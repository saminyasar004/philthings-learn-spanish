import { cn } from "@/lib/utils";

export default function SectionHeader({
	title,
	className,
}: {
	title: string;
	className?: string;
}) {
	return (
		<div
			className={cn("flex items-center justify-center h-auto", className)}
		>
			<div className="w-0 h-0 border-t-[10px] border-r-[40px] border-r-secondary border-t-transparent border-b-transparent mr-2"></div>
			<span className="text-sm font-semibold text-secondary border-r-secondary">
				{title}
			</span>
			<div className="w-0 h-0 border-t-[10px] border-l-[40px] border-l-secondary border-r-secondary border-t-transparent border-b-transparent ml-2"></div>
		</div>
	);
}
