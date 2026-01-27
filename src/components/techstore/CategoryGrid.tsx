"use client";

import React from 'react';
import Link from 'next/link';
import { Smartphone, Laptop, Headphones, Watch, Camera, Tv, ShoppingBag } from 'lucide-react';
import { useCategories } from '@/hooks/use-category';

const iconMap: Record<string, { icon: React.ReactNode, color: string }> = {
    'Phones': { icon: <Smartphone size={32} />, color: 'bg-blue-500 text-blue-600' },
    'electronics': { icon: <Smartphone size={32} />, color: 'bg-blue-500 text-blue-600' },
    'Laptops': { icon: <Laptop size={32} />, color: 'bg-indigo-500 text-indigo-600' },
    'Audio': { icon: <Headphones size={32} />, color: 'bg-purple-500 text-purple-600' },
    'Watches': { icon: <Watch size={32} />, color: 'bg-orange-500 text-orange-600' },
    'Cameras': { icon: <Camera size={32} />, color: 'bg-red-500 text-red-600' },
    'TVs': { icon: <Tv size={32} />, color: 'bg-green-500 text-green-600' },
};

const defaultStyle = { icon: <ShoppingBag size={32} />, color: 'bg-gray-500 text-gray-600' };

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
                    const style = iconMap[cat.name] || iconMap[cat.slug] || defaultStyle;
                    return (
                        <Link href={`/category/${cat.slug}`} key={cat.id} className="flex flex-col items-center gap-4 group">
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${style.color} bg-opacity-10 group-hover:bg-opacity-20 group-hover:scale-110 transition-all shadow-sm group-hover:shadow-md border border-gray-100`}>
                                {style.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-brand-600 transition-colors uppercase tracking-wider text-center">{cat.name}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryGrid;
