"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Copy, Trash2, Check, Eye, EyeOff, RefreshCw, RotateCcw, Shield, X } from "lucide-react";
import toast from "react-hot-toast";

function maskKey(key: string) {
    if (!key) return "••••••••••••••••";
    if (key.length < 20) return key + "••••••••••••";
    return key.slice(0, 10) + "••••••••••••" + key.slice(-4);
}

export default function ApiKeysPage() {
    const { apiKeys, fetchApiKeys, addApiKey, deleteApiKey, regenerateToken, updateRestrictions } = useAppStore();
    const [newKeyName, setNewKeyName] = useState("");
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [regenerateId, setRegenerateId] = useState<string | null>(null);
    const [regeneratedKey, setRegeneratedKey] = useState<string | null>(null);
    const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Restrictions dialog state
    const [restrictId, setRestrictId] = useState<string | null>(null);
    const [domainInput, setDomainInput] = useState("");
    const [ipInput, setIpInput] = useState("");
    const [editDomains, setEditDomains] = useState<string[]>([]);
    const [editIps, setEditIps] = useState<string[]>([]);
    const [restrictSaving, setRestrictSaving] = useState(false);

    useEffect(() => {
        fetchApiKeys().finally(() => setFetchLoading(false));
    }, [fetchApiKeys]);

    const handleCreate = async () => {
        if (!newKeyName.trim()) {
            toast.error("Lütfen bir isim girin");
            return;
        }
        setLoading(true);
        try {
            const newKey = await addApiKey(newKeyName.trim());
            setCreatedKey(newKey.key);
            setNewKeyName("");
            toast.success("API Key oluşturuldu!");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Oluşturma başarısız");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (key: string, id: string) => {
        navigator.clipboard.writeText(key);
        setCopied(id);
        toast.success("Kopyalandı!");
        setTimeout(() => setCopied(null), 2000);
    };

    const handleRegenerate = async (id: string) => {
        setRegeneratingId(id);
        try {
            const token = await regenerateToken(id);
            setRegeneratedKey(token);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Token yenileme başarısız");
            setRegenerateId(null);
        } finally {
            setRegeneratingId(null);
        }
    };

    const openRestrictions = (id: string) => {
        const key = apiKeys.find((k) => k.id === id);
        setEditDomains(key?.allowedDomains ?? []);
        setEditIps(key?.allowedIps ?? []);
        setDomainInput("");
        setIpInput("");
        setRestrictId(id);
    };

    const addDomain = () => {
        const v = domainInput.trim().toLowerCase();
        if (!v || editDomains.includes(v)) return;
        setEditDomains((d) => [...d, v]);
        setDomainInput("");
    };

    const addIp = () => {
        const v = ipInput.trim();
        if (!v || editIps.includes(v)) return;
        setEditIps((d) => [...d, v]);
        setIpInput("");
    };

    const handleSaveRestrictions = async () => {
        if (!restrictId) return;
        setRestrictSaving(true);
        try {
            await updateRestrictions(restrictId, editDomains, editIps);
            toast.success("Kısıtlamalar kaydedildi");
            setRestrictId(null);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Kaydetme başarısız");
        } finally {
            setRestrictSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteApiKey(id);
            setDeleteId(null);
            toast.success("API Key silindi");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Silme başarısız");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">API Keys</h2>
                    <p className="text-text-muted mt-1">
                        API anahtarlarınızı oluşturun ve yönetin
                    </p>
                </div>

                <Dialog
                    open={open}
                    onOpenChange={(o) => {
                        setOpen(o);
                        if (!o) {
                            setCreatedKey(null);
                            setNewKeyName("");
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold">
                            <Plus className="w-4 h-4 mr-2" />
                            Yeni API Key
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-navy-900 border-navy-700 text-text-primary">
                        <DialogHeader>
                            <DialogTitle>Yeni API Key Oluştur</DialogTitle>
                        </DialogHeader>

                        {!createdKey ? (
                            <>
                                <div className="py-4">
                                    <Label htmlFor="keyName" className="mb-2 block">
                                        Key İsmi
                                    </Label>
                                    <Input
                                        id="keyName"
                                        placeholder="Production App"
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                                        className="bg-navy-800 border-navy-700"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleCreate}
                                        disabled={loading}
                                        className="bg-brand-green hover:bg-brand-green-dark text-navy-950"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Oluşturuluyor...
                                            </span>
                                        ) : (
                                            "Oluştur"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </>
                        ) : (
                            <div className="py-4">
                                <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 mb-4">
                                    <p className="text-sm text-yellow-400">
                                        ⚠️ Bu anahtarı bir daha göremeyeceksiniz. Lütfen güvenli
                                        bir yere kaydedin.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-navy-800 border border-navy-700">
                                    <code className="flex-1 text-sm font-mono text-brand-green break-all">
                                        {createdKey}
                                    </code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleCopy(createdKey, "new")}
                                        className="flex-shrink-0"
                                    >
                                        {copied === "new" ? (
                                            <Check className="w-4 h-4 text-brand-green" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Keys list */}
            <div className="space-y-3">
                {fetchLoading ? (
                    <div className="text-center py-16">
                        <RefreshCw className="w-6 h-6 animate-spin text-text-muted mx-auto" />
                    </div>
                ) : apiKeys.length === 0 ? (
                    <div className="text-center py-16 rounded-xl border border-navy-700/50 bg-navy-900/30">
                        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-text-muted" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                            Henüz API key yok
                        </h3>
                        <p className="text-text-muted text-sm">
                            İlk API anahtarınızı oluşturmak için yukarıdaki butona tıklayın
                        </p>
                    </div>
                ) : (
                    apiKeys.map((apiKey) => (
                        <div
                            key={apiKey.id}
                            className="rounded-xl border border-navy-700/50 bg-navy-900/50 p-5 hover:border-navy-600 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    {/* Name + badges */}
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <h4 className="text-sm font-semibold text-text-primary">
                                            {apiKey.name}
                                        </h4>
                                        <Badge
                                            variant="outline"
                                            className={
                                                apiKey.active
                                                    ? "border-brand-green/30 text-brand-green"
                                                    : "border-red-500/30 text-red-400"
                                            }
                                        >
                                            {apiKey.active ? "Aktif" : "Pasif"}
                                        </Badge>
                                        <Badge variant="outline" className="border-brand-blue/30 text-brand-blue">
                                            {apiKey.planName}
                                        </Badge>
                                    </div>

                                    {/* Token prefix */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <code className="text-xs font-mono text-text-muted">
                                            {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                                        </code>
                                        <button
                                            onClick={() =>
                                                setShowKeys((s) => ({ ...s, [apiKey.id]: !s[apiKey.id] }))
                                            }
                                            className="text-text-muted hover:text-text-primary"
                                        >
                                            {showKeys[apiKey.id] ? (
                                                <EyeOff className="w-3.5 h-3.5" />
                                            ) : (
                                                <Eye className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Usage stats */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs text-text-muted">
                                            <span>Günlük Kullanım</span>
                                            <span className="font-mono">
                                                <span className="text-text-primary font-medium">
                                                    {apiKey.todayRequestCount.toLocaleString("tr-TR")}
                                                </span>
                                                {" / "}
                                                {apiKey.effectiveDailyLimit !== null
                                                    ? apiKey.effectiveDailyLimit.toLocaleString("tr-TR")
                                                    : "∞"}
                                            </span>
                                        </div>
                                        {apiKey.effectiveDailyLimit !== null && (
                                            <div className="h-1.5 rounded-full bg-navy-700 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-brand-green transition-all"
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            (apiKey.todayRequestCount / apiKey.effectiveDailyLimit) * 100
                                                        )}%`,
                                                        backgroundColor:
                                                            apiKey.todayRequestCount / apiKey.effectiveDailyLimit > 0.9
                                                                ? "#ef4444"
                                                                : apiKey.todayRequestCount / apiKey.effectiveDailyLimit > 0.7
                                                                ? "#f59e0b"
                                                                : "#00d97e",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 text-xs text-text-muted">
                                            <span>
                                                Kalan:{" "}
                                                <span className="text-text-primary font-medium font-mono">
                                                    {apiKey.remainingRequests !== null
                                                        ? apiKey.remainingRequests.toLocaleString("tr-TR")
                                                        : "∞"}
                                                </span>
                                            </span>
                                            <span>
                                                Oluşturulma:{" "}
                                                {new Date(apiKey.createdAt).toLocaleDateString("tr-TR")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Restrictions dialog */}
                                    <Dialog
                                        open={restrictId === apiKey.id}
                                        onOpenChange={(o) => !o && setRestrictId(null)}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openRestrictions(apiKey.id)}
                                                className={
                                                    apiKey.allowedDomains.length > 0 || apiKey.allowedIps.length > 0
                                                        ? "text-brand-green"
                                                        : "text-text-muted hover:text-brand-green"
                                                }
                                                title="Kısıtlamalar"
                                            >
                                                <Shield className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-navy-900 border-navy-700 text-text-primary max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Erişim Kısıtlamaları — {apiKey.name}</DialogTitle>
                                            </DialogHeader>
                                            <p className="text-xs text-text-muted -mt-1">
                                                Boş bırakılırsa her yerden istek kabul edilir.
                                            </p>

                                            <div className="space-y-5 py-2">
                                                {/* Domains */}
                                                <div>
                                                    <Label className="text-text-primary mb-2 block text-sm">
                                                        İzin Verilen Domain&apos;ler
                                                    </Label>
                                                    <div className="flex gap-2 mb-2">
                                                        <Input
                                                            placeholder="ornek.com veya *.ornek.com"
                                                            value={domainInput}
                                                            onChange={(e) => setDomainInput(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && addDomain()}
                                                            className="bg-navy-800 border-navy-700 text-sm h-9"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={addDomain}
                                                            className="bg-brand-green hover:bg-brand-green-dark text-navy-950 h-9 px-3"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                                                        {editDomains.length === 0 ? (
                                                            <span className="text-xs text-text-muted italic">Kısıtlama yok</span>
                                                        ) : editDomains.map((d) => (
                                                            <span key={d} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-navy-800 border border-navy-700 text-xs font-mono text-text-primary">
                                                                {d}
                                                                <button onClick={() => setEditDomains((prev) => prev.filter((x) => x !== d))} className="text-text-muted hover:text-red-400 ml-0.5">
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* IPs */}
                                                <div>
                                                    <Label className="text-text-primary mb-2 block text-sm">
                                                        İzin Verilen IP Adresleri
                                                    </Label>
                                                    <div className="flex gap-2 mb-2">
                                                        <Input
                                                            placeholder="192.168.1.1 veya 10.0.0.0/24"
                                                            value={ipInput}
                                                            onChange={(e) => setIpInput(e.target.value)}
                                                            onKeyDown={(e) => e.key === "Enter" && addIp()}
                                                            className="bg-navy-800 border-navy-700 text-sm h-9"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={addIp}
                                                            className="bg-brand-green hover:bg-brand-green-dark text-navy-950 h-9 px-3"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                                                        {editIps.length === 0 ? (
                                                            <span className="text-xs text-text-muted italic">Kısıtlama yok</span>
                                                        ) : editIps.map((ip) => (
                                                            <span key={ip} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-navy-800 border border-navy-700 text-xs font-mono text-text-primary">
                                                                {ip}
                                                                <button onClick={() => setEditIps((prev) => prev.filter((x) => x !== ip))} className="text-text-muted hover:text-red-400 ml-0.5">
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setRestrictId(null)}
                                                    className="border-navy-700 text-text-primary bg-transparent"
                                                >
                                                    İptal
                                                </Button>
                                                <Button
                                                    onClick={handleSaveRestrictions}
                                                    disabled={restrictSaving}
                                                    className="bg-brand-green hover:bg-brand-green-dark text-navy-950"
                                                >
                                                    {restrictSaving ? (
                                                        <span className="flex items-center gap-2">
                                                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                            Kaydediliyor...
                                                        </span>
                                                    ) : "Kaydet"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Regenerate token dialog */}
                                    <Dialog
                                        open={regenerateId === apiKey.id}
                                        onOpenChange={(o) => {
                                            if (!o) { setRegenerateId(null); setRegeneratedKey(null); }
                                        }}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setRegenerateId(apiKey.id)}
                                                className="text-text-muted hover:text-brand-blue"
                                                title="Token Yenile"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-navy-900 border-navy-700 text-text-primary">
                                            <DialogHeader>
                                                <DialogTitle>Token Yenile</DialogTitle>
                                            </DialogHeader>

                                            {!regeneratedKey ? (
                                                <>
                                                    <p className="text-sm text-text-muted py-2">
                                                        <span className="text-yellow-400 font-medium">Dikkat:</span>{" "}
                                                        &quot;{apiKey.name}&quot; için yeni bir token oluşturulacak.
                                                        Mevcut token geçersiz hale gelecektir.
                                                    </p>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setRegenerateId(null)}
                                                            className="border-navy-700 text-text-primary bg-transparent"
                                                        >
                                                            İptal
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleRegenerate(apiKey.id)}
                                                            disabled={regeneratingId === apiKey.id}
                                                            className="bg-brand-blue hover:bg-brand-blue/80 text-white"
                                                        >
                                                            {regeneratingId === apiKey.id ? (
                                                                <span className="flex items-center gap-2">
                                                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                                    Yenileniyor...
                                                                </span>
                                                            ) : (
                                                                "Yenile"
                                                            )}
                                                        </Button>
                                                    </DialogFooter>
                                                </>
                                            ) : (
                                                <div className="py-2">
                                                    <div className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 mb-4">
                                                        <p className="text-sm text-yellow-400">
                                                            ⚠️ Yeni token bir daha gösterilmeyecek. Güvenli bir yere kaydedin.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-navy-800 border border-navy-700">
                                                        <code className="flex-1 text-sm font-mono text-brand-green break-all">
                                                            {regeneratedKey}
                                                        </code>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleCopy(regeneratedKey, "regen")}
                                                            className="flex-shrink-0"
                                                        >
                                                            {copied === "regen" ? (
                                                                <Check className="w-4 h-4 text-brand-green" />
                                                            ) : (
                                                                <Copy className="w-4 h-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog
                                        open={deleteId === apiKey.id}
                                        onOpenChange={(o) => !o && setDeleteId(null)}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(apiKey.id)}
                                                className="text-text-muted hover:text-red-400"
                                                title="Sil"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-navy-900 border-navy-700 text-text-primary">
                                            <DialogHeader>
                                                <DialogTitle>API Key Sil</DialogTitle>
                                            </DialogHeader>
                                            <p className="text-sm text-text-muted py-2">
                                                &quot;{apiKey.name}&quot; anahtarını silmek istediğinizden
                                                emin misiniz? Bu işlem geri alınamaz.
                                            </p>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setDeleteId(null)}
                                                    className="border-navy-700 text-text-primary bg-transparent"
                                                >
                                                    İptal
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(apiKey.id)}
                                                    disabled={deletingId === apiKey.id}
                                                    className="bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    {deletingId === apiKey.id ? (
                                                        <span className="flex items-center gap-2">
                                                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                            Siliniyor...
                                                        </span>
                                                    ) : (
                                                        "Sil"
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
