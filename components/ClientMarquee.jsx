'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BlurFadeText } from './BlurFadeIn';

const LOGOS = [
  { type: 'text', value: 'Amsterdam', className: 'font-medium' },
  { type: 'text', value: 'venice.', className: 'font-serif italic' },
  { type: 'text', value: 'thes', className: 'font-medium' },
  { type: 'dots' },
  { type: 'text', value: 'MILANO', className: 'tracking-[0.35em] text-sm font-semibold' },
];

function LogoItem({ logo }) {
  if (logo.type === 'dots') {
    return (
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-current" />
        <span className="w-3 h-3 rounded-full bg-current" />
      </div>
    );
  }
  return (
    <span
      className={`${logo.className} whitespace-nowrap text-2xl`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {logo.value}
    </span>
  );
}

export default function ClientMarquee() {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    setTrackWidth(trackRef.current.scrollWidth / 3);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!trackWidth) return;
    let currentX = x.get() - 0.08 * delta;
    if (Math.abs(currentX) >= trackWidth) currentX = currentX % trackWidth;
    x.set(currentX);
  });

  const bg = '#F0EBE3';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&display=swap');

        .marquee-heading,
        .marquee-heading span,
        .marquee-heading [class*="blur"],
        .marquee-heading * {
          font-family: 'Bricolage Grotesque', sans-serif !important;
        }

        /* ✅ The gap cover strip — sits above everything at the very top of
           this section, same cream color, hides any browser sub-pixel line */
        #marquee-section::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 0;
          right: 0;
          height: 6px;
          background: #F0EBE3;
          z-index: 10;
          pointer-events: none;
        }
      `}</style>

      <section
        id="marquee-section"
        className="relative py-32 overflow-hidden"
        style={{
          background: bg,
          fontFamily: "'DM Sans', sans-serif",
          position: 'relative',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4">

          <div className="mb-20 text-center">
            <div
              className="marquee-heading"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <BlurFadeText
                text="OUR TRUSTED CLIENTS"
                as="h2"
                className="text-[13px] tracking-[0.2em] uppercase font-medium text-forest-600"
                delay={0}
                charDelay={0.02}
                duration={0.5}
              />
            </div>
          </div>

          {/* Fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-48 z-10"
            style={{ background: `linear-gradient(to right, ${bg} 0%, ${bg}99 50%, transparent 100%)` }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-48 z-10"
            style={{ background: `linear-gradient(to left, ${bg} 0%, ${bg}99 50%, transparent 100%)` }}
          />

          <div className="overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center justify-center gap-24 text-forest-600/80 will-change-transform"
            >
              {[...Array(3)].map((_, setIndex) =>
                LOGOS.map((logo, i) => (
                  <LogoItem key={`set-${setIndex}-${i}`} logo={logo} />
                ))
              )}
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}