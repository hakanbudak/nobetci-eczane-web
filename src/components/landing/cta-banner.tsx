"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 via-brand-blue/5 to-brand-green/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-green/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    Hemen Başlayın
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                    Bugün başla,{" "}
                    <span className="gradient-text">dakikalar içinde</span>{" "}
                    entegre et.
                </h2>

                <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
                    Ücretsiz hesap oluşturun, API anahtarınızı alın ve eczane verilerine
                    hemen erişmeye başlayın. Kredi kartı gerekmez.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/register">
                        <Button
                            size="lg"
                            className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold glow-green text-base px-8 h-12"
                        >
                            Ücretsiz Hesap Oluştur
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/docs">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-navy-700 text-text-primary hover:bg-navy-700/50 bg-transparent text-base px-8 h-12"
                        >
                            API Dokümantasyonu
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
