'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-red-600 shadow-sm border border-transparent hover:border-slate-200">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">My Shopping Bag</h1>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-16 text-center space-y-8">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-6xl">
                            🛒
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900 uppercase">Your bag is empty</h2>
                            <p className="text-slate-500 font-medium">Looks like you haven't added anything to your cart yet.</p>
                        </div>
                        <Link href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-red-200 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-6 group hover:shadow-md transition-shadow">
                                    <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform">
                                        {item.imageUrl || '📦'}
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-black text-lg text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-xs font-bold text-slate-400 uppercase">KSh</span>
                                                <span className="text-xl font-black text-red-600">{item.price.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-white hover:text-red-600 rounded-lg transition-all disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 text-center font-black text-slate-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-white hover:text-red-600 rounded-lg transition-all"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
                            <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between font-bold text-slate-500 uppercase text-sm tracking-widest">
                                    <span>Subtotal</span>
                                    <span>KSh {getTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-500 uppercase text-sm tracking-widest">
                                    <span>Delivery</span>
                                    <span className="text-emerald-600">FREE</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                                    <span className="font-black text-slate-900 uppercase">Total</span>
                                    <div className="text-right">
                                        <div className="flex items-baseline gap-1 justify-end">
                                            <span className="text-xs font-bold text-slate-400 uppercase">KSh</span>
                                            <span className="text-3xl font-black text-red-600">{getTotal().toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">VAT Included</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/checkout" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center font-black py-4 px-6 rounded-2xl shadow-lg shadow-red-200 transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wider">
                                Proceed to Checkout
                            </Link>
                            <div className="mt-6 flex items-center gap-3 justify-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-1">🛡️ Secure Payment</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">🔄 Easy Returns</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
