import SectionHeader from "@/components/common/SectionHeader";
import AiChatBotIcon from "@/assets/ai-chatbot-icon.svg";
import AffiliateLinkIcon from "@/assets/affiliate-link-icon.svg";
import MemoryContextIcon from "@/assets/memory-context-icon.svg";
import UserAuthenticationIcon from "@/assets/user-authentication-icon.svg";
import ConversationHistoryIcon from "@/assets/conversation-history-icon.svg";
import ProductRecommendationIcon from "@/assets/product-recommendation-icon.svg";
import SectionBGVector from "@/assets/feature-section-bg-vector.svg";
import PencilRocket from "@/assets/pencil-rocket.svg";
import Pencil from "@/assets/pencil.svg";

export default function Features() {
	const features = [
		{
			icon: AiChatBotIcon, // Placeholder for the icon
			title: "AI Chatbot",
			description:
				"A conversational AI that follows a custom system prompt to provide tailored responses.",
		},
		{
			icon: ProductRecommendationIcon,
			title: "Product Recommendation",
			description:
				"AI suggests relevant products based on user queries and available affiliate links.",
		},
		{
			icon: AffiliateLinkIcon,
			title: "Affiliate Link Integration",
			description:
				"AI suggests relevant products based on user queries and available affiliate links.",
		},
		{
			icon: MemoryContextIcon,
			title: "Memory & Context Retention",
			description:
				"AI remembers user preferences and past interactions for personalized responses.",
		},
		{
			icon: UserAuthenticationIcon,
			title: "User Authentication",
			description:
				"Secure login and personalization system for users to access their personal experience.",
		},
		{
			icon: ConversationHistoryIcon,
			title: "Conversation History",
			description:
				"Users can revisit past conversations, continue, and reference.",
		},
	];

	return (
		<section className="py-24">
			<div className="container relative overflow-hidden py-32">
				{/* <SectionHeader className="mb-7" title="FEATURES" /> */}

				<div className="w-full flex flex-col items-center justify-center gap-3 md:gap-6 text-center">
					<h2 className="w-[50%] font-semibold text-3xl md:text-5xl text-primary">
						AI-Powered Spanish Learning Companion
					</h2>

					<p className="lg:w-1/3 text-center font-montserrat text-base md:text-lg text-[#373737] leading-relaxed">
						Practice speaking, expand your vocabulary, and stay
						motivated with personalized lessons and daily
						activities.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-[#f3f7f6] flex flex-col gap-3 items-center justify-center rounded-xl p-5 py-10 border border-[#DEDEDE]"
						>
							<div className="w-full flex items-center justify-center py-5 text-center">
								<img
									src={feature.icon}
									alt="feature-icon"
									className="max-w-full"
								/>
							</div>

							<h4 className="text-2xl font-bold text-primary text-center">
								{feature.title}
							</h4>

							<p className="font-montserrat text-lg text-gray-600 text-center">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				<img
					src={PencilRocket}
					alt="pencil-rocket"
					className="absolute top-5 left-0 max-w-full -z-10"
				/>

				<img
					src={Pencil}
					alt="pencil"
					className="absolute top-5 right-0 max-w-full -z-10"
				/>

				{/* <img
					src={SectionBGVector}
					alt="feature-section-bg-vector"
					className="absolute top-5 right-0 lg:-right-[40rem] w-full h-full -z-10"
				/> */}
			</div>
		</section>
	);
}
