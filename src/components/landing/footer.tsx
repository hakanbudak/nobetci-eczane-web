"use client";

import Link from "next/link";
import { Pill, Code, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    Ürün: [
        { label: "Özellikler", href: "/#features" },
        { label: "Fiyatlandırma", href: "/pricing" },
        { label: "API Docs", href: "/docs" },
        { label: "Durum Sayfası", href: "#" },
    ],
    Şirket: [
        { label: "Hakkımızda", href: "/about" },
        { label: "İletişim", href: "/contact" },
        { label: "Blog", href: "#" },
        { label: "Kariyer", href: "#" },
    ],
    Yasal: [
        { label: "Gizlilik Politikası", href: "#" },
        { label: "Kullanım Koşulları", href: "#" },
        { label: "KVKK", href: "#" },
        { label: "SLA", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-navy-700 bg-navy-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20">
                                <Pill className="w-4 h-4 text-brand-green absolute" />
                                <Code className="w-3 h-3 text-brand-blue absolute translate-x-1.5 translate-y-1.5" />
                            </div>
                            <span className="text-lg font-bold text-text-primary">
                                Pharm<span className="text-brand-green">LUSH</span>
                            </span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed mb-4">
                            Türkiye&apos;nin en güvenilir eczane veri API&apos;si.
                            Geliştiriciler için, geliştiriciler tarafından.
                        </p>
                        <div className="flex gap-3">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg border border-navy-700 flex items-center justify-center text-text-muted hover:text-brand-green hover:border-brand-green/50 transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-text-primary mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-text-muted hover:text-text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-navy-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-text-muted">
                        © 2026 PharmLush. Tüm hakları saklıdır.
                    </p>
                    <p className="text-xs text-text-muted/60">
                        Türkiye&apos;de 🇹🇷 tasarlandı ve geliştirildi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
