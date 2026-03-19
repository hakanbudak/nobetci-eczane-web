"use client";

import { useState } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Key,
    AlertTriangle,
    Code,
    Zap,
    FileJson,
    Building2,
    MapPin,
    Copy,
    Check,
} from "lucide-react";

const sidebarSections = [
    {
        title: "Giriş",
        items: [
            { id: "overview", label: "Genel Bakış", icon: BookOpen },
            { id: "auth", label: "Authentication", icon: Key },
            { id: "rate-limiting", label: "Rate Limiting", icon: Zap },
            { id: "errors", label: "Hata Kodları", icon: AlertTriangle },
        ],
    },
    {
        title: "Endpoint'ler",
        items: [
            { id: "pharmacies-duty", label: "GET /pharmacies/duty", icon: MapPin },
            { id: "pharmacies-all", label: "GET /pharmacies/all", icon: Building2 },
            { id: "pharmacies-id", label: "GET /pharmacies/{id}", icon: FileJson },
            { id: "cities", label: "GET /cities", icon: Building2 },
            { id: "districts", label: "GET /districts/{cityId}", icon: MapPin },
        ],
    },
    {
        title: "Rehberler",
        items: [
            { id: "quickstart", label: "Hızlı Başlangıç", icon: Zap },
            { id: "examples", label: "Örnek Projeler", icon: Code },
        ],
    },
];

const codeExamples: Record<string, { label: string; code: string }[]> = {
    "pharmacies-duty": [
        {
            label: "cURL",
            code: `curl -X GET "https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34&district=Kadıköy" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
        },
        {
            label: "JavaScript",
            code: `const response = await fetch(
  'https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34&district=Kadıköy',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);
const data = await response.json();
console.log(data);`,
        },
        {
            label: "Python",
            code: `import requests

response = requests.get(
    'https://api.pharmapi.com.tr/v1/pharmacies/duty',
    params={'city_id': '34', 'district': 'Kadıköy'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
print(response.json())`,
        },
        {
            label: "PHP",
            code: `$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 
  'https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34&district=Kadıköy');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Bearer YOUR_API_KEY'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
echo $response;`,
        },
        {
            label: "Go",
            code: `req, _ := http.NewRequest("GET",
  "https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34&district=Kadıköy", nil)
req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
client := &http.Client{}
resp, _ := client.Do(req)
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
fmt.Println(string(body))`,
        },
    ],
};

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-navy-700 transition-colors text-text-muted hover:text-text-primary"
        >
            {copied ? <Check className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4" />}
        </button>
    );
}

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [activeTab, setActiveTab] = useState("cURL");

    return (
        <main className="min-h-screen bg-navy-950">
            <Navbar />
            <div className="pt-16 flex max-w-[1400px] mx-auto">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-navy-700 min-h-[calc(100vh-4rem)] sticky top-16 self-start overflow-y-auto py-8 px-4">
                    {sidebarSections.map((section) => (
                        <div key={section.title} className="mb-6">
                            <h3 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3 px-3">
                                {section.title}
                            </h3>
                            <ul className="space-y-0.5">
                                {section.items.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${activeSection === item.id
                                                    ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                                                    : "text-text-muted hover:text-text-primary hover:bg-navy-800"
                                                }`}
                                        >
                                            <item.icon className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Content */}
                <div className="flex-1 py-8 px-4 sm:px-8 lg:px-12 max-w-4xl">
                    {activeSection === "overview" && (
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-text-primary mb-4">
                                API Dokümantasyonu
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                PharmAPI, Türkiye genelindeki eczane ve nöbetçi eczane verilerine
                                programatik erişim sağlayan RESTful bir API&apos;dir. Bu dokümantasyon,
                                API&apos;yi entegre etmeniz için ihtiyacınız olan tüm bilgileri içerir.
                            </p>

                            <div className="code-block p-4 mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-text-muted">Base URL</span>
                                    <CopyButton text="https://api.pharmapi.com.tr/v1" />
                                </div>
                                <code className="text-sm text-brand-green font-mono">
                                    https://api.pharmapi.com.tr/v1
                                </code>
                            </div>

                            <h2 className="text-xl font-semibold text-text-primary mb-4 mt-8">
                                Hızlı Başlangıç
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Ücretsiz hesap oluşturun ve API anahtarınızı alın",
                                    "Authorization header'ına API anahtarınızı ekleyin",
                                    'İlk isteğinizi gönderin: GET /v1/pharmacies/duty?city_id=34',
                                ].map((step, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-navy-700/50 bg-navy-900/30"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-bold text-brand-green">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <p className="text-text-muted text-sm pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === "auth" && (
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-text-primary mb-4">
                                Authentication
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                Tüm API istekleri, <code className="text-brand-green bg-navy-800 px-1.5 py-0.5 rounded text-sm">Authorization</code> header'ında geçerli bir API anahtarı gerektirir.
                            </p>

                            <div className="code-block p-4 mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-text-muted">Header formatı</span>
                                    <CopyButton text='Authorization: Bearer YOUR_API_KEY' />
                                </div>
                                <code className="text-sm text-brand-green font-mono">
                                    Authorization: Bearer YOUR_API_KEY
                                </code>
                            </div>

                            <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 mb-6">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-yellow-500 mb-1">
                                            Güvenlik Uyarısı
                                        </h4>
                                        <p className="text-sm text-text-muted">
                                            API anahtarınızı asla istemci tarafında (frontend) kodda
                                            açık şekilde bırakmayın. Sunucu tarafında saklayın ve
                                            ortam değişkeni olarak kullanın.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "rate-limiting" && (
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-text-primary mb-4">
                                Rate Limiting
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                API istekleriniz planınıza göre günlük limit ile sınırlandırılmıştır.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-navy-700">
                                            <th className="pb-3 pr-6 text-sm font-semibold text-text-primary">Plan</th>
                                            <th className="pb-3 pr-6 text-sm font-semibold text-text-primary">Günlük Limit</th>
                                            <th className="pb-3 text-sm font-semibold text-text-primary">Rate Limit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-text-muted">
                                        <tr className="border-b border-navy-700/50">
                                            <td className="py-3 pr-6">Free</td>
                                            <td className="py-3 pr-6">500 istek/gün</td>
                                            <td className="py-3">10 istek/dakika</td>
                                        </tr>
                                        <tr className="border-b border-navy-700/50">
                                            <td className="py-3 pr-6">Pro</td>
                                            <td className="py-3 pr-6">50.000 istek/gün</td>
                                            <td className="py-3">100 istek/dakika</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 pr-6">Enterprise</td>
                                            <td className="py-3 pr-6">Sınırsız</td>
                                            <td className="py-3">Sınırsız</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="code-block p-4 mt-8">
                                <span className="text-xs text-text-muted block mb-2">Response Headers</span>
                                <pre className="text-sm font-mono text-text-muted">
                                    {`X-RateLimit-Limit: 50000
X-RateLimit-Remaining: 49234
X-RateLimit-Reset: 2025-01-16T00:00:00Z`}
                                </pre>
                            </div>
                        </div>
                    )}

                    {activeSection === "errors" && (
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-text-primary mb-4">
                                Hata Kodları
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                API, standart HTTP durum kodları ve açıklayıcı hata mesajları döner.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-navy-700">
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Kod</th>
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Mesaj</th>
                                            <th className="pb-3 text-sm font-semibold text-text-primary">Açıklama</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-text-muted">
                                        {[
                                            { code: 400, msg: "INVALID_CITY_ID", desc: "Geçersiz il kodu" },
                                            { code: 401, msg: "UNAUTHORIZED", desc: "API key eksik veya geçersiz" },
                                            { code: 403, msg: "QUOTA_EXCEEDED", desc: "Günlük kota aşıldı" },
                                            { code: 404, msg: "NO_DUTY_PHARMACY_FOUND", desc: "Bu bölgede nöbetçi eczane bulunamadı" },
                                            { code: 429, msg: "RATE_LIMIT_EXCEEDED", desc: "Çok fazla istek gönderildi" },
                                            { code: 500, msg: "INTERNAL_SERVER_ERROR", desc: "Sunucu hatası" },
                                        ].map((err) => (
                                            <tr key={err.code} className="border-b border-navy-700/50">
                                                <td className="py-3 pr-4">
                                                    <Badge
                                                        variant="outline"
                                                        className={`font-mono ${err.code >= 500
                                                                ? "border-red-500/30 text-red-400"
                                                                : err.code >= 400
                                                                    ? "border-yellow-500/30 text-yellow-400"
                                                                    : "border-brand-green/30 text-brand-green"
                                                            }`}
                                                    >
                                                        {err.code}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 pr-4 font-mono text-xs">{err.msg}</td>
                                                <td className="py-3">{err.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === "pharmacies-duty" && (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-brand-green/10 text-brand-green border border-brand-green/30">
                                    GET
                                </Badge>
                                <h1 className="text-2xl font-bold text-text-primary font-mono">
                                    /pharmacies/duty
                                </h1>
                            </div>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                Belirtilen il/ilçe için aktif nöbetçi eczaneleri döner.
                            </p>

                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                İstek Parametreleri
                            </h2>
                            <div className="overflow-x-auto mb-8">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-navy-700">
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Parametre</th>
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Tip</th>
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Zorunlu</th>
                                            <th className="pb-3 text-sm font-semibold text-text-primary">Açıklama</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-text-muted">
                                        {[
                                            { param: "city_id", type: "string", req: true, desc: 'İl kodu (örn: "34")' },
                                            { param: "district", type: "string", req: false, desc: "İlçe adı" },
                                            { param: "lat", type: "float", req: false, desc: "Enlem koordinatı" },
                                            { param: "lng", type: "float", req: false, desc: "Boylam koordinatı" },
                                        ].map((p) => (
                                            <tr key={p.param} className="border-b border-navy-700/50">
                                                <td className="py-3 pr-4 font-mono text-brand-green text-xs">{p.param}</td>
                                                <td className="py-3 pr-4 font-mono text-xs">{p.type}</td>
                                                <td className="py-3 pr-4">{p.req ? "✅" : "❌"}</td>
                                                <td className="py-3">{p.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Başarılı Yanıt (200)
                            </h2>
                            <div className="code-block p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-text-muted leading-6">
                                    {`{
  "success": true,
  "data": [
    {
      "id": "eczane_123",
      "name": "Merkez Eczanesi",
      "address": "Bağcılar Mah. No:5 İstanbul",
      "phone": "02125551234",
      "lat": 41.0082,
      "lng": 28.9784,
      "on_duty": true,
      "duty_start": "2025-01-15T09:00:00Z",
      "duty_end": "2025-01-16T09:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "city": "İstanbul",
    "district": "Bağcılar",
    "timestamp": "2025-01-15T14:30:00Z"
  }
}`}
                                </pre>
                            </div>

                            <h2 className="text-lg font-semibold text-text-primary mb-4">
                                Kod Örnekleri
                            </h2>
                            <div className="code-block overflow-hidden">
                                <div className="flex border-b border-navy-700 overflow-x-auto">
                                    {(codeExamples["pharmacies-duty"] || []).map((ex) => (
                                        <button
                                            key={ex.label}
                                            onClick={() => setActiveTab(ex.label)}
                                            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === ex.label
                                                    ? "text-brand-green border-b-2 border-brand-green bg-brand-green/5"
                                                    : "text-text-muted hover:text-text-primary"
                                                }`}
                                        >
                                            {ex.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-4 overflow-x-auto">
                                    <div className="flex justify-end mb-2">
                                        <CopyButton
                                            text={
                                                (codeExamples["pharmacies-duty"] || []).find(
                                                    (e) => e.label === activeTab
                                                )?.code || ""
                                            }
                                        />
                                    </div>
                                    <pre className="text-sm font-mono text-text-muted leading-6">
                                        {(codeExamples["pharmacies-duty"] || []).find(
                                            (e) => e.label === activeTab
                                        )?.code}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "pharmacies-all" && (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-brand-green/10 text-brand-green border border-brand-green/30">GET</Badge>
                                <h1 className="text-2xl font-bold text-text-primary font-mono">/pharmacies/all</h1>
                            </div>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                Belirtilen il/ilçedeki tüm eczaneleri (nöbetçi olmayan dahil) döner.
                            </p>
                            <h2 className="text-lg font-semibold text-text-primary mb-4">İstek Parametreleri</h2>
                            <div className="overflow-x-auto mb-8">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-navy-700">
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Parametre</th>
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Tip</th>
                                            <th className="pb-3 pr-4 text-sm font-semibold text-text-primary">Zorunlu</th>
                                            <th className="pb-3 text-sm font-semibold text-text-primary">Açıklama</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-text-muted">
                                        <tr className="border-b border-navy-700/50">
                                            <td className="py-3 pr-4 font-mono text-brand-green text-xs">city_id</td>
                                            <td className="py-3 pr-4 font-mono text-xs">string</td>
                                            <td className="py-3 pr-4">✅</td>
                                            <td className="py-3">İl kodu</td>
                                        </tr>
                                        <tr className="border-b border-navy-700/50">
                                            <td className="py-3 pr-4 font-mono text-brand-green text-xs">district</td>
                                            <td className="py-3 pr-4 font-mono text-xs">string</td>
                                            <td className="py-3 pr-4">❌</td>
                                            <td className="py-3">İlçe adı filtresi</td>
                                        </tr>
                                        <tr className="border-b border-navy-700/50">
                                            <td className="py-3 pr-4 font-mono text-brand-green text-xs">page</td>
                                            <td className="py-3 pr-4 font-mono text-xs">integer</td>
                                            <td className="py-3 pr-4">❌</td>
                                            <td className="py-3">Sayfa numarası (varsayılan: 1)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 pr-4 font-mono text-brand-green text-xs">limit</td>
                                            <td className="py-3 pr-4 font-mono text-xs">integer</td>
                                            <td className="py-3 pr-4">❌</td>
                                            <td className="py-3">Sayfa başına sonuç (varsayılan: 20, max: 100)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {(activeSection === "pharmacies-id" || activeSection === "cities" || activeSection === "districts") && (
                        <div className="animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-brand-green/10 text-brand-green border border-brand-green/30">GET</Badge>
                                <h1 className="text-2xl font-bold text-text-primary font-mono">
                                    {activeSection === "pharmacies-id" && "/pharmacies/{id}"}
                                    {activeSection === "cities" && "/cities"}
                                    {activeSection === "districts" && "/districts/{cityId}"}
                                </h1>
                            </div>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                {activeSection === "pharmacies-id" && "Belirtilen ID'ye sahip eczanenin detay bilgilerini döner."}
                                {activeSection === "cities" && "Türkiye'deki tüm illeri ve il kodlarını döner."}
                                {activeSection === "districts" && "Belirtilen ile ait tüm ilçeleri döner."}
                            </p>
                        </div>
                    )}

                    {(activeSection === "quickstart" || activeSection === "examples") && (
                        <div className="animate-fade-in">
                            <h1 className="text-3xl font-bold text-text-primary mb-4">
                                {activeSection === "quickstart" ? "Hızlı Başlangıç" : "Örnek Projeler"}
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                {activeSection === "quickstart"
                                    ? "PharmAPI'yi projenize dakikalar içinde entegre edin."
                                    : "Farklı diller ve framework'ler için örnek projeleri inceleyin."}
                            </p>

                            {activeSection === "quickstart" && (
                                <div className="space-y-6">
                                    <div className="code-block p-4">
                                        <span className="text-xs text-text-muted block mb-3">1. API Anahtarınızı ortam değişkenine ekleyin</span>
                                        <pre className="text-sm font-mono text-text-muted">
                                            PHARMAPI_KEY=sk_live_your_key_here
                                        </pre>
                                    </div>
                                    <div className="code-block p-4">
                                        <span className="text-xs text-text-muted block mb-3">2. İlk isteğinizi gönderin</span>
                                        <pre className="text-sm font-mono text-text-muted leading-6">{`curl -X GET "https://api.pharmapi.com.tr/v1/pharmacies/duty?city_id=34" \\
  -H "Authorization: Bearer $PHARMAPI_KEY"`}</pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
