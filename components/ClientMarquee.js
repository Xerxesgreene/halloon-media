'use client';

import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   LOGOS (PLACEHOLDER – TYPO STYLE)
───────────────────────────────────────────── */
const LOGOS = [
  { type: 'text', value: 'venice.', className: 'font-serif italic' },
  { type: 'text', value: 'thes', className: 'font-medium' },
  { type: 'dots' },
  { type: 'text', value: 'MILANO', className: 'tracking-[0.35em] text-sm font-semibold' },
  { type: 'text', value: 'Amsterdam', className: 'font-medium' },
];

function LogoItem({ logo }) {
  if (logo.type === 'dots') {
    return (
      <div className="flex gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-current" />
        <span className="w-2.5 h-2.5 rounded-full bg-current" />
      </div>
    );
  }

  return (
    <span className={`${logo.className} whitespace-nowrap`}>
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
    setTrackWidth(trackRef.current.scrollWidth / 2);
  }, []);

  /* Infinite loop with modulo math */
  useAnimationFrame((_, delta) => {
    if (!trackWidth) return;

    const speed = 0.04; // premium speed
    let currentX = x.get() - speed * delta;

    if (Math.abs(currentX) >= trackWidth) {
      currentX += trackWidth;
    }

    x.set(currentX);
  });

  return (
    <section className="relative py-28 bg-cream-100 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">

        {/* Premium heading */}
        <div className="mb-14 text-center">
          <span className="
            text-[13px]
            tracking-[0.2em]
            uppercase
            font-medium
            text-forest-600
          ">
            Our trusted clients
          </span>
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-cream-100 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-cream-100 to-transparent z-10" />

        {/* Marquee */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="
              flex
              items-center
              gap-20
              text-forest-600/80
              will-change-transform
            "
          >
            {/* Track A */}
            {LOGOS.map((logo, i) => (
              <LogoItem key={`a-${i}`} logo={logo} />
            ))}

            {/* Track B (exact clone) */}
            {LOGOS.map((logo, i) => (
              <LogoItem key={`b-${i}`} logo={logo} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
