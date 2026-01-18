"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFAQs } from '@/hooks/use-faq';
import { Skeleton } from '@/components/ui/skeleton';
import { FAQ } from '@/types/faq';

export const FAQSection = () => {
    const { data: faqs = [], isLoading } = useFAQs();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 md:py-32 px-4 max-w-4xl mx-auto bg-white">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
                    <HelpCircle size={14} /> Common Questions
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Frequently Asked <span className="text-indigo-600">Questions</span></h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Everything you need to know about our premium products and services.
                </p>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 rounded-2xl" />
                    ))
                ) : (
                    faqs.map((faq: FAQ, index: number) => (
                        <div
                            key={faq.id}
                            className={cn(
                                "group rounded-3xl border transition-all duration-300",
                                openIndex === index
                                    ? "bg-indigo-50/50 border-indigo-200 shadow-lg shadow-indigo-100/50"
                                    : "bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50/30"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                            >
                                <span className={cn(
                                    "text-lg font-bold transition-colors",
                                    openIndex === index ? "text-indigo-700" : "text-slate-900 group-hover:text-indigo-600"
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                    openIndex === index ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                                )}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="px-8 pb-8 text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-16 text-center">
                <p className="text-slate-500">
                    Still have questions? <a href="/contact" className="text-indigo-600 font-bold hover:underline">Contact our support team</a>
                </p>
            </div>
        </section>
    );
};
