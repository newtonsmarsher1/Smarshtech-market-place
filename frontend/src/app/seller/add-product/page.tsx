'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Trash2, Plus, Image as ImageIcon, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ProductEntry {
    id: string;
    name: string;
    price: string;
    category: string;
    imageUrl: string;
    description: string;
}

export default function AddProductPage() {
    const [products, setProducts] = useState<ProductEntry[]>([
        { id: '1', name: '', price: '', category: 'Vegetables', imageUrl: '', description: '' }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const addProduct = () => {
        setProducts([
            ...products,
            { id: Date.now().toString(), name: '', price: '', category: 'Vegetables', imageUrl: '', description: '' }
        ]);
    };

    const removeProduct = (id: string) => {
        if (products.length > 1) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const updateProduct = (id: string, field: keyof ProductEntry, value: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call to backend for bulk creation
        console.log('Sending products to Clouds Mall Backend:', products);

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-12">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase tracking-widest border border-red-100 italic">
                            <img src="/logo.png" alt="" className="w-4 h-4 object-contain" /> Seller Dashboard
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">List Your <span className="text-red-600">Goods</span> on Clouds Mall</h1>
                        <p className="text-slate-500 font-medium max-w-xl">
                            Provide an image source, name, and price for each item. You can add as many products as you want to populate your shop.
                        </p>
                    </div>

                    {!success && (
                        <button
                            onClick={addProduct}
                            className="bg-slate-900 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-red-600 transition-all shadow-xl active:scale-95 group"
                        >
                            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> Add Another Item
                        </button>
                    )}
                </div>

                {success ? (
                    <div className="bg-white rounded-[3rem] p-24 text-center border-4 border-emerald-500/10 shadow-2xl flex flex-col items-center gap-8 animate-in zoom-in duration-500">
                        <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-emerald-200 shadow-2xl animate-bounce">
                            <CheckCircle className="w-16 h-16 text-white" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Successfully Listed!</h2>
                            <p className="text-slate-500 font-bold max-w-md mx-auto">Your {products.length} items have been submitted to Clouds Mall for review. They will appear live on the site shortly.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/" className="bg-slate-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                                Go to Homepage <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button onClick={() => { setSuccess(false); setProducts([{ id: '1', name: '', price: '', category: 'Vegetables', imageUrl: '', description: '' }]); }}
                                className="bg-white border-2 border-slate-200 text-slate-700 font-black px-8 py-4 rounded-2xl hover:border-red-500 transition-all">
                                List More Items
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((p, index) => (
                                <div key={p.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group relative">
                                    {products.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeProduct(p.id)}
                                            className="absolute -top-4 -right-4 bg-white text-slate-400 hover:bg-red-600 hover:text-white p-3 rounded-2xl shadow-xl transition-all border border-slate-50 z-10"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}

                                    <div className="space-y-6">
                                        {/* Image Source Handling */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-red-600" /> Item Image Source
                                            </label>
                                            <div className="relative group/img">
                                                {p.imageUrl ? (
                                                    <div className="aspect-video bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/img:opacity-50 transition-opacity border-2 border-emerald-500/20">
                                                        <img src={p.imageUrl} alt="Product Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video bg-slate-50 rounded-2xl border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-3 group-hover/img:border-red-200 transition-all">
                                                        <ImageIcon className="w-12 h-12" />
                                                        <span className="text-xs font-black uppercase tracking-tighter">Paste Image URL</span>
                                                    </div>
                                                )}
                                                <input
                                                    type="text"
                                                    value={p.imageUrl}
                                                    onChange={(e) => updateProduct(p.id, 'imageUrl', e.target.value)}
                                                    placeholder="https://example.com/good.jpg"
                                                    className="w-full mt-4 px-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-red-600/30 text-xs font-bold font-mono placeholder:text-slate-300 transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Name & Category */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-3 col-span-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Good Name</label>
                                                <input
                                                    type="text"
                                                    value={p.name}
                                                    onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                                                    placeholder="e.g. Fresh Tomatoes"
                                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-600/30 font-black text-slate-900 transition-all shadow-inner"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price (KSh)</label>
                                                <input
                                                    type="number"
                                                    value={p.price}
                                                    onChange={(e) => updateProduct(p.id, 'price', e.target.value)}
                                                    placeholder="450"
                                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-600/30 font-black text-red-600 text-lg transition-all shadow-inner"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                                                <select
                                                    value={p.category}
                                                    onChange={(e) => updateProduct(p.id, 'category', e.target.value)}
                                                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-600/30 font-bold text-slate-700 transition-all shadow-inner appearance-none cursor-pointer"
                                                >
                                                    <option value="Vegetables">Vegetables</option>
                                                    <option value="Fruits">Fruits</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Fashion">Fashion</option>
                                                    <option value="Household">Household</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Beauty">Beauty</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Toys">Toys</option>
                                                    <option value="Automotive">Automotive</option>
                                                    <option value="Books">Books</option>
                                                    <option value="Groceries">Groceries</option>
                                                    <option value="Pharmacy">Pharmacy</option>
                                                    <option value="Hardware">Hardware</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                                            <textarea
                                                value={p.description}
                                                onChange={(e) => updateProduct(p.id, 'description', e.target.value)}
                                                placeholder="Provide more details about the item..."
                                                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-red-600/30 font-bold text-slate-700 transition-all shadow-inner resize-none h-24"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t-2 border-slate-100 flex flex-col items-center gap-6">
                            <p className="text-slate-400 text-sm font-bold flex items-center gap-2 uppercase tracking-widest italic">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" /> By listing these goods, you agree to our Clouds Mall Merchant Terms.
                            </p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-red-600 text-white font-black text-2xl px-20 py-6 rounded-[2rem] shadow-2xl shadow-red-200 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 group"
                            >
                                {isSubmitting ? 'Listing Your Goods...' : 'Submit Items Live!'}
                                {!isSubmitting && <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />}
                            </button>
                        </div>
                    </form>
                )}
            </main>

            <Footer />
        </div>
    );
}
