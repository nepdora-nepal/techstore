"use client";

import React from 'react';
import { Shield, Sparkles, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="pb-20">
            <section className="text-center pt-24 pb-12 px-4 max-w-7xl mx-auto">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-600 mb-6 inline-block">
                    Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-8">Redefining Modern <span className="text-indigo-600">Shopping</span></h1>
                <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                    Lumina was born out of a desire for quality. We curate items that aren't just beautiful, but built to last and designed to inspire.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Team" className="rounded-3xl shadow-2xl relative z-10" />
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100">
                            <p className="text-4xl font-black text-indigo-600">10k+</p>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Happy Customers</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900">Why Lumina Exists</h2>
                        <p className="text-slate-600 leading-relaxed">
                            In a world of fast consumption, we chose the slow path. We believe that every object in your home should tell a story of craftsmanship and intentionality. That's why we spend months vetting every single supplier and product on our platform.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Shield className="text-indigo-600 mb-4" />
                                <h4 className="font-bold mb-2">Unmatched Trust</h4>
                                <p className="text-xs text-slate-500">Every product undergoes rigorous quality control checks.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Sparkles className="text-indigo-600 mb-4" />
                                <h4 className="font-bold mb-2">Curated Design</h4>
                                <p className="text-xs text-slate-500">We prioritize aesthetics as much as we do utility.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Heart className="text-indigo-600 mb-4" />
                                <h4 className="font-bold mb-2">Community First</h4>
                                <p className="text-xs text-slate-500">Our customers are at the heart of everything we do.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <Zap className="text-indigo-600 mb-4" />
                                <h4 className="font-bold mb-2">Innovation</h4>
                                <p className="text-xs text-slate-500">Always looking for the next breakthrough in retail.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 text-white py-24 px-4 mt-12 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-2 block">Looking Forward</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Vision</h2>
                    <h3 className="text-2xl md:text-4xl font-bold leading-tight">"To become the world's most curated marketplace for premium lifestyle goods, empowering artisans and delighting customers."</h3>
                    <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
                    <p className="text-slate-400">By 2030, we aim to eliminate plastic waste from our entire shipping supply chain and support over 1,000 independent designers globally.</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
