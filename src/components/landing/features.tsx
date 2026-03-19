"use client";

import {
    Clock,
    MapPin,
    Building2,
    Zap,
    FileJson,
    ShieldCheck,
} from "lucide-react";

const features = [
    {
        icon: Clock,
        title: "Gerçek Zamanlı Nöbetçi Verisi",
        description:
            "Nöbetçi eczane verileri anlık olarak güncellenir. Her zaman en güncel bilgiye erişin.",
    },
    {
        icon: MapPin,
        title: "Konum Bazlı Sorgulama",
        description:
            "Enlem ve boylam koordinatları ile yakınınızdaki nöbetçi eczaneleri anında bulun.",
    },
    {
        icon: Building2,
        title: "81 İl, 973 İlçe Desteği",
        description:
            "Türkiye'nin tamamını kapsayan veri tabanı ile her bölgeden sorgulama yapın.",
    },
    {
        icon: Zap,
        title: "%99.9 Uptime SLA",
        description:
            "Enterprise düzeyde altyapı ile kesintisiz hizmet garantisi sunuyoruz.",
    },
    {
        icon: FileJson,
        title: "Çoklu Format Desteği",
        description:
            "JSON ve XML formatlarında veri alın. İhtiyacınıza en uygun formatı seçin.",
    },
    {
        icon: ShieldCheck,
        title: "Detaylı Hata Kodları",
        description:
            "Kapsamlı hata kodları ve açıklamaları ile hızlı debug imkanı sağlayın.",
    },
];

export default function Features() {
    return (
        <section id="features" className="relative py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
                        Özellikler
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        Güçlü API, <span className="gradient-text">Sınırsız İmkân</span>
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Modern, hızlı ve güvenilir API altyapımız ile eczane verilerine
                        erişmek hiç bu kadar kolay olmamıştı.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            className="group p-6 rounded-2xl border border-navy-700/50 bg-navy-900/30 hover:bg-navy-900/60 hover:border-brand-green/30 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-brand-green" />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
