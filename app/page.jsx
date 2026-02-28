'use client';

import { useState } from 'react';
import IntroLoader from '../components/Introloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ServicesWaypoint from '../components/ServicesWaypoint';
import ClientMarquee from '../components/ClientMarquee';
import WhyChooseUs from '../components/WhyChooseUs';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Works from '../components/Works';
import FloatingContact from '../components/FloatingContact';
import AboutSection from '../components/AboutSection';
import HeroSection from '../components/Cupsection';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      {/* Intro Loader */}
      <IntroLoader onComplete={() => setLoaderComplete(true)} />

      {/* Main Content */}
      <div
        className="bg-cream-200 text-forest-800 min-h-screen"
        style={{
          opacity: loaderComplete ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          backgroundColor: '#f5f3ed',
        }}
      >
        <Navbar />
        <Hero introDone={loaderComplete} />
        <ClientMarquee />
        <HeroSection />
        <About />
        <ServicesWaypoint />
        <Works />
        <Testimonials />
        <AboutSection />
        <WhyChooseUs />
        <CTASection />
        <Footer />
      </div>

      {/*
        FloatingContact uses createPortal to render directly on document.body,
        completely outside #smooth-wrapper. It polls ScrollSmoother via
        gsap.ticker so it works correctly with GSAP ScrollSmoother.
      */}
      <FloatingContact />
    </>
  );
}