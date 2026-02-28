'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, Shield, LogOut, Package, Wallet, Clock, Settings, Bell, ChevronRight, UserCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, isAuthenticated, isCheckingAuth, checkAuth, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const menuItems = [
        { label: 'My Orders', icon: <Package className="w-5 h-5" />, desc: 'Track, return, or buy things again', href: '#' },
        { label: 'Cloud Wallet', icon: <Wallet className="w-5 h-5" />, desc: 'Balance: KSh 12,450', href: '#' },
        { label: 'Notifications', icon: <Bell className="w-5 h-5" />, desc: '3 new alerts', href: '#' },
        { label: 'Security', icon: <Shield className="w-5 h-5" />, desc: 'Password and 2FA', href: '#' },
    ];

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Verifying Session...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100">
                        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h1>
                        <p className="text-slate-500 font-medium mb-8">Please log in to view your profile and manage your account.</p>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                        >
                            Log In Now
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-emerald-500" />

                            <div className="relative inline-block mb-6">
                                <div className="w-28 h-28 bg-slate-100 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <UserCircle className="w-20 h-20 text-slate-300" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                                    <Shield className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-1 mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h2>
                                <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <Mail className="w-3 h-3" /> {user?.email}
                                </div>
                                <div className="inline-block mt-4 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    {user?.role} Member
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-xs font-black text-emerald-600">Active</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                                    <p className="text-xs font-black text-slate-700">Feb 2024</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full bg-white text-red-600 font-black py-5 rounded-[1.5rem] border-2 border-red-50 shadow-sm hover:bg-red-50 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Log Out Account
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Account Hub</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage your shopping experience</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                                    <Settings className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {menuItems.map((item, i) => (
                                    <a key={i} href={item.href} className="flex items-center justify-between p-8 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-slate-100">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-lg tracking-tight mb-1">{item.label}</h4>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Order History Teaser */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                                            <Clock className="w-5 h-5 text-red-500" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Waitlist</span>
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tighter mb-2">Track Your Shopping</h3>
                                    <p className="text-slate-400 text-sm font-medium max-w-md">Our new advanced order tracking system is being fine-tuned for your account. You'll be notified when it goes live.</p>
                                </div>
                                <button className="shrink-0 bg-white text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-red-50 transition-all shadow-xl active:scale-95 whitespace-nowrap">
                                    Notify Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
