"use client";

import React from 'react';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const CartDrawer: React.FC = () => {
    const { items, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useTechStoreCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-navy-950">Shopping Bag</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{items.length} premium items</p>
                            </div>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 grayscale opacity-60">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingBag size={40} className="text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-gray-900 font-medium">Your cart is empty</p>
                                    <p className="text-sm text-gray-500">Looks like you haven&apos;t added anything yet.</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-8 px-8 py-3 bg-brand-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-100 hover:bg-brand-700 active:scale-95 transition-all"
                                >
                                    Start Browsing
                                </button>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 p-2 border border-gray-100 group-hover:border-brand-200 transition-colors">
                                        <img src={item.image || '/images/placeholder.svg'} alt={item.title || item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <Link href={`/product/${item.slug}`} className="text-sm font-bold text-navy-900 line-clamp-1 hover:text-brand-600 transition-colors">
                                                {item.title || item.name}
                                            </Link>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">{(item.category as any)?.name || item.category}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600"><Minus size={12} /></button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600"><Plus size={12} /></button>
                                            </div>
                                            <span className="font-black text-brand-600">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-bold text-navy-950">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-medium">Shipping</span>
                                    <span className="text-green-600 font-bold uppercase tracking-wider">Calculated at next step</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-4 border-t border-gray-200/50">
                                <span className="text-lg font-black text-navy-950 tracking-tight">Total Amount</span>
                                <span className="text-2xl font-black text-brand-600">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => { setIsCartOpen(false); /* Navigate to checkout */ }}
                                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm tracking-wider uppercase hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                            >
                                <Link href="/checkout" className="block w-full">Proceed to Checkout</Link>
                            </button>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-navy-950 transition-colors py-2"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
