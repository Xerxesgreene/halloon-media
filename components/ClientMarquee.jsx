'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BlurFadeText } from './BlurFadeIn';

/* ─────────────────────────────────────────────
   LOGOS (PLACEHOLDER – TYPO STYLE)
───────────────────────────────────────────── */
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
    <span className={`${logo.className} whitespace-nowrap text-2xl`} style={{ fontFamily: "'Outfit', sans-serif" }}>
      {logo.value}
    </span>
  );
}

export default function ClientMarquee() {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  /* Measure actual width once DOM is ready */
  useEffect(() => {
    if (!trackRef.current) return;
    const width = trackRef.current.scrollWidth / 3; // divided by 3 because we have 3 copies
    setTrackWidth(width);
  }, []);

  /* Infinite loop with seamless reset */
  useAnimationFrame((_, delta) => {
    if (!trackWidth) return;

    const speed = 0.08; // pixels per millisecond - slower, premium pace
    let currentX = x.get() - speed * delta;

    // Reset position seamlessly when one full set has scrolled
    if (Math.abs(currentX) >= trackWidth) {
      currentX = currentX % trackWidth;
    }

    x.set(currentX);
  });

  return (
    <section className="relative py-32 bg-cream-100 overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="relative max-w-7xl mx-auto px-4">

        {/* Premium heading with BlurFadeText animation */}
        <div className="mb-20 text-center">
          <BlurFadeText
            text="OUR TRUSTED CLIENTS"
            as="h2"
            className="
              text-[13px]
              tracking-[0.2em]
              uppercase
              font-medium
              text-forest-600
            "
            style={{ fontFamily: "'Outfit', sans-serif" }}
            delay={0}
            charDelay={0.02}
            duration={0.5}
          />
        </div>

        {/* Enhanced fade edges - more visible */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-cream-100 via-cream-100/60 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-cream-100 via-cream-100/60 to-transparent z-10" />

        {/* Marquee container */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="
              flex
              items-center
              justify-center
              gap-24
              text-forest-600/80
              will-change-transform
            "
          >
            {/* Triple the logos for seamless infinite scroll */}
            {[...Array(3)].map((_, setIndex) => (
              LOGOS.map((logo, i) => (
                <LogoItem key={`set-${setIndex}-${i}`} logo={logo} />
              ))
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}