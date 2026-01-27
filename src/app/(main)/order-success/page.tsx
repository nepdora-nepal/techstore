"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Printer } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center">

                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 animate-fade-in-up">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h2 className="mt-6 text-center text-3xl font-black text-navy-900 tracking-tight">
                    ORD-SUCCESSFUL
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Thank you for your purchase. Your order number is <span className="font-bold text-gray-900">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>.
                    <br />We&apos;ve sent a confirmation email to your inbox.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-left space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Order Status</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase">Processing</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-medium">Delivery Method</span>
                        <span className="text-gray-900 font-bold">Standard Delivery</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                        href="/"
                        className="flex-1 px-8 py-4 bg-navy-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Package size={18} /> Continue Shopping
                    </Link>
                    <button className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <Printer size={18} /> Print Receipt
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccessPage;
