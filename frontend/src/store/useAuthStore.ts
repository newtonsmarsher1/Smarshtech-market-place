import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/utils/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
    login: (userData: User) => void;
    googleLogin: (idToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: true,
            setUser: (user) => set({
                user,
                isAuthenticated: !!user,
                isCheckingAuth: false
            }),
            checkAuth: async () => {
                set({ isCheckingAuth: true });
                try {
                    const res = await api.get('/auth/me');
                    set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
                } catch (error) {
                    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
                }
            },
            login: (userData) => set({
                user: userData,
                isAuthenticated: true
            }),
            googleLogin: async (idToken: string) => {
                try {
                    const res = await api.post('/auth/google', { idToken });
                    set({ user: res.data.user, isAuthenticated: true });
                } catch (error) {
                    console.error('Google login failed:', error);
                    throw error;
                }
            },
            logout: async () => {
                try {
                    await api.post('/auth/logout');
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({ user: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: 'clouds-mall-auth',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
