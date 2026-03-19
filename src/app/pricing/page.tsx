import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import Pricing from "@/components/landing/pricing";

export const metadata = {
    title: "Fiyatlandırma — PharmAPI",
    description: "PharmAPI planlarını karşılaştırın ve ihtiyacınıza uygun planı seçin.",
};

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-navy-950">
            <Navbar />
            <div className="pt-16">
                <Pricing />
            </div>
            <Footer />
        </main>
    );
}
