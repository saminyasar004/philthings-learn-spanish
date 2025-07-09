import { useState } from "react";
import { Bold, Italic, Link, List, Underline, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown-preview";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";

export interface MarkdownEditorProps {
	onSubmit?: (content: string) => void;
	onCancel?: () => void;
	contentMD: string;
}

type FormatType = "bold" | "italic" | "underline" | "link" | "list";

const MarkdownEditor = ({
	onSubmit,
	onCancel,
	contentMD,
}: MarkdownEditorProps) => {
	const fontFamilies = ["Lora", "Montserrat", "Arial", "Times New Roman"];
	const fontSizes = ["12", "14", "16", "18", "20", "24"];
	const [content, setContent] = useState<string>(contentMD);
	const [isPreview, setIsPreview] = useState<boolean>(true);
	const [font, setFont] = useState<string>(fontFamilies[0]);
	const [fontSize, setFontSize] = useState<string>(fontSizes[4]);

	const handleFormat = (format: FormatType) => {
		const formats = {
			bold: { prefix: "**", suffix: "**" },
			italic: { prefix: "_", suffix: "_" },
			underline: { prefix: "<u>", suffix: "</u>" },
			link: { prefix: "[text](", suffix: ")" },
			list: { prefix: "- ", suffix: "" },
		};

		const textarea = document.querySelector("textarea");
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = content.substring(start, end);
		const { prefix, suffix } = formats[format];

		const newContent =
			content.substring(0, start) +
			prefix +
			(selectedText || "text") +
			suffix +
			content.substring(end);

		setContent(newContent);
	};

	const handleSubmit = () => {
		if (content.trim()) {
			onSubmit && onSubmit(content);
			setContent("");
			setIsPreview(false);
		}
	};

	return (
		<Card className="py-4 backdrop-blur-lg shadow-sm border-none">
			<div className="space-y-2">
				<div className="w-full px-4 space-y-2">
					<div className="w-full flex justify-between border-b pb-2">
						{!isPreview && (
							<div className="flex flex-wrap gap-2">
								<Select
									value={font}
									onValueChange={(e) => setFont(e)}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{fontFamilies.map((font, index) => (
												<SelectItem
													key={index}
													value={font}
												>
													{font}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<Select
									value={fontSize}
									onValueChange={(e) => setFontSize(e)}
								>
									<SelectTrigger className="w-[80px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{fontSizes.map((size, index) => (
												<SelectItem
													key={index}
													value={size}
												>
													{size}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<Separator orientation="vertical" />

								<Button
									variant="outline"
									size="sm"
									className="border-none"
									onClick={() => handleFormat("bold")}
									aria-label="Toggle bold"
								>
									<Bold className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="border-none"
									onClick={() => handleFormat("italic")}
									aria-label="Toggle italic"
								>
									<Italic className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="border-none"
									onClick={() => handleFormat("underline")}
									aria-label="Toggle underline"
								>
									<Underline className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="border-none"
									onClick={() => handleFormat("link")}
									aria-label="Insert link"
								>
									<Link className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="border-none"
									onClick={() => handleFormat("list")}
									aria-label="Toggle list"
								>
									<List className="h-4 w-4" />
								</Button>
							</div>
						)}
					</div>

					{isPreview ? (
						<div className="p-4">
							<MarkdownPreview content={content} />
						</div>
					) : (
						<Textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Write your content..."
							className="border-none outline-none ring-0 resize-none"
							style={{
								fontFamily: font,
								fontSize: `${fontSize}px`,
								lineHeight: 1.7,
							}}
							rows={10}
						/>
					)}
				</div>

				<div className="flex gap-2 px-2">
					{onCancel && (
						<Button variant="outline" size="sm" onClick={onCancel}>
							Cancel
						</Button>
					)}
					{!isPreview && <Button onClick={handleSubmit}>Save</Button>}
					<Button
						variant="transparent"
						onClick={() => setIsPreview(!isPreview)}
					>
						{isPreview ? "Edit" : "Preview"}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default MarkdownEditor;
