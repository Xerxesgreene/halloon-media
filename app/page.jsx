'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

      {/* Main Content - rendered immediately but initially hidden */}
      <div 
        className="bg-cream-200 text-forest-800 min-h-screen overflow-x-hidden"
        style={{ 
          opacity: loaderComplete ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          backgroundColor: '#f5f3ed' // Match the beige background
        }}
      >
        <Navbar />
        <Hero introDone={loaderComplete} />
        <ClientMarquee />
        <About />
        <ServicesWaypoint />
        <Works />   
        <Testimonials />
        <AboutSection />
        <WhyChooseUs/>
        <CTASection />
        <Footer />
      </div>

      {/* Floating WhatsApp + Mail - shows after loader */}
      {loaderComplete && <FloatingContact />}

     
    </>
  );
}