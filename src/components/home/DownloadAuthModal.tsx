import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DownloadAuthModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (email: string) => void;
}

export default function DownloadAuthModal({
	open,
	onOpenChange,
	onConfirm,
}: DownloadAuthModalProps) {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			onConfirm(email);
			setEmail("");
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Continue Download</DialogTitle>
					<DialogDescription>
						Please enter your email address to continue downloading
						this book.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="col-span-3"
							placeholder="you@example.com"
							required
						/>
					</div>
					<DialogFooter>
						<Button type="submit">Continue</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
