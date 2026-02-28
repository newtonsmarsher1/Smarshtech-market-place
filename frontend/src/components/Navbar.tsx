'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search, Package, ChevronDown, Smartphone } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

const Navbar = () => {
    const { items } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
        }
    };

    return (
        <div className="w-full">
            {/* Top Banner (Kilimall Style) */}
            <div className="bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-600 text-white py-2 px-4 text-center text-sm font-bold tracking-wide">
                <span className="animate-pulse">🚀 Tech Week Coming Soon | Starts March 2nd!</span>
            </div>

            {/* Sub Header */}
            <div className="bg-slate-50 border-b border-slate-200 py-1.5 px-8 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex gap-6">
                        <Link href="/seller" className="hover:text-emerald-600 transition-colors">Seller Center</Link>
                        <Link href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                            <Smartphone className="w-3 h-3" /> Download App
                        </Link>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-emerald-600 transition-colors">Help Center</Link>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-600">
                            🇰🇪 Kenya <ChevronDown className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-emerald-600 to-emerald-700 shadow-xl py-3 md:py-4">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                                <img src="/logo.png" alt="CloudsMall Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl md:text-3xl font-black text-white tracking-tighter">Clouds<span className="text-yellow-400 italic">Mall</span></span>
                                <p className="text-[8px] md:text-[10px] font-bold text-emerald-100/80 -mt-1 uppercase tracking-widest">Premium Shopping</p>
                            </div>
                        </Link>

                        {/* Search Bar (Desktop) */}
                        <form onSubmit={handleSearch} className="flex-grow max-w-2xl relative group hidden md:block">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="I'm looking for..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-full pl-6 pr-14 py-3 bg-white/10 backdrop-blur-md rounded-l-xl border border-white/20 focus:ring-4 focus:ring-white/20 focus:bg-white text-white focus:text-slate-900 transition-all font-medium placeholder:text-white/60"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-emerald-700 p-3.5 rounded-r-xl transition-all shadow-lg hover:bg-emerald-50 active:scale-95"
                                >
                                    <Search className="w-6 h-6" />
                                </button>
                            </div>
                        </form>

                        {/* Actions */}
                        <div className="flex items-center gap-3 md:gap-6 shrink-0 font-bold text-white">
                            {/* Mobile Search Toggle (Optional or just always show search below on mobile) */}

                            <Link href="/cart" className="flex items-center gap-2 hover:bg-white/10 transition-all p-2 rounded-xl relative group">
                                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                                <span className="hidden lg:block text-xs uppercase tracking-widest">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-0 left-0 bg-yellow-400 text-slate-900 text-[9px] md:text-[10px] font-black px-1 md:px-1.5 py-0.5 rounded-full ring-2 ring-emerald-600">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link href={isAuthenticated ? "/profile" : "/login"} className="flex items-center gap-2 hover:bg-white/10 transition-all p-2 rounded-xl group">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all overflow-hidden border border-white/20">
                                    {isAuthenticated ? (
                                        <span className="text-xs md:text-sm font-black text-white">{user?.name[0].toUpperCase()}</span>
                                    ) : (
                                        <User className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                                    )}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-[10px] text-emerald-100/60 uppercase tracking-widest leading-none mb-1">
                                        {isAuthenticated ? 'Hello,' : 'Account'}
                                    </p>
                                    <p className="text-xs uppercase tracking-widest leading-none truncate max-w-[80px]">
                                        {isAuthenticated ? user?.name.split(' ')[0] : 'Sign In'}
                                    </p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-emerald-100/60 group-hover:rotate-180 transition-transform hidden sm:block" />
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar (Mobile) */}
                    <div className="mt-3 md:hidden">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search on Clouds Mall..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-full pl-4 pr-12 py-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 focus:bg-white text-white focus:text-slate-900 transition-all text-sm font-medium placeholder:text-white/70"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 text-white p-2 rounded-lg group-focus-within:text-emerald-700"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
