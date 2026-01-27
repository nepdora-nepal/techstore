"use client";

import React from 'react';
import Link from 'next/link';
import { Smartphone, Laptop, Headphones, Watch, Camera, Tv } from 'lucide-react';

const categories = [
    { name: 'Phones', icon: <Smartphone size={32} />, color: 'bg-blue-500 text-blue-600', link: '/category/electronics' },
    { name: 'Laptops', icon: <Laptop size={32} />, color: 'bg-indigo-500 text-indigo-600', link: '/category/electronics' },
    { name: 'Audio', icon: <Headphones size={32} />, color: 'bg-purple-500 text-purple-600', link: '/category/electronics' },
    { name: 'Watches', icon: <Watch size={32} />, color: 'bg-orange-500 text-orange-600', link: '/category/electronics' },
    { name: 'Cameras', icon: <Camera size={32} />, color: 'bg-red-500 text-red-600', link: '/category/electronics' },
    { name: 'TVs', icon: <Tv size={32} />, color: 'bg-green-500 text-green-600', link: '/category/electronics' },
];

const CategoryGrid: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-2xl font-black text-navy-900 mb-8">Browse Categories</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                {categories.map((cat, idx) => (
                    <Link href={cat.link} key={idx} className="flex flex-col items-center gap-4 group">
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${cat.color} bg-opacity-10 group-hover:bg-opacity-20 group-hover:scale-110 transition-all shadow-sm group-hover:shadow-md border border-gray-100`}>
                            {cat.icon}
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-brand-600 transition-colors uppercase tracking-wider">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
