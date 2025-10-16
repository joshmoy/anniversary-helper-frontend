import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { UseCases } from '@/components/landing/UseCases';
import { AIWishGenerator } from '@/components/landing/AIWishGenerator';
import { CTABanner } from '@/components/landing/CTABanner';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <Hero />
      <Features />
      <UseCases />
      <AIWishGenerator />
      <CTABanner />
      <Footer />
    </main>
  );
}