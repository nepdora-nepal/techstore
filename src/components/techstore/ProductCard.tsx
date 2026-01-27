"use client";

import React from 'react';
import { Product } from '@/types/techstore';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';
import { useTechStoreCompare } from '@/contexts/TechStoreCompareContext';
import { Star, ShoppingCart, ArrowRightLeft, Heart, Eye } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useTechStoreCart();
    const { addToCompare, isInCompare } = useTechStoreCompare();
    const isCompared = isInCompare(product.id);

    return (
        <div className="group bg-white rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full relative overflow-hidden">

            {/* Discount Badge Mockup */}
            {product.id % 3 === 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                    -20% Sale
                </div>
            )}

            {/* Icons Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <button className="w-10 h-10 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-600 transition-colors">
                    <Heart size={18} />
                </button>
                <button
                    onClick={() => addToCompare(product)}
                    className={`w-10 h-10 rounded-xl shadow-lg border flex items-center justify-center transition-colors ${isCompared ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-400 border-gray-100 hover:text-brand-600'}`}
                >
                    <ArrowRightLeft size={18} />
                </button>
                <Link href={`/product/${product.id}`} className="w-10 h-10 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-600 transition-colors">
                    <Eye size={18} />
                </Link>
            </div>

            {/* Product Image */}
            <Link href={`/product/${product.id}`} className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-white p-6 block">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/2 transition-all duration-500" />
            </Link>

            {/* content */}
            <div className="flex-grow space-y-3 px-2">
                <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-gray-50 rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest">{product.category}</div>
                    <div className="flex items-center text-yellow-400">
                        <Star size={12} className="fill-current" />
                        <span className="text-[10px] font-bold text-gray-900 ml-1">{product.rating.rate}</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-navy-950 font-bold text-sm line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold line-through">$ {(product.price * 1.2).toFixed(2)}</span>
                        <span className="text-xl font-black text-navy-950 tracking-tight">${product.price.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="w-12 h-12 bg-navy-950 text-white rounded-2xl flex items-center justify-center hover:bg-brand-600 transition-all shadow-lg active:scale-90"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
