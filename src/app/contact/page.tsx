"use client";

import { useState } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

const subjects = [
    "Genel Soru",
    "Teknik Destek",
    "Satış / Fiyatlandırma",
    "Kurumsal İşbirliği",
    "Hata Bildirimi",
    "Diğer",
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: subjects[0],
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Lütfen tüm alanları doldurun");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        toast.success("Mesajınız gönderildi!");
        setForm({ name: "", email: "", subject: subjects[0], message: "" });
    };

    return (
        <main className="min-h-screen bg-navy-950">
            <Navbar />

            <section className="pt-32 pb-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
                            İletişime Geçin
                        </h1>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Sorularınız, önerileriniz veya işbirliği talepleriniz için bize
                            ulaşın. En kısa sürede yanıt veriyoruz.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-text-primary mb-2 block">
                                                İsim
                                            </Label>
                                            <Input
                                                placeholder="Adınız Soyadınız"
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm({ ...form, name: e.target.value })
                                                }
                                                className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-text-primary mb-2 block">
                                                E-posta
                                            </Label>
                                            <Input
                                                type="email"
                                                placeholder="ornek@email.com"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm({ ...form, email: e.target.value })
                                                }
                                                className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-text-primary mb-2 block">Konu</Label>
                                        <select
                                            value={form.subject}
                                            onChange={(e) =>
                                                setForm({ ...form, subject: e.target.value })
                                            }
                                            className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-text-primary text-sm focus:border-brand-green focus:outline-none h-11"
                                        >
                                            {subjects.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label className="text-text-primary mb-2 block">
                                            Mesajınız
                                        </Label>
                                        <Textarea
                                            placeholder="Mesajınızı buraya yazın..."
                                            value={form.message}
                                            onChange={(e) =>
                                                setForm({ ...form, message: e.target.value })
                                            }
                                            className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 min-h-[150px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold h-11 px-8"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                                Gönderiliyor...
                                            </span>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Gönder
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Info sidebar */}
                        <div className="space-y-6">
                            {[
                                {
                                    icon: Mail,
                                    title: "E-posta",
                                    lines: ["destek@pharmapi.com.tr", "kurumsal@pharmapi.com.tr"],
                                },
                                {
                                    icon: Clock,
                                    title: "Çalışma Saatleri",
                                    lines: [
                                        "Pazartesi – Cuma: 09:00 – 18:00",
                                        "7/24 teknik destek (Pro+)",
                                    ],
                                },
                                {
                                    icon: MapPin,
                                    title: "Adres",
                                    lines: [
                                        "Levent, Büyükdere Cad.",
                                        "No:185 Şişli / İstanbul",
                                    ],
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-navy-700/50 bg-navy-900/30 p-6"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-brand-green" />
                                        </div>
                                        <h3 className="font-semibold text-text-primary">
                                            {item.title}
                                        </h3>
                                    </div>
                                    {item.lines.map((line) => (
                                        <p key={line} className="text-sm text-text-muted">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
