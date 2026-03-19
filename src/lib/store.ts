import { create } from 'zustand';
import { ApiKey, User } from '@/types';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

function getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
}

async function apiFetch(path: string, options: RequestInit = {}) {
    const token = getToken();
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg =
            data?.detail ||
            data?.name?.[0] ||
            data?.email?.[0] ||
            data?.password?.[0] ||
            data?.non_field_errors?.[0] ||
            'Bir hata oluştu';
        throw new Error(msg);
    }
    return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiClient(c: any): ApiKey {
    return {
        id: String(c.id),
        name: c.name,
        key: c.access_token ?? c.token_prefix ?? '',
        createdAt: c.created_at,
        lastUsed: null,
        active: c.status === 'approved' || c.status === 'active',
    };
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

    fetchApiKeys: () => Promise<void>;
    addApiKey: (name: string) => Promise<ApiKey>;
    deleteApiKey: (id: string) => Promise<void>;
    regenerateToken: (id: string) => Promise<string>;

    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
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
        set({ user, isAuthenticated: true });
        await get().fetchApiKeys();
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

    fetchApiKeys: async () => {
        const data = await apiFetch('/auth/api-clients/');
        const keys: ApiKey[] = (Array.isArray(data) ? data : data?.results ?? []).map(mapApiClient);
        set({ apiKeys: keys });
    },

    addApiKey: async (name: string) => {
        const data = await apiFetch('/auth/api-clients/', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        const storeKey = mapApiClient({ ...data, access_token: undefined });
        set((state) => ({ apiKeys: [...state.apiKeys, storeKey] }));
        // Return with full access_token for one-time display
        return { ...storeKey, key: data.access_token ?? storeKey.key };
    },

    deleteApiKey: async (id: string) => {
        await apiFetch(`/auth/api-clients/${id}/`, { method: 'DELETE' });
        set((state) => ({ apiKeys: state.apiKeys.filter((k) => k.id !== id) }));
    },

    regenerateToken: async (id: string) => {
        const data = await apiFetch(`/auth/api-clients/${id}/regenerate-token/`, { method: 'POST' });
        set((state) => ({
            apiKeys: state.apiKeys.map((k) =>
                k.id === id ? { ...k, key: data.token_prefix ?? k.key } : k
            ),
        }));
        return data.access_token as string;
    },

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
