import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login - TechStore",
    description: "Login to your TechStore account.",
};

export default function LoginPage() {
    return <LoginForm />;
}
