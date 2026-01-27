"use client";

import React from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
    return (
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative border border-gray-100">
            <div className="flex-1 relative z-10">
                <span className="text-brand-600 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Insider Access</span>
                <h2 className="text-3xl md:text-5xl font-black text-navy-950 mb-6 leading-tight">Join the Elite <br /> Tech Community.</h2>
                <p className="text-slate-500 font-medium max-w-md">Get priority access to limited edition drops, specialized hardware insights, and exclusive member pricing.</p>
            </div>

            <div className="w-full lg:w-[450px] relative z-10">
                <form className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your executive email"
                        className="flex-grow bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                    />
                    <button className="bg-navy-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-600 transition-all shadow-xl flex items-center justify-center gap-2">
                        Join <Send size={16} />
                    </button>
                </form>
                <p className="mt-4 text-[10px] text-gray-400 font-medium">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-100/50 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-100/50 blur-[100px] rounded-full" />
        </div>
    );
};

export default Newsletter;
