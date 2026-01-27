"use client";

import React from 'react';
import Link from 'next/link';
import { useCategories } from '@/hooks/use-category';
import Image from 'next/image';

const CategoryGrid: React.FC = () => {
    const { data: categoriesData, isLoading } = useCategories();
    const categories = categoriesData?.results || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-16 animate-pulse">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200" />
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-8">Browse Categories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                {categories.map((cat) => {
                    return (
                        <Link href={`/category/${cat.slug}`} key={cat.id} className="flex flex-col items-center gap-4 group">
                            <Image src={cat.image || '/placeholder.png'} alt={cat.name} width={100} height={100} className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
                            <span className="text-sm font-bold text-gray-700 group-hover:text-brand-600 transition-colors uppercase tracking-wider text-center">{cat.name}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryGrid;
