"use client";

import { useEffect } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import {
    BarChart3,
    CheckCircle,
    Clock,
    Key,
    TrendingUp,
    RefreshCw,
} from "lucide-react";

const COLORS = [
    { color: "text-brand-green", bg: "bg-brand-green/10", border: "border-brand-green/20" },
    { color: "text-brand-blue", bg: "bg-brand-blue/10", border: "border-brand-blue/20" },
    { color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
];

export default function DashboardPage() {
    const { user, stats, usageData, endpointUsage, recentRequests, fetchDashboard } = useAppStore();

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const kpiCards = [
        {
            label: "Toplam API İsteği",
            value: stats ? stats.totalRequests.toLocaleString("tr-TR") : "—",
            icon: BarChart3,
            sub: "Tüm zamanlar",
            ...COLORS[0],
        },
        {
            label: "Başarı Oranı",
            value: stats ? `%${stats.successRate.toFixed(1)}` : "—",
            icon: CheckCircle,
            sub: "Son 30 gün",
            ...COLORS[1],
        },
        {
            label: "Kalan Kota",
            value: stats ? stats.remainingQuota.toLocaleString("tr-TR") : "—",
            icon: Clock,
            sub: "Bugün kalan",
            ...COLORS[2],
        },
        {
            label: "Aktif API Key",
            value: stats ? stats.activeKeys.toString() : "—",
            icon: Key,
            sub: "Onaylı key",
            ...COLORS[3],
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Greeting */}
            <div>
                <h2 className="text-2xl font-bold text-text-primary">
                    Merhaba, {user?.name?.split(" ")[0] || "Kullanıcı"} 👋
                </h2>
                <p className="text-text-muted mt-1">
                    API kullanımınızın özeti
                </p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5 hover:border-navy-600 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-text-muted">{card.label}</span>
                            <div className={`w-9 h-9 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center`}>
                                <card.icon className={`w-4 h-4 ${card.color}`} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-text-primary mb-1">
                            {stats === null ? (
                                <RefreshCw className="w-5 h-5 animate-spin text-text-muted" />
                            ) : (
                                card.value
                            )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                            <TrendingUp className="w-3 h-3" />
                            {card.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Area chart */}
                <div className="lg:col-span-2 rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                    <h3 className="text-base font-semibold text-text-primary mb-4">
                        Günlük API İstekleri
                    </h3>
                    {usageData.length === 0 ? (
                        <div className="h-72 flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 animate-spin text-text-muted" />
                        </div>
                    ) : (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={usageData}>
                                    <defs>
                                        <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00d97e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00d97e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4a" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(d) => d.slice(5)}
                                        stroke="#7a9bb5"
                                        fontSize={11}
                                    />
                                    <YAxis stroke="#7a9bb5" fontSize={11} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#0a1628",
                                            border: "1px solid #1a2d4a",
                                            borderRadius: "8px",
                                            color: "#f0f6ff",
                                            fontSize: 13,
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="successful"
                                        stroke="#00d97e"
                                        fill="url(#successGrad)"
                                        strokeWidth={2}
                                        name="Başarılı"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="failed"
                                        stroke="#ef4444"
                                        fill="url(#failedGrad)"
                                        strokeWidth={2}
                                        name="Hatalı"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Pie chart */}
                <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                    <h3 className="text-base font-semibold text-text-primary mb-4">
                        Endpoint Kullanımı
                    </h3>
                    {endpointUsage.length === 0 ? (
                        <div className="h-52 flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 animate-spin text-text-muted" />
                        </div>
                    ) : (
                        <>
                            <div className="h-52">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={endpointUsage}
                                            dataKey="count"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            innerRadius={45}
                                            strokeWidth={0}
                                        >
                                            {endpointUsage.map((entry) => (
                                                <Cell key={entry.name} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                background: "#0a1628",
                                                border: "1px solid #1a2d4a",
                                                borderRadius: "8px",
                                                color: "#f0f6ff",
                                                fontSize: 12,
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-2">
                                {endpointUsage.map((ep) => (
                                    <div key={ep.name} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ep.color }} />
                                            <span className="text-text-muted font-mono">{ep.name}</span>
                                        </div>
                                        <span className="text-text-primary font-medium">
                                            {ep.count.toLocaleString("tr-TR")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Recent requests table */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                <h3 className="text-base font-semibold text-text-primary mb-4">
                    Son İstekler
                </h3>
                {recentRequests.length === 0 ? (
                    <div className="py-12 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 animate-spin text-text-muted" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-navy-700">
                                    {["Zaman", "Endpoint", "Durum", "Süre", "IP"].map((h) => (
                                        <th key={h} className="pb-3 pr-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="border-b border-navy-700/30 hover:bg-navy-800/30 transition-colors"
                                    >
                                        <td className="py-3 pr-4 text-sm text-text-muted whitespace-nowrap">
                                            {new Date(req.timestamp).toLocaleTimeString("tr-TR")}
                                        </td>
                                        <td className="py-3 pr-4 text-sm text-text-primary font-mono">
                                            {req.endpoint}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <Badge
                                                variant="outline"
                                                className={`font-mono text-xs ${
                                                    req.status < 300
                                                        ? "border-brand-green/30 text-brand-green"
                                                        : req.status < 500
                                                        ? "border-yellow-500/30 text-yellow-400"
                                                        : "border-red-500/30 text-red-400"
                                                }`}
                                            >
                                                {req.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 pr-4 text-sm text-text-muted">
                                            {req.responseTime}ms
                                        </td>
                                        <td className="py-3 text-sm text-text-muted font-mono">
                                            {req.ip}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
