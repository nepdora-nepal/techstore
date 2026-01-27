"use client";

import React from 'react';
import { ShieldCheck, Clock, RefreshCw } from 'lucide-react';

const WarrantyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-navy-950 p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-brand-400 text-xs font-black uppercase tracking-[0.4em] mb-6 block">Premium Assurance</span>
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">ELITE CARE <br /> PROGRAM.</h1>
                            <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg leading-relaxed">Every device purchased through TechStore is protected by our industry-leading comprehensive protection plan.</p>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
                    </div>

                    <div className="p-8 md:p-20">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: ShieldCheck, title: "Full Coverage", desc: "Covers all manufacturing defects and internal hardware failures for 12 months." },
                                { icon: RefreshCw, title: "Instant Replacement", desc: "If we can&apos;t fix it, we replace it with a new unit within 48 hours of verification." },
                                { icon: Clock, title: "Priority Support", desc: "Elite Elite program members get 24/7 direct access to lead hardware engineers." },
                            ].map((item, i) => (
                                <div key={i} className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-brand-200 hover:bg-white hover:shadow-2xl transition-all duration-500 text-center">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm mx-auto mb-8">
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-navy-950 mb-4">{item.title}</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 pt-20 border-t border-gray-100">
                            <h2 className="text-3xl font-black text-navy-950 mb-10 text-center tracking-tight">Frequently Asked Questions</h2>
                            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-navy-950">Is accidental damage covered?</h4>
                                    <p className="text-sm text-gray-500 font-medium">Standard warranty does not cover accidental damage (drops/spills), but can be upgraded to Elite Plus Care.</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-navy-950">How do I register my product?</h4>
                                    <p className="text-sm text-gray-500 font-medium">All products are automatically registered to your TechStore profile upon delivery.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarrantyPage;
