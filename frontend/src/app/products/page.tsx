'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Filter, Star, ShoppingCart, Heart, TrendingUp, Sparkles, Zap, ChevronRight, Package, Apple, ChevronLeft, ArrowRight } from 'lucide-react';

function ProductsContent() {
    // Upgraded sample data with more realistic e-commerce information
    const premiumProducts = [
        {
            id: '1',
            name: 'Sony WH-1000XM5 Wireless Headphones',
            price: 34999,
            oldPrice: 42000,
            category: 'Electronics',
            rating: 4.9,
            reviews: 128,
            status: 'Hot Sale',
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '2',
            name: 'Nike Air Force 1 \'07 Original',
            price: 12500,
            oldPrice: 15000,
            category: 'Fashion',
            rating: 4.8,
            reviews: 342,
            status: '',
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '3',
            name: 'MacBook Pro M3 14-inch',
            price: 245000,
            oldPrice: 280000,
            category: 'Computers',
            rating: 5.0,
            reviews: 89,
            status: 'Premium',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '4',
            name: 'Samsung 65" Neo QLED 4K Smart TV',
            price: 185000,
            oldPrice: 210000,
            category: 'Appliances',
            rating: 4.7,
            reviews: 56,
            status: 'Limited Stock',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '5',
            name: 'Organic Hass Avocados (1kg)',
            price: 450,
            oldPrice: 600,
            category: 'Groceries',
            rating: 4.6,
            reviews: 214,
            status: 'Fresh',
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '6',
            name: 'Chanel No. 5 Eau de Parfum 100ml',
            price: 28500,
            oldPrice: 32000,
            category: 'Beauty',
            rating: 4.9,
            reviews: 431,
            status: 'Top Rated',
            image: 'https://images.unsplash.com/photo-1594035910387-fea4772749d0?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '7',
            name: 'PlayStation 5 Console (Disc Edition)',
            price: 85000,
            oldPrice: 95000,
            category: 'Gaming',
            rating: 4.9,
            reviews: 678,
            status: '',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '8',
            name: 'Nespresso Vertuo Next Coffee Machine',
            price: 32000,
            oldPrice: 38000,
            category: 'Kitchen',
            rating: 4.5,
            reviews: 112,
            status: '',
            image: 'https://images.unsplash.com/photo-1585514606772-2dc92ebf68ca?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '9',
            name: 'LG 9kg Front Load Washing Machine',
            price: 85000,
            oldPrice: 97500,
            category: 'Appliances',
            rating: 4.8,
            reviews: 45,
            status: 'Free Shipping',
            image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '10',
            name: 'Adidas Ultraboost Light Running Shoes',
            price: 19500,
            oldPrice: 22000,
            category: 'Fashion',
            rating: 4.7,
            reviews: 892,
            status: 'Trending',
            image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '11',
            name: 'Dyson V15 Detect Absolute Vacuum',
            price: 115000,
            oldPrice: 130000,
            category: 'Appliances',
            rating: 4.9,
            reviews: 312,
            status: 'Premium',
            image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '12',
            name: 'GoPro HERO12 Black Action Camera',
            price: 65000,
            oldPrice: 72000,
            category: 'Electronics',
            rating: 4.8,
            reviews: 156,
            status: 'Hot Sale',
            image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '13',
            name: 'Estée Lauder Advanced Night Repair',
            price: 14500,
            oldPrice: 16800,
            category: 'Beauty',
            rating: 4.8,
            reviews: 1205,
            status: '',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '14',
            name: 'Secretlab TITAN Evo Gaming Chair',
            price: 78000,
            oldPrice: 85000,
            category: 'Gaming',
            rating: 4.9,
            reviews: 340,
            status: 'Top Rated',
            image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '15',
            name: 'Ninja Foodi MAX Dual Zone Air Fryer',
            price: 35000,
            oldPrice: 42000,
            category: 'Kitchen',
            rating: 4.9,
            reviews: 890,
            status: 'Limited Stock',
            image: 'https://images.unsplash.com/photo-1626200419189-39c8c1915496?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: '16',
            name: 'Fresh Atlantic Salmon Fillet (500g)',
            price: 2200,
            oldPrice: 2800,
            category: 'Groceries',
            rating: 4.7,
            reviews: 67,
            status: 'Fresh',
            image: 'https://images.unsplash.com/photo-1599813350393-e4d0cb53ae29?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const categories = [
        "All Items", "Electronics", "Fashion", "Computers", "Appliances", "Groceries", "Beauty", "Gaming", "Kitchen"
    ];

    const offerSlides = [
        {
            id: 'o1',
            tag: 'WEEKEND DEAL',
            title: 'Samsung S24 Ultra',
            discount: '30% OFF',
            price: 'KSh 115,000',
            image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800',
            bg: 'from-blue-600 to-indigo-900'
        },
        {
            id: 'o2',
            tag: 'LIMITED TIME',
            title: 'Sony PS5 Console',
            discount: 'SAVE KSh 15,000',
            price: 'KSh 80,000',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800',
            bg: 'from-slate-800 to-black'
        },
        {
            id: 'o3',
            tag: 'CLEARANCE',
            title: 'Nike Air Max Pro',
            discount: 'HALF PRICE',
            price: 'KSh 6,500',
            image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
            bg: 'from-red-600 to-rose-900'
        }
    ];

    const searchParams = useSearchParams();
    const router = useRouter();
    const initialCategory = searchParams.get('category') || 'All Items';
    const { addItem } = useCartStore();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat);
        } else {
            setSelectedCategory('All Items');
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All Items') return premiumProducts;
        return premiumProducts.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));
    }, [selectedCategory, premiumProducts]);

    const handleCategorySelect = (cat: string) => {
        if (cat === 'All Items') {
            router.push('/products');
        } else {
            router.push(`/products?category=${encodeURIComponent(cat)}`);
        }
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [offerSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % offerSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + offerSlides.length) % offerSlides.length);

    return (
        <div className="min-h-screen bg-slate-50 font-inter selection:bg-emerald-500/20 selection:text-emerald-700">
            <Navbar />

            <main className="pb-20">
                {/* Stunning Top Header Concept */}
                <div className="bg-slate-900 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none transition-all duration-1000" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none transition-all duration-1000" />

                    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            {/* Left Side: Search & Text */}
                            <div className="max-w-xl w-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <Sparkles className="w-4 h-4" /> Premium Collection
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
                                    Discover What's <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Trending Now.</span>
                                </h1>
                                <p className="text-slate-400 font-medium text-lg max-w-xl mb-10 leading-relaxed">
                                    Explore thousands of authentic, top-tier products sourced globally. Unleash a premium shopping experience tailored for you.
                                </p>

                                <div className="flex bg-white/10 border border-white/20 rounded-2xl p-2 backdrop-blur-md w-full max-w-lg shadow-2xl transition-all hover:bg-white/15">
                                    <div className="pl-4 flex items-center pointer-events-none">
                                        <Search className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search brands, products, categories..."
                                        className="w-full bg-transparent border-none text-white font-bold px-4 py-3 outline-none placeholder:text-slate-500 focus:placeholder:text-slate-400"
                                    />
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-black transition-all shadow-lg active:scale-95">
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Offers Slideshow */}
                            <div className="w-full lg:w-[500px] shrink-0 relative group perspective-1000">
                                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transform transition-transform duration-500 hover:scale-[1.02]">
                                    {offerSlides.map((slide, index) => (
                                        <div
                                            key={slide.id}
                                            className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-700 flex flex-col justify-end p-8 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        >
                                            <div className="absolute inset-0 z-0">
                                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            </div>

                                            <div className="relative z-10 space-y-2 transform transition-all duration-500 translate-y-0">
                                                <span className="inline-block px-3 py-1 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg mb-2">
                                                    {slide.tag}
                                                </span>
                                                <h3 className="text-4xl font-black text-white tracking-tight leading-none">{slide.title}</h3>
                                                <div className="flex items-end gap-3 pt-2">
                                                    <span className="text-3xl font-black text-yellow-400">{slide.discount}</span>
                                                    <span className="text-sm font-bold text-white/70 mb-1">{slide.price}</span>
                                                </div>
                                                <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 group/btn w-fit">
                                                    Shop Offer <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Slideshow Controls */}
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    {/* Slide Indicators */}
                                    <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                                        {offerSlides.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Interactive Sidebar Filters */}
                        <aside className="w-full lg:w-72 shrink-0 space-y-8">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 sticky top-28">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-emerald-500" /> Filters
                                    </h3>
                                    <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest">Clear All</button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
                                        <div className="space-y-1">
                                            {categories.map((cat, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleCategorySelect(cat)}
                                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all group flex justify-between items-center ${selectedCategory === cat ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                                                >
                                                    {cat}
                                                    {selectedCategory === cat && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Price Range</h4>
                                        <div className="flex items-center gap-3">
                                            <input type="number" placeholder="Min" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:border-emerald-500 outline-none transition-colors" />
                                            <span className="text-slate-300">-</span>
                                            <input type="number" placeholder="Max" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 focus:border-emerald-500 outline-none transition-colors" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Rating</h4>
                                        <div className="space-y-3">
                                            {[5, 4, 3].map(rating => (
                                                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-200 group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                                                        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                                                        ))}
                                                        <span className="text-xs font-bold text-slate-500 ml-2">& Up</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm font-bold text-slate-500">Showing <span className="text-slate-900 font-black">234</span> premium items</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort by:</span>
                                    <select className="bg-white border-none shadow-sm text-sm font-bold text-slate-800 rounded-xl px-4 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500/20">
                                        <option>Recommended</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest Arrivals</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                                {filteredProducts.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all border border-slate-100/50 flex flex-col relative overflow-hidden">

                                        {/* Status Tag */}
                                        {product.status && (
                                            <div className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest rounded shadow-md ${product.status === 'Hot Sale' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}>
                                                {product.status}
                                            </div>
                                        )}

                                        {/* Image Box */}
                                        <div className="aspect-square bg-slate-50 rounded-lg mb-2 relative overflow-hidden flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="space-y-1.5 flex-grow flex flex-col justify-end">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded-md">{product.category}</span>
                                                <div className="flex items-center gap-0.5">
                                                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-[8px] font-bold text-slate-700">{product.rating}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-[10px] font-black text-slate-900 leading-tight line-clamp-2 uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">
                                                {product.name}
                                            </h3>

                                            <div className="pt-1 flex items-end justify-between">
                                                <p className="text-xs font-black text-slate-900 leading-none tracking-tight">KSh {product.price.toLocaleString()}</p>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        addItem({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price,
                                                            imageUrl: product.image
                                                        });
                                                    }}
                                                    className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 shadow-sm transition-all active:scale-95 group/cart"
                                                >
                                                    <ShoppingCart className="w-3 h-3 group-hover/cart:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination (Mock) */}
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm hover:border-emerald-500 hover:text-emerald-500 transition-colors">1</button>
                                <button className="w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg flex items-center justify-center font-bold text-sm">2</button>
                                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm hover:border-emerald-500 hover:text-emerald-500 transition-colors">3</button>
                                <span className="text-slate-400 px-2">...</span>
                                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm hover:border-emerald-500 hover:text-emerald-500 transition-colors">12</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
