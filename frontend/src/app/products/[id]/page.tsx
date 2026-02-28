'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import {
    ShoppingCart, Heart, Share2, ShieldCheck, Truck,
    RotateCcw, Star, Plus, Minus, ChevronRight, ArrowLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProductDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    // Mock product data (in a real app, fetch this based on the ID)
    const [product, setProduct] = useState({
        id: id as string,
        name: 'Premium Wireless Noise Cancelling Headphones',
        price: 12500,
        oldPrice: 18999,
        description: 'Experience crystal clear sound with our latest noise-cancelling technology. Perfect for travel, work, and everything in between. Featuring up to 40 hours of battery life and quick charging capabilities.',
        category: 'TV, Audio & Video',
        rating: 4.8,
        reviews: 124,
        img: '🎧',
        stock: 15,
        specs: [
            { label: 'Battery Life', value: '40 Hours' },
            { label: 'Charging', value: 'USB-C Quick Charge' },
            { label: 'Connectivity', value: 'Bluetooth 5.2' },
            { label: 'Weight', value: '250g' }
        ]
    });

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.img
            });
        }
        // Optional: show some feedback
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest overflow-hidden whitespace-nowrap">
                    <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-900 truncate">{product.name}</span>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="p-8 lg:p-12 bg-slate-50 flex flex-col gap-8">
                            <button
                                onClick={() => router.back()}
                                className="self-start p-3 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-2xl shadow-sm border border-slate-100 transition-all flex items-center gap-2 font-black text-xs uppercase"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <div className="flex-grow flex items-center justify-center text-[15rem] drop-shadow-2xl animate-in fade-in zoom-in duration-700">
                                {product.img}
                            </div>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl cursor-pointer transition-all hover:scale-105 ${i === 1 ? 'border-red-600 bg-white shadow-lg' : 'border-transparent bg-white/50'}`}>
                                        {product.img}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-12 flex flex-col gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="bg-red-600/10 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                        {product.category}
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-3 py-1 rounded-lg">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-black text-sm">{product.rating}</span>
                                    </div>
                                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{product.reviews} Reviews</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-lg font-bold text-slate-400 uppercase">KSh</span>
                                    <span className="text-5xl font-black text-red-600 tracking-tighter">{product.price.toLocaleString()}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-slate-400 line-through font-bold">KSh {product.oldPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4" /> 1 Year Official Warranty
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.specs.map((spec, i) => (
                                        <div key={i} className="flex flex-col p-4 bg-white rounded-2xl border border-slate-100">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</span>
                                            <span className="font-bold text-slate-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 mt-auto">
                                <div className="flex items-center gap-6">
                                    <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Quantity</span>
                                    <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all shadow-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-14 text-center font-black text-slate-900 text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                            className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all shadow-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.stock} items left</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-grow flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black py-5 px-8 rounded-2xl transition-all transform active:scale-95 uppercase tracking-widest"
                                    >
                                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-grow bg-red-600 hover:bg-red-700 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-red-200 transition-all transform active:scale-95 uppercase tracking-widest"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping & Returns Tickers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 uppercase text-xs">Free Delivery</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Standard Shipping in 48h</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <RotateCcw className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 uppercase text-xs">Easy Returns</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">7 Days Satisfaction Policy</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 uppercase text-xs">Genuine Guarantee</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Verified Quality Products</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
