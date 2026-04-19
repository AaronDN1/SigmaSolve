import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { LandingIntro } from "@/components/landing/landing-intro";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MarketingNav } from "@/components/landing/marketing-nav";
import { SiteFootnote } from "@/components/landing/site-footnote";

export default function HomePage() {
  return (
    <main>
      <MarketingNav />
      <LandingIntro />
      <Hero />
      <Features />
      <HowItWorks />
      <Cta />
      <SiteFootnote />
    </main>
  );
}
