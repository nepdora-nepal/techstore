import React from 'react';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '../ui/button';
import Image from 'next/image';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-border/50">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <ShoppingBag size={22} className="text-primary" />
                            Shopping Cart
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto py-6 px-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                <ShoppingBag size={64} className="mb-4 text-muted-foreground/30" />
                                <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                                <button
                                    onClick={() => { onClose(); router.push('/collections'); }}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Start Shopping →
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedVariant?.id || 'no-variant'}`} className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.thumbnail_image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2">{item.product.category?.name || 'General'}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                                                        className="p-1 hover:bg-secondary"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                                                        className="p-1 hover:bg-secondary"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-foreground">${(item.selectedVariant ? parseFloat(item.selectedVariant.price) : parseFloat(item.product.price)) * item.quantity}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="px-6 py-8 border-t border-border/50 space-y-4">
                            <div className="flex items-center justify-between text-base font-bold text-foreground">
                                <span>Subtotal</span>
                                <span>${totalPrice}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                            <div className="grid grid-cols-1 gap-3">
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-none py-6"
                                    onClick={() => { onClose(); router.push('/checkout'); }}
                                >
                                    Checkout Now
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full py-6 border-border"
                                    onClick={onClose}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
