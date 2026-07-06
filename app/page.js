import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

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
