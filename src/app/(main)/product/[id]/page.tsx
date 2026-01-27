"use client";

import React, { useEffect, useState } from 'react';
import { useTechStoreProduct } from '@/contexts/TechStoreProductContext';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';
import { Product } from '@/types/techstore';
import { Star, Truck, Shield, RefreshCw, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';
import HorizontalProductList from '@/components/techstore/HorizontalProductList';

interface ProductPageProps {
    params: { id: string };
}

const ProductDetailPage: React.FC<ProductPageProps> = ({ params }) => {
    const { getProductById, products, loading } = useTechStoreProduct();
    const { addToCart } = useTechStoreCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [id, setId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        setId(parseInt(params.id));
    }, [params.id]);

    useEffect(() => {
        if (id !== null) {
            const result = getProductById(id);
            if (result) setProduct(result);
        }
    }, [id, getProductById, products]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-brand-600">Loading Product...</div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">Product not found</div>
    );

    const handleAddToCart = () => {
        setAdding(true);
        setTimeout(() => {
            for (let i = 0; i < quantity; i++) {
                addToCart(product);
            }
            setAdding(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-10">
                    <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category}`} className="hover:text-brand-600 transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-navy-950 truncate max-w-[200px]">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2">
                        <div className="bg-gray-50 rounded-[2.5rem] p-12 border border-gray-100 flex items-center justify-center">
                            <img
                                src={product.image}
                                className="max-h-[500px] w-auto object-contain mix-blend-multiply drop-shadow-2xl"
                                alt={product.title}
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-wider rounded-lg border border-brand-100">Official TechStore</span>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} className="fill-current" />
                                    <span className="text-sm font-bold text-navy-950">{product.rating.rate}</span>
                                    <span className="text-xs text-gray-400">({product.rating.count} reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-navy-950 leading-tight mb-4">{product.title}</h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-brand-600">${product.price.toFixed(2)}</span>
                                <span className="text-xl text-gray-300 line-through">$ {(product.price * 1.2).toFixed(2)}</span>
                            </div>
                        </div>

                        <p className="text-lg text-slate-500 leading-relaxed font-medium">
                            {product.description}
                        </p>

                        <div className="pt-6 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border border-gray-200 rounded-2xl p-1 bg-gray-50">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-12 text-center font-black text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className="flex-1 h-[60px] bg-navy-950 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-brand-600 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    {adding ? <Check size={20} /> : <ShoppingCart size={20} />}
                                    {adding ? 'Added to Bag' : 'Add to Shopping Bag'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                                {[
                                    { icon: Truck, title: 'Global Delivery', sub: 'In 3-5 days' },
                                    { icon: Shield, title: 'Official Support', sub: '12 Months' },
                                    { icon: RefreshCw, title: 'Free Returns', sub: 'Within 30 days' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <item.icon size={20} className="text-brand-600" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-navy-950">{item.title}</p>
                                            <p className="text-[10px] text-gray-400 font-bold">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100">
                    <HorizontalProductList
                        title="Recommended For You"
                        products={products.filter(p => p.id !== product.id).slice(0, 8)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
