"use client";

import React from 'react';
import Link from 'next/link';
import {
    ArrowRight, Gamepad, Calendar
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

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Smart Home Integration",
        excerpt: "Discover how AI is revolutionizing the way we interact with our living spaces...",
        category: "Smart Home",
        date: "Jan 24, 2026",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
    },
    {
        id: 2,
        title: "Choosing the Perfect Mechanical Keyboard",
        excerpt: "A comprehensive guide to switches, keycaps, and layouts for the ultimate typing experience.",
        category: "PC Setup",
        date: "Jan 20, 2026",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80"
    },
    {
        id: 3,
        title: "Sustainability in Tech: 2026 Trends",
        excerpt: "How leading tech companies are reaching carbon neutrality through circular design.",
        category: "Industry",
        date: "Jan 15, 2026",
        image: "https://images.unsplash.com/photo-1473341304170-13f56358204e?w=800&q=80"
    }
];

const TechStoreHome: React.FC = () => {
    const { data: productsData, isLoading: productsLoading } = useProducts({ page_size: 20 });
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

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
                    title="Top Smartphones"
                    subtitle="Performance Meets Elegance"
                    products={products.slice(12, 18)}
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
                    title="Best Selling Laptops"
                    subtitle="Unbeatable Performance"
                    products={products.slice(6, 12)}
                />

                {/* Brands Strip */}
                <div className="mt-12">
                    <Brands />
                </div>

                {/* VR Section */}
                <section className="py-20">
                    <div className="relative rounded-3xl overflow-hidden bg-black group h-[400px] md:h-[600px]">
                        <img
                            src="https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            alt="VR Headset"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row items-end justify-between gap-6">
                            <div className="max-w-xl text-left">
                                <span className="inline-block px-3 py-1 bg-brand-600 text-white rounded text-xs font-bold uppercase tracking-wider mb-4">
                                    Immersive Tech
                                </span>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Dive Into <br /> New Realities</h2>
                                <p className="text-lg text-gray-300 mb-8 font-medium">
                                    Discover the latest in Virtual Reality. From high-fidelity gaming to immersive workspaces, experience the future today.
                                </p>
                                <div className="flex gap-4">
                                    <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-brand-600 hover:text-white transition-all">
                                        Shop VR Headsets
                                    </button>
                                    <button className="backdrop-blur-md bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Floating Product Preview within Banner */}
                            <div className="hidden md:block bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 w-72">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Gamepad className="text-white" size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-bold text-sm">Meta Quest 3</p>
                                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">128GB • Mixed Reality</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-brand-400 font-black text-lg">$499.00</span>
                                    <button className="p-2 bg-white rounded-full text-navy-950 hover:scale-110 transition-transform"><ArrowRight size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <MultiCategoryTabs products={products} />

                {/* Blog Section */}
                <section className="py-20">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-600 text-xs font-black uppercase tracking-widest mb-2 block">Our Journal</span>
                            <h2 className="text-3xl md:text-4xl font-black text-navy-900">Latest from TechStore</h2>
                        </div>
                        <Link href="/blog" className="text-brand-600 font-bold hover:underline flex items-center gap-2 text-sm uppercase tracking-widest">
                            View All Posts <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {BLOG_POSTS.map(post => (
                            <div key={post.id} className="group cursor-pointer">
                                <div className="rounded-2xl overflow-hidden h-64 mb-6 relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-navy-950 shadow-lg">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                    <Calendar size={14} className="text-brand-600" /> {post.date}
                                </div>
                                <h3 className="font-black text-xl text-navy-950 mb-3 leading-tight group-hover:text-brand-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-12 border-t border-gray-100 pt-24">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
};

export default TechStoreHome;
