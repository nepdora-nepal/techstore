"use client";

import React, { useState, useMemo } from 'react';
import { useProducts, useUpdateFilters, useProductFilters } from '@/hooks/use-product';
import ProductCard from '@/components/techstore/ProductCard';
import { STATIC_CATEGORIES, SORT_OPTIONS } from '@/constants/techstore';
import { SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
    params: { category: string };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
    const category = decodeURIComponent(params.category);
    const urlFilters = useProductFilters();
    const { updateFilters, clearFilters } = useUpdateFilters();

    // Merge category from params into filters
    const productsParams = useMemo(() => ({
        ...urlFilters,
        category: category !== 'all' ? category : undefined
    }), [urlFilters, category]);

    const { data: productsData, isLoading: loading } = useProducts(productsParams);
    const [showFilters, setShowFilters] = useState(false);

    const products = productsData?.results || [];
    const filteredAndSortedProducts = products;

    // UI values for sliders/inputs from URL params with defaults
    const sortBy = urlFilters.sortBy || 'newest';
    const priceRange: [number, number] = [0, urlFilters.max_price || 1000];
    const minRating = urlFilters.is_popular ? 4 : 0; // Backend filter mapping if appropriate, or use custom param

    return (
        <div className="min-h-screen bg-[#fafbfc] pb-24">
            {/* Page Header */}
            <div className="bg-navy-950 py-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:30px_30px]" />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 mb-4">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span className="text-navy-700">/</span>
                                <span className="text-white">Collections</span>
                            </nav>
                            <h1 className="text-5xl md:text-7xl font-black text-white capitalize tracking-tighter leading-none mb-4">
                                {category || 'All Products'}
                            </h1>
                            <p className="text-slate-400 font-medium text-lg max-w-xl">
                                Discover our curated selection of high-performance {category === 'electronics' ? 'gadgets and premium tech gear' : 'lifestyle essentials'}.
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="bg-brand-500/10 border border-brand-500/20 backdrop-blur-md px-6 py-4 rounded-3xl text-right">
                                <p className="text-brand-500 text-xs font-black uppercase tracking-widest mb-1">Available Items</p>
                                <p className="text-3xl font-black text-white">{filteredAndSortedProducts.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-80 flex-shrink-0 space-y-8 ${showFilters ? 'fixed inset-0 z-[60] bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
                        {showFilters && (
                            <div className="flex items-center justify-between mb-8 lg:hidden">
                                <h2 className="text-2xl font-black text-navy-950">Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-xl"><SlidersHorizontal size={20} /></button>
                            </div>
                        )}

                        <div className="space-y-10 sticky top-32">
                            {/* Price Filter */}
                            <div className="group">
                                <h3 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                                    Price Spectrum
                                    <span className="text-brand-600">${priceRange[1]}</span>
                                </h3>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        step="10"
                                        value={priceRange[1]}
                                        onChange={(e) => updateFilters({ max_price: parseInt(e.target.value) })}
                                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-navy-950"
                                    />
                                    <div className="flex items-center justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <span>$0</span>
                                        <span>$1000+</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h3 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-6">User Approval</h3>
                                <div className="space-y-3">
                                    {[4, 3, 2].map(stars => (
                                        <button
                                            key={stars}
                                            onClick={() => updateFilters({ is_popular: stars >= 4 ? true : undefined })}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${minRating === stars ? 'bg-navy-950 text-white border-navy-950 shadow-xl shadow-navy-100' : 'bg-white text-gray-500 border-gray-100 hover:border-brand-200'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center text-yellow-400">
                                                    {[...Array(stars)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest">& Up</span>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${minRating === stars ? 'bg-brand-500' : 'bg-gray-200'}`} />
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => updateFilters({ is_popular: undefined })}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${minRating === 0 ? 'bg-navy-950 text-white border-navy-950 shadow-xl shadow-navy-100' : 'bg-white text-gray-500 border-gray-100 hover:border-brand-200'}`}
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest">All Ratings</span>
                                        <div className={`w-2 h-2 rounded-full ${minRating === 0 ? 'bg-brand-500' : 'bg-gray-200'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-6">Explore Collections</h3>
                                <div className="flex flex-wrap gap-2">
                                    {STATIC_CATEGORIES.map(cat => (
                                        <Link
                                            key={cat}
                                            href={`/category/${encodeURIComponent(cat)}`}
                                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${category === cat ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100' : 'bg-white text-gray-500 border-gray-100 hover:border-brand-500 hover:text-brand-600'}`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Clear All */}
                            <button
                                onClick={() => clearFilters()}
                                className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:border-red-500 hover:text-red-500 transition-all"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-10 bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-3 px-6 py-3 bg-navy-950 text-white rounded-xl text-xs font-black uppercase tracking-widest"
                            >
                                <SlidersHorizontal size={16} /> Filters
                            </button>

                            <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <span>Sorting Strategy</span>
                                <div className="h-4 w-px bg-gray-200"></div>
                            </div>

                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => updateFilters({ sortBy: e.target.value })}
                                    className="appearance-none pl-6 pr-12 py-3 bg-gray-50 border border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-brand-500 transition-all cursor-pointer outline-none"
                                >
                                    {SORT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label.toUpperCase()}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-brand-600 transition-colors" />
                            </div>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-[2.5rem] aspect-[4/5] animate-pulse border border-gray-100" />
                                ))}
                            </div>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 border-dashed">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SlidersHorizontal className="text-gray-300" size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-navy-950 mb-2">No Matches Found</h3>
                                <p className="text-gray-400 font-medium mb-8">Try adjusting your filters or search keywords.</p>
                                <button
                                    onClick={() => clearFilters()}
                                    className="px-10 py-4 bg-navy-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all"
                                >
                                    Clear All filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredAndSortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
