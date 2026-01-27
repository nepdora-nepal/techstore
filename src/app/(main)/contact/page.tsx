"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-white min-h-screen py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20 animate-fade-in">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-600 mb-4 block">Consultation</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight">Expert Support <br /><span className="text-gray-300">at Your Fingertips.</span></h1>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto">Get in touch with our specialist team for technical inquiries or priority order assistance.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Info Cards */}
                    <div className="space-y-6">
                        {[
                            { icon: Mail, label: 'Email Support', value: 'concierge@techstore.com', sub: '24/7 Response time' },
                            { icon: Phone, label: 'Executive Line', value: '+1 (800) TECH-PRO', sub: 'Mon-Fri, 9am - 6pm EST' },
                            { icon: MapPin, label: 'Flagship Store', value: '123 Tech Ave, Silicon Valley', sub: 'California, USA' },
                            { icon: Clock, label: 'Business Hours', value: 'Global Support', sub: 'Always Online' },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="font-bold text-navy-900 group-hover:text-brand-600 transition-colors">{item.value}</p>
                                        <p className="text-[10px] text-gray-500">{item.sub}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2 bg-navy-950 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {submitted ? (
                            <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                                <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-500">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-white">Transmission Received</h2>
                                <p className="text-slate-400 max-w-xs font-medium">Our specialists will review your inquiry and respond within 12 business hours.</p>
                                <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-white text-navy-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all">
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-brand-500/40 outline-none focus:border-brand-500 transition-all placeholder:text-white/20" placeholder="e.g. Elon Musk" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-brand-500/40 outline-none focus:border-brand-500 transition-all placeholder:text-white/20" placeholder="concierge@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Subject</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-brand-500/40 outline-none focus:border-brand-500 transition-all appearance-none cursor-pointer">
                                        <option className="bg-navy-900">Technical Inquiry</option>
                                        <option className="bg-navy-900">Order Concierge</option>
                                        <option className="bg-navy-900">Partnership Opportunity</option>
                                        <option className="bg-navy-900">Other Inquiries</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Message</label>
                                    <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white focus:ring-2 focus:ring-brand-500/40 outline-none focus:border-brand-500 transition-all placeholder:text-white/20 resize-none" placeholder="Describe your inquiry in detail..."></textarea>
                                </div>

                                <button type="submit" className="w-full bg-brand-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-brand-600 transition-all shadow-xl shadow-brand-950 flex items-center justify-center gap-3 active:scale-[0.98]">
                                    Dispatch Message <Send size={18} />
                                </button>
                            </form>
                        )}

                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-600/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
