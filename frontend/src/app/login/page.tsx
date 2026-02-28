'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, Lock, Hash, ArrowRight, ShieldCheck, MailWarning } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

declare global {
    interface Window {
        google: any;
    }
}

export default function LoginPage() {
    const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { googleLogin, login, setUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Load Google Identity Services script
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: "your-google-client-id-here.apps.googleusercontent.com", // This should match .env eventually
                    callback: handleGoogleResponse,
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleGoogleResponse = async (response: any) => {
        setIsSubmitting(true);
        setError('');
        try {
            await googleLogin(response.credential);
            router.push('/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Google login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleClick = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    const handleSendOtp = (e: React.MouseEvent) => {
        e.preventDefault();
        setOtpSent(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login',
                { email, password },
                { withCredentials: true }
            );
            setUser(res.data.user);
            router.push('/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-inter selection:bg-red-600/20 selection:text-red-600">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Stunning Ambient Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-pulse transition-all duration-1000" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[100px] mix-blend-multiply opacity-60" />
                    <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-[80px] mix-blend-overlay opacity-50" />
                </div>

                <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden relative z-10 border border-slate-100/50 backdrop-blur-xl group/card">

                    {/* Left Branding Panel */}
                    <div className="w-full md:w-[45%] bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-slate-900/50 opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

                        <div className="relative z-10 space-y-8 mt-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden group-hover/card:scale-110 transition-transform duration-500 p-2">
                                <img src="/logo.png" alt="CloudsMall Logo" className="w-full h-full object-contain contrast-125 brightness-110" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-5xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                                    Unlock<br />Premium<br />Shopping.
                                </h2>
                                <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-[280px]">
                                    Experience Clouds Mall. Log in to access exclusive deals, lightning-fast checkout, and personalized recommendations.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <div className="flex -space-x-3 mb-4">
                                {[
                                    'https://i.pravatar.cc/100?img=1',
                                    'https://i.pravatar.cc/100?img=2',
                                    'https://i.pravatar.cc/100?img=3',
                                    'https://i.pravatar.cc/100?img=4'
                                ].map((img, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center shadow-lg overflow-hidden relative">
                                        <img src={img} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black text-white uppercase tracking-widest">Join 100,000+ shoppers</p>
                                <p className="text-[10px] text-slate-400 font-medium">Trusted across East Africa.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Login Form */}
                    <div className="w-full md:w-[55%] p-8 md:p-14 bg-white relative">
                        <div className="max-w-[420px] mx-auto">
                            <div className="mb-10 text-center md:text-left">
                                <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">Welcome Back</h1>
                                <p className="text-slate-500 font-medium text-sm">Please sign in to continue to your account.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl flex gap-3 text-red-600 font-bold text-sm animate-in fade-in duration-300">
                                    <MailWarning className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Social Logins */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={handleGoogleClick}
                                    type="button"
                                    className="flex items-center justify-center gap-3 py-4 px-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-slate-300 hover:bg-slate-50 hover:shadow-md transition-all group font-black text-sm text-slate-700"
                                >
                                    <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.86 16.8 15.69 17.58V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                                        <path d="M12 23C14.97 23 17.46 22.02 19.26 20.34L15.69 17.58C14.71 18.24 13.46 18.66 12 18.66C9.17 18.66 6.78 16.75 5.86 14.18H2.18V17.03C3.99 20.63 7.7 23 12 23Z" fill="#34A853" />
                                        <path d="M5.86 14.18C5.63 13.49 5.49 12.76 5.49 12C5.49 11.24 5.63 10.51 5.86 9.82V6.97H2.18C1.43 8.47 1 10.18 1 12C1 13.82 1.43 15.53 2.18 17.03L5.86 14.18Z" fill="#FBBC05" />
                                        <path d="M12 5.34C13.62 5.34 15.06 5.89 16.21 6.99L19.34 3.86C17.45 2.1 14.97 1 12 1C7.7 1 3.99 3.37 2.18 6.97L5.86 9.82C6.78 7.25 9.17 5.34 12 5.34Z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-3 py-4 px-4 bg-[#1877F2]/5 border-2 border-[#1877F2]/10 text-[#1877F2] rounded-2xl hover:bg-[#1877F2]/10 hover:shadow-md transition-all group font-black text-sm">
                                    <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>

                            <div className="relative flex items-center justify-center mb-8">
                                <div className="absolute border-t-2 border-slate-100 w-full" />
                                <span className="bg-white px-4 text-xs font-black text-slate-400 uppercase tracking-widest relative z-10">Or Continue With</span>
                            </div>

                            {/* Method Toggle Slider */}
                            <div className="bg-slate-100 p-1.5 rounded-[1.25rem] flex relative mb-8 shadow-inner">
                                <button
                                    type="button"
                                    onClick={() => setLoginMethod('email')}
                                    className={`flex-1 py-3.5 text-xs font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 z-10 ${loginMethod === 'email' ? 'bg-white text-emerald-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-800 scale-95'}`}
                                >
                                    <Mail className={`w-4 h-4 ${loginMethod === 'email' ? 'text-emerald-500' : 'text-slate-400'}`} /> Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginMethod('phone')}
                                    className={`flex-1 py-3.5 text-xs font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 z-10 ${loginMethod === 'phone' ? 'bg-white text-emerald-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-800 scale-95'}`}
                                >
                                    <Phone className={`w-4 h-4 ${loginMethod === 'phone' ? 'text-emerald-500' : 'text-slate-400'}`} /> Phone Number
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {loginMethod === 'email' ? (
                                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-1 block">Email Address</label>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-emerald-500 transition-colors">
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@gmail.com"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-end pl-1 pr-2">
                                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 block">Password</label>
                                                <Link href="#" className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">Forgot?</Link>
                                            </div>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-emerald-500 transition-colors">
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-1 block">Phone Number</label>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-emerald-500 transition-colors">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="07XX XXX XXX"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-1 block">Password</label>
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-emerald-500 transition-colors">
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="password"
                                                    required
                                                    placeholder="••••••••"
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 border-t-2 border-slate-100 pt-5 mt-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-[#1da1f2] pl-1 block">SMS Verification (OTP)</label>
                                            <div className="flex gap-3">
                                                <div className="relative group/input flex-grow">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1da1f2]/50 group-focus-within/input:text-[#1da1f2] transition-colors">
                                                        <Hash className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="123456"
                                                        maxLength={6}
                                                        className="w-full pl-12 pr-4 py-4 bg-[#1da1f2]/5 rounded-2xl border-2 border-[#1da1f2]/20 focus:border-[#1da1f2] focus:bg-white focus:ring-4 focus:ring-[#1da1f2]/20 font-black text-slate-900 transition-all outline-none text-center tracking-[0.5em] placeholder:tracking-normal placeholder:font-bold"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    className={`px-6 py-4 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${otpSent ? 'bg-slate-100 text-slate-400 pointer-events-none border-2 border-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg border-2 border-transparent'}`}
                                                >
                                                    {otpSent ? 'OTP Sent' : 'Get OTP'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-emerald-600 text-white font-black text-lg py-5 rounded-[1.5rem] shadow-[0_10px_30px_-10px_rgba(5,150,105,0.4)] hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(5,150,105,0.5)] active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 w-0 group-hover/btn:w-full transition-all duration-500 ease-out z-0" />
                                        <span className="relative z-10 flex items-center gap-3">
                                            {isSubmitting ? 'Authenticating...' : 'Secure Sign In'}
                                            {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />}
                                        </span>
                                    </button>
                                </div>
                            </form>

                            <p className="text-center mt-10 text-sm font-bold text-slate-500">
                                New to Clouds Mall? <Link href="/register" className="text-red-500 hover:text-red-600 hover:underline transition-colors font-black">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
