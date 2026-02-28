'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Package, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-slate-600 pt-20 pb-10 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shadow-sm border border-slate-100 bg-white flex items-center justify-center p-1">
                            <img src="/logo.png" alt="CloudsMall Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">Clouds<span className="text-red-600 italic">Mall</span></span>
                    </Link>
                    <p className="text-slate-500 leading-relaxed font-bold uppercase text-xs tracking-widest">
                        Kenya's NO.1 Professional Marketplace
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="p-3 bg-slate-100 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 bg-slate-100 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 bg-slate-100 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Company */}
                <div className="space-y-6">
                    <h4 className="text-slate-900 font-black uppercase text-sm tracking-widest">About Clouds Mall</h4>
                    <ul className="space-y-3 font-bold text-sm">
                        <li><Link href="/about" className="hover:text-red-600 transition-colors uppercase tracking-tight">Our Story</Link></li>
                        <li><Link href="/seller/register" className="hover:text-red-600 transition-colors uppercase tracking-tight">Sell on CloudsMall</Link></li>
                        <li><Link href="/careers" className="hover:text-red-600 transition-colors uppercase tracking-tight">Careers</Link></li>
                        <li><Link href="/terms" className="hover:text-red-600 transition-colors uppercase tracking-tight">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Help */}
                <div className="space-y-6">
                    <h4 className="text-slate-900 font-black uppercase text-sm tracking-widest">Customer Service</h4>
                    <ul className="space-y-3 font-bold text-sm">
                        <li><Link href="/help" className="hover:text-red-600 transition-colors uppercase tracking-tight">Help Center</Link></li>
                        <li><Link href="/contact" className="hover:text-red-600 transition-colors uppercase tracking-tight">Contact Us</Link></li>
                        <li><Link href="/shipping" className="hover:text-red-600 transition-colors uppercase tracking-tight">Shipping Info</Link></li>
                        <li><Link href="/returns" className="hover:text-red-600 transition-colors uppercase tracking-tight">Return Policy</Link></li>
                    </ul>
                </div>

                {/* Trust & Payment */}
                <div className="space-y-6">
                    <h4 className="text-slate-900 font-black uppercase text-sm tracking-widest">Trusted Shopping</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center gap-2 border border-slate-100">
                            <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            <span className="text-[10px] font-black text-center leading-tight uppercase tracking-tighter">Buyer Protection</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center gap-2 border border-slate-100">
                            <HelpCircle className="w-6 h-6 text-blue-600" />
                            <span className="text-[10px] font-black text-center leading-tight uppercase tracking-tighter">Expert Help</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Payments via</p>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center font-black text-[10px] text-emerald-600 border border-slate-200">M-PESA</div>
                            <div className="w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center font-black text-[10px] text-blue-600 border border-slate-200">VISA</div>
                            <div className="w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center font-black text-[10px] text-slate-900 border border-slate-200">MASTERCARD</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                <p>© 2026 Clouds Mall Kenya. Africa's Choice.</p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-red-600">Privacy</Link>
                    <Link href="/legal" className="hover:text-red-600">Legal</Link>
                    <Link href="/cookies" className="hover:text-red-600">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
