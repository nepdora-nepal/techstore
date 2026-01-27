"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../side-cart/CartDrawer';
import CompareFloatingBar from '../home/CompareFloatingBar';
import { AuthProvider } from '@/contexts/AuthContext';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <CartDrawer />
                <CompareFloatingBar />
            </div>
        </AuthProvider>
    );
};
