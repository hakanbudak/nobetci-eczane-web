"use client";

import { useState } from "react";
import { plans } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <section id="pricing" className="relative py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-4">
                        Fiyatlandırma
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        İhtiyacınıza Uygun Plan Seçin
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
                        Her ölçekte proje için uygun fiyatlandırma. İstediğiniz zaman
                        yükseltin veya düşürün.
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center gap-3 p-1 rounded-full bg-navy-900 border border-navy-700">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!annual
                                    ? "bg-brand-green text-navy-950"
                                    : "text-text-muted hover:text-text-primary"
                                }`}
                        >
                            Aylık
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual
                                    ? "bg-brand-green text-navy-950"
                                    : "text-text-muted hover:text-text-primary"
                                }`}
                        >
                            Yıllık
                            <Badge
                                variant="secondary"
                                className="bg-brand-green/20 text-brand-green border-0 text-xs"
                            >
                                %20 İndirim
                            </Badge>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl p-6 transition-all duration-300 ${plan.popular
                                    ? "border-2 border-brand-green bg-navy-900/80 shadow-[0_0_40px_rgba(0,217,126,0.1)] scale-105"
                                    : "border border-navy-700/50 bg-navy-900/30 hover:border-navy-600"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-brand-green text-navy-950 font-semibold px-4 py-1">
                                        En Popüler
                                    </Badge>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-text-primary mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-text-primary">
                                        ₺{annual ? plan.yearlyPrice : plan.price}
                                    </span>
                                    {plan.price > 0 && (
                                        <span className="text-text-muted text-sm">/ay</span>
                                    )}
                                </div>
                                <p className="text-text-muted text-sm mt-2">{plan.quota}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-text-muted">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register">
                                <Button
                                    className={`w-full font-semibold ${plan.popular
                                            ? "bg-brand-green hover:bg-brand-green-dark text-navy-950"
                                            : "bg-navy-800 hover:bg-navy-700 text-text-primary border border-navy-700"
                                        }`}
                                >
                                    {plan.price === 0 ? "Ücretsiz Başla" : "Planı Seç"}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
