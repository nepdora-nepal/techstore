"use client";

import React from 'react';
import Link from 'next/link';
import { useCategories } from '@/hooks/use-category';
import { Skeleton } from '@/components/ui/skeleton';

export const FeaturedCategories: React.FC = () => {
    const { data, isLoading } = useCategories({ page_size: 4 });
    const categories = data?.results || [];

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2 block">Shop By Department</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Categories</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-64 rounded-2xl" />
                    ))
                ) : (
                    categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/collections?category=${cat.slug}`}
                            className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                        >
                            <img
                                src={cat.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-bold">{cat.name}</h3>
                                <p className="text-sm opacity-80">View Collection →</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
};
