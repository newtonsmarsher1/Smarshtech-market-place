'use client';

import { X, Globe, Moon, Sun, Bell, DollarSign, Check } from 'lucide-react';
import { usePreferencesStore } from '@/store/usePreferencesStore';
import { useEffect, useState } from 'react';

interface PreferencesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
    const prefs = usePreferencesStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-white/50 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Preferences</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Customize Your Mall Experience</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* Region Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <Globe className="w-4 h-4" /> Regional Settings
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => prefs.setRegion('Kenya')}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-xs ${prefs.region === 'Kenya' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                            >
                                🇰🇪 Kenya {prefs.region === 'Kenya' && <Check className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => prefs.setRegion('Global')}
                                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-xs ${prefs.region === 'Global' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                            >
                                🌍 Global {prefs.region === 'Global' && <Check className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Currency Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <DollarSign className="w-4 h-4" /> Currency
                        </div>
                        <div className="flex gap-4">
                            {['KSh', 'USD'].map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => prefs.setCurrency(curr)}
                                    className={`px-6 py-3 rounded-xl font-black text-xs transition-all ${prefs.currency === curr ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <Moon className="w-4 h-4" /> Display Mode
                        </div>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                            <button
                                onClick={() => prefs.theme !== 'light' && prefs.toggleTheme()}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${prefs.theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                            >
                                <Sun className="w-4 h-4" /> Light
                            </button>
                            <button
                                onClick={() => prefs.theme !== 'dark' && prefs.toggleTheme()}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${prefs.theme === 'dark' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                            >
                                <Moon className="w-4 h-4" /> Dark
                            </button>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <Bell className="w-4 h-4" /> Notifications
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: 'priceAlerts', label: 'Price Drop Alerts', desc: 'Notify me when items in my cart get cheaper' },
                                { id: 'orderStatus', label: 'Order Updates', desc: 'Updates on delivery and payment status' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:border-slate-200">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.label}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={prefs.notifications[item.id as keyof typeof prefs.notifications]}
                                            onChange={(e) => prefs.updateNotifications(item.id as any, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-xl text-xs uppercase tracking-widest"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}
