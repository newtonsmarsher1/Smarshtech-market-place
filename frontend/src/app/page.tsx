'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  ArrowRight, Smartphone, Tv, Shirt, Home, Heart, Apple, Settings,
  Baby, Car, Watch, ShoppingBag, Zap, Flame, Star, ChevronRight, Menu,
  Filter, ShoppingCart, Search, Sparkles
} from 'lucide-react';

function HomeContent() {
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
      name: 'iPhone 15 Pro Max (256GB)',
      price: 185000,
      oldPrice: 195000,
      category: 'Phones & Accessories',
      rating: 4.9,
      reviews: 1250,
      status: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '10',
      name: 'Dyson V15 Detect Vacuum',
      price: 95000,
      oldPrice: 105000,
      category: 'Appliances',
      rating: 4.8,
      reviews: 89,
      status: '',
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '11',
      name: 'Levi\'s 501 Original Fit Jeans',
      price: 7500,
      oldPrice: 9000,
      category: 'Fashion',
      rating: 4.7,
      reviews: 1540,
      status: '',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '12',
      name: 'KitchenAid Artisan Stand Mixer',
      price: 65000,
      oldPrice: 75000,
      category: 'Kitchen',
      rating: 4.9,
      reviews: 512,
      status: 'Professional',
      image: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8a847?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '13',
      name: 'Bose QuietComfort Earbuds II',
      price: 28000,
      oldPrice: 32000,
      category: 'Electronics',
      rating: 4.8,
      reviews: 245,
      status: '',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '14',
      name: 'Apple Watch Ultra 2',
      price: 115000,
      oldPrice: 125000,
      category: 'Watches',
      rating: 4.9,
      reviews: 178,
      status: 'New',
      image: 'https://images.unsplash.com/photo-1434493907317-a46b5bc78344?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '15',
      name: 'Razer DeathAdder V3 Pro Mouse',
      price: 16500,
      oldPrice: 18500,
      category: 'Gaming',
      rating: 4.7,
      reviews: 321,
      status: '',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '16',
      name: 'La Mer Crème de la Mer 60ml',
      price: 45000,
      oldPrice: 50000,
      category: 'Beauty',
      rating: 4.8,
      reviews: 124,
      status: 'Luxury',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '17',
      name: 'GoPro HERO12 Black',
      price: 58000,
      oldPrice: 65000,
      category: 'Electronics',
      rating: 4.7,
      reviews: 89,
      status: '',
      image: 'https://images.unsplash.com/photo-1565349195357-741607fef3ad?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '18',
      name: 'Nintendo Switch OLED Model',
      price: 48000,
      oldPrice: 55000,
      category: 'Gaming',
      rating: 4.9,
      reviews: 1560,
      status: 'Popular',
      image: 'https://images.unsplash.com/photo-1578303372764-1e436093ca63?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '19',
      name: 'T-Shirts Multipack (5-Pack)',
      price: 3500,
      oldPrice: 5000,
      category: 'Fashion',
      rating: 4.5,
      reviews: 125,
      status: 'Value Pick',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '20',
      name: 'Philips Air Fryer XXL',
      price: 38000,
      oldPrice: 45000,
      category: 'Kitchen',
      rating: 4.8,
      reviews: 876,
      status: '',
      image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '21',
      name: 'Sony A7 IV Mirrorless Camera',
      price: 320000,
      oldPrice: 350000,
      category: 'Electronics',
      rating: 5.0,
      reviews: 43,
      status: 'Pro',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '22',
      name: 'Ray-Ban Classic Aviator',
      price: 18500,
      oldPrice: 22000,
      category: 'Fashion',
      rating: 4.8,
      reviews: 567,
      status: '',
      image: 'https://images.unsplash.com/photo-1511499767010-a588b5b2f126?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '23',
      name: 'Instant Pot Pro 10-in-1',
      price: 24000,
      oldPrice: 28000,
      category: 'Kitchen',
      rating: 4.7,
      reviews: 1240,
      status: '',
      image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '24',
      name: 'Yeti Rambler 20 oz Tumbler',
      price: 5500,
      oldPrice: 7000,
      category: 'Home & Kitchen',
      rating: 4.9,
      reviews: 2341,
      status: 'Elite',
      image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const categories = [
    { name: 'All Items', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Electronics', icon: <Tv className="w-5 h-5" /> },
    { name: 'Fashion', icon: <Shirt className="w-5 h-5" /> },
    { name: 'Phones & Accessories', icon: <Smartphone className="w-5 h-5" /> },
    { name: 'Home & Kitchen', icon: <Home className="w-5 h-5" /> },
    { name: 'Health & Beauty', icon: <Heart className="w-5 h-5" /> },
    { name: 'Appliances', icon: <Zap className="w-5 h-5" /> },
    { name: 'Groceries', icon: <Apple className="w-5 h-5" /> },
    { name: 'Computers', icon: <Tv className="w-5 h-5" /> },
    { name: 'Gaming', icon: <Zap className="w-5 h-5" /> },
    { name: 'Kitchen', icon: <Home className="w-5 h-5" /> }
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const initialCategory = searchParams.get('category') || 'All Items';
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
      router.push('/');
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-4">
        {/* Hero section stays for branding */}
        <section className="flex gap-4 h-[400px] mb-12">
          {/* Sidebar Categories */}
          <aside className="w-64 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden hidden lg:flex">
            <div className="bg-red-600 text-white p-4 flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded-md p-0.5 flex items-center justify-center">
                <img src="/logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <span className="font-black uppercase tracking-wider text-xs">Categories</span>
            </div>
            <div className="flex-grow overflow-y-auto py-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`w-full flex justify-between items-center px-4 py-2.5 text-sm transition-all group ${selectedCategory === cat.name ? 'bg-red-50 text-red-600 font-black' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600 font-bold'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={selectedCategory === cat.name ? 'text-red-600' : 'text-slate-400 group-hover:text-red-500'}>{cat.icon}</span>
                    {cat.name}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all ${selectedCategory === cat.name ? 'text-red-600 translate-x-1' : 'text-slate-300 group-hover:text-red-400 translate-x-0 group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* Hero Slider Area */}
          <div className="flex-grow relative rounded-[2.5rem] overflow-hidden bg-slate-900 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-indigo-900 opacity-90" />
            <div className="absolute top-0 right-0 w-full h-full opacity-10 blur-3xl pointer-events-none">
              <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full" />
            </div>
            <div className="relative z-10 h-full p-12 flex flex-col justify-center">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                Smart Tech Sale
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-4">
                UP TO <span className="text-yellow-400 italic">50% OFF</span>
              </h1>
              <p className="text-lg text-white/80 font-bold tracking-wide mb-8">Premium Electronics & More</p>
              <button className="bg-white text-red-600 hover:bg-red-50 font-black py-4 px-10 rounded-2xl w-fit shadow-xl transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-widest">
                EXPLORE DEALS
              </button>
            </div>

            {/* Abstract Visual */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block w-72 h-72 bg-white/10 rounded-full border border-white/20 backdrop-blur-3xl animate-pulse" />
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar (Mobile or duplicated for consistency) */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 sticky top-28">
              <h3 className="text-sm font-black text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-2">
                <Filter className="w-4 h-4 text-red-600" /> Filter Options
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Price Range</h4>
                  <div className="flex items-center gap-3">
                    <input type="number" placeholder="Min" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:border-red-500 outline-none" />
                    <span className="text-slate-300">-</span>
                    <input type="number" placeholder="Max" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:border-red-500 outline-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Rating</h4>
                  <div className="space-y-3">
                    {[5, 4, 3].map(rating => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-red-500 transition-colors" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                          ))}
                          <span className="text-[10px] font-bold text-slate-500 ml-2">& Up</span>
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
            <div className="flex justify-between items-center mb-10 px-2">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {selectedCategory === 'All Items' ? 'Everything For You' : selectedCategory}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort:</span>
                <select className="bg-transparent border-none text-xs font-black text-red-600 outline-none cursor-pointer">
                  <option>Recommended</option>
                  <option>Newest</option>
                  <option>Price: Low</option>
                  <option>Price: High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col relative overflow-hidden">
                  {/* Status Tag */}
                  {product.status && (
                    <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest bg-red-600 text-white rounded shadow-md">
                      {product.status}
                    </div>
                  )}

                  {/* Image Box */}
                  <div className="aspect-square bg-slate-50 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100" />
                  </div>

                  <div className="space-y-1.5 flex-grow flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <span className="text-[7px] font-black text-red-500 uppercase tracking-widest border border-red-50/50 px-1 py-0.5 rounded-full">{product.category}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                        <span className="text-[8px] font-bold text-slate-700">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-[10px] font-black text-slate-900 leading-tight line-clamp-2 uppercase tracking-tighter">
                      {product.name}
                    </h3>

                    <div className="pt-1 flex items-center justify-between">
                      <div>
                        {/* <p className="text-[7px] font-bold text-slate-400 line-through">KSh {product.oldPrice.toLocaleString()}</p> */}
                        <p className="text-xs font-black text-red-600 leading-none">KSh {product.price.toLocaleString()}</p>
                      </div>
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
                        className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm group/cart"
                      >
                        <ShoppingCart className="w-3 h-3 group-hover/cart:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Support Section at Bottom (Burner) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 mb-8">
          {[
            { icon: '🚛', title: 'Free Delivery', desc: 'Over KSh 2,500', color: 'bg-emerald-600' },
            { icon: '💳', title: 'Secure Payment', desc: '100% Protected', color: 'bg-indigo-600' },
            { icon: '🕒', title: '24/7 Support', desc: 'Dedicated Team', color: 'bg-red-600' }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-4 rounded-2xl flex items-center gap-4 shadow-lg text-white`}>
              <div className="text-2xl bg-white/20 p-2.5 rounded-xl">{item.icon}</div>
              <div>
                <p className="text-sm font-black leading-tight uppercase tracking-tight">{item.title}</p>
                <p className="text-[10px] font-medium opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
