"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Truck, ChevronLeft } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const shipping = 15;
    const tax = Math.round(totalPrice * 0.08);
    const total = totalPrice + shipping + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            clearCart();
            router.push('/'); // Or order-success if exists
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                    <Truck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Add some premium items to your cart before checking out.</p>
                <Button onClick={() => router.push('/collections')} className="bg-indigo-600">Return to Shop</Button>
            </div>
        );
    }

    return (
        <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
            <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
                <ChevronLeft size={18} /> Back to Shopping
            </button>

            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900">Checkout</h1>
                <p className="text-slate-500">Complete your premium order</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
                {/* Shipping & Billing Info */}
                <div className="flex-1 space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">1</div>
                            Shipping Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input placeholder="John" required className="rounded-xl border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Doe" required className="rounded-xl border-slate-200" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input placeholder="123 Luxury Lane" required className="rounded-xl border-slate-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="New York" required className="rounded-xl border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Zip Code</Label>
                                <Input placeholder="10001" required className="rounded-xl border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Input placeholder="USA" required className="rounded-xl border-slate-200" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="john@example.com" required className="rounded-xl border-slate-200" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">2</div>
                            Payment Method
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl border-2 border-indigo-600 bg-indigo-50 flex items-center gap-4 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                    <CreditCard strokeWidth={2.5} size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-900">Credit / Debit Card</p>
                                    <p className="text-xs text-indigo-600 font-bold">Secure Processing</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 flex items-center gap-4 cursor-pointer transition-colors bg-slate-50/50">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] text-white font-bold">Pay</div>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-700">Digital Wallet</p>
                                    <p className="text-xs text-slate-400 font-medium">Apple / Google Pay</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <Label>Card Number</Label>
                                <Input placeholder="**** **** **** ****" required className="rounded-xl border-slate-200" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Expiry Date</Label>
                                    <Input placeholder="MM / YY" required className="rounded-xl border-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label>CVC</Label>
                                    <Input placeholder="***" required className="rounded-xl border-slate-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-6 shadow-xl shadow-slate-200">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Safe & Secure Transaction</h4>
                            <p className="text-slate-400 text-sm">Your information is protected by 256-bit SSL encryption.</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden sticky top-24 shadow-xl shadow-slate-200/50">
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-lg">Order Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-5 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                                            <img
                                                src={item.product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
                                            <p className="text-base font-black text-slate-900 mt-1">${(item.selectedVariant ? parseFloat(item.selectedVariant.price) : parseFloat(item.product.price)) * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex justify-between text-sm text-slate-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="font-bold text-slate-900">${shipping}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500 font-medium">
                                    <span>Taxes</span>
                                    <span className="font-bold text-slate-900">${tax}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-slate-900 pt-5 mt-5 border-t-2 border-slate-900">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-100"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Pay $${total}`}
                            </Button>
                            <p className="text-[10px] text-slate-400 text-center mt-6 font-medium">
                                By clicking "Pay", you agree to our <span className="underline cursor-pointer">Terms and Conditions</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
