"use client";

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import ProductCard from '../products/ProductCard';

interface MultiCategoryTabsProps {
    products: Product[];
}

const MultiCategoryTabs: React.FC<MultiCategoryTabsProps> = ({ products }) => {
    const [activeTab, setActiveTab] = useState('ALL');
    const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category?.name?.toUpperCase() || "TECH")))];

    const filteredProducts = useMemo(() => {
        if (activeTab === 'ALL') return products.slice(0, 8);
        return products.filter(p => (p.category?.name?.toUpperCase() || "TECH") === activeTab).slice(0, 8);
    }, [products, activeTab]);

    return (
        <div className="py-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-black text-navy-950 mb-2">Explore Collections</h2>
                    <p className="text-gray-400 font-medium">Curated gadgets for every digital need</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                                ${activeTab === cat
                                    ? 'bg-navy-950 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default MultiCategoryTabs;
