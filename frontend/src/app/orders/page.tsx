'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Package, Truck, Clock, CheckCircle2,
    ChevronRight, Search, Filter, ArrowLeft,
    RefreshCcw, Star
} from 'lucide-react';
import Link from 'next/link';

const OrdersPage = () => {
    const orders = [
        {
            id: 'CM-94201',
            date: 'Feb 28, 2026',
            total: 12500,
            status: 'Processing',
            items: [
                { name: 'Wireless Headphones', qty: 1, img: '🎧' }
            ],
            color: 'text-blue-600 bg-blue-50'
        },
        {
            id: 'CM-88392',
            date: 'Feb 22, 2026',
            total: 3450,
            status: 'Delivered',
            items: [
                { name: 'Smart Watch', qty: 1, img: '⌚' },
                { name: 'Phone Case', qty: 2, img: '📱' }
            ],
            color: 'text-emerald-600 bg-emerald-50'
        },
        {
            id: 'CM-87103',
            date: 'Feb 15, 2026',
            total: 890,
            status: 'Cancelled',
            items: [
                { name: 'Gaming Mouse', qty: 1, img: '🖱️' }
            ],
            color: 'text-slate-400 bg-slate-50'
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="p-2 hover:bg-white rounded-full transition-colors text-slate-500 hover:text-red-600 shadow-sm border border-transparent hover:border-slate-200">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Order History</h1>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
                        <div className="relative flex-grow md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-red-600/20 transition-all" />
                        </div>
                        <button className="p-2 border border-slate-100 hover:bg-slate-50 rounded-xl transition-colors">
                            <Filter className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mb-8 overflow-x-auto pb-4 custom-scrollbar">
                    {['All Orders', 'Ongoing', 'Delivered', 'Cancelled'].map((tab, i) => (
                        <button key={i} className={`whitespace-nowrap font-black text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${i === 0 ? 'border-red-600 text-red-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            {/* Order Header */}
                            <div className="px-8 py-5 border-b border-slate-50 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                                        <p className="font-black text-slate-900 text-sm uppercase">{order.id}</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-100" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placed On</p>
                                        <p className="font-bold text-slate-600 text-sm">{order.date}</p>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-100" />
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                                        <p className="font-black text-red-600 text-sm uppercase">KSh {order.total.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] ${order.color}`}>
                                    {order.status === 'Processing' && <Clock className="w-3.5 h-3.5" />}
                                    {order.status === 'Delivered' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    {order.status}
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="p-8 flex flex-col md:flex-row gap-8 justify-between">
                                <div className="flex-grow space-y-6">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex gap-6 items-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform">
                                                {item.img}
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.name}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quantity: {item.qty}</p>
                                                {order.status === 'Delivered' && (
                                                    <button className="flex items-center gap-1.5 text-[10px] font-black text-red-600 uppercase tracking-widest mt-2 hover:opacity-70 transition-opacity">
                                                        <Star className="w-3 h-3 fill-current" /> Rate Product
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 justify-center min-w-[200px]">
                                    <button className="w-full bg-slate-900 text-white font-black py-3 px-6 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                        Order Details <ChevronRight className="w-3 h-3" />
                                    </button>
                                    {order.status === 'Delivered' && (
                                        <button className="w-full bg-white border border-slate-100 text-slate-500 font-black py-3 px-6 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                            <RefreshCcw className="w-3 h-3" /> Buy Again
                                        </button>
                                    )}
                                    {order.status === 'Processing' && (
                                        <button className="w-full bg-emerald-600 text-white font-black py-3 px-6 rounded-xl text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all">
                                            Track Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No More Orders */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No more orders found</p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrdersPage;
