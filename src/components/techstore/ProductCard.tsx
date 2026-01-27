"use client";

import { Product } from '@/types/product';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';
import { useTechStoreCompare } from '@/contexts/TechStoreCompareContext';
import { Star, ShoppingCart, ArrowRightLeft, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAddToWishlist, useWishlist } from '@/hooks/use-wishlist';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useTechStoreCart();
    const { addToCompare, isInCompare } = useTechStoreCompare();
    const { data: wishlist } = useWishlist();
    const { mutate: addToWishlist } = useAddToWishlist();

    const isCompared = isInCompare(product.id);
    const isInWishlist = wishlist?.some(item => item.product.id === product.id);

    // Dynamic field mapping with fallbacks for backend compatibility
    const title = product.name || "Unknown Product";
    const image = product.thumbnail_image || '/images/placeholder.svg';
    const price = typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0);
    const rating = product.average_rating || 0;
    const ratingCount = product.reviews_count || 0;
    const categoryName = product.category?.name || "Tech";
    const slug = product.slug || product.id?.toString();

    // Re-pack for cart/compare contexts which might expect legacy shape for now
    // This allows gradual migration of the entire system
    const legacyProduct = {
        ...product,
        id: product.id,
        title,
        image,
        price,
        slug,
        category: categoryName,
        rating: { rate: rating, count: ratingCount }
    } as any;

    return (
        <div className="group bg-white rounded-[2.5rem] p-5 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col h-full relative overflow-hidden">

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -mr-10 -mt-10 pointer-events-none" />

            {/* Featured Badge */}
            {product.is_featured && (
                <div className="absolute top-6 left-6 z-20 bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-red-200/50">
                    Featured
                </div>
            )}

            {/* Icons Overlay */}
            <div className="absolute top-6 right-6 z-30 flex flex-col gap-3 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <button
                    onClick={() => addToWishlist(product.id)}
                    className={`w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isInWishlist ? 'bg-red-500 text-white shadow-red-200/50' : 'bg-white text-navy-900 border border-gray-50 hover:text-red-500'}`}
                    title={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                >
                    <Heart size={20} className={isInWishlist ? 'fill-current' : ''} />
                </button>
                <button
                    onClick={() => addToCompare(legacyProduct)}
                    className={`w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isCompared ? 'bg-brand-600 text-white shadow-brand-200/50' : 'bg-white text-navy-900 border border-gray-50 hover:text-brand-600'}`}
                >
                    <ArrowRightLeft size={20} />
                </button>
                <Link href={`/product/${slug}`} className="w-12 h-12 bg-white text-navy-900 rounded-2xl shadow-xl border border-gray-50 flex items-center justify-center hover:bg-navy-950 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
                    <Eye size={20} />
                </Link>
            </div>

            {/* Product Image */}
            <Link href={`/product/${slug}`} className="relative aspect-square mb-8 rounded-3xl overflow-hidden bg-white group-hover:bg-gray-50 transition-colors duration-700 flex items-center justify-center p-8">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
            </Link>

            {/* Content */}
            <div className="flex-grow space-y-4 px-1">
                <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-gray-50 backdrop-blur-md rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] border border-gray-100">
                        {categoryName}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg border border-yellow-100/50">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black text-navy-950">{rating}</span>
                    </div>
                </div>

                <Link href={`/product/${slug}`} className="block">
                    <h3 className="text-navy-950 font-bold text-base line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors duration-300">
                        {title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-300 font-bold line-through tracking-wider">$ {(price * 1.2).toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-black text-navy-950 tracking-tighter">${price.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(legacyProduct);
                        }}
                        className="w-14 h-14 bg-navy-950 text-white rounded-2xl flex items-center justify-center hover:bg-brand-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-navy-100"
                    >
                        <ShoppingCart size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
