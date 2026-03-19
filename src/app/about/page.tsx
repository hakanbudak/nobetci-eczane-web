import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { Shield, Eye, Zap, Globe, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "Hakkımızda — PharmAPI",
    description:
        "PharmAPI olarak Türkiye'nin sağlık verisi altyapısını modernleştiriyoruz.",
};

const values = [
    {
        icon: Shield,
        title: "Güvenilirlik",
        desc: "Verilerimiz her zaman doğru ve güncel. %99.9 uptime garantisi sunuyoruz.",
    },
    {
        icon: Eye,
        title: "Şeffaflık",
        desc: "Açık fiyatlandırma, detaylı dokümantasyon ve net iletişim politikası.",
    },
    {
        icon: Zap,
        title: "Hız",
        desc: "Milisaniyeler içinde yanıt. Optimizasyonu asla durdurmuyoruz.",
    },
    {
        icon: Globe,
        title: "Erişilebilirlik",
        desc: "Türkiye'nin her köşesindeki eczane verisine tek API ile erişim.",
    },
];

const team = [
    { name: "Hakan Budak", role: "Frontend Developer", initials: "HB" },
    { name: "Selamet Şamlı", role: "Backend Developer", initials: "SS" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-navy-950">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-6">
                        <Heart className="w-4 h-4" />
                        Hakkımızda
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
                        Türkiye&apos;nin sağlık verisi{" "}
                        <span className="gradient-text">altyapısını modernleştiriyoruz</span>
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        PharmAPI, geliştiricilerin ve kurumların Türkiye genelindeki eczane
                        verilerine kolayca erişebilmesi için kurulmuş bir
                        teknoloji şirketidir.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-text-primary mb-4">
                            Misyonumuz
                        </h2>
                        <p className="text-text-muted leading-relaxed mb-4">
                            Sağlık sektöründeki veri erişim sorununu çözüyoruz. Nöbetçi eczane
                            bilgisi her vatandaşın temel ihtiyacı, ancak bu veriye programatik
                            erişim hâlâ zor.
                        </p>
                        <p className="text-text-muted leading-relaxed">
                            Biz bu sorunu tek bir API ile çözüyoruz. 81 ilden, 973 ilçeden
                            anlık veri sağlayan, güvenilir ve hızlı bir altyapı inşa ettik.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: "81", label: "İl Kapsama" },
                            { value: "1.200+", label: "Geliştirici" },
                            { value: "%99.9", label: "Uptime" },
                            { value: "<120ms", label: "Ort. Yanıt" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-6 rounded-xl border border-navy-700/50 bg-navy-900/30 text-center"
                            >
                                <div className="text-2xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-text-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
                        Değerlerimiz
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => (
                            <div
                                key={v.title}
                                className="p-6 rounded-2xl border border-navy-700/50 bg-navy-900/30 hover:border-brand-green/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4">
                                    <v.icon className="w-6 h-6 text-brand-green" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
                        Ekibimiz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {team.map((m) => (
                            <div key={m.name} className="text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-blue/20 border border-navy-700 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-xl font-bold gradient-text">
                                        {m.initials}
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-text-primary">
                                    {m.name}
                                </h4>
                                <p className="text-xs text-text-muted">{m.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">
                        Birlikte çalışalım
                    </h2>
                    <p className="text-text-muted mb-6">
                        Sorularınız mı var? Bizimle iletişime geçin.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold px-8">
                            İletişime Geç
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
