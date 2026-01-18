"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCreateNewsletter } from '@/hooks/use-newsletter';

export const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const createNewsletter = useCreateNewsletter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        createNewsletter.mutate({ email }, {
            onSuccess: () => {
                toast.success("Subscribed successfully!");
                setEmail('');
            },
            onError: (error: any) => {
                toast.error(error.response?.data?.message || "Failed to subscribe");
            }
        });
    };

    return (
        <section className="bg-primary py-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Join The Inner Circle</h2>
                <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
                    Subscribe to our newsletter for early access to sales, exclusive rewards, and curated content.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-6 py-4 rounded-xl text-foreground outline-none focus:ring-4 focus:ring-primary-foreground/20 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={createNewsletter.isPending}
                        className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-foreground/90 transition-all shadow-xl shadow-primary-foreground/10 active:scale-95 disabled:opacity-50"
                    >
                        {createNewsletter.isPending ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                <p className="mt-4 text-xs text-primary-foreground/60">No spam, just pure goodness. Unsubscribe at any time.</p>
            </div>
        </section>
    );
};
