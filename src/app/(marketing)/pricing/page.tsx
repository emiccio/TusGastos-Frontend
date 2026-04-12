import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';
import PricingSection from '@/components/landing/pricing';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-1">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
