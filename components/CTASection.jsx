'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import BlurFadeIn from './BlurFadeIn';

function smoothScrollTo(href) {
  if (window.__smoother) {
    window.__smoother.scrollTo(href, true);
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function CTASection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,800&display=swap');
      `}</style>

      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", background: '#F0EBE3' }}
      >
        <div className="max-w-6xl mx-auto">
          <BlurFadeIn duration={0.8} yOffset={40}>
            <div className="rounded-[40px] bg-gradient-to-br from-[#1a3a2e] to-[#2d5f4d] shadow-[0_40px_120px_rgba(26,58,46,0.45)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT CONTENT */}
                <div className="p-12 md:p-16">

                  <BlurFadeIn delay={0.15}>
                    <span style={{
                      display: 'inline-block',
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#78c69a',
                      marginBottom: '20px',
                    }}>
                      Get Started
                    </span>
                  </BlurFadeIn>

                  <BlurFadeIn delay={0.2}>
                    <h2 style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                      lineHeight: 1.03,
                      letterSpacing: '-0.04em',
                      color: '#f5f3ed',
                      margin: '0 0 24px',
                    }}>
                      Ready to Transform<br />Your Brand?
                    </h2>
                  </BlurFadeIn>

                  <BlurFadeIn delay={0.3}>
                    <p style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                      color: 'rgba(245,243,237,0.7)',
                      lineHeight: 1.85,
                      maxWidth: '400px',
                      margin: '0 0 40px',
                    }}>
                      Let's begin your journey with a discovery session to finalise
                      design, plan and objectives.
                    </p>
                  </BlurFadeIn>

                  {/* CTA Button — now uses ScrollSmoother */}
                  <BlurFadeIn delay={0.4}>
                    <motion.button
                      onClick={() => smoothScrollTo('#contact')}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#f5f3ed',
                        color: '#1a3a2e',
                        padding: '14px 32px',
                        borderRadius: '100px',
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                        cursor: 'pointer',
                        border: 'none',
                      }}
                    >
                      Start Today
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </BlurFadeIn>
                </div>

                {/* RIGHT GLOWING BULB */}
                <div className="relative hidden lg:flex items-center justify-center">
                  <BlurFadeIn delay={0.5} blur={20}>
                    <div className="absolute w-[220px] h-[220px] bg-[#5eb083]/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                    <div className="absolute w-[320px] h-[320px] bg-[#78c69a]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                    <div className="relative w-[260px] h-[260px] rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                      <Lightbulb className="w-28 h-28 text-[#78c69a]" />
                    </div>
                  </BlurFadeIn>
                </div>

              </div>
            </div>
          </BlurFadeIn>
        </div>
      </section>
    </>
  );
}