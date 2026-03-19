"use client";

import { Shield, Lock, Users, Award } from "lucide-react";

export default function TrustSignals() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Developer count */}
                <div className="text-center mb-16">
                    <div className="text-5xl sm:text-6xl font-bold gradient-text mb-4">
                        1.200+
                    </div>
                    <p className="text-text-muted text-lg">
                        geliştirici PharmAPI kullanıyor
                    </p>
                </div>

                {/* Logo bar */}
                <div className="mb-16">
                    <p className="text-center text-text-muted text-sm mb-8 uppercase tracking-wider">
                        Bize Güvenen Kuruluşlar
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40">
                        {["TechHealth", "MediSoft", "SağlıkNet", "PharmaCo", "DigiSağlık", "HealTech"].map(
                            (name) => (
                                <div
                                    key={name}
                                    className="text-xl font-bold text-text-primary/60 hover:text-text-primary/80 transition-colors cursor-default"
                                >
                                    {name}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Security badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { icon: Lock, label: "256-bit SSL", sub: "Şifreli Bağlantı" },
                        { icon: Shield, label: "KVKK Uyumlu", sub: "Veri Koruma" },
                        { icon: Award, label: "%99.9 SLA", sub: "Garanti" },
                        { icon: Users, label: "GDPR Ready", sub: "AB Uyumlu" },
                    ].map((badge) => (
                        <div
                            key={badge.label}
                            className="flex flex-col items-center text-center p-4 rounded-xl border border-navy-700/30 bg-navy-900/20"
                        >
                            <badge.icon className="w-8 h-8 text-brand-green mb-2" />
                            <div className="text-sm font-semibold text-text-primary">
                                {badge.label}
                            </div>
                            <div className="text-xs text-text-muted">{badge.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
