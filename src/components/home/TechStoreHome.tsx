"use client";

import React from 'react';
import {
    ArrowRight,
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
import BlogListingContent from '../blogs/BlogListingContent';


const TechStoreHome: React.FC = () => {
    const { data: productsData, isLoading: productsLoading } = useProducts({ page_size: 20 });
    const { isLoading: categoriesLoading } = useCategories();

    const products = productsData?.results || [];
    const loading = productsLoading || categoriesLoading;

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
                        image="https://images.unsplash.com/photo-1598327106026-d9521da673d1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

                <div className="mt-10 border-gray-100 pt-24">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default TechStoreHome;
