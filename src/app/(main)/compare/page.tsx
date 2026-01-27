"use client";

import React from 'react';
import { useTechStoreCompare } from '@/contexts/TechStoreCompareContext';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import { Star, X, ShoppingCart, Check, ArrowRightLeft } from 'lucide-react';

const ComparePage: React.FC = () => {
    const { compareItems, removeFromCompare, clearCompare } = useTechStoreCompare();
    const { addToCart } = useCart();

    if (compareItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                    <ArrowRightLeft size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products to Compare</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    Browse products and click the compare icon <ArrowRightLeft className="inline w-3 h-3" /> to add them to this list. You can compare up to 4 items.
                </p>
                <Link href="/collections" className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-navy-900">Product Comparison</h1>
                    <button
                        onClick={clearCompare}
                        className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                        <X size={16} /> Clear All
                    </button>
                </div>

                <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <table className="w-full min-w-[800px] border-collapse text-left">
                        <thead>
                            <tr>
                                <th className="p-4 w-48 bg-gray-50/50 sticky left-0 z-10 border-b border-gray-100">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Details</span>
                                </th>
                                {compareItems.map(product => (
                                    <th key={product.id} className="p-4 w-64 border-b border-gray-100 align-top relative">
                                        <button
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                        <div className="h-40 flex items-center justify-center p-4 mb-4 bg-gray-50 rounded-xl">
                                            <img src={product.thumbnail_image || '/images/placeholder.svg'} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <Link href={`/product/${product.slug}`} className="font-bold text-gray-900 hover:text-brand-600 line-clamp-2 mb-2">
                                            {product.name}
                                        </Link>
                                        <div className="text-lg font-bold text-brand-600">${parseFloat(product.price).toFixed(2)}</div>
                                    </th>
                                ))}
                                {/* Fill empty columns if less than 4 */}
                                {[...Array(4 - compareItems.length)].map((_, i) => (
                                    <th key={i} className="p-4 w-64 border-b border-gray-100 bg-gray-50/10">
                                        <div className="h-full flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-xl min-h-[250px]">
                                            <span className="text-sm">Add Product</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">

                            {/* Rating Row */}
                            <tr>
                                <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">Rating</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-4">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-gray-900">{product.average_rating || 0}</span>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className={i < Math.round(product.average_rating || 0) ? "fill-current" : "text-gray-200"} />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400">({product.reviews_count || 0})</span>
                                        </div>
                                    </td>
                                ))}
                                {[...Array(4 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                            </tr>

                            {/* Category Row */}
                            <tr>
                                <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">Category</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 capitalize">
                                            {(product.category as any)?.name || product.category || 'Tech'}
                                        </span>
                                    </td>
                                ))}
                                {[...Array(4 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                            </tr>

                            {/* Availability */}
                            <tr>
                                <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">Availability</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                            <Check size={16} /> In Stock
                                        </div>
                                    </td>
                                ))}
                                {[...Array(4 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                            </tr>

                            {/* Description Row */}
                            <tr>
                                <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0 align-top">Description</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-4 align-top">
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                                            {product.description}
                                        </p>
                                    </td>
                                ))}
                                {[...Array(4 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                            </tr>

                            {/* Action Row */}
                            <tr>
                                <td className="p-4 bg-gray-50/50 sticky left-0 border-t border-gray-100"></td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="p-4 border-t border-gray-100">
                                        <button
                                            onClick={() => addToCart(product, 1)}
                                            className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                                        >
                                            <ShoppingCart size={16} /> Add to Cart
                                        </button>
                                    </td>
                                ))}
                                {[...Array(4 - compareItems.length)].map((_, i) => <td key={i} className="border-t border-gray-100"></td>)}
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ComparePage;
