'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Package, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-slate-600 pt-10 pb-6 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {/* Brand */}
                <div className="space-y-4 col-span-2 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm border border-slate-100 bg-white flex items-center justify-center p-1">
                            <img src="/logo.png" alt="CloudsMall Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tighter">Clouds<span className="text-red-600 italic">Mall</span></span>
                    </Link>
                    <p className="text-slate-500 leading-tight font-bold uppercase text-[10px] tracking-wider max-w-[200px]">
                        Kenya's NO.1 Professional Marketplace
                    </p>
                    <div className="flex space-x-3">
                        <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Company */}
                <div className="space-y-4">
                    <h4 className="text-slate-900 font-black uppercase text-[11px] tracking-widest">About Clouds Mall</h4>
                    <ul className="space-y-2 font-bold text-xs">
                        <li><Link href="/about" className="hover:text-red-600 transition-colors uppercase tracking-tight">Our Story</Link></li>
                        <li><Link href="/seller/register" className="hover:text-red-600 transition-colors uppercase tracking-tight">Sell on CloudsMall</Link></li>
                        <li><Link href="/careers" className="hover:text-red-600 transition-colors uppercase tracking-tight">Careers</Link></li>
                        <li><Link href="/terms" className="hover:text-red-600 transition-colors uppercase tracking-tight">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Help */}
                <div className="space-y-4">
                    <h4 className="text-slate-900 font-black uppercase text-[11px] tracking-widest">Customer Service</h4>
                    <ul className="space-y-2 font-bold text-xs">
                        <li><Link href="/help" className="hover:text-red-600 transition-colors uppercase tracking-tight">Help Center</Link></li>
                        <li><Link href="/contact" className="hover:text-red-600 transition-colors uppercase tracking-tight">Contact Us</Link></li>
                        <li><Link href="/shipping" className="hover:text-red-600 transition-colors uppercase tracking-tight">Shipping Info</Link></li>
                        <li><Link href="/returns" className="hover:text-red-600 transition-colors uppercase tracking-tight">Return Policy</Link></li>
                    </ul>
                </div>

                {/* Trust & Payment */}
                <div className="space-y-4">
                    <h4 className="text-slate-900 font-black uppercase text-[11px] tracking-widest">Trusted Shopping</h4>
                    <div className="flex gap-3">
                        <div className="bg-slate-50 p-2 rounded-lg flex flex-col items-center gap-1 border border-slate-100 flex-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span className="text-[8px] font-black text-center leading-tight uppercase tracking-tighter">Buyer Protection</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg flex flex-col items-center gap-1 border border-slate-100 flex-1">
                            <HelpCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-[8px] font-black text-center leading-tight uppercase tracking-tighter">Expert Help</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Payments via</p>
                        <div className="flex gap-2 items-center">
                            <div className="px-2 py-1 bg-slate-50 rounded border border-slate-100 font-black text-[8px] text-emerald-600">M-PESA</div>
                            <div className="px-2 py-1 bg-slate-50 rounded border border-slate-100 font-black text-[8px] text-blue-600">VISA</div>
                            <div className="px-2 py-1 bg-slate-50 rounded border border-slate-100 font-black text-[8px] text-slate-900">MASTERCARD</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <p>© 2026 Clouds Mall Kenya. Africa's Choice.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-red-600">Privacy</Link>
                    <Link href="/legal" className="hover:text-red-600">Legal</Link>
                    <Link href="/cookies" className="hover:text-red-600">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
