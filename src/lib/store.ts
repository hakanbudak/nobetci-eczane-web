import { create } from 'zustand';
import { ApiKey, User } from '@/types';
import { mockUser, mockApiKeys } from '@/lib/mock-data';

interface AppState {
    user: User | null;
    apiKeys: ApiKey[];
    isAuthenticated: boolean;
    sidebarOpen: boolean;

    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (name: string, email: string, password: string, plan: 'free' | 'pro') => Promise<boolean>;

    addApiKey: (name: string) => ApiKey;
    deleteApiKey: (id: string) => void;
    toggleApiKey: (id: string) => void;

    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

function generateApiKey(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk_live_';
    for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

export const useAppStore = create<AppState>((set, get) => ({
    user: null,
    apiKeys: [],
    isAuthenticated: false,
    sidebarOpen: true,

    setUser: (user) => set({ user }),

    login: async (email: string, _password: string) => {
        // Simulate API call
        await new Promise((r) => setTimeout(r, 800));
        const user = { ...mockUser, email };
        set({ user, isAuthenticated: true, apiKeys: mockApiKeys });
        return true;
    },

    logout: () => {
        set({ user: null, isAuthenticated: false, apiKeys: [] });
    },

    register: async (name: string, email: string, _password: string, plan: 'free' | 'pro') => {
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
            id: 'usr_' + Math.random().toString(36).slice(2),
            name,
            email,
            plan,
            createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, apiKeys: [] });
        return true;
    },

    addApiKey: (name: string) => {
        const newKey: ApiKey = {
            id: 'key_' + Math.random().toString(36).slice(2),
            name,
            key: generateApiKey(),
            createdAt: new Date().toISOString(),
            lastUsed: null,
            active: true,
        };
        set((state) => ({ apiKeys: [...state.apiKeys, newKey] }));
        return newKey;
    },

    deleteApiKey: (id: string) => {
        set((state) => ({ apiKeys: state.apiKeys.filter((k) => k.id !== id) }));
    },

    toggleApiKey: (id: string) => {
        set((state) => ({
            apiKeys: state.apiKeys.map((k) =>
                k.id === id ? { ...k, active: !k.active } : k
            ),
        }));
    },

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
