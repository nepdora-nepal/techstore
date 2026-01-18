"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/use-testimonials';
import { Skeleton } from '@/components/ui/skeleton';

export const Testimonials: React.FC = () => {
    const { data: testimonials = [], isLoading } = useTestimonials();

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto bg-slate-50">
            <div className="mb-12 text-center">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2 block">Testimonials</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 rounded-2xl" />
                    ))
                ) : (
                    testimonials.slice(0, 3).map((item, i) => (
                        <div key={item.id || i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-600 mb-8 italic leading-relaxed line-clamp-4">
                                "{item.comment}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                    <img
                                        src={item.image || `https://picsum.photos/seed/u${i}/100/100`}
                                        className="w-full h-full object-cover"
                                        alt={item.name}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">{item.designation || 'Verified Buyer'}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
