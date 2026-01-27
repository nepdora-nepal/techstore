"use client";
import React from 'react';
import Header from '../techstore/Header';
import Footer from '../techstore/Footer';
import CartDrawer from '../techstore/CartDrawer';
import CompareFloatingBar from '../techstore/CompareFloatingBar';
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
