'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InfoPage({ title, description }: { title: string, description: string }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-20 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <Info className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">{title}</h1>
                <p className="text-slate-500 font-bold text-lg mb-12 leading-relaxed">
                    {description}
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">
                    Back to Shopping <ArrowRight className="w-5 h-5" />
                </Link>
            </main>
            <Footer />
        </div>
    );
}
