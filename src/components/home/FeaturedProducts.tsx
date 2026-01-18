"use client";

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useProductsWithParams } from '@/hooks/use-product';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const FeaturedProducts: React.FC = () => {
    const { addToCart } = useCart();
    const { data, isLoading } = useProductsWithParams({ is_featured: true, page_size: 4 });
    const products = data?.results || [];

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto bg-background">
            <div className="mb-12 text-center">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Top Picks For You</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                    ))
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="group flex flex-col h-full bg-secondary/30 rounded-2xl p-4 transition-all hover:shadow-lg border border-border/50">
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4">
                                <Link href={`/collections/${product.slug || product.id}`}>
                                    <img
                                        src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                {product.is_popular && (
                                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Popular</span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{product.category?.name || 'General'}</p>
                                <Link href={`/collections/${product.slug || product.id}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1 mb-2">
                                    {product.name}
                                </Link>
                                <div className="flex items-center gap-1 mb-4">
                                    <Star size={14} className="text-yellow-500 fill-current" />
                                    <span className="text-xs text-muted-foreground">4.5 ({Math.floor(Math.random() * 50) + 10} reviews)</span>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        {product.market_price && <span className="text-sm text-muted-foreground line-through">${product.market_price}</span>}
                                        <span className="text-xl font-black text-foreground">${product.price}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => addToCart(product, 1)}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};
