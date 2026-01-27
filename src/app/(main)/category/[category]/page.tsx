"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useTechStoreProduct } from '@/contexts/TechStoreProductContext';
import ProductCard from '@/components/techstore/ProductCard';
import { Product, SortOption } from '@/types/techstore';
import { SORT_OPTIONS, STATIC_CATEGORIES } from '@/constants/techstore';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
    params: { category: string };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
    const { getProductsByCategory, loading } = useTechStoreProduct();
    const [category, setCategory] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState<SortOption['value']>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [minRating, setMinRating] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setCategory(decodeURIComponent(params.category));
    }, [params.category]);

    useEffect(() => {
        if (category) {
            setProducts(getProductsByCategory(category));
        }
    }, [category]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products].filter(p =>
            p.price >= priceRange[0] &&
            p.price <= priceRange[1] &&
            p.rating.rate >= minRating
        );

        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate);

        return result;
    }, [products, priceRange, minRating, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 capitalize">{category || 'All Products'}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Showing {filteredAndSortedProducts.length} results
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
                        >
                            <SlidersHorizontal size={16} /> Filters
                        </button>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>

                        {/* Price Filter */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                                />
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>$0</span>
                                    <span className="font-semibold text-brand-600">${priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Customer Ratings</h3>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map(stars => (
                                    <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === stars}
                                            onChange={() => setMinRating(stars)}
                                            className="text-brand-600 focus:ring-brand-500"
                                        />
                                        <div className="flex items-center text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < stars ? "fill-current" : "text-gray-200"}>★</span>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500 group-hover:text-gray-900">& Up</span>
                                    </label>
                                ))}
                                <label className="flex items-center gap-3 cursor-pointer mt-2 pt-2 border-t border-gray-50">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={minRating === 0}
                                        onChange={() => setMinRating(0)}
                                        className="text-brand-600"
                                    />
                                    <span className="text-sm text-gray-600">Any Rating</span>
                                </label>
                            </div>
                        </div>

                        {/* Categories Links (Quick Nav) */}
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {STATIC_CATEGORIES.map(cat => (
                                    <li key={cat}>
                                        <Link href={`/category/${encodeURIComponent(cat)}`} className={`text-sm capitalize hover:text-brand-600 ${category === cat ? 'text-brand-600 font-medium' : 'text-gray-600'}`}>
                                            {cat}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100"></div>
                                ))}
                            </div>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                                <button
                                    onClick={() => { setPriceRange([0, 1000]); setMinRating(0); }}
                                    className="mt-4 text-brand-600 font-medium hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
