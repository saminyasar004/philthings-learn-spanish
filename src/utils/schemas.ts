import { z } from "zod";

// define the signup schema
export const signupSchema = z.object({
	name: z.string().min(1, "Name is required").max(50, "Name too long"),
	email: z
		.string()
		.email("Invalid email address")
		.min(1, "Email is required"),
	password: z.string().min(8, "Password is too short"),
	confirmPassword: z.string().min(8, "Password is too short"),
});

// Define the user schema
export const userSchema = z.object({
	name: z.string().min(1, "Name is required").max(50, "Name too long"),
	email: z
		.string()
		.email("Invalid email address")
		.min(1, "Email is required"),
	subscriptionPlan: z.enum(["Basic Plan", "Premium Plan"], {
		required_error: "Subscription plan is required",
	}),
	price: z.number().min(0, "Price must be positive").optional(),
	status: z.enum(["Active", "Inactive"], {
		required_error: "Status is required",
	}),
	nextBillingDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date format",
		})
		.optional(),
	startDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date format",
		})
		.optional(),
	billingInformation: z.string().max(20, "Billing info too long").optional(),
	avatarUrl: z.string().url("Invalid URL").optional(),
	lastActive: z.string().optional(), // Can be handled by backend
});

// Infer TypeScript type from schema
export type UserFormData = z.infer<typeof userSchema>;
