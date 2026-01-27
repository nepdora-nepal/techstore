"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import CompareFloatingBar from './CompareFloatingBar';
import BottomNav from './BottomNav';

interface TechStoreLayoutProps {
    children: React.ReactNode;
}

const TechStoreLayout: React.FC<TechStoreLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen font-sans selection:bg-brand-100 selection:text-brand-900 bg-gray-50 text-slate-900 antialiased pb-16 md:pb-0 relative">
            <Header />
            <CartDrawer />
            <main className="flex-grow">
                {children}
            </main>
            <CompareFloatingBar />
            <Footer />
            <BottomNav />
        </div>
    );
};

export default TechStoreLayout;
