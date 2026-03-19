"use client";

import { useAppStore } from "@/lib/store";
import { plans, mockInvoices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, ArrowUpRight, Download } from "lucide-react";

export default function BillingPage() {
    const user = useAppStore((s) => s.user);
    const currentPlan = plans.find((p) => p.id === (user?.plan || "free"));

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-text-primary">Faturalandırma</h2>
                <p className="text-text-muted mt-1">
                    Plan bilgilerinizi ve fatura geçmişinizi yönetin
                </p>
            </div>

            {/* Current plan */}
            <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-text-primary">
                                {currentPlan?.name} Plan
                            </h3>
                            <Badge className="bg-brand-green text-navy-950">Aktif</Badge>
                        </div>
                        <p className="text-text-muted text-sm">
                            Günlük {currentPlan?.quota} • Sonraki fatura: 1 Şubat 2025
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-text-primary">
                            ₺{currentPlan?.price || 0}
                            <span className="text-sm text-text-muted font-normal">/ay</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upgrade cards */}
            <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Plan Yükselt
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {plans.map((plan) => {
                        const isCurrent = plan.id === user?.plan;
                        return (
                            <div
                                key={plan.id}
                                className={`rounded-xl border p-5 ${isCurrent
                                        ? "border-brand-green/30 bg-brand-green/5"
                                        : "border-navy-700/50 bg-navy-900/30 hover:border-navy-600"
                                    } transition-colors`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-text-primary">
                                        {plan.name}
                                    </h4>
                                    {plan.popular && (
                                        <Badge className="bg-brand-green text-navy-950 text-xs">
                                            Popüler
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-2xl font-bold text-text-primary mb-1">
                                    ₺{plan.price}
                                    <span className="text-sm text-text-muted font-normal">
                                        /ay
                                    </span>
                                </div>
                                <p className="text-xs text-text-muted mb-4">{plan.quota}</p>
                                <ul className="space-y-2 mb-4">
                                    {plan.features.slice(0, 3).map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                                            <Check className="w-3.5 h-3.5 text-brand-green mt-0.5 flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full text-sm ${isCurrent
                                            ? "bg-navy-800 text-text-muted cursor-default"
                                            : "bg-brand-green hover:bg-brand-green-dark text-navy-950"
                                        }`}
                                    disabled={isCurrent}
                                >
                                    {isCurrent ? "Mevcut Plan" : "Yükselt"}
                                    {!isCurrent && <ArrowUpRight className="w-3.5 h-3.5 ml-1" />}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Payment method */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Ödeme Yöntemi
                </h3>
                <div className="flex items-center gap-4 p-4 rounded-lg border border-navy-700 bg-navy-800/50">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                            •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-text-muted">Son kullanma: 12/26</p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-navy-700 text-text-primary bg-transparent"
                    >
                        Değiştir
                    </Button>
                </div>
            </div>

            {/* Invoice history */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Fatura Geçmişi
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-navy-700">
                                <th className="pb-3 pr-4 text-xs font-semibold text-text-muted uppercase">
                                    Tarih
                                </th>
                                <th className="pb-3 pr-4 text-xs font-semibold text-text-muted uppercase">
                                    Açıklama
                                </th>
                                <th className="pb-3 pr-4 text-xs font-semibold text-text-muted uppercase">
                                    Tutar
                                </th>
                                <th className="pb-3 pr-4 text-xs font-semibold text-text-muted uppercase">
                                    Durum
                                </th>
                                <th className="pb-3 text-xs font-semibold text-text-muted uppercase">
                                    Fatura
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInvoices.map((inv) => (
                                <tr
                                    key={inv.id}
                                    className="border-b border-navy-700/30 hover:bg-navy-800/30"
                                >
                                    <td className="py-3 pr-4 text-sm text-text-muted">
                                        {new Date(inv.date).toLocaleDateString("tr-TR")}
                                    </td>
                                    <td className="py-3 pr-4 text-sm text-text-primary">
                                        {inv.description}
                                    </td>
                                    <td className="py-3 pr-4 text-sm text-text-primary font-medium">
                                        ₺{inv.amount}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <Badge
                                            variant="outline"
                                            className={
                                                inv.status === "paid"
                                                    ? "border-brand-green/30 text-brand-green"
                                                    : "border-yellow-500/30 text-yellow-400"
                                            }
                                        >
                                            {inv.status === "paid" ? "Ödendi" : "Bekliyor"}
                                        </Badge>
                                    </td>
                                    <td className="py-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-text-muted hover:text-text-primary"
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
