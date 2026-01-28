import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Login - TechStore",
    description: "Login to your TechStore account.",
};

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading login...</div>}>
            <LoginForm />
        </Suspense>
    );
}
