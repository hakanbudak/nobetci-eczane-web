"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Trash2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const { user, updateUserProfile, changePassword } = useAppStore();

    const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
    const [profileLoading, setProfileLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleSaveProfile = async () => {
        setProfileLoading(true);
        try {
            await updateUserProfile(firstName, lastName);
            toast.success("Profil güncellendi");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Güncelleme başarısız");
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !newPasswordConfirm) {
            toast.error("Lütfen tüm alanları doldurun");
            return;
        }
        if (newPassword !== newPasswordConfirm) {
            toast.error("Yeni şifreler eşleşmiyor");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("Şifre en az 8 karakter olmalıdır");
            return;
        }
        setPasswordLoading(true);
        try {
            await changePassword(currentPassword, newPassword);
            toast.success("Şifre güncellendi");
            setCurrentPassword("");
            setNewPassword("");
            setNewPasswordConfirm("");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Şifre güncellenemedi");
        } finally {
            setPasswordLoading(false);
        }
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
                        <h3 className="text-base font-semibold text-text-primary">Profil Bilgileri</h3>
                        <p className="text-xs text-text-muted">İsim ve e-posta adresinizi güncelleyin</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="first-name" className="text-text-primary mb-2 block">Ad</Label>
                            <Input
                                id="first-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-navy-800 border-navy-700 text-text-primary"
                            />
                        </div>
                        <div>
                            <Label htmlFor="last-name" className="text-text-primary mb-2 block">Soyad</Label>
                            <Input
                                id="last-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-navy-800 border-navy-700 text-text-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-text-primary mb-2 block">E-posta</Label>
                        <Input
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="bg-navy-800/50 border-navy-700 text-text-muted cursor-not-allowed"
                        />
                    </div>
                    <Button
                        onClick={handleSaveProfile}
                        disabled={profileLoading}
                        className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold"
                    >
                        {profileLoading ? (
                            <span className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Kaydediliyor...
                            </span>
                        ) : (
                            "Kaydet"
                        )}
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
                        <h3 className="text-base font-semibold text-text-primary">Şifre Değiştir</h3>
                        <p className="text-xs text-text-muted">Hesap şifrenizi güncelleyin</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label className="text-text-primary mb-2 block">Mevcut Şifre</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-text-primary mb-2 block">Yeni Şifre</Label>
                        <Input
                            type="password"
                            placeholder="En az 8 karakter"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-text-primary mb-2 block">Yeni Şifre (Tekrar)</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            className="bg-navy-800 border-navy-700 text-text-primary"
                        />
                    </div>
                    <Button
                        onClick={handleChangePassword}
                        disabled={passwordLoading}
                        className="bg-brand-blue hover:bg-brand-blue/80 text-white font-semibold"
                    >
                        {passwordLoading ? (
                            <span className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Güncelleniyor...
                            </span>
                        ) : (
                            "Şifreyi Güncelle"
                        )}
                    </Button>
                </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-red-400">Tehlikeli Bölge</h3>
                        <p className="text-xs text-text-muted">Bu işlemler geri alınamaz</p>
                    </div>
                </div>
                <p className="text-sm text-text-muted mb-4">
                    Hesabınızı silmek tüm verilerinizi, API anahtarlarınızı ve fatura
                    geçmişinizi kalıcı olarak siler. Bu işlem geri alınamaz.
                </p>
                <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={() => toast.error("Hesap silme devre dışı")}
                >
                    Hesabı Sil
                </Button>
            </div>
        </div>
    );
}
