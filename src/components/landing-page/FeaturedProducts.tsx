"use client";

import React from 'react';
import { useProductsWithParams } from '@/hooks/use-product';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/products/ProductCard';

export const FeaturedProducts: React.FC = () => {
    const { data, isLoading } = useProductsWithParams({ is_featured: true, page_size: 4 });
    const products = data?.results || [];

    return (
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto ">
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
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <ProductCard key={product.id} product={product as any} />
                    ))
                )}
            </div>
        </section>
    );
};
