import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PreferencesState {
    region: string;
    language: string;
    currency: string;
    theme: 'light' | 'dark';
    notifications: {
        priceAlerts: boolean;
        orderStatus: boolean;
    };
    ballPosition: { x: number; y: number } | null;
    setRegion: (region: string) => void;
    setLanguage: (lang: string) => void;
    setCurrency: (curr: string) => void;
    toggleTheme: () => void;
    updateNotifications: (key: keyof PreferencesState['notifications'], value: boolean) => void;
    setBallPosition: (pos: { x: number; y: number }) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
    persist(
        (set) => ({
            region: 'Kenya',
            language: 'English',
            currency: 'KSh',
            theme: 'light',
            notifications: {
                priceAlerts: true,
                orderStatus: true,
            },
            ballPosition: null,
            setRegion: (region) => set({ region }),
            setLanguage: (language) => set({ language }),
            setCurrency: (currency) => set({ currency }),
            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
            updateNotifications: (key, value) => set((state) => ({
                notifications: { ...state.notifications, [key]: value }
            })),
            setBallPosition: (ballPosition) => set({ ballPosition }),
        }),
        {
            name: 'clouds-mall-preferences',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
