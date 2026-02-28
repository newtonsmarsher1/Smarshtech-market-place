'use client';

import { usePreferencesStore } from '@/store/usePreferencesStore';
import { useEffect } from 'react';

export default function ThemeHandler() {
    const { theme } = usePreferencesStore();

    useEffect(() => {
        // Apply theme to the root HTML element
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return null; // This component doesn't render anything
}
