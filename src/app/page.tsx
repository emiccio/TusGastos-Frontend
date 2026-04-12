import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import SocialProof from '@/components/landing/social-proof';
import Problem from '@/components/landing/problem';
import HowItWorks from '@/components/landing/how-it-works';
import Features from '@/components/landing/features';
import DemoChat from '@/components/landing/demo-chat';
// import Pricing from '@/components/landing/pricing';
import Faq from '@/components/landing/faq';
import Cta from '@/components/landing/cta';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Features />
        <DemoChat />
        {/* <Pricing /> */}
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
