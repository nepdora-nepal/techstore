"use client";

import React from 'react';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTechStoreCart } from '@/contexts/TechStoreCartContext';

const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const { totalItems } = useTechStoreCart();

    const tabs = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Shop', icon: Search, href: '/category/electronics' },
        { name: 'Cart', icon: ShoppingBag, href: '/cart', count: totalItems },
        { name: 'Wishlist', icon: Heart, href: '/wishlist' },
        { name: 'Profile', icon: User, href: '/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 h-16 flex items-center justify-between z-50 transition-all">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`flex flex-col items-center gap-1.5 transition-all w-full relative ${isActive ? 'text-brand-600' : 'text-gray-400'}`}
                    >
                        <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                            <tab.icon size={20} className={isActive ? 'fill-current' : ''} />
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                                    {tab.count}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{tab.name}</span>
                        {isActive && (
                            <div className="absolute -top-1 w-12 h-1 bg-brand-600 rounded-full" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default BottomNav;
