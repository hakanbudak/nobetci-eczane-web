"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const user = useAppStore((s) => s.user);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [emailNotif, setEmailNotif] = useState(true);
    const [quotaNotif, setQuotaNotif] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);

    const handleSave = () => {
        toast.success("Ayarlar kaydedildi");
    };

    return (
        <div className="space-y-8 max-w-2xl animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-text-primary">Ayarlar</h2>
                <p className="text-text-muted mt-1">Hesap ayarlarınızı yönetin</p>
            </div>

            {/* Profile */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">
                            Profil Bilgileri
                        </h3>
                        <p className="text-xs text-text-muted">
                            İsim ve e-posta adresinizi güncelleyin
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="settings-name" className="text-text-primary mb-2 block">
                            Ad Soyad
                        </Label>
                        <Input
                            id="settings-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <div>
                        <Label htmlFor="settings-email" className="text-text-primary mb-2 block">
                            E-posta
                        </Label>
                        <Input
                            id="settings-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <Button
                        onClick={handleSave}
                        className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold"
                    >
                        Kaydet
                    </Button>
                </div>
            </div>

            {/* Password */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">
                            Şifre Değiştir
                        </h3>
                        <p className="text-xs text-text-muted">
                            Hesap şifrenizi güncelleyin
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label className="text-text-primary mb-2 block">Mevcut Şifre</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-text-primary mb-2 block">Yeni Şifre</Label>
                        <Input
                            type="password"
                            placeholder="En az 8 karakter"
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-text-primary mb-2 block">
                            Yeni Şifre (Tekrar)
                        </Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <Button
                        onClick={() => toast.success("Şifre güncellendi")}
                        className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold"
                    >
                        Şifreyi Güncelle
                    </Button>
                </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-text-primary">
                            Bildirim Tercihleri
                        </h3>
                        <p className="text-xs text-text-muted">
                            Hangi bildirimleri almak istediğinizi seçin
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { label: "E-posta Bildirimleri", desc: "Önemli güncellemeler ve duyurular", checked: emailNotif, onChange: setEmailNotif },
                        { label: "Kota Uyarıları", desc: "Günlük kota limitine yaklaştığınızda", checked: quotaNotif, onChange: setQuotaNotif },
                        { label: "Haftalık Rapor", desc: "API kullanım özetiniz her hafta e-posta ile", checked: weeklyReport, onChange: setWeeklyReport },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between py-2"
                        >
                            <div>
                                <p className="text-sm font-medium text-text-primary">
                                    {item.label}
                                </p>
                                <p className="text-xs text-text-muted">{item.desc}</p>
                            </div>
                            <Switch
                                checked={item.checked}
                                onCheckedChange={item.onChange}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-red-400">
                            Tehlikeli Bölge
                        </h3>
                        <p className="text-xs text-text-muted">
                            Bu işlemler geri alınamaz
                        </p>
                    </div>
                </div>
                <p className="text-sm text-text-muted mb-4">
                    Hesabınızı silmek tüm verilerinizi, API anahtarlarınızı ve fatura
                    geçmişinizi kalıcı olarak siler. Bu işlem geri alınamaz.
                </p>
                <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={() => toast.error("Hesap silme devre dışı (demo)")}
                >
                    Hesabı Sil
                </Button>
            </div>
        </div>
    );
}
