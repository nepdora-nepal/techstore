"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const Footer: React.FC = () => (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl italic">L</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Lumina<span className="text-indigo-400">.</span></span>
                </Link>
                <p className="text-slate-400 leading-relaxed">
                    Creating premium shopping experiences with a touch of elegance. We deliver only the finest curated collections.
                </p>
                <div className="flex gap-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map(i => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                            <span className="capitalize text-xs">{i[0]}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-4">
                    <li><Link href="/collections" className="hover:text-white transition-colors">Shop All</Link></li>
                    <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="/news" className="hover:text-white transition-colors">Latest News</Link></li>
                    <li><Link href="/faq" className="hover:text-white transition-colors">Support & FAQ</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Categories</h4>
                <ul className="space-y-4">
                    <li><Link href="/collections?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
                    <li><Link href="/collections?category=fashion" className="hover:text-white transition-colors">Fashion & Apparel</Link></li>
                    <li><Link href="/collections?category=home" className="hover:text-white transition-colors">Home & Decor</Link></li>
                    <li><Link href="/collections?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Newsletter</h4>
                <p className="text-slate-400 mb-4 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="bg-slate-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none">Subscribe</Button>
                </form>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2024 Lumina Shop Inc. All rights reserved.</p>
            <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
        </div>
    </footer>
);
