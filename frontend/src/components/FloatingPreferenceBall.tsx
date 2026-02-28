'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings2 } from 'lucide-react';
import PreferencesModal from './PreferencesModal';
import { usePreferencesStore } from '@/store/usePreferencesStore';

export default function FloatingPreferenceBall() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const ballRef = useRef<HTMLButtonElement>(null);

    const { ballPosition, setBallPosition } = usePreferencesStore();
    const dragStartPos = useRef({ x: 0, y: 0 });
    const isActuallyDragging = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!ballRef.current) return;

        setIsDragging(true);
        isActuallyDragging.current = false;

        const rect = ballRef.current.getBoundingClientRect();
        dragStartPos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        ballRef.current.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;

        isActuallyDragging.current = true;

        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;

        // Constrain to viewport
        const boundedX = Math.max(10, Math.min(newX, window.innerWidth - 70));
        const boundedY = Math.max(10, Math.min(newY, window.innerHeight - 70));

        setBallPosition({ x: boundedX, y: boundedY });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        if (ballRef.current) {
            ballRef.current.releasePointerCapture(e.pointerId);
        }
    };

    const handleClick = () => {
        if (!isActuallyDragging.current) {
            setIsOpen(true);
        }
    };

    if (!mounted) return null;

    // Default position (bottom right) if null
    const position = ballPosition || {
        x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight - 80 : 0
    };

    return (
        <>
            <button
                ref={ballRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={handleClick}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    position: 'fixed',
                    touchAction: 'none'
                }}
                className={`z-[99] w-14 h-14 bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 group overflow-hidden ${isDragging ? 'cursor-grabbing scale-110 shadow-emerald-500/20' : 'cursor-grab'}`}
                aria-label="User Preferences"
            >
                {/* The "N" mark */}
                <span className="text-xl font-black italic tracking-tighter group-hover:hidden transition-all duration-300">N</span>
                <Settings2 className="w-6 h-6 hidden group-hover:block transition-all duration-300" />

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <PreferencesModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
