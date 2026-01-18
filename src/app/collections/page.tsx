"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Grid, List, Search, Star, Heart, ArrowUpDown } from 'lucide-react';
import { useProducts, useUpdateFilters } from '@/hooks/use-product';
import { useCategories } from '@/hooks/use-category';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const CollectionsContent = () => {
    const searchParams = useSearchParams();
    const { updateFilters, clearFilters } = useUpdateFilters();
    const { addToCart } = useCart();

    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.results || [];

    const { data: productsData, isLoading } = useProducts();
    const products = productsData?.results || [];

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const selectedCategory = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'featured';

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
            <div className="mb-12">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2 block">The Finest Selection</span>
                <h1 className="text-4xl font-bold text-slate-900">Our Collection</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Categories</h4>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => updateFilters({ category: "" })}
                                className={`text-left text-sm py-1 font-medium transition-colors ${selectedCategory === 'All' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                All Departments
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => updateFilters({ category: cat.slug })}
                                    className={`text-left text-sm py-1 font-medium transition-colors ${selectedCategory === cat.slug ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Price Range</h4>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                onChange={(e) => updateFilters({ min_price: parseInt(e.target.value) || 0 })}
                                className="text-xs"
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                onChange={(e) => updateFilters({ max_price: parseInt(e.target.value) || 10000 })}
                                className="text-xs"
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <div className="bg-indigo-50 p-6 rounded-2xl">
                            <h5 className="font-bold text-slate-900 mb-2">Need Help?</h5>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                Our specialists are available 24/7 to help you find the perfect match.
                            </p>
                            <Link href="/contact" className="text-sm font-bold text-indigo-600 hover:underline">Contact Expert →</Link>
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100">
                        <div className="relative w-full sm:max-w-xs">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                defaultValue={searchQuery}
                                onBlur={(e) => updateFilters({ search: e.target.value })}
                                onKeyDown={(e) => e.key === 'Enter' && updateFilters({ search: (e.target as HTMLInputElement).value })}
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <List size={18} />
                                </button>
                            </div>

                            <div className="relative group">
                                <select
                                    value={sortBy}
                                    onChange={(e) => updateFilters({ sortBy: e.target.value })}
                                    className="appearance-none bg-slate-100 border-none rounded-lg pl-4 pr-10 py-2 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating">Best Rated</option>
                                </select>
                                <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{products.length}</span> results</p>
                    </div>

                    {/* Products */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`group bg-white rounded-2xl border border-slate-100 transition-all hover:shadow-xl ${viewMode === 'list' ? 'flex flex-col sm:flex-row overflow-hidden' : 'p-4'}`}
                                >
                                    <div className={`relative overflow-hidden rounded-xl bg-slate-50 ${viewMode === 'grid' ? 'aspect-square mb-4' : 'w-full sm:w-48 h-48 sm:h-auto'}`}>
                                        <Link href={`/collections/${product.slug}`}>
                                            <img
                                                src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
                                        <button
                                            className="absolute top-3 right-3 p-2 rounded-full shadow-sm transition-colors bg-white text-slate-400 hover:text-pink-500"
                                        >
                                            <Heart size={16} />
                                        </button>
                                    </div>

                                    <div className={`flex flex-col flex-1 ${viewMode === 'list' ? 'p-6' : ''}`}>
                                        <div className="mb-2">
                                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{product.category?.name || 'General'}</span>
                                        </div>
                                        <Link href={`/collections/${product.slug}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-1 line-clamp-2">
                                            {product.name}
                                        </Link>
                                        <div className="flex items-center gap-1 mb-4">
                                            <Star size={14} className="text-yellow-400 fill-current" />
                                            <span className="text-xs text-slate-500 font-medium">4.5</span>
                                        </div>
                                        {viewMode === 'list' && (
                                            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{product.description}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-black text-slate-900">${product.price}</span>
                                            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800" onClick={() => addToCart(product, 1)}>Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search query.</p>
                            <Button
                                variant="outline"
                                className="mt-6 mx-auto"
                                onClick={clearFilters}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const CollectionsPage = () => {
    return (
        <Suspense fallback={<div>Loading collections...</div>}>
            <CollectionsContent />
        </Suspense>
    );
};

export default CollectionsPage;
