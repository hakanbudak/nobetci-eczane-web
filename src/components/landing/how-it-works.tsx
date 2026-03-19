"use client";

import { Key, Send, BarChart3 } from "lucide-react";

const steps = [
    {
        icon: Key,
        title: "API Key Al",
        description: "Ücretsiz hesap oluşturun ve saniyeler içinde API anahtarınızı alın.",
        step: "01",
    },
    {
        icon: Send,
        title: "İstek Gönder",
        description: "RESTful API ile il, ilçe veya koordinat bazlı sorgulama yapın.",
        step: "02",
    },
    {
        icon: BarChart3,
        title: "Veriyi Kullan",
        description: "JSON formatında yapılandırılmış eczane verilerini uygulamanıza entegre edin.",
        step: "03",
    },
];

export default function HowItWorks() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        Nasıl Çalışır?
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Üç basit adımda eczane verilerine erişmeye başlayın.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-green/50 via-brand-blue/50 to-brand-green/50" />

                    {steps.map((step, i) => (
                        <div key={step.step} className="relative group">
                            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-navy-700/50 bg-navy-900/30 hover:bg-navy-900/60 hover:border-brand-green/30 transition-all duration-300">
                                {/* Step number */}
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                        <step.icon className="w-7 h-7 text-brand-green" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy-950 border border-brand-green text-brand-green text-xs font-bold flex items-center justify-center">
                                        {step.step}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-text-muted leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
