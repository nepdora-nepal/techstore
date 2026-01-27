"use client";

import React, { useState } from 'react';
import Header from '../techstore/Header';
import Footer from '../techstore/Footer';
import { CartDrawer } from './CartDrawer';
import CompareFloatingBar from '../techstore/CompareFloatingBar';
import { AuthProvider } from '@/contexts/AuthContext';
export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <CompareFloatingBar />  
            </div>
        </AuthProvider>
    );
};
