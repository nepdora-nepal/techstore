"use client";

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import { DISCOUNT_CODE_VALUE, TAX_RATE, SHIPPING_COST } from '@/constants/techstore';
import Link from 'next/link';

const CheckoutPage: React.FC = () => {
    const { cartItems, totalPrice, itemCount, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Calculations
    const tax = totalPrice * TAX_RATE;
    const discount = itemCount > 0 ? (totalPrice * DISCOUNT_CODE_VALUE) : 0;
    const finalTotal = totalPrice + tax + SHIPPING_COST - discount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate order processing
        setTimeout(() => {
            clearCart();
            router.push('/order-success');
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/" className="text-brand-600 font-bold hover:underline">Return to Shopping</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Checkout Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-navy-950 transition-colors">
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div className="flex items-center gap-2">
                        <Lock size={16} className="text-green-600" />
                        <span className="text-sm font-black uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-10">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side: Forms */}
                    <div className="flex-1 space-y-8">

                        {/* Shipping Information */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-black text-navy-950 mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                    <Truck size={20} />
                                </div>
                                Shipping Destination
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">First Name</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Last Name</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="Doe" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Street Address</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="123 Luxury Lane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="San Francisco" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Postal Code</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="94103" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Information */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-black text-navy-950 mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                    <CreditCard size={20} />
                                </div>
                                Secure Payment
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Card Number</label>
                                    <div className="relative">
                                        <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="•••• •••• •••• ••••" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                            <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Expiry Date</label>
                                        <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">CVV</label>
                                        <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 focus:ring-2 focus:ring-brand-500/20 outline-none focus:border-brand-500 transition-all" placeholder="•••" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Summary */}
                    <div className="lg:w-96">
                        <div className="bg-navy-950 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
                            <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Review Items ({itemCount})</p>
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                                    {cartItems.map(item => (
                                        <div key={item.selectedVariant?.id || item.product.id} className="flex gap-4 items-center">
                                            <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                                                <img src={item.product.thumbnail_image || '/images/placeholder.svg'} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold truncate">{item.product.name}</p>
                                                <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-xs font-black">
                                                ${((item.selectedVariant ? parseFloat(item.selectedVariant.price) : parseFloat(item.product.price)) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 py-6 border-t border-white/10 text-sm">
                                <div className="flex justify-between font-medium opacity-60">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium text-brand-400">
                                    <span>Discount (Elite)</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium opacity-60">
                                    <span>Shipping</span>
                                    <span>${SHIPPING_COST.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium opacity-60">
                                    <span>Estimated Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-6">
                                    <span className="text-lg font-black uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-black text-brand-500">${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 mt-8 shadow-2xl shadow-brand-900/50
                                    ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-brand-600 hover:bg-white hover:text-brand-600 active:scale-95'}
                                `}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Complete Order <CheckCircle size={18} /></>
                                )}
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 opacity-40 grayscale">
                                <ShieldCheck size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Anti-Fraud Protection Active</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
