import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"w-min inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-[2.5px]",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-white hover:bg-transparent hover:text-primary border-primary dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
				transparent:
					"bg-transparent border-2 border-red-500 text-primary hover:bg-primary hover:text-white border-primary dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
				gray: "bg-[#F8D955] text-black hover:bg-[#F8D955]/90 border-none hover:text-black border-primary dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
				destructive:
					"bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
				outline:
					"border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
				secondary:
					"bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
				ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
				link: "text-primary underline-offset-4 hover:underline bg-transparent border-none",
			},
			size: {
				default: "h-10 px-6 py-2",
				sm: "h-9 rounded-xl px-3",
				lg: "h-11 rounded-2xl px-8 text-base",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
