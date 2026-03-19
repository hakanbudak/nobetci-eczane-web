import { create } from 'zustand';
import { ApiKey, User } from '@/types';
import { mockApiKeys } from '@/lib/mock-data';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

async function apiFetch(path: string, options: RequestInit) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg = data?.detail || data?.email?.[0] || data?.password?.[0] || data?.non_field_errors?.[0] || 'Bir hata oluştu';
        throw new Error(msg);
    }
    return data;
}

interface AppState {
    user: User | null;
    apiKeys: ApiKey[];
    isAuthenticated: boolean;
    sidebarOpen: boolean;

    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (name: string, email: string, password: string, plan: 'free' | 'pro', passwordConfirm?: string) => Promise<boolean>;

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

    login: async (email: string, password: string) => {
        const data = await apiFetch('/auth/token/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        const user: User = {
            id: '',
            name: email.split('@')[0],
            email,
            plan: 'free',
            createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, apiKeys: mockApiKeys });
        return true;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, isAuthenticated: false, apiKeys: [] });
    },

    register: async (name: string, email: string, password: string, plan: 'free' | 'pro', passwordConfirm?: string) => {
        const parts = name.trim().split(' ');
        const first_name = parts[0] || '';
        const last_name = parts.slice(1).join(' ') || '';
        await apiFetch('/auth/register/', {
            method: 'POST',
            body: JSON.stringify({ email, password, password_confirm: passwordConfirm ?? password, first_name, last_name }),
        });
        // Auto-login after register
        const tokenData = await apiFetch('/auth/token/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('access_token', tokenData.access);
        localStorage.setItem('refresh_token', tokenData.refresh);
        const user: User = {
            id: '',
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
