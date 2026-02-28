'use client';

import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import Image from 'next/image';

function smoothScrollTo(href) {
  if (window.__smoother) {
    window.__smoother.scrollTo(href, true);
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');
        #footer-main { font-family: 'Bricolage Grotesque', sans-serif; }
      `}</style>

      <footer
        id="contact"
        className="relative text-white px-6 pt-20 pb-8 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0d1f1a 0%, #1a3a2e 50%, #0d1f1a 100%)',
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">

            {/* BRAND & TAGLINE */}
            <div className="flex flex-col items-start max-w-sm space-y-8">
              <div className="relative w-[350px] h-24 md:w-[450px] md:h-28">
                <Image
                  src="/h2.png"
                  alt="Halloon Media"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <div className="flex flex-col space-y-4">
                <p style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.88rem',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                }}>
                  From the house of Tariq al thaki Media consultancy, crafting strategic, creative,
                  and digital solutions across the Middle East and South Asia.
                </p>
              </div>
            </div>

            {/* NAV LINKS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 lg:gap-32">

              {/* MENU */}
              <div className="space-y-5">
                <h4 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}>Menu</h4>
                <ul className="space-y-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.88rem', fontWeight: 400 }}>
                  <li>
                    <button onClick={() => smoothScrollTo('#services')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Services
                    </button>
                  </li>
                  <li>
                    <button onClick={() => smoothScrollTo('#testimonials')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Clients
                    </button>
                  </li>
                  <li>
                    <button onClick={() => smoothScrollTo('#works')} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Works
                    </button>
                  </li>
                </ul>
              </div>

              {/* REGIONS */}
              <div className="space-y-5">
                <h4 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}>Regions</h4>
                <ul className="space-y-3" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.88rem', fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>
                  <li>UAE</li>
                  <li>KSA</li>
                  <li>Qatar</li>
                  <li>Kuwait</li>
                  <li>India</li>
                </ul>
              </div>

              {/* CONTACT — icons only */}
              <div className="space-y-5">
                <h4 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}>Contact</h4>
                <div className="flex gap-4 pt-1" style={{ color: '#78c69a' }}>
                  <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/971568056934" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WhatsApp">
                    <MessageCircle className="w-5 h-5" fill="currentColor" />
                  </a>
                  <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-white/10 mb-12" />

          {/* BOTTOM */}
          <div className="relative pt-8 pb-4">
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <h1
                  className="text-[18vw] md:text-[15vw] leading-none select-none tracking-tighter text-center"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                    color: 'transparent',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  Halloon
                </h1>
                <span className="absolute top-[15%] -right-[5%] text-[2vw] text-white/20 font-light">©</span>
              </div>
            </div>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              textAlign: 'center',
            }}>
              © {new Date().getFullYear()} Halloon Media Consultancy. All rights reserved.
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}