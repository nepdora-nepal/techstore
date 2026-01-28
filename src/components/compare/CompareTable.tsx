"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Star, ShoppingCart, Check, Plus } from "lucide-react";
import { Product } from "@/types/product";

interface CompareTableProps {
    compareItems: Product[];
    removeFromCompare: (id: number) => void;
    addToCart: (product: Product, quantity: number) => void;
    onAddClick: () => void;
}

const CompareTable: React.FC<CompareTableProps> = ({
    compareItems,
    removeFromCompare,
    addToCart,
    onAddClick,
}) => {
    return (
        <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                    <tr>
                        <th className="p-4 w-48 bg-gray-50/50 sticky left-0 z-10 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Product Details
                            </span>
                        </th>
                        {compareItems.map((product) => (
                            <th
                                key={product.id}
                                className="p-4 w-64 border-b border-gray-100 align-top relative"
                            >
                                <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm"
                                >
                                    <X size={14} />
                                </button>
                                <div className="h-40 flex items-center justify-center p-4 mb-4 bg-gray-50 rounded-3xl">
                                    <Image
                                        src={product.thumbnail_image || "/images/placeholder.svg"}
                                        height={160}
                                        width={160}
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                    />
                                </div>
                                <Link
                                    href={`/collections/${product.slug}`}
                                    className="font-bold text-gray-900 hover:text-brand-600 line-clamp-2 mb-2"
                                >
                                    {product.name}
                                </Link>
                                <div className="text-lg font-bold text-brand-600">
                                    Rs. {Number(product.price).toLocaleString("en-IN")}
                                </div>
                            </th>
                        ))}
                        {[...Array(4 - compareItems.length)].map((_, i) => (
                            <th
                                key={i}
                                className="p-4 w-64 border-b border-gray-100 bg-gray-50/10"
                            >
                                <button
                                    onClick={onAddClick}
                                    className="group w-full h-full flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-3xl min-h-[250px] hover:border-brand-200 hover:bg-brand-50/10 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                        <Plus size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-brand-600 transition-colors">
                                        Add Product
                                    </span>
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Rating Row */}
                    <tr>
                        <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">
                            Rating
                        </td>
                        {compareItems.map((product) => (
                            <td key={product.id} className="p-4">
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-gray-900">
                                        {product.average_rating || 0}
                                    </span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={
                                                    i < Math.round(product.average_rating || 0)
                                                        ? "fill-current"
                                                        : "text-gray-200"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        ({product.reviews_count || 0})
                                    </span>
                                </div>
                            </td>
                        ))}
                        {[...Array(4 - compareItems.length)].map((_, i) => (
                            <td key={i}></td>
                        ))}
                    </tr>

                    {/* Category Row */}
                    <tr>
                        <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">
                            Category
                        </td>
                        {compareItems.map((product) => (
                            <td key={product.id} className="p-4">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 capitalize">
                                    {/* //eslint-disable-next-line @typescript-eslint/no-explicit-any */}{((product.category as any)?.name ||
                                        product.category ||
                                        "Tech") as string}
                                </span>
                            </td>
                        ))}
                        {[...Array(4 - compareItems.length)].map((_, i) => (
                            <td key={i}></td>
                        ))}
                    </tr>

                    {/* Availability */}
                    <tr>
                        <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 sticky left-0">
                            Availability
                        </td>
                        {compareItems.map((product) => (
                            <td key={product.id} className="p-4">
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                    <Check size={16} /> In Stock
                                </div>
                            </td>
                        ))}
                        {[...Array(4 - compareItems.length)].map((_, i) => (
                            <td key={i}></td>
                        ))}
                    </tr>



                    {/* Action Row */}
                    <tr>
                        <td className="p-4 bg-gray-50/50 sticky left-0 border-t border-gray-100"></td>
                        {compareItems.map((product) => (
                            <td key={product.id} className="p-4 border-t border-gray-100">
                                <button
                                    onClick={() => addToCart(product, 1)}
                                    className="w-full py-2.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                                >
                                    <ShoppingCart size={16} /> Add to Cart
                                </button>
                            </td>
                        ))}
                        {[...Array(4 - compareItems.length)].map((_, i) => (
                            <td key={i} className="border-t border-gray-100"></td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CompareTable;
