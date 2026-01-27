"use client";

import React from 'react';
import { Product } from '@/types/product';
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
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
                                <Sparkles size={16} />
                            </div>
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em]">{subtitle || "Premium Picks"}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tight leading-tight">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 === 1 ? 'text-brand-600' : ''}>{word} </span>
                            ))}
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:scale-105 transition-all shadow-xl shadow-gray-200/50"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-navy-950 hover:bg-navy-950 hover:text-white hover:scale-105 transition-all shadow-xl shadow-gray-200/50"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
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
