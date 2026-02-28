'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const Minifooter = () => {
    return (
        <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none select-none">
            <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 backdrop-blur-md rounded-full border border-slate-200/50 shadow-sm animate-pulse-slow">
                    <Sparkles className="w-2.5 h-2.5 text-blue-500 animate-spin-slow" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Clouds Technologies</span>
                    </span>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.02); opacity: 1; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Minifooter;
