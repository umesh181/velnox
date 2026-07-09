import Preloader from '@/components/layout/Preloader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Nav from '@/components/layout/Nav';
import Hero from '@/components/sections/Hero';
import VideoSection from '@/components/sections/VideoSection';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import { DEFAULT_DESCRIPTION, SITE } from '@/lib/seo/config';

export const metadata = {
  title: `${SITE.name}® | Web Design, App Development & SEO Agency`,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name}® | Web Design, App Development & SEO Agency`,
    description: DEFAULT_DESCRIPTION,
    url: SITE.url,
  },
};

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main id="main-content">
        <Hero />
        <Marquee />
        <VideoSection />
        <About />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
