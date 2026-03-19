import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Features from "@/components/landing/features";
import LiveDemo from "@/components/landing/live-demo";
import Pricing from "@/components/landing/pricing";
import TrustSignals from "@/components/landing/trust-signals";
import CTABanner from "@/components/landing/cta-banner";
import Footer from "@/components/landing/footer";

export const metadata = {
  title: "PharmAPI — Türkiye Nöbetçi Eczane API | Tek API, Tüm Veriler",
  description:
    "Türkiye genelindeki 81 il ve 973 ilçedeki nöbetçi eczane verilerine tek bir API ile erişin. %99.9 uptime, gerçek zamanlı veri, kolay entegrasyon.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <LiveDemo />
      <Pricing />
      <TrustSignals />
      <CTABanner />
      <Footer />
    </main>
  );
}
