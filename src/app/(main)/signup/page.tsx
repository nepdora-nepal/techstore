import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup - TechStore",
    description: "Create a TechStore account.",
};

export default function SignupPage() {
    return <SignupForm />;
}
