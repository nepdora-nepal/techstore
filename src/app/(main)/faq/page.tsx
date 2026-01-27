"use client";

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`border rounded-3xl transition-all duration-500 ${isOpen ? 'bg-white shadow-xl border-brand-100 ring-4 ring-brand-50/50' : 'bg-gray-50/50 border-gray-100 hover:bg-white'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-600' : 'text-navy-950'}`}>{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-gray-200 text-gray-500'}`}>
                    <ChevronDown size={18} />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const categories = [
        {
            name: "Ordering & Delivery",
            items: [
                { question: "How long does global delivery take?", answer: "We offer priority global shipping. Most orders arrive within 3-5 business days depending on your location." },
                { question: "Can I track my elite shipment?", answer: "Absolutely. Every shipment is fully tracked with real-time updates and direct contact to the courier." }
            ]
        },
        {
            name: "Support & Warranty",
            items: [
                { question: "What does the 12-month warranty cover?", answer: "Our limited warranty covers all manufacturing defects and internal hardware failures under normal usage." },
                { question: "How do I initiate a return?", answer: "Contact our concierge team within 30 days of delivery for a complimentary return label." }
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-6 shadow-sm">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight">Support Architecture</h1>
                    <p className="text-slate-500 font-medium text-lg">Everything you need to know about our premium service ecosystem.</p>
                </div>

                <div className="space-y-16">
                    {categories.map((cat, i) => (
                        <div key={i}>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 px-2">{cat.name}</h2>
                            <div className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <FAQItem key={j} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-navy-950 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-white mb-4">Still need assistance?</h3>
                        <p className="text-slate-400 mb-10 font-medium">Our specialists are standing by 24/7 to provide technical support.</p>
                        <button className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-600 transition-all shadow-xl shadow-brand-950">
                            Contact Concierge
                        </button>
                    </div>
                    <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-brand-600/20 blur-[100px] rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
