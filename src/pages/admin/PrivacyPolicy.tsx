import MarkdownEditor from "@/components/markdown-editor";
import { useData } from "@/Context/DataContext";
import { useEffect } from "react";
import { DataProvider } from "@/Context/DataContext";

const PrivacyPolicyPage = () => {
	const { privacyPolicy, loading, error, fetchPrivacyPolicy, updatePrivacyPolicy } = useData();

	useEffect(() => {
		fetchPrivacyPolicy();
	}, []);


	const handleSubmit = async (content: string) => {
		const success = await updatePrivacyPolicy(content);
		if (success) {
			alert("Privacy Policy updated successfully.");
			fetchPrivacyPolicy(); // Re-fetch to ensure UI updates with latest data
		} else {
			alert("Failed to update Privacy Policy.");
		}
	};

	if (loading) {
		return <section className="w-full py-1 space-y-4"><p>Loading...</p></section>;
	}

	if (error) {
		return <section className="w-full py-1 space-y-4"><p>Error: {error}</p></section>;
	}

	// const contentMD =
	// 	"Admin Dashboard, administrators agree to follow all platform terms, including data confidentiality, accurate management of user submissions, and adherence to security protocols. Misuse of data or platform features may lead to termination of access. The platform provides tools for user management, form review, notifications, payments, and reporting, which must be used responsibly. The platform is not liable for admin-caused errors. Terms may be updated, with notifications sent to admins. For assistance, contact support";

	return (
		<section className="w-full py-1 space-y-4">
			<MarkdownEditor contentMD={privacyPolicy?.content || ""}
			onSubmit={handleSubmit} /> 
		</section>
	);
};

export default function PrivacyPolicy() {
  return (
    <DataProvider>
      <PrivacyPolicyPage />
    </DataProvider>
  );
}