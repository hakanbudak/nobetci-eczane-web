import { create } from 'zustand';
import { ApiKey, User, DashboardStats, UsageData, EndpointUsage, RecentRequest } from '@/types';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

const ENDPOINT_COLORS = ['#00d97e', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316'];

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
            data?.current_password?.[0] ||
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
        planName: c.plan?.name ?? '—',
        todayRequestCount: c.today_request_count ?? 0,
        effectiveDailyLimit: c.effective_daily_limit ?? null,
        remainingRequests: c.remaining_requests ?? null,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapStats(d: any): DashboardStats {
    return {
        totalRequests: d.total_requests ?? 0,
        successRate: d.success_rate ?? 0,
        remainingQuota: d.remaining_requests ?? 0,
        activeKeys: d.active_keys_count ?? 0,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRecentRequest(r: any): RecentRequest {
    return {
        id: String(r.id),
        timestamp: r.timestamp,
        endpoint: r.endpoint,
        status: r.status_code,
        responseTime: r.response_time_ms,
        ip: r.ip_address,
    };
}

interface AppState {
    user: User | null;
    apiKeys: ApiKey[];
    isAuthenticated: boolean;
    sidebarOpen: boolean;

    // Dashboard
    stats: DashboardStats | null;
    usageData: UsageData[];
    endpointUsage: EndpointUsage[];
    recentRequests: RecentRequest[];

    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (name: string, email: string, password: string, plan: 'free' | 'pro', passwordConfirm?: string) => Promise<boolean>;

    fetchUserProfile: () => Promise<void>;
    updateUserProfile: (firstName: string, lastName: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;

    fetchDashboard: () => Promise<void>;

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
    stats: null,
    usageData: [],
    endpointUsage: [],
    recentRequests: [],

    setUser: (user) => set({ user }),

    login: async (email: string, password: string) => {
        const data = await apiFetch('/auth/token/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        set({ isAuthenticated: true });
        await get().fetchUserProfile();
        await get().fetchApiKeys();
        return true;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, isAuthenticated: false, apiKeys: [], stats: null, usageData: [], endpointUsage: [], recentRequests: [] });
    },

    register: async (name: string, email: string, password: string, _plan: 'free' | 'pro', passwordConfirm?: string) => {
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
        set({ isAuthenticated: true });
        await get().fetchUserProfile();
        return true;
    },

    fetchUserProfile: async () => {
        const data = await apiFetch('/auth/me/');
        const user: User = {
            id: String(data.id),
            name: [data.first_name, data.last_name].filter(Boolean).join(' ') || data.email.split('@')[0],
            email: data.email,
            plan: 'free',
            createdAt: data.date_joined,
        };
        set({ user });
    },

    updateUserProfile: async (firstName: string, lastName: string) => {
        await apiFetch('/auth/me/', {
            method: 'PATCH',
            body: JSON.stringify({ first_name: firstName, last_name: lastName }),
        });
        const current = get().user;
        if (current) {
            set({ user: { ...current, name: [firstName, lastName].filter(Boolean).join(' ') } });
        }
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        await apiFetch('/auth/password/change/', {
            method: 'POST',
            body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
        });
    },

    fetchDashboard: async () => {
        const [statsData, usageData, endpointData, recentData] = await Promise.all([
            apiFetch('/auth/dashboard/stats/'),
            apiFetch('/auth/dashboard/usage/?days=30'),
            apiFetch('/auth/dashboard/endpoint-usage/'),
            apiFetch('/auth/dashboard/recent-requests/?limit=20'),
        ]);
        set({
            stats: mapStats(statsData),
            usageData: Array.isArray(usageData) ? usageData : [],
            endpointUsage: (Array.isArray(endpointData) ? endpointData : []).map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ep: any, i: number) => ({ name: ep.endpoint, count: ep.count, color: ENDPOINT_COLORS[i % ENDPOINT_COLORS.length] })
            ),
            recentRequests: (Array.isArray(recentData) ? recentData : []).map(mapRecentRequest),
        });
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
