"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
    const router = useRouter();

    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-slate-50">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
                    className="w-full h-full object-cover opacity-20"
                    alt="Hero background"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl animate-in slide-in-from-left duration-700">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-600 mb-6 inline-block">
                        New Collection 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mt-6 mb-8 leading-tight">
                        Elevate Your <span className="text-indigo-600">Lifestyle</span> With Pure Quality
                    </h1>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                        Discover a curated selection of premium electronics, fashion, and home essentials designed for those who appreciate the finer details.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg" onClick={() => router.push('/collections')}>
                            Shop Collection <ArrowRight size={20} className="ml-2" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-xl text-lg" onClick={() => router.push('/about')}>
                            Our Story
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
