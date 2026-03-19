"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/store";
import { Pill, Code, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [plan, setPlan] = useState<"free" | "pro">("free");
    const [kvkk, setKvkk] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const register = useAppStore((s) => s.register);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !passwordConfirm) {
            toast.error("Lütfen tüm alanları doldurun");
            return;
        }
        if (password !== passwordConfirm) {
            toast.error("Şifreler eşleşmiyor");
            return;
        }
        if (password.length < 8) {
            toast.error("Şifre en az 8 karakter olmalıdır");
            return;
        }
        if (!kvkk) {
            toast.error("KVKK sözleşmesini kabul etmelisiniz");
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password, plan, passwordConfirm);
            toast.success("Hesap oluşturuldu!");
            router.push("/dashboard");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Kayıt başarısız");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20">
                            <Pill className="w-4 h-4 text-brand-green absolute" />
                            <Code className="w-3 h-3 text-brand-blue absolute translate-x-1.5 translate-y-1.5" />
                        </div>
                        <span className="text-lg font-bold text-text-primary">
                            Pharm<span className="text-brand-green">LUSH</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                        Hesap Oluşturun
                    </h1>
                    <p className="text-text-muted">
                        Ücretsiz başlayın, dakikalar içinde entegre edin
                    </p>
                </div>

                <div className="rounded-2xl border border-navy-700 bg-navy-900/50 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name" className="text-text-primary mb-2 block">
                                    Ad Soyad
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ahmet Yılmaz"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                                />
                            </div>
                            <div>
                                <Label htmlFor="reg-email" className="text-text-primary mb-2 block">
                                    E-posta
                                </Label>
                                <Input
                                    id="reg-email"
                                    type="email"
                                    placeholder="ornek@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="reg-password" className="text-text-primary mb-2 block">
                                Şifre
                            </Label>
                            <div className="relative">
                                <Input
                                    id="reg-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="En az 8 karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11 pr-10"
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

                        <div>
                            <Label htmlFor="reg-password-confirm" className="text-text-primary mb-2 block">
                                Şifre Tekrar
                            </Label>
                            <Input
                                id="reg-password-confirm"
                                type="password"
                                placeholder="Şifrenizi tekrar girin"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="bg-navy-800 border-navy-700 text-text-primary placeholder:text-text-muted/50 h-11"
                            />
                        </div>

                        {/* Plan selection */}
                        <div>
                            <Label className="text-text-primary mb-3 block">Plan Seçin</Label>
                            <div className="grid grid-cols-2 gap-3">
                                {(["free", "pro"] as const).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPlan(p)}
                                        className={`p-4 rounded-xl border text-left transition-all ${plan === p
                                                ? "border-brand-green bg-brand-green/5"
                                                : "border-navy-700 bg-navy-800 hover:border-navy-600"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold text-text-primary capitalize mb-1">
                                            {p === "free" ? "Free" : "Pro"}
                                        </div>
                                        <div className="text-xs text-text-muted">
                                            {p === "free" ? "₺0/ay • 500 istek/gün" : "₺299/ay • 50K istek/gün"}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* KVKK */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="kvkk"
                                checked={kvkk}
                                onChange={(e) => setKvkk(e.target.checked)}
                                className="mt-1 accent-brand-green"
                            />
                            <label htmlFor="kvkk" className="text-sm text-text-muted">
                                <Link href="#" className="text-brand-green hover:text-brand-green-light">
                                    KVKK Aydınlatma Metni
                                </Link>
                                &apos;ni ve{" "}
                                <Link href="#" className="text-brand-green hover:text-brand-green-light">
                                    Kullanım Koşulları
                                </Link>
                                &apos;nı okudum, kabul ediyorum.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold h-11"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                    Hesap oluşturuluyor...
                                </span>
                            ) : (
                                "Hesap Oluştur"
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted mt-6">
                    Zaten hesabınız var mı?{" "}
                    <Link
                        href="/login"
                        className="text-brand-green hover:text-brand-green-light font-medium"
                    >
                        Giriş yap →
                    </Link>
                </p>
            </div>
        </main>
    );
}
