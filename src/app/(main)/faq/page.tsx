"use client";
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useFAQs } from '@/hooks/use-faq';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-navy-900">{question}</span>
                {isOpen ? <ChevronUp className="text-brand-600" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 leading-relaxed pr-8">{answer}</p>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const { data: faqs, isLoading, isError } = useFAQs();

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-500">
                        Have questions? We're here to help.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-4 min-h-[400px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full py-20">
                            <Loader2 className="animate-spin text-brand-600" size={40} />
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500">
                            Failed to load FAQs. Please try again later.
                        </div>
                    ) : faqs && faqs.length > 0 ? (
                        <div className="py-4">
                            {faqs.map((faq) => (
                                <FAQItem
                                    key={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            No FAQs found.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FAQ;