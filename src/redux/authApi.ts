import { backendApiBaseUrl } from "@/config/dotenv";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SignupFormPayload {
	name: string;
	email: string;
	password: string;
}

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: backendApiBaseUrl,
	}),
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (data: SignupFormPayload) => ({
				url: "/accounts/signup/",
				method: "POST",
				body: data, //  Sending email & password
			}),
		}),
	}),
});

// ✅ Destructure the auto-generated hook
export const { useSignupMutation } = authApi;
export default authApi;
