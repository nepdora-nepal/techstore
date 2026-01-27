"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useProductsWithParams } from '@/hooks/use-product';
import { useCart } from '@/hooks/use-cart';
import StarRating from '@/components/products/StarRating';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const HeroSkeleton = () => (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <Skeleton className="h-8 w-40 rounded-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-3/4" />
                        <Skeleton className="h-16 w-1/2" />
                    </div>
                    <Skeleton className="h-20 w-full max-w-xl" />
                    <div className="flex gap-4">
                        <Skeleton className="h-14 w-40 rounded-xl" />
                        <Skeleton className="h-14 w-40 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="bg-card rounded-3xl p-8 space-y-6">
                        <Skeleton className="h-80 w-full rounded-2xl" />
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-10 w-40" />
                            <Skeleton className="h-14 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();

    const { data: productsData, isLoading, isError } = useProductsWithParams({
        is_featured: true,
        page_size: 5
    });

    const featuredProducts = React.useMemo(() => productsData?.results || [], [productsData]);

    useEffect(() => {
        if (featuredProducts.length > 0 && currentIndex >= featuredProducts.length) {
            setCurrentIndex(0);
        }
    }, [featuredProducts, currentIndex]);

    const handleNext = () => {
        if (featuredProducts.length === 0) return;
        setCurrentIndex((prev: number) => (prev + 1) % featuredProducts.length);
    };

    const handlePrev = () => {
        if (featuredProducts.length === 0) return;
        setCurrentIndex((prev: number) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    const handleAddToCart = (product: Product) => {
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    if (isLoading) return <HeroSkeleton />;

    const hasNoProducts = !isLoading && (isError || featuredProducts.length === 0);

    if (hasNoProducts) {
        return (
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 text-center">
                    <h1 className="text-5xl font-black text-foreground mb-6">Elevate Your Lifestyle</h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Discover premium products that blend innovation with elegance. Curated collections for those who demand excellence.
                    </p>
                    <Link href="/collections" className="inline-flex justify-center">
                        <Button
                            size="lg"
                            className="h-auto group px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            Shop Collection
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>

                </div>
            </section>
        );
    }

    const currentProduct = featuredProducts[currentIndex];

    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-lg">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Featured Collection
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight">
                            Elevate Your{' '}
                            <span className="text-primary">
                                Lifestyle
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                            Discover premium products that blend innovation with elegance. Curated collections for those who demand excellence.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/collections">
                                <Button size="lg" className="h-auto group px-8 py-4 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    Shop Collection
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button></Link>
                            <Link href="/about">
                                <Button size="lg" variant="outline" className="h-auto px-8 py-4 text-foreground rounded-xl font-semibold text-lg transition-all duration-300 border-2 ">
                                    Our Story
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                            <div>
                                <div className="text-3xl font-bold text-foreground">1000+</div>
                                <div className="text-sm text-muted-foreground">Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-foreground">100K+</div>
                                <div className="text-sm text-muted-foreground">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-foreground">4.9★</div>
                                <div className="text-sm text-muted-foreground">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Product Showcase */}
                    <div className="relative">
                        <div className="relative bg-card rounded-3xl  overflow-hidden p-8 transform hover:scale-[1.02] transition-transform duration-300">


                            {/* Product Image */}
                            <Link href={`/collections/${currentProduct.slug}`}>
                                <div className="relative h-80 mb-6 rounded-2xl overflow-hidden ">
                                    <Image
                                        src={currentProduct.thumbnail_image || ""}
                                        alt={currentProduct.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div></Link>

                            {/* Product Info */}
                            <div className="space-y-4">
                                <StarRating rating={currentProduct.average_rating || 0} reviewCount={currentProduct.reviews_count} />

                                <h3 className="text-2xl font-bold text-foreground line-clamp-1">
                                    {currentProduct.name}
                                </h3>

                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-primary">
                                        RS.{parseFloat(currentProduct.price).toLocaleString()}
                                    </span>
                                    {currentProduct.market_price && parseFloat(currentProduct.market_price) > parseFloat(currentProduct.price) && (
                                        <span className="text-lg text-muted-foreground line-through">
                                            RS.{parseFloat(currentProduct.market_price).toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                <Button
                                    onClick={() => handleAddToCart(currentProduct)}
                                    size="lg"
                                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 group"
                                >
                                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Add to Cart
                                </Button>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                                <Button
                                    onClick={handlePrev}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-muted hover:bg-muted/80 transition-colors group"
                                    aria-label="Previous product"
                                >
                                    <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </Button>

                                <div className="flex gap-2">
                                    {featuredProducts.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted'
                                                }`}
                                            aria-label={`Go to product ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                <Button
                                    onClick={handleNext}
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-muted hover:bg-muted/80 transition-colors group"
                                    aria-label="Next product"
                                >
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                </Button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}