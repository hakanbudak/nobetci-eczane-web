"use client";

import { useState } from "react";
import { cities, districts, mockPharmacies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LiveDemo() {
    const [selectedCity, setSelectedCity] = useState("34");
    const [selectedDistrict, setSelectedDistrict] = useState("Kadıköy");
    const [loading, setLoading] = useState(false);
    const [showResponse, setShowResponse] = useState(true);

    const handleQuery = () => {
        setLoading(true);
        setShowResponse(false);
        setTimeout(() => {
            setLoading(false);
            setShowResponse(true);
        }, 800);
    };

    const cityName = cities.find((c) => c.id === selectedCity)?.name || "İstanbul";

    const responseJson = JSON.stringify(
        {
            success: true,
            data: mockPharmacies
                .filter((p) => p.district === selectedDistrict || !selectedDistrict)
                .slice(0, 2)
                .map((p) => ({
                    id: p.id,
                    name: p.name,
                    address: p.address,
                    phone: p.phone,
                    on_duty: p.onDuty,
                    lat: p.lat,
                    lng: p.lng,
                })),
            meta: {
                total: 12,
                city: cityName,
                district: selectedDistrict,
                timestamp: new Date().toISOString(),
            },
        },
        null,
        2
    );

    return (
        <section className="relative py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        Canlı API Demo
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Hemen deneyin — bir il ve ilçe seçin, API yanıtını görün.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-navy-700 bg-navy-900/50 overflow-hidden">
                        {/* Input section */}
                        <div className="p-6 border-b border-navy-700">
                            <div className="flex flex-wrap gap-4 items-end">
                                <div className="flex-1 min-w-[160px]">
                                    <label className="block text-sm text-text-muted mb-2">
                                        İl Seçin
                                    </label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => {
                                            setSelectedCity(e.target.value);
                                            setSelectedDistrict(
                                                districts[e.target.value]?.[0] || ""
                                            );
                                        }}
                                        className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-text-primary text-sm focus:border-brand-green focus:outline-none"
                                    >
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1 min-w-[160px]">
                                    <label className="block text-sm text-text-muted mb-2">
                                        İlçe Seçin
                                    </label>
                                    <select
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-text-primary text-sm focus:border-brand-green focus:outline-none"
                                    >
                                        {(districts[selectedCity] || []).map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button
                                    onClick={handleQuery}
                                    className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold px-6"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                            Sorgulanıyor...
                                        </span>
                                    ) : (
                                        "Sorgula"
                                    )}
                                </Button>
                            </div>

                            <div className="mt-3 font-mono text-xs text-text-muted">
                                GET /v1/pharmacies/duty?city_id={selectedCity}
                                &district={selectedDistrict}
                            </div>
                        </div>

                        {/* Response section */}
                        <div className="relative">
                            <div className="flex items-center justify-between px-6 py-3 bg-navy-950/50">
                                <span className="text-sm text-text-muted">Yanıt</span>
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono bg-brand-green/10 text-brand-green">
                                    200 OK • 89ms
                                </span>
                            </div>
                            <div className="p-6 max-h-80 overflow-y-auto">
                                {showResponse ? (
                                    <pre className="text-sm font-mono text-text-muted leading-6 animate-fade-in">
                                        {responseJson}
                                    </pre>
                                ) : (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="w-8 h-8 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>

                            {/* CTA overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 via-navy-900/95 to-transparent pt-16 pb-6 px-6 text-center">
                                <p className="text-text-muted text-sm mb-3">
                                    Gerçek veriyi görmek için ücretsiz kayıt olun
                                </p>
                                <Link href="/register">
                                    <Button className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold">
                                        Ücretsiz Başla <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
