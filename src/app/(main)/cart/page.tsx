"use client";

import React, { useState } from 'react';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Store } from 'lucide-react';
import { DISCOUNT_CODE_VALUE, TAX_RATE, SHIPPING_COST } from '@/constants/techstore';

const CartPage: React.FC = () => {
    const { items, updateQuantity, removeFromCart, cartTotal, totalItems } = useTechStoreCart();
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

    // Calculations
    const shipping = deliveryMethod === 'delivery' ? SHIPPING_COST : 0;
    const tax = cartTotal * TAX_RATE;
    const discount = totalItems > 0 ? (cartTotal * DISCOUNT_CODE_VALUE) : 0;
    const finalTotal = cartTotal + tax + shipping - discount;

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                    alt="Empty Cart"
                    className="w-48 h-48 opacity-50 mb-6 mix-blend-multiply"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
                <Link href="/" className="px-8 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems})</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items List */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-500 hidden sm:flex">
                                <div className="flex-1">Product</div>
                                <div className="w-32 text-center">Quantity</div>
                                <div className="w-24 text-right">Total</div>
                                <div className="w-12"></div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {items.map(item => (
                                    <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                                        <div className="w-full sm:w-auto flex items-center sm:items-start gap-4 flex-1">
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 flex-shrink-0 border border-gray-100">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-400 uppercase font-medium mb-1">{item.category}</p>
                                                <Link href={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-brand-600 line-clamp-2 mb-1">{item.title}</Link>
                                                <div className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</div>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-auto flex justify-between sm:block items-center">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-50 text-gray-600"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-24 flex justify-between sm:block text-right">
                                            <span className="sm:hidden font-medium text-gray-500">Total:</span>
                                            <span className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        <div className="w-full sm:w-auto flex justify-end">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Delivery Options */}
                            <div className="mb-6 p-1 bg-gray-100 rounded-lg grid grid-cols-2 gap-1">
                                <button
                                    onClick={() => setDeliveryMethod('delivery')}
                                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Truck size={16} /> Delivery
                                </button>
                                <button
                                    onClick={() => setDeliveryMethod('pickup')}
                                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Store size={16} /> Pickup
                                </button>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount (Spring Sale)</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping ({deliveryMethod === 'delivery' ? 'Standard' : 'Pickup'})</span>
                                    <span className="font-medium text-gray-900">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (13% VAT)</span>
                                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-brand-600">${finalTotal.toFixed(2)}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 mb-4"
                            >
                                Proceed to Checkout <ArrowRight size={20} />
                            </Link>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                <ShieldCheck size={14} /> Secure Checkout
                            </div>

                            {/* Promo Code Input */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-xs font-semibold uppercase text-gray-400 mb-2">Discount Code</p>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="GET50OFF" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm uppercase placeholder:normal-case focus:outline-none focus:border-brand-500" />
                                    <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
