"use client";

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { useCompare } from '@/hooks/use-compare';
import { useAddToWishlist, useWishlist, useRemoveFromWishlist } from '@/hooks/use-wishlist';
import { Star, Plus, Check, ArrowRightLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    const { data: wishlist } = useWishlist();
    const { mutate: addToWishlist } = useAddToWishlist();
    const { mutate: removeFromWishlist } = useRemoveFromWishlist();

    // Normalize fields
    const id = product.id;
    const title = product.name || "Unknown Product";
    const price = typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0);
    const image = product.thumbnail_image || '/placeholder.png';
    const category = (product.category as { name?: string })?.name || "Tech";
    const rating = product.average_rating || 0;
    const ratingCount = product.reviews_count || 0;
    const discountPercentage = product.market_price ? Math.round(((parseFloat(product.market_price) - price) / parseFloat(product.market_price)) * 100) : 0;
    const originalPrice = product.market_price ? parseFloat(product.market_price) : null;
    const slug = product.slug || product.id.toString();

    const [isAdded, setIsAdded] = useState(false);
    const isComparing = isInCompare(id);

    // Find if item is in wishlist and get its ID
    const wishlistItem = wishlist?.find(item => item.product.id === id);
    const isInWishlist = !!wishlistItem;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);

        // Feedback animation
        setIsAdded(true);
        toast.success("Added to cart");
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isComparing) {
            removeFromCompare(id);
            toast.info("Removed from compare");
        } else {
            addToCompare(product);
            toast.success("Added to compare");
        }
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInWishlist) {
            if (wishlistItem) {
                removeFromWishlist(wishlistItem.id);
            }
        } else {
            addToWishlist(product.id);
        }
    };

    return (
        <div className="group bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full overflow-hidden relative">

            {/* Badges container */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {discountPercentage > 0 && (
                    <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {discountPercentage}% OFF
                    </span>
                )}
                {product.is_featured && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase">
                        Featured
                    </span>
                )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button
                    onClick={handleCompare}
                    className={`p-2 rounded-full shadow-md transition-all duration-200 ${isComparing ? 'bg-brand-600 text-white' : 'bg-white text-gray-400 hover:text-brand-600'}`}
                    title={isComparing ? "Remove from compare" : "Add to compare"}
                >
                    <ArrowRightLeft size={16} />
                </button>
                <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full shadow-md transition-all duration-200 ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                    title={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                >
                    <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                </button>
            </div>

            {/* Image */}
            <div className="relative p-6 h-56 bg-white flex items-center justify-center overflow-hidden">
                <Link href={`/collections/${slug}`} className="block w-full h-full relative">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out mix-blend-multiply"
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow bg-white border-t border-gray-50">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1 w-fit">
                    {category}
                </div>

                <Link href={`/collections/${slug}`} className="block mb-2">
                    <h3 className="text-gray-900 font-medium text-sm leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors h-10" title={title}>
                        {title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-100'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({ratingCount})</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <div>
                        <div className="text-lg font-bold text-gray-900">Rs.{price.toFixed(2)}</div>
                        {originalPrice && originalPrice > price && (
                            <div className="text-xs text-gray-400 line-through decoration-gray-300">Rs.{originalPrice.toFixed(2)}</div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`
              flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 border
              ${isAdded
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50 hover:border-brand-300'
                            }
            `}
                    >
                        {isAdded ? (
                            <>
                                <Check size={14} /> ADDED
                            </>
                        ) : (
                            <>
                                <Plus size={14} /> ADD
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
