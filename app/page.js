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
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <VideoSection />
        <About />
        <Services />
        <Work />
        <Process />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
