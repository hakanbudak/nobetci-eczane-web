import { ApiKey, DashboardStats, UsageData, EndpointUsage, RecentRequest, Plan, Invoice, Pharmacy } from '@/types';

export const mockUser = {
    id: 'usr_1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    plan: 'pro' as const,
    createdAt: '2024-11-15T10:00:00Z',
};

export const mockStats: DashboardStats = {
    totalRequests: 24583,
    successRate: 99.7,
    remainingQuota: 25417,
    activeKeys: 3,
};

export const mockUsageData: UsageData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        date: date.toISOString().split('T')[0],
        successful: Math.floor(Math.random() * 800) + 200,
        failed: Math.floor(Math.random() * 30) + 2,
    };
});

export const mockEndpointUsage: EndpointUsage[] = [
    { name: '/pharmacies/duty', count: 12450, color: '#00d97e' },
    { name: '/pharmacies/all', count: 5230, color: '#0ea5e9' },
    { name: '/cities', count: 3120, color: '#8b5cf6' },
    { name: '/districts', count: 2180, color: '#f59e0b' },
    { name: '/pharmacies/{id}', count: 1603, color: '#ef4444' },
];

export const mockRecentRequests: RecentRequest[] = [
    { id: '1', timestamp: '2025-01-15T14:30:12Z', endpoint: 'GET /pharmacies/duty', status: 200, responseTime: 89, ip: '192.168.1.1' },
    { id: '2', timestamp: '2025-01-15T14:29:58Z', endpoint: 'GET /pharmacies/all', status: 200, responseTime: 112, ip: '10.0.0.55' },
    { id: '3', timestamp: '2025-01-15T14:29:45Z', endpoint: 'GET /cities', status: 200, responseTime: 45, ip: '172.16.0.12' },
    { id: '4', timestamp: '2025-01-15T14:29:30Z', endpoint: 'GET /pharmacies/duty', status: 400, responseTime: 23, ip: '192.168.1.1' },
    { id: '5', timestamp: '2025-01-15T14:29:15Z', endpoint: 'GET /pharmacies/duty', status: 200, responseTime: 95, ip: '10.0.0.55' },
    { id: '6', timestamp: '2025-01-15T14:29:00Z', endpoint: 'GET /districts/34', status: 200, responseTime: 67, ip: '172.16.0.12' },
    { id: '7', timestamp: '2025-01-15T14:28:45Z', endpoint: 'GET /pharmacies/duty', status: 429, responseTime: 12, ip: '192.168.1.1' },
    { id: '8', timestamp: '2025-01-15T14:28:30Z', endpoint: 'GET /pharmacies/all', status: 200, responseTime: 134, ip: '10.0.0.55' },
];

export const mockApiKeys: ApiKey[] = [
    { id: 'key_1', name: 'Production App', key: 'mock_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', createdAt: '2024-12-01T10:00:00Z', lastUsed: '2025-01-15T14:30:00Z', active: true, planName: 'Pro', todayRequestCount: 1200, effectiveDailyLimit: 50000, remainingRequests: 48800, allowedDomains: [], allowedIps: [] },
    { id: 'key_2', name: 'Test Environment', key: 'mock_test_q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2', createdAt: '2024-12-15T10:00:00Z', lastUsed: '2025-01-14T18:00:00Z', active: true, planName: 'Free', todayRequestCount: 80, effectiveDailyLimit: 100, remainingRequests: 20, allowedDomains: [], allowedIps: [] },
    { id: 'key_3', name: 'Mobile App', key: 'mock_live_g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8', createdAt: '2025-01-05T10:00:00Z', lastUsed: null, active: false, planName: 'Free', todayRequestCount: 0, effectiveDailyLimit: 100, remainingRequests: 100, allowedDomains: [], allowedIps: [] },
];

export const plans: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        yearlyPrice: 0,
        quota: '500 istek/gün',
        features: [
            'Temel endpoint erişimi',
            'İl bazlı sorgulama',
            'JSON format',
            'Topluluk desteği',
            'Günlük 500 istek limiti',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 299,
        yearlyPrice: 239,
        quota: '50.000 istek/gün',
        popular: true,
        features: [
            'Tüm endpoint\'lere erişim',
            'Konum bazlı sorgulama',
            'JSON + XML format',
            'Öncelikli e-posta desteği',
            'Günlük 50.000 istek',
            'Webhook desteği',
            'Detaylı analytics',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 999,
        yearlyPrice: 799,
        quota: 'Sınırsız',
        features: [
            'Sınırsız API erişimi',
            'Tüm veri formatları',
            '%99.9 SLA garantisi',
            '7/24 özel destek',
            'White-label seçeneği',
            'Özel entegrasyon desteği',
            'Veri dışa aktarma',
            'Öncelikli altyapı',
        ],
    },
];

export const mockInvoices: Invoice[] = [
    { id: 'inv_1', date: '2025-01-01', amount: 299, status: 'paid', description: 'Pro Plan - Ocak 2025' },
    { id: 'inv_2', date: '2024-12-01', amount: 299, status: 'paid', description: 'Pro Plan - Aralık 2024' },
    { id: 'inv_3', date: '2024-11-01', amount: 299, status: 'paid', description: 'Pro Plan - Kasım 2024' },
];

export const mockPharmacies: Pharmacy[] = [
    {
        id: 'eczane_1',
        name: 'Merkez Eczanesi',
        address: 'Bağcılar Mah. Atatürk Cad. No:5',
        phone: '0212 555 12 34',
        lat: 41.0082,
        lng: 28.9784,
        onDuty: true,
        dutyStart: '2025-01-15T09:00:00Z',
        dutyEnd: '2025-01-16T09:00:00Z',
        city: 'İstanbul',
        district: 'Bağcılar',
    },
    {
        id: 'eczane_2',
        name: 'Hayat Eczanesi',
        address: 'Kadıköy Mah. İstiklal Sok. No:12',
        phone: '0216 444 56 78',
        lat: 40.9909,
        lng: 29.0230,
        onDuty: true,
        dutyStart: '2025-01-15T09:00:00Z',
        dutyEnd: '2025-01-16T09:00:00Z',
        city: 'İstanbul',
        district: 'Kadıköy',
    },
    {
        id: 'eczane_3',
        name: 'Sağlık Eczanesi',
        address: 'Çankaya Mah. Üniversite Cad. No:45',
        phone: '0312 333 98 76',
        lat: 39.9208,
        lng: 32.8541,
        onDuty: true,
        dutyStart: '2025-01-15T09:00:00Z',
        dutyEnd: '2025-01-16T09:00:00Z',
        city: 'Ankara',
        district: 'Çankaya',
    },
];

export const cities = [
    { id: '6', name: 'Ankara' },
    { id: '7', name: 'Antalya' },
    { id: '16', name: 'Bursa' },
    { id: '34', name: 'İstanbul' },
    { id: '35', name: 'İzmir' },
    { id: '41', name: 'Kocaeli' },
];

export const districts: Record<string, string[]> = {
    '6': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut'],
    '7': ['Muratpaşa', 'Konyaaltı', 'Kepez', 'Alanya', 'Manavgat'],
    '16': ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Gemlik', 'Mudanya'],
    '34': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Bakırköy', 'Şişli', 'Bağcılar', 'Fatih'],
    '35': ['Konak', 'Bornova', 'Karşıyaka', 'Buca', 'Çiğli'],
    '41': ['İzmit', 'Gebze', 'Darıca', 'Körfez', 'Derince'],
};
