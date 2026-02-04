'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import IntroLoader from '../components/Introloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ServicesWaypoint from '../components/ServicesWaypoint';
import ClientMarquee from '../components/ClientMarquee';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Works from '../components/Works';
import FloatingContact from '../components/FloatingContact';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Intro Loader */}
      <IntroLoader onComplete={() => setLoaderComplete(true)} />

      {/* Main Content - only shows after loader completes */}
      {loaderComplete && (
        <>
          <div className="bg-cream-200 text-forest-800 min-h-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <ClientMarquee />
            <About />
            <ServicesWaypoint />
            <Works />
            <StatsSection />
            <Testimonials />
            <CTASection />
            <Footer />
          </div>

          {/* Floating WhatsApp + Mail - now shows only after loader */}
          <FloatingContact />
        </>
      )}
    </>
  );
}