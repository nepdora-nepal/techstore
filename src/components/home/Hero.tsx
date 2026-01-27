"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '@/hooks/use-category';

const Hero: React.FC = () => {
    const [heroIndex, setHeroIndex] = useState(0);
    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.results || [];
    const heroSlides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            subtitle: "New Arrival",
            title: "Next Gen Gaming",
            description: "Experience console quality gaming on the go.",
            color: "from-navy-950/90"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            subtitle: "Best Seller",
            title: "Workstation Pro",
            description: "Power through your workflow with M3 chips.",
            color: "from-blue-900/90"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            subtitle: "Spring Sale",
            title: "Wearable Tech",
            description: "Track your fitness goals with precision.",
            color: "from-emerald-900/90"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <div className="relative bg-navy-950 overflow-hidden h-[400px] md:h-[550px] lg:h-[650px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={heroSlides[heroIndex].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={heroSlides[heroIndex].image}
                        alt={heroSlides[heroIndex].title}
                        fill
                        className="object-cover"
                        priority={heroIndex === 0}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[heroIndex].color} via-transparent to-transparent flex items-center`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="max-w-xl text-white pt-10"
                            >
                                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
                                    {heroSlides[heroIndex].subtitle}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-none tracking-tight shadow-sm">
                                    {heroSlides[heroIndex].title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-md leading-relaxed">
                                    {heroSlides[heroIndex].description}
                                </p>
                                <Link
                                    href={`/collections/?category=${categories[heroIndex].slug}`}
                                    className="inline-flex items-center px-8 py-4 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-500 hover:scale-105 transition-all shadow-xl shadow-brand-500/20"
                                >
                                    Shop Now <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-2'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;