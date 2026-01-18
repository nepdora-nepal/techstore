"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Heart, Share2, Shield, Truck, Plus, Minus, Info, ArrowLeft } from 'lucide-react';
import { useProduct } from '@/hooks/use-product';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsPage = () => {
    const { slug } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { data: product, isLoading, error } = useProduct(slug as string);

    const [quantity, setQuantity] = useState(1);


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
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <Link href="/collections" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium">
                <ArrowLeft size={16} /> Back to Collection
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Gallery */}
                <div className="flex-1 space-y-4">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-sm">
                        <img
                            src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                                <img
                                    src={product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover opacity-60 hover:opacity-100"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-secondary text-primary hover:bg-secondary/80 border-none px-3 py-1">
                                {product.category?.name || 'General'}
                            </Badge>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full border border-border text-muted-foreground hover:text-pink-500 hover:bg-pink-50 hover:border-pink-100 transition-all">
                                    <Heart size={20} />
                                </button>
                                <button className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:bg-secondary hover:border-primary/20 transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-foreground mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? 'currentColor' : 'none'} />)}
                            </div>
                            <span className="text-sm font-bold text-foreground">4.5</span>
                            <span className="text-border">|</span>
                            <span className="text-sm text-muted-foreground font-medium underline cursor-pointer">24 customer reviews</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-foreground">${product.price}</span>
                            {product.market_price && <span className="text-xl text-muted-foreground line-through">${product.market_price}</span>}
                        </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: product.description }} />

                    <div className="pt-6 border-t border-border space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-border rounded-xl bg-secondary p-1">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-background hover:shadow-sm rounded-lg transition-all text-muted-foreground"><Minus size={18} /></button>
                                <span className="w-12 text-center font-bold text-foreground text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-background hover:shadow-sm rounded-lg transition-all text-muted-foreground"><Plus size={18} /></button>
                            </div>
                            <Button
                                size="lg"
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl text-lg font-bold"
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                        <Button variant="outline" size="lg" className="w-full h-12 rounded-xl border-2 border-border font-bold">Buy It Now</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl border border-border/50">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Truck size={20} /></div>
                            <div className="text-xs">
                                <p className="font-bold text-foreground">Fast Delivery</p>
                                <p className="text-muted-foreground">Free on orders over $150</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl border border-border/50">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Shield size={20} /></div>
                            <div className="text-xs">
                                <p className="font-bold text-foreground">2-Year Warranty</p>
                                <p className="text-muted-foreground">Manufacturer protection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProductDetailsPage;
