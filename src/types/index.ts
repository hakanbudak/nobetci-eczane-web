export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  avatar?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  active: boolean;
}

export interface DashboardStats {
  totalRequests: number;
  successRate: number;
  remainingQuota: number;
  activeKeys: number;
}

export interface UsageData {
  date: string;
  successful: number;
  failed: number;
}

export interface EndpointUsage {
  name: string;
  count: number;
  color: string;
}

export interface RecentRequest {
  id: string;
  timestamp: string;
  endpoint: string;
  status: number;
  responseTime: number;
  ip: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  onDuty: boolean;
  dutyStart?: string;
  dutyEnd?: string;
  city: string;
  district: string;
}

export interface Plan {
  id: 'free' | 'pro' | 'enterprise';
  name: string;
  price: number;
  yearlyPrice: number;
  quota: string;
  features: string[];
  popular?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
