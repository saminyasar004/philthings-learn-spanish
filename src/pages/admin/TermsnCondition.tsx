import MarkdownEditor from "@/components/markdown-editor";
import { useData } from "@/Context/DataContext";
import { useEffect } from "react";
import { DataProvider } from "@/Context/DataContext";

const TermsnConditionPage = () => {
	// const contentMD =
	// 	"Admin Dashboard, administrators agree to follow all platform terms, including data confidentiality, accurate management of user submissions, and adherence to security protocols. Misuse of data or platform features may lead to termination of access. The platform provides tools for user management, form review, notifications, payments, and reporting, which must be used responsibly. The platform is not liable for admin-caused errors. Terms may be updated, with notifications sent to admins. For assistance, contact support";

	const { termsAndConditions, loading, error, fetchTermsAndConditions, updateTermsAndConditions } = useData();
	
	useEffect(() => {
		fetchTermsAndConditions();
	}, []);
	
	const handleSubmit = async (content: string) => {
		const success = await updateTermsAndConditions(content);
		if (success) {
			alert("Terms and Conditions updated successfully.");
			fetchTermsAndConditions(); // Re-fetch to ensure UI updates with latest data
		} else {
			alert("Failed to update Terms and Conditions.");
		}
	};

	if (loading) {
		return <section className="w-full py-1 space-y-4"><p>Loading...</p></section>;
	}

	if (error) {
		return <section className="w-full py-1 space-y-4"><p>Error: {error}</p></section>;
	}

	return (
		<section className="w-full py-1 space-y-4">
			<MarkdownEditor contentMD={termsAndConditions?.content || ""}  onSubmit={handleSubmit}/>
		</section>
	);
};


export default function TermsnCondition() {
  return (
    <DataProvider>
      <TermsnConditionPage />
    </DataProvider>
  );
}
