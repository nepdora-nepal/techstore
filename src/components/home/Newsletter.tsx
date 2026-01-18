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
        <section className="bg-indigo-600 py-20 px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Join The Inner Circle</h2>
                <p className="text-lg text-indigo-100 mb-10 max-w-xl mx-auto opacity-90">
                    Subscribe to our newsletter for early access to sales, exclusive rewards, and curated content.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={createNewsletter.isPending}
                        className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {createNewsletter.isPending ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                <p className="mt-4 text-xs text-indigo-200">No spam, just pure goodness. Unsubscribe at any time.</p>
            </div>
        </section>
    );
};
