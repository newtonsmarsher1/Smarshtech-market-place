'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/useCartStore';
import {
    CreditCard, MapPin, Truck, ChevronRight,
    ShieldCheck, ArrowLeft, Plus, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const { items, getTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const handlePlaceOrder = () => {
        setStep(3);
        // In a real app, clear cart after API call
        // clearCart(); 
    };

    if (step === 3) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-8">
                    <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-emerald-100 border border-slate-100 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-5xl">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Order Placed!</h1>
                            <p className="text-slate-500 font-medium">Your order #CM-94201 is being processed and will be delivered within 48 hours.</p>
                        </div>
                        <div className="pt-4 flex flex-col gap-4">
                            <Link href="/orders" className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-red-100 transition-all transform active:scale-95 uppercase tracking-widest text-sm">
                                Track My Order
                            </Link>
                            <Link href="/" className="text-slate-400 hover:text-red-600 font-black py-2 uppercase text-[10px] tracking-[0.2em] transition-colors">
                                Return to Shopping
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                {/* Checkout Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${step >= 1 ? 'text-red-600' : 'text-slate-300'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</span>
                            Shipping
                        </div>
                        <div className="w-12 h-0.5 bg-slate-100" />
                        <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest ${step >= 2 ? 'text-red-600' : 'text-slate-300'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</span>
                            Payment
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {step === 1 ? (
                            <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                        <MapPin className="w-7 h-7 text-red-600" /> Shipping Details
                                    </h2>
                                    <button className="text-[10px] font-black text-red-600 hover:opacity-70 uppercase tracking-widest flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Add New Address
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600/50 focus:bg-white transition-all font-bold text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                                        <input type="tel" placeholder="+254 700 000 000" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600/50 focus:bg-white transition-all font-bold text-slate-700" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Detailed Address</label>
                                        <textarea rows={3} placeholder="Apartment, Street, Area Name..." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600/50 focus:bg-white transition-all font-bold text-slate-700 resize-none"></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City / Town</label>
                                        <input type="text" placeholder="Nairobi" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600/50 focus:bg-white transition-all font-bold text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Region</label>
                                        <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600/50 focus:bg-white transition-all font-bold text-slate-700 appearance-none">
                                            <option>Nairobi County</option>
                                            <option>Mombasa County</option>
                                            <option>Kisumu County</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white font-black py-5 px-8 rounded-2xl transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-3 group"
                                >
                                    Continue to Payment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </section>
                        ) : (
                            <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                                        <CreditCard className="w-7 h-7 text-red-600" /> Select Payment
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { id: 'mpesa', name: 'M-PESA / Mobile Money', img: '📲', desc: 'Secure payment via your phone' },
                                        { id: 'card', name: 'Credit or Debit Card', img: '💳', desc: 'Visa, Mastercard supported' },
                                        { id: 'cod', name: 'Cash on Delivery', img: '💵', desc: 'Pay when you receive items' },
                                    ].map((method) => (
                                        <label key={method.id} className="flex items-center gap-6 p-6 bg-slate-50 hover:bg-red-50/50 border-2 border-transparent hover:border-red-100 rounded-[2rem] transition-all cursor-pointer group">
                                            <input type="radio" name="payment" className="w-6 h-6 text-red-600 focus:ring-red-600 border-slate-300" defaultChecked={method.id === 'mpesa'} />
                                            <div className="text-4xl group-hover:scale-110 transition-transform">{method.img}</div>
                                            <div className="flex-grow">
                                                <p className="font-black text-slate-900 uppercase text-sm tracking-tight">{method.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{method.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-red-100 transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm"
                                >
                                    Confirm & Pay KSh {getTotal().toLocaleString()}
                                </button>
                            </section>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <aside className="space-y-6 sticky top-24">
                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Order Summary</h2>
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                            {item.imageUrl || '📦'}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="font-bold text-slate-900 text-xs truncate uppercase tracking-tight">{item.name}</p>
                                            <p className="font-bold text-slate-400 text-[10px] uppercase">Qty: {item.quantity}</p>
                                            <p className="font-black text-red-600 text-xs mt-1">KSh {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex justify-between font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                                    <span>Subtotal</span>
                                    <span>KSh {getTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-baseline pt-4 border-t border-slate-50">
                                    <span className="font-black text-slate-900 uppercase text-sm tracking-widest">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-red-600 leading-none">KSh {getTotal().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="bg-emerald-600 rounded-3xl p-6 text-white text-center space-y-4 shadow-xl shadow-emerald-100">
                            <ShieldCheck className="w-10 h-10 mx-auto" />
                            <div>
                                <h3 className="font-black uppercase tracking-tight text-sm">Safe & Secure</h3>
                                <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest mt-1">Money back guarantee</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
