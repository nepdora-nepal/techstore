"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types/techstore';
import { TECHSTORE_API_URL } from '@/constants/techstore';

interface TechStoreProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    getProductById: (id: number) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
}

const TechStoreProductContext = createContext<TechStoreProductContextType | undefined>(undefined);

export const TechStoreProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${TECHSTORE_API_URL}/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductById = (id: number) => products.find(p => p.id === id);
    const getProductsByCategory = (category: string) =>
        products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    return (
        <TechStoreProductContext.Provider value={{ products, loading, error, getProductById, getProductsByCategory }}>
            {children}
        </TechStoreProductContext.Provider>
    );
};

export const useTechStoreProduct = () => {
    const context = useContext(TechStoreProductContext);
    if (!context) throw new Error('useTechStoreProduct must be used within a TechStoreProductProvider');
    return context;
};
