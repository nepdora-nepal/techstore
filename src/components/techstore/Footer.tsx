"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/use-category';
import { useCreateNewsletter } from '@/hooks/use-newsletter';
import { toast } from 'sonner';
import { useState } from 'react';
import { ApiError } from '@/utils/api-error';
const Footer: React.FC = () => {
    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.results || [];

    const [email, setEmail] = useState('');
    const { mutate: subscribe, isPending } = useCreateNewsletter();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        subscribe({ email }, {
            onSuccess: () => {
                toast.success("Successfully subscribed to our newsletter!");
                setEmail('');
            },
            onError: (error: ApiError) => {
                const message = error?.message || "Failed to subscribe. Please try again.";
                toast.error(message);
            }
        });
    };

    return (
        <footer className="bg-navy-950 text-white pt-20 pb-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4">

                {/* Newsletter Section */}
                <div className="bg-brand-600 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between mb-20 gap-8 relative z-10 shadow-2xl">
                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl font-black mb-2">Join our Elite Community</h3>
                        <p className="opacity-80 font-medium">Get early priority access to exclusive drops and tech news.</p>
                    </div>
                    <div className="w-full lg:w-auto">
                        <form onSubmit={handleSubscribe} className="flex gap-2 p-2 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="bg-transparent border-none focus:outline-none px-4 flex-1 text-sm placeholder:text-white/50 text-white disabled:opacity-50"
                                disabled={isPending}
                            />
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-navy-900 hover:text-white transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                            >
                                {isPending ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                T
                            </div>
                            <span className="text-2xl font-black tracking-tight">TechStore</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Curating the world&apos;s most advanced electronics for the modern professional. Precision, performance, and aesthetic.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all border border-white/5 hover:border-brand-500">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">Explore <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" /></h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-medium">
                            <li><Link href="/" className="hover:text-brand-400 transition-colors">Latest Drops</Link></li>
                            {categories.length > 0 ? (
                                categories.slice(0, 3).map(cat => (
                                    <li key={cat.id}>
                                        <Link href={`/category/${cat.slug}`} className="hover:text-brand-400 transition-colors">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li><Link href="/category/electronics" className="hover:text-brand-400 transition-colors">Smart Devices</Link></li>
                            )}
                            <li><Link href="/collections" className="hover:text-brand-400 transition-colors">Exclusive Bundles</Link></li>
                            <li><Link href="/compare" className="hover:text-brand-400 transition-colors">Compare Tool</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">Support <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" /></h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-medium">
                            <li><Link href="/faq" className="hover:text-brand-400 transition-colors">Help Center</Link></li>
                            <li><Link href="/warranty" className="hover:text-brand-400 transition-colors">Warranty & Tech Support</Link></li>
                            <li><Link href="/shipping" className="hover:text-brand-400 transition-colors">Global Delivery</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Contact Expert</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">Contact Us <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" /></h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-medium">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-500 shrink-0" />
                                <span>123 Tech Avenue, Silicon Valley<br />California, 94000, USA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-500 shrink-0" />
                                <span>+977-9800000000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-500 shrink-0" />
                                <span>support@techstore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
                        © 2024 TechStore. Powered by Innovation.
                    </p>
                    <div className="flex gap-8 text-xs font-bold text-slate-500 tracking-widest uppercase">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;
