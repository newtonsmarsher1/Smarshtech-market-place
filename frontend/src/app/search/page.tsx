'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import api from '@/utils/api';
import {
    Search, ShoppingCart, Star, Filter,
    ArrowRight, Sparkles, AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    rating?: number;
    status?: string;
    oldPrice?: number;
}

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
                setProducts(res.data);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
                {/* Search Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] italic">
                            <Sparkles className="w-4 h-4" /> AI-Enhanced Search
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
                            Results for: <span className="text-emerald-600">"{query}"</span>
                        </h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            Found {products.length} matching items
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                        <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-900 outline-none cursor-pointer shadow-sm">
                            <option>Relevance</option>
                            <option>Newest</option>
                            <option>Price: Low</option>
                            <option>Price: High</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin shadow-xl"></div>
                        <p className="font-black text-slate-400 uppercase tracking-widest text-xs animate-pulse">Scanning Clouds Mall...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col relative overflow-hidden"
                            >
                                {/* Status Tag */}
                                {product.status && (
                                    <div className="absolute top-6 left-6 z-10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-emerald-600 text-white rounded-md shadow-lg shadow-emerald-200">
                                        {product.status}
                                    </div>
                                )}

                                {/* Image Box */}
                                <div className="aspect-square bg-slate-50 rounded-2xl mb-5 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                    <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100" />
                                </div>

                                <div className="space-y-3 flex-grow flex flex-col justify-end">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 px-2 py-0.5 rounded-full">{product.category}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            <span className="text-[10px] font-bold text-slate-700">{product.rating || '4.5'}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="pt-2 flex items-center justify-between">
                                        <div>
                                            {product.oldPrice && (
                                                <p className="text-[10px] font-bold text-slate-400 line-through">KSh {product.oldPrice.toLocaleString()}</p>
                                            )}
                                            <p className="text-lg font-black text-emerald-700 leading-none">KSh {product.price.toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addItem({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    imageUrl: product.imageUrl
                                                });
                                            }}
                                            className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-md group/cart"
                                        >
                                            <ShoppingCart className="w-4 h-4 group-hover/cart:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-slate-100 shadow-xl flex flex-col items-center gap-8 animate-in zoom-in duration-500 max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                            <Search className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">No Matching Items Found</h2>
                            <p className="text-slate-500 font-bold max-w-md mx-auto">
                                We couldn't find anything for <span className="text-emerald-600 font-black">"{query}"</span>.
                                Try checking your spelling or use more general keywords.
                            </p>
                        </div>
                        <Link href="/" className="bg-slate-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-3 active:scale-95 text-xs uppercase tracking-widest shadow-xl">
                            Back to Everything <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}

                {/* Recommendations Section if no results or low results */}
                {products.length < 4 && !loading && (
                    <section className="mt-24">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px bg-slate-200 flex-grow" />
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap px-4">Trending Tech For You</h2>
                            <div className="h-px bg-slate-200 flex-grow" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 hover:opacity-100 transition-opacity">
                            {/* Placeholder for trending items */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-[4/5] bg-white rounded-3xl border border-dashed border-slate-200" />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
