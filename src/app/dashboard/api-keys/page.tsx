"use client";

import { useState } from "react";
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
import { Plus, Copy, Trash2, Check, Eye, EyeOff, Power } from "lucide-react";
import toast from "react-hot-toast";

function maskKey(key: string) {
    return key.slice(0, 7) + "••••••••••••" + key.slice(-4);
}

export default function ApiKeysPage() {
    const { apiKeys, addApiKey, deleteApiKey, toggleApiKey } = useAppStore();
    const [newKeyName, setNewKeyName] = useState("");
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState<string | null>(null);

    const handleCreate = () => {
        if (!newKeyName.trim()) {
            toast.error("Lütfen bir isim girin");
            return;
        }
        const newKey = addApiKey(newKeyName.trim());
        setCreatedKey(newKey.key);
        setNewKeyName("");
        toast.success("API Key oluşturuldu!");
    };

    const handleCopy = (key: string, id: string) => {
        navigator.clipboard.writeText(key);
        setCopied(id);
        toast.success("Kopyalandı!");
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDelete = (id: string) => {
        deleteApiKey(id);
        setDeleteId(null);
        toast.success("API Key silindi");
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
                                        className="bg-navy-800 border-navy-700"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleCreate}
                                        className="bg-brand-green hover:bg-brand-green-dark text-navy-950"
                                    >
                                        Oluştur
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
                {apiKeys.length === 0 ? (
                    <div className="text-center py-16 rounded-xl border border-navy-700/50 bg-navy-900/30">
                        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-text-muted" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                            Henüz API key yok
                        </h3>
                        <p className="text-text-muted text-sm mb-4">
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
                                    <div className="flex items-center gap-3 mb-2">
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
                                    </div>
                                    <div className="flex items-center gap-2">
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
                                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                                        <span>
                                            Oluşturulma:{" "}
                                            {new Date(apiKey.createdAt).toLocaleDateString("tr-TR")}
                                        </span>
                                        <span>
                                            Son kullanım:{" "}
                                            {apiKey.lastUsed
                                                ? new Date(apiKey.lastUsed).toLocaleDateString("tr-TR")
                                                : "Kullanılmadı"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleCopy(apiKey.key, apiKey.id)}
                                        className="text-text-muted hover:text-text-primary"
                                    >
                                        {copied === apiKey.id ? (
                                            <Check className="w-4 h-4 text-brand-green" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleApiKey(apiKey.id)}
                                        className={
                                            apiKey.active
                                                ? "text-brand-green hover:text-brand-green-dark"
                                                : "text-text-muted hover:text-text-primary"
                                        }
                                    >
                                        <Power className="w-4 h-4" />
                                    </Button>

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
                                                    className="bg-red-500 hover:bg-red-600 text-white"
                                                >
                                                    Sil
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
