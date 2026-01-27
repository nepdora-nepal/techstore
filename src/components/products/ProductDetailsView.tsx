"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Info } from 'lucide-react';
import { useProduct, useProducts } from '@/hooks/use-product';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductDetails from '@/components/products/ProductDetails';
import HorizontalProductList from '@/components/techstore/HorizontalProductList';

const ProductDetailsView = () => {
    const { slug } = useParams();
    const router = useRouter();
    const { data: product, isLoading: productLoading, error } = useProduct(slug as string);
    const { data: recData, isLoading: recLoading } = useProducts({ page_size: 8 });

    const products = recData?.results || [];
    const isLoading = productLoading || recLoading;

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    <Skeleton className="flex-1 aspect-[4/5] rounded-3xl" />
                    <div className="flex-1 space-y-8">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 text-muted-foreground/30">
                    <Info size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
                <p className="text-muted-foreground mb-8">The product you&apos;re looking for might have been moved or doesn&apos;t exist.</p>
                <Button onClick={() => router.push('/collections')}>Back to Shop</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductDetails product={product} />

                <div className="border-t border-gray-100 mt-20">
                    <HorizontalProductList
                        title="Recommended For You"
                        products={products.filter(p => p.id !== product.id).slice(0, 8)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsView;
