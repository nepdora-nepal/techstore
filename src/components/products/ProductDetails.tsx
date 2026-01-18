"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Share2, Shield, Truck, Plus, Minus, ArrowLeft, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { useProductReviews } from '@/hooks/use-reviews';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/config/site';
import { toast } from 'sonner';
import WishlistButton from './WishlistButton';
import StarRating from './StarRating';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const router = useRouter();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { data: wishlistItems } = useWishlist();
    const { data: reviewsData } = useProductReviews(product.slug as string);
    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(product.thumbnail_image);

    const isWishlisted = wishlistItems?.some(item => item.product.id === product.id);
    const isWishlistPending = addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

    const handleWishlistToggle = (active: boolean) => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to wishlist");
            return;
        }

        if (active) {
            addToWishlistMutation.mutate(product.id);
        } else {
            const wishlistItem = wishlistItems?.find(item => item.product.id === product.id);
            if (wishlistItem) {
                removeFromWishlistMutation.mutate(wishlistItem.id);
            }
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Added to cart");
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        router.push('/checkout');
    };

    const reviews = reviewsData?.results || [];
    const images = product.images && product.images.length > 0
        ? product.images.map(img => img.image)
        : [product.thumbnail_image].filter((img): img is string => !!img);

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto">
            <Link href="/collections" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium">
                <ArrowLeft size={16} /> Back to Collection
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Gallery */}
                <div className="flex-1 space-y-4">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-sm">
                        <Image
                            src={getImageUrl(selectedImage || "") || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                                >
                                    <Image
                                        src={getImageUrl(img || "") || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                        alt={`Thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover opacity-80 hover:opacity-100"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-secondary text-primary hover:bg-secondary/80 border-none px-3 py-1">
                                {product.category?.name || 'General'}
                            </Badge>
                            <div className="flex gap-2">
                                <WishlistButton
                                    isActive={isWishlisted}
                                    isLoading={isWishlistPending}
                                    onToggle={handleWishlistToggle}
                                />
                                <button className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:bg-secondary hover:border-primary/20 transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-foreground mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                <StarRating rating={product.average_rating || 0} />
                            </div>
                            <span className="text-sm font-bold text-foreground">{product.average_rating || 0}</span>
                            <span className="text-border">|</span>
                            <span className="text-sm text-muted-foreground font-medium underline cursor-pointer">
                                {reviews.length} customer reviews
                            </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-foreground">RS.{product.price}</span>
                            {product.market_price && <span className="text-xl text-muted-foreground line-through">RS.{product.market_price}</span>}
                        </div>
                    </div>

                    <div className="text-muted-foreground leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: product.description || '' }} />

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
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full h-12 rounded-xl border-2 border-border font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                            onClick={handleBuyNow}
                        >
                            Buy It Now
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl border border-border/50">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Truck size={20} /></div>
                            <div className="text-xs">
                                <p className="font-bold text-foreground">Fast Delivery</p>
                                <p className="text-muted-foreground">Free on orders over RS.1500</p>
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

                    {/* Reviews Section */}
                    {reviews.length > 0 && (
                        <div className="pt-12 border-t border-border">
                            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                            <div className="space-y-8">
                                {reviews.map((review) => (
                                    <div key={review.id} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                    {review.user?.first_name?.[0] || review.user?.username?.[0] || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{review.user?.first_name} {review.user?.last_name || review.user?.username}</p>
                                                    <div className="flex items-center gap-1 text-yellow-500">
                                                        {[...Array(5)].map((_, j) => (
                                                            <Star key={j} size={14} fill={j < review.rating ? 'currentColor' : 'none'} className={j < review.rating ? 'text-yellow-500' : 'text-muted-foreground/30'} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-muted-foreground">{review.review}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
