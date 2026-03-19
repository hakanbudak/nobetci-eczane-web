"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/store";
import { Pill, Code, Shield, Zap, BarChart3, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const login = useAppStore((s) => s.login);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Lütfen tüm alanları doldurun");
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Giriş başarılı!");
            router.push("/dashboard");
        } catch {
            toast.error("Giriş başarısız");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-navy-950 flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-navy-900 border-r border-navy-700">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-16">
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20">
                            <Pill className="w-4 h-4 text-brand-green absolute" />
                            <Code className="w-3 h-3 text-brand-blue absolute translate-x-1.5 translate-y-1.5" />
                        </div>
                        <span className="text-lg font-bold text-text-primary">
                            Pharm<span className="text-brand-green">LUSH</span>
                        </span>
                    </Link>

                    <h2 className="text-3xl font-bold text-text-primary mb-4">
                        Türkiye&apos;nin En Kapsamlı{" "}
                        <span className="gradient-text">Eczane API&apos;si</span>
                    </h2>
                    <p className="text-text-muted text-lg mb-12">
                        Hesabınıza giriş yaparak API anahtarlarınızı yönetin, kullanım
                        istatistiklerinizi görüntüleyin ve daha fazlasını keşfedin.
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: Shield, title: "%99.9 Uptime", desc: "Enterprise-grade altyapı" },
                            { icon: Zap, title: "<120ms Yanıt Süresi", desc: "Düşük gecikmeli API" },
                            { icon: BarChart3, title: "Detaylı Analytics", desc: "Kullanım paneli" },
                        ].map((item) => (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-5 h-5 text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-text-primary">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-text-muted">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-text-muted">
                    © 2026 PharmLush. Tüm hakları saklıdır.
                </p>
            </div>

            {/* Right panel — Login form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20">
                                <Pill className="w-4 h-4 text-brand-green absolute" />
                                <Code className="w-3 h-3 text-brand-blue absolute translate-x-1.5 translate-y-1.5" />
                            </div>
                            <span className="text-lg font-bold text-text-primary">
                                Pharm<span className="text-brand-green">LUSH</span>
                            </span>
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                        Hoş Geldiniz
                    </h1>
                    <p className="text-text-muted mb-8">
                        Hesabınıza giriş yapın
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="email" className="text-text-primary mb-2 block">
                                E-posta
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-navy-900 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="password" className="text-text-primary">
                                    Şifre
                                </Label>
                                <Link
                                    href="#"
                                    className="text-sm text-brand-green hover:text-brand-green-light"
                                >
                                    Şifremi unuttum
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-navy-900 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold h-11"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                    Giriş yapılıyor...
                                </span>
                            ) : (
                                "Giriş Yap"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Hesabınız yok mu?{" "}
                        <Link
                            href="/register"
                            className="text-brand-green hover:text-brand-green-light font-medium"
                        >
                            Kayıt ol →
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
