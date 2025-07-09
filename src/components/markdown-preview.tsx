import ReactMarkdown from "react-markdown";

const MarkdownPreview = ({ content }: { content?: string }) => {
	return (
		<div className="max-w-7xl text-base font-medium font-para">
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
};

export default MarkdownPreview;
