"use client";

import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

const quickRef = [
    {
        method: "GET",
        endpoint: "/v1/pharmacies/duty",
        desc: "Nöbetçi eczaneleri listele",
    },
    {
        method: "GET",
        endpoint: "/v1/pharmacies/all",
        desc: "Tüm eczaneleri listele",
    },
    {
        method: "GET",
        endpoint: "/v1/pharmacies/{id}",
        desc: "Eczane detayı",
    },
    {
        method: "GET",
        endpoint: "/v1/cities",
        desc: "İl listesi",
    },
    {
        method: "GET",
        endpoint: "/v1/districts/{cityId}",
        desc: "İlçe listesi",
    },
];

export default function DashboardDocsPage() {
    return (
        <div className="space-y-6 max-w-3xl animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                        Dokümantasyon
                    </h2>
                    <p className="text-text-muted mt-1">Hızlı başvuru kılavuzu</p>
                </div>
                <Link href="/docs">
                    <Badge
                        variant="outline"
                        className="border-brand-green/30 text-brand-green cursor-pointer hover:bg-brand-green/10"
                    >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Tam Docs
                    </Badge>
                </Link>
            </div>

            {/* Base URL */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Base URL
                </h3>
                <code className="text-sm font-mono text-brand-green px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 block">
                    https://api.pharmapi.com.tr/v1
                </code>
            </div>

            {/* Auth */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Authentication
                </h3>
                <p className="text-sm text-text-muted mb-3">
                    Tüm isteklerde <code className="text-brand-green bg-navy-800 px-1 py-0.5 rounded text-xs">Authorization</code> header&apos;ı gereklidir.
                </p>
                <code className="text-sm font-mono text-text-muted px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 block">
                    Authorization: Bearer YOUR_API_KEY
                </code>
            </div>

            {/* Quick reference */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-4">
                    Endpoint Referansı
                </h3>
                <div className="space-y-2">
                    {quickRef.map((ep) => (
                        <div
                            key={ep.endpoint}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-navy-800/50 transition-colors"
                        >
                            <Badge
                                variant="outline"
                                className="border-brand-green/30 text-brand-green text-xs font-mono w-12 justify-center"
                            >
                                {ep.method}
                            </Badge>
                            <code className="text-sm font-mono text-text-primary flex-1">
                                {ep.endpoint}
                            </code>
                            <span className="text-xs text-text-muted hidden sm:block">
                                {ep.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Example */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                    Hızlı Örnek
                </h3>
                <div className="code-block p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-text-muted leading-6">
                        {`curl -X GET "https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
