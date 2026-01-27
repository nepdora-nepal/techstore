"use client";

import React from 'react';
import { Product } from '@/types/techstore';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HorizontalProductListProps {
    title: string;
    products: Product[];
    subtitle?: string;
}

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({ title, products, subtitle }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="text-brand-500" size={18} />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{subtitle || "Premium Picks"}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-navy-950 tracking-tight">{title}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-navy-950 hover:text-white transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-navy-950 hover:text-white transition-all shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2))] scrollbar-none snap-x snap-mandatory pb-10"
            >
                {products.map(product => (
                    <div key={product.id} className="w-[300px] flex-shrink-0 snap-start">
                        <ProductCard product={product} />
                    </div>
                ))}
                {/* Placeholder if few items */}
            </div>
        </div>
    );
};

export default HorizontalProductList;
