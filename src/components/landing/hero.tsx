"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MapPin, Building2, Clock, Zap } from "lucide-react";

const stats = [
    { icon: Building2, value: "81", label: "İl" },
    { icon: MapPin, value: "973", label: "İlçe" },
    { icon: Clock, value: "%99.9", label: "Uptime" },
    { icon: Zap, value: "<120ms", label: "Yanıt" },
];

const codeLines = [
    { text: '$ curl -X GET "https://api.pharmapi.com.tr/v1/pharmacies/duty" \\', delay: 0 },
    { text: '  -H "Authorization: Bearer sk_live_••••abcd" \\', delay: 100 },
    { text: '  -H "Content-Type: application/json" \\', delay: 200 },
    { text: '  -d \'{"city_id": "34", "district": "Kadıköy"}\'', delay: 300 },
    { text: "", delay: 400 },
    { text: "// Response 200 OK", delay: 600 },
    { text: "{", delay: 700 },
    { text: '  "success": true,', delay: 800 },
    { text: '  "data": [{', delay: 900 },
    { text: '    "name": "Merkez Eczanesi",', delay: 1000 },
    { text: '    "address": "Bağcılar Mah. No:5",', delay: 1100 },
    { text: '    "phone": "0212 555 12 34",', delay: 1200 },
    { text: '    "on_duty": true', delay: 1300 },
    { text: "  }]", delay: 1400 },
    { text: "}", delay: 1500 },
];

export default function Hero() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timers = codeLines.map((_, i) =>
            setTimeout(() => setVisibleLines(i + 1), codeLines[i].delay + 500)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0 bg-radial-top" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left content */}
                    <div className="animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                            v2.0 — Yeni Konum Bazlı Sorgulama
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                            Türkiye&apos;nin Tüm{" "}
                            <br className="hidden sm:block" />
                            Eczane Verisi,{" "}
                            <br className="hidden sm:block" />
                            <span className="gradient-text">Tek API&apos;de.</span>
                        </h1>

                        <p className="text-lg text-text-muted max-w-xl mb-8 leading-relaxed">
                            İl, ilçe ve koordinat bazlı nöbetçi eczane sorgulama.{" "}
                            <span className="text-text-primary font-medium">%99.9 uptime</span>{" "}
                            garantisi. Gerçek zamanlı, doğrulanmış veri.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <Link href="/register">
                                <Button
                                    size="lg"
                                    className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold glow-green text-base px-8 h-12"
                                >
                                    Ücretsiz Dene
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/docs">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-navy-700 text-text-primary hover:bg-navy-700/50 bg-transparent text-base px-8 h-12"
                                >
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Dokümantasyonu İncele
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-900/60 border border-navy-700/50"
                                >
                                    <stat.icon className="w-5 h-5 text-brand-green flex-shrink-0" />
                                    <div>
                                        <div className="text-lg font-bold text-text-primary">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-text-muted">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Code block */}
                    <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <div className="code-block overflow-hidden">
                            {/* Terminal header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-700">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-text-muted ml-2 font-mono">
                                    terminal — api-request.sh
                                </span>
                            </div>
                            {/* Code content */}
                            <div className="p-4 overflow-x-auto">
                                <pre className="text-sm leading-6">
                                    {codeLines.map((line, i) => (
                                        <div
                                            key={i}
                                            className={`transition-all duration-300 ${i < visibleLines
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-2"
                                                }`}
                                        >
                                            {line.text.startsWith("$") ? (
                                                <span className="text-brand-green">{line.text}</span>
                                            ) : line.text.startsWith("//") ? (
                                                <span className="text-text-muted">{line.text}</span>
                                            ) : line.text.includes('"') ? (
                                                <span>
                                                    <span className="text-text-muted">
                                                        {line.text.split('"')[0]}
                                                    </span>
                                                    <span className="text-brand-green">
                                                        &quot;{line.text.split('"')[1]}&quot;
                                                    </span>
                                                    <span className="text-text-muted">
                                                        {line.text.split('"').slice(2).join('"')}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="text-text-primary">{line.text}</span>
                                            )}
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
