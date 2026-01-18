"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const Header: React.FC<{ onCartOpen: () => void }> = ({ onCartOpen }) => {
    const { itemCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/collections' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/news' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-bold text-xl italic">L</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 hidden sm:block">Lumina<span className="text-indigo-600">.</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors hidden sm:block">
                            <Search size={22} />
                        </button>

                        <Link href="/wishlist" className="p-2 text-slate-500 hover:text-indigo-600 transition-colors relative">
                            <Heart size={22} />
                            {/* Wishlist badge logic could go here */}
                        </Link>

                        <button onClick={onCartOpen} className="p-2 text-slate-500 hover:text-indigo-600 transition-colors relative">
                            <ShoppingCart size={22} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="p-1 sm:p-2 flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                    {user ? (
                                        <span className="text-xs font-bold text-indigo-600">
                                            {user.first_name?.[0]}{user.last_name?.[0]}
                                        </span>
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>
                                <ChevronDown size={14} className={cn("transition-transform", isProfileOpen && "rotate-180")} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                                    {!isAuthenticated ? (
                                        <>
                                            <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                <User size={16} /> Login
                                            </Link>
                                            <Link href="/signup" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                <User size={16} /> Sign Up
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-1">
                                                Hi, {user?.first_name || 'User'}
                                            </div>
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                <User size={16} /> Profile
                                            </Link>
                                            <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                <Search size={16} /> My Orders
                                            </Link>
                                            <hr className="my-1 border-slate-100" />
                                            <button
                                                onClick={() => { logout(); setIsProfileOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-slate-100 py-4 px-6">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-slate-600"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-3 border-t border-slate-100">
                            {!isAuthenticated && (
                                <Button onClick={() => { router.push('/login'); setIsMobileMenuOpen(false); }}>
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
