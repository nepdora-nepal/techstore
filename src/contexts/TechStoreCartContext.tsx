"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types/techstore';

interface TechStoreCartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    totalItems: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const TechStoreCartContext = createContext<TechStoreCartContextType | undefined>(undefined);

export const TechStoreCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('techstore-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem('techstore-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <TechStoreCartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, clearCart,
            cartTotal, totalItems, isCartOpen, setIsCartOpen
        }}>
            {children}
        </TechStoreCartContext.Provider>
    );
};

export const useTechStoreCart = () => {
    const context = useContext(TechStoreCartContext);
    if (!context) throw new Error('useTechStoreCart must be used within a TechStoreCartProvider');
    return context;
};
