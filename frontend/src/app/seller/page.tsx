'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    LayoutDashboard, Package, ShoppingCart, TrendingUp,
    Plus, DollarSign, Users, Bell, Settings, ChevronRight,
    Store, AlertCircle, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const SellerHub = () => {
    const stats = [
        { label: 'Total Sales', value: 'KSh 142,500', icon: <DollarSign className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Orders', value: '24', icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
        { label: 'Products', value: '12', icon: <Package className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
        { label: 'Visitors', value: '1,204', icon: <Users className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    ];

    const recentProducts = [
        { id: '1', name: 'Smart Tech Bundle', price: 15000, stock: 5, sales: 12, status: 'Active' },
        { id: '2', name: 'Wireless Headphones', price: 4500, stock: 20, sales: 45, status: 'Active' },
        { id: '3', name: 'Gaming Mouse', price: 2100, stock: 0, sales: 8, status: 'Out of Stock' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 space-y-4">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 overflow-hidden">
                        <div className="flex items-center gap-3 mb-8 px-2">
                            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-slate-100 bg-white flex items-center justify-center p-1">
                                <img src="/logo.png" alt="CloudsMall Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="font-black text-slate-900 leading-tight uppercase text-sm tracking-tight">Seller Hub</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clouds Mall Official</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {[
                                { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, active: true, href: '/seller' },
                                { label: 'Products', icon: <Package className="w-5 h-5" />, href: '/seller/products' },
                                { label: 'Orders', icon: <ShoppingCart className="w-5 h-5" />, href: '/seller/orders' },
                                { label: 'Analytics', icon: <TrendingUp className="w-5 h-5" />, href: '/seller/analytics' },
                                { label: 'Customers', icon: <Users className="w-5 h-5" />, href: '/seller/customers' },
                                { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/seller/settings' },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={`flex items-center justify-between p-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${item.active ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:bg-slate-50 hover:text-red-600'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {!item.active && <ChevronRight className="w-4 h-4 text-slate-300" />}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Become a Star Seller</p>
                            <h3 className="text-xl font-black leading-tight uppercase tracking-tight">Boost Your Sales by 40%</h3>
                            <button className="bg-white text-indigo-900 font-black py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                                Read Guide
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-grow space-y-8">
                    {/* Header Action */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Dashboard Overview</h1>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Saturday, February 28th 2026</p>
                        </div>
                        <Link href="/seller/add-product" className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-red-100 transition-all transform active:scale-95 uppercase tracking-widest text-xs">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Add New Product
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4 shadow-inner`}>
                                    {stat.icon}
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Alert Banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-center gap-6">
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-black text-amber-900 uppercase text-xs tracking-tight">Product Verification Required</h3>
                            <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">3 items are waiting for admin approval before they can go live.</p>
                        </div>
                        <button className="bg-amber-600 text-white font-black py-2 px-6 rounded-xl text-[10px] uppercase tracking-widest hover:bg-amber-700 transition-colors">
                            Review Now
                        </button>
                    </div>

                    {/* Quick Inventory Table */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Inventory</h2>
                            <Link href="/seller/products" className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">View All Products →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-8 py-4">Product Info</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Sales</th>
                                        <th className="px-8 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentProducts.map((prod) => (
                                        <tr key={prod.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                                        📦
                                                    </div>
                                                    <span className="font-bold text-slate-900 text-sm uppercase truncate max-w-[150px]">{prod.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2">
                                                    {prod.status === 'Active' ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                                    )}
                                                    <span className={`text-[10px] font-black uppercase ${prod.status === 'Active' ? 'text-emerald-600' : 'text-red-600'}`}>{prod.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 font-black text-sm text-slate-900">KSh {prod.price.toLocaleString()}</td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${prod.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                    <span className="font-bold text-slate-600 text-xs">{prod.stock} Units</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 font-bold text-slate-600 text-xs">{prod.sales} Sold</td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors">
                                                    Edit Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SellerHub;
