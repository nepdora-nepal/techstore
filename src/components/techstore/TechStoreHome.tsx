"use client";

import React from 'react';
import Link from 'next/link';
import {
    ArrowRight, Calendar
} from 'lucide-react';
import { useProducts } from '@/hooks/use-product';
import { useCategories } from '@/hooks/use-category';
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import CategoryBanner from './CategoryBanner';
import HorizontalProductList from './HorizontalProductList';
import Brands from './Brands';
import Newsletter from './Newsletter';
import MultiCategoryTabs from './MultiCategoryTabs';
import { useBlogs } from '@/hooks/use-blogs';
import { format } from 'date-fns';
import BlogListingContent from '../blogs/BlogListingContent';


const TechStoreHome: React.FC = () => {
    const { data: productsData, isLoading: productsLoading } = useProducts({ page_size: 20 });
    const { isLoading: categoriesLoading } = useCategories();
    const { data: blogsData, isLoading: blogsLoading } = useBlogs();

    const products = productsData?.results || [];
    const blogs = blogsData?.results || [];
    const loading = productsLoading || categoriesLoading || blogsLoading;

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white pb-20 overflow-x-hidden">
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
                {/* Category Icons Grid */}
                <CategoryGrid />

                {/* Promo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <p className="text-xs font-bold text-brand-500 uppercase mb-2">Super Deal</p>
                            <h3 className="font-bold text-xl text-navy-900 mb-2">New Laptops</h3>
                            <span className="text-sm font-semibold text-brand-600 flex items-center group-hover:gap-1 transition-all">Shop Now <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" className="w-28 h-28 object-contain group-hover:scale-110 transition-transform mix-blend-multiply" alt="Laptop" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <p className="text-xs font-bold text-brand-500 uppercase mb-2">Trending</p>
                            <h3 className="font-bold text-xl text-navy-900 mb-2">Smartphones</h3>
                            <span className="text-sm font-semibold text-brand-600 flex items-center group-hover:gap-1 transition-all">Discover <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" className="w-28 h-28 object-contain group-hover:scale-110 transition-transform mix-blend-multiply" alt="Phone" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <p className="text-xs font-bold text-brand-500 uppercase mb-2">New Arrival</p>
                            <h3 className="font-bold text-xl text-navy-900 mb-2">PC Builds</h3>
                            <span className="text-sm font-semibold text-brand-600 flex items-center group-hover:gap-1 transition-all">Configure <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&q=80" className="w-28 h-28 object-contain group-hover:scale-110 transition-transform mix-blend-multiply" alt="PC" />
                    </div>
                </div>

                <HorizontalProductList
                    title="Hukut Hot Deals"
                    subtitle="Don't Miss Out"
                    products={products.slice(0, 6)}
                />

                <div className="py-12">
                    <CategoryBanner
                        title="The New Standard"
                        subtitle="Smartphone Deals"
                        description="Unlock the potential of mobile photography with our latest flagship collection."
                        image="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        link="/category/electronics"
                        bgClass="bg-gradient-to-br from-indigo-950 to-navy-900"
                        variant="right"
                    />
                </div>

                <HorizontalProductList
                    title="Top Products"
                    subtitle="Performance Meets Elegance"
                    products={products.filter(p => p.is_popular).slice(0, 6)}
                />

                <div className="py-12">
                    <CategoryBanner
                        title="Power for Professionals"
                        subtitle="Workstations & Laptops"
                        description="Engineered for performance. Built for creators. Discover the ultimate portable powerhouses."
                        image="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        link="/category/laptops"
                        bgClass="bg-gradient-to-br from-slate-900 to-gray-800"
                        variant="left"
                    />
                </div>

                <HorizontalProductList
                    title="Best Selling Products"
                    subtitle="Unbeatable Performance"
                    products={products.filter(p => p.is_featured).slice(0, 6)}
                />

                {/* Brands Strip */}
                <div className="mt-12">
                    <Brands />
                </div>

                {/* VR Section */}

                <MultiCategoryTabs products={products} />

                {/* Blog Section */}
              <BlogListingContent />

                <div className="mt-12 border-t border-gray-100 pt-24">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default TechStoreHome;
