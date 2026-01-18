"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Truck, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
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
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 text-muted-foreground/30">
                    <Truck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">Add some premium items to your cart before checking out.</p>
                <Button onClick={() => router.push('/collections')} className="bg-primary hover:bg-primary/90">Return to Shop</Button>
            </div>
        );
    }

    return (
        <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
            <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors">
                <ChevronLeft size={18} /> Back to Shopping
            </button>

            <div className="mb-12">
                <h1 className="text-4xl font-black text-foreground">Checkout</h1>
                <p className="text-muted-foreground">Complete your premium order</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
                {/* Shipping & Billing Info */}
                <div className="flex-1 space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-secondary text-primary flex items-center justify-center text-sm font-black">1</div>
                            Shipping Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input placeholder="John" required className="rounded-xl border-border" />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Doe" required className="rounded-xl border-border" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input placeholder="123 Luxury Lane" required className="rounded-xl border-border" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="New York" required className="rounded-xl border-border" />
                            </div>
                            <div className="space-y-2">
                                <Label>Zip Code</Label>
                                <Input placeholder="10001" required className="rounded-xl border-border" />
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Input placeholder="USA" required className="rounded-xl border-border" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="john@example.com" required className="rounded-xl border-border" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-secondary text-primary flex items-center justify-center text-sm font-black">2</div>
                            Payment Method
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl border-2 border-primary bg-secondary flex items-center gap-4 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CreditCard strokeWidth={2.5} size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-foreground">Credit / Debit Card</p>
                                    <p className="text-xs text-primary font-bold">Secure Processing</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl border-2 border-border hover:border-border/80 flex items-center gap-4 cursor-pointer transition-colors bg-secondary/30">
                                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] text-primary-foreground font-bold">Pay</div>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-foreground">Digital Wallet</p>
                                    <p className="text-xs text-muted-foreground font-medium">Apple / Google Pay</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <Label>Card Number</Label>
                                <Input placeholder="**** **** **** ****" required className="rounded-xl border-border" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Expiry Date</Label>
                                    <Input placeholder="MM / YY" required className="rounded-xl border-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label>CVC</Label>
                                    <Input placeholder="***" required className="rounded-xl border-border" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-primary rounded-3xl text-primary-foreground flex items-center gap-6 shadow-xl shadow-primary/5">
                        <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 shrink-0">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Safe & Secure Transaction</h4>
                            <p className="text-primary-foreground/60 text-sm">Your information is protected by 256-bit SSL encryption.</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-card border border-border/50 rounded-3xl overflow-hidden sticky top-24 shadow-xl shadow-secondary/20">
                        <div className="p-6 bg-secondary/50 border-b border-border/50">
                            <h3 className="font-bold text-foreground text-lg">Order Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-5 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0 shadow-sm">
                                            <Image
                                                src={item.product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                                alt={item.product.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.product.name}</h4>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
                                            <p className="text-base font-black text-foreground mt-1">${(item.selectedVariant ? parseFloat(item.selectedVariant.price) : parseFloat(item.product.price)) * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-border">
                                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-foreground">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                                    <span>Shipping</span>
                                    <span className="font-bold text-foreground">${shipping}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                                    <span>Taxes</span>
                                    <span className="font-bold text-foreground">${tax}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-foreground pt-5 mt-5 border-t-2 border-foreground">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/10"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Pay $${total}`}
                            </Button>
                            <p className="text-[10px] text-muted-foreground text-center mt-6 font-medium">
                                By clicking &quot;Pay&quot;, you agree to our <span className="underline cursor-pointer">Terms and Conditions</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CheckoutPage;
