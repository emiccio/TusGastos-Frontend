import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import Features from '@/components/landing/features';
import Pricing from '@/components/landing/pricing';
import Faq from '@/components/landing/faq';
import SocialProof from '@/components/landing/social-proof';
import Cta from '@/components/landing/cta';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        {/* <Pricing /> */}
        <Faq />
        <SocialProof />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
