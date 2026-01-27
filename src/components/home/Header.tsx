'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, ChevronDown, MapPin, HelpCircle, Phone, ArrowRightLeft, User, LogOut, Package, Heart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useTechStoreCompare } from '@/contexts/TechStoreCompareContext';
import { STATIC_CATEGORIES } from '@/constants/techstore';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useCategories } from '@/hooks/use-category';
import { SearchBar } from '@/components/layout/SearchBar';

const Header: React.FC = () => {
    const { itemCount, setIsCartOpen, totalPrice } = useCart();
    const { compareItems } = useTechStoreCompare();
    const { user, logout, isAuthenticated } = useAuth();
    const { data: profile } = useProfile();
    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.results.map(c => c.name) || STATIC_CATEGORIES;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const formatCategoryUrl = (category: string) => {
        return category.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <>
            <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
                {/* Top Utility Bar */}
                <div className="bg-navy-950 text-[11px] py-1.5 border-b border-navy-900 hidden md:block text-slate-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                            <span className="text-slate-700">|</span>
                            <Link href="/warranty" className="hover:text-white transition-colors">Warranty Policy</Link>
                            <span className="text-slate-700">|</span>
                            <Link href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                                <MapPin size={12} /> Pickup Location
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/faq" className="flex items-center gap-1 hover:text-white transition-colors">
                                <HelpCircle size={12} /> Help Center
                            </Link>
                            <span className="text-slate-700">|</span>
                            <a href="tel:+9779800000000" className="flex items-center gap-1 hover:text-white transition-colors font-medium">
                                <Phone size={12} /> +977-9800000000
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="py-4 md:py-6 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4 md:gap-8">

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 -ml-2 text-gray-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {/* Logo */}
                            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter shadow-lg shadow-brand-500/30">
                                    T
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-navy-950 hidden sm:block">TechStore</span>
                            </Link>

                            {/* Search Bar */}
                            <SearchBar className="hidden md:flex flex-1 max-w-2xl" />

                            {/* Actions */}
                            <div className="flex items-center gap-2 sm:gap-6">

                                {/* Account Link */}
                                <div className="relative group">
                                    <div
                                        className="hidden md:flex flex-col items-end leading-tight cursor-pointer hover:opacity-80"
                                        onClick={() => isAuthenticated ? setIsAccountOpen(!isAccountOpen) : router.push('/login')}
                                    >
                                        <span className="text-[10px] text-gray-500 font-medium">
                                            {isAuthenticated ? `Hello, ${profile?.first_name || user?.first_name || 'User'}` : 'Hello, Sign In'}
                                        </span>
                                        <span className="text-sm font-bold text-navy-900 flex items-center gap-1">
                                            My Account <ChevronDown size={12} className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`} />
                                        </span>
                                    </div>

                                    {/* Account Dropdown */}
                                    {isAuthenticated && (
                                        <div className={`absolute top-full right-0 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50 mt-2 transition-all duration-200 ${isAccountOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                                <User size={18} /> My Profile
                                            </Link>
                                            <Link href="/my-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                                <Package size={18} /> My Orders
                                            </Link>
                                            <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                                <Heart size={18} /> Wishlist
                                            </Link>
                                            <div className="h-px bg-gray-100 my-2"></div>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsAccountOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <LogOut size={18} /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                                {/* Compare Icon */}
                                <Link href="/compare" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group hidden md:flex" title="Compare Products">
                                    <ArrowRightLeft className="w-6 h-6 text-gray-700 group-hover:text-brand-600 transition-colors" />
                                    {compareItems.length > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white bg-brand-600 rounded-full ring-2 ring-white">
                                            {compareItems.length}
                                        </span>
                                    )}
                                </Link>

                                {/* Cart Icon */}
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group flex items-center gap-2"
                                    aria-label={`Shopping cart with ${itemCount} items`}
                                >
                                    <div className="relative">
                                        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-brand-600 transition-colors" />
                                        {itemCount > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full ring-2 ring-white">
                                                {itemCount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="hidden lg:flex flex-col items-start leading-none">
                                        <span className="text-[10px] text-gray-500 font-medium">My Cart</span>
                                        <span className="text-xs font-bold text-navy-900">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="mt-4 md:hidden">
                            <SearchBar className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Category Navigation Bar */}
                <div className="border-t border-gray-100 bg-white hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-8">
                            {/* All Categories Dropdown Trigger */}
                            <div className="relative group py-3 cursor-pointer">
                                <div className="flex items-center gap-2 text-sm font-bold text-navy-900">
                                    <Menu size={18} />
                                    All Categories
                                    <ChevronDown size={14} className="text-gray-400 group-hover:rotate-180 transition-transform" />
                                </div>
                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="py-2 px-5">
                                        {categories.map(cat => (
                                            <Link
                                                key={cat}
                                                href={`/category/${formatCategoryUrl(cat)}`}
                                                className="block py-2 text-sm font-medium text-gray-900 border-b border-gray-50"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Horizontal Categories */}
                            <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                                {categories.slice(0, 6).map(cat => {
                                    const categoryUrl = formatCategoryUrl(cat);
                                    const isActive = pathname.includes(categoryUrl);

                                    return (
                                        <Link
                                            key={cat}
                                            href={`/category/${categoryUrl}`}
                                            className={`text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                                ? 'text-brand-600 font-semibold'
                                                : 'text-gray-600 hover:text-brand-600'
                                                }`}
                                        >
                                            {cat}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="ml-auto flex items-center gap-4 text-xs font-bold text-brand-600">
                                <Link href="/deals/flash">FLASH DEALS</Link>
                                <Link href="/deals/special">SPECIAL OFFER</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-white md:hidden overflow-y-auto">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <span className="font-bold text-lg text-navy-900">Menu</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-2">Categories</div>
                            {categories.map(cat => (
                                <Link
                                    key={cat}
                                    href={`/category/${formatCategoryUrl(cat)}`}
                                    className="block py-2 text-sm font-medium text-gray-900 border-b border-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {cat}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3">
                                <Link href="/account" className="block text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                                <Link href="/orders" className="block text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                                <Link href="/compare" className="block text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Compare Products</Link>
                                <Link href="/faq" className="block text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>Help Center</Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;