'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import AnimatedBoxes from './AnimatedBoxes';
import SplitText from './SplitText';

/* ─────────────────────────────────────────────
   HERO STATS DATA
───────────────────────────────────────────── */


export default function Hero() {
  const [startTextAnimation, setStartTextAnimation] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStartTextAnimation(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100 pt-32">
      <AnimatedBoxes />

      <motion.div
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 bg-forest-50 border-2 border-forest-200 rounded-full text-forest-600 text-sm font-medium">
            ✨ MEDIA & SOLUTIONS
          </span>
        </motion.div>

        {/* Headings */}
        <div className="mb-8 space-y-4">
          {startTextAnimation && (
            <SplitText
              text="A 360° Integrated"
              tag="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-forest-900 font-display leading-tight"
            />
          )}
          {startTextAnimation && (
            <SplitText
              text="Media Consultancy"
              tag="h1"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-forest-600 font-display leading-tight"
            />
          )}
        </div>

        {/* Subtext */}
        <div className="mb-12 max-w-3xl mx-auto">
          {startTextAnimation && (
            <SplitText
              text="Dubai-based media consultancy delivering strategy, digital, production, events across UAE, KSA, Qatar, Kuwait & India"
              tag="p"
              delay={0.01}
              className="text-lg md:text-xl text-forest-700 leading-relaxed"
            />
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-forest-500 to-forest-400 text-white rounded-full font-semibold flex items-center gap-2">
            Explore Services
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="px-8 py-4 bg-cream-50 border-2 border-forest-500 text-forest-700 rounded-full font-semibold">
            View Our Work
          </button>
        </motion.div>

        {/* DESIGN WORKSPACE */}
        <DesignWorkspace />

       

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2 text-forest-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs font-medium">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border-2 border-forest-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-forest-500 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DESIGN WORKSPACE
───────────────────────────────────────────── */
function DesignWorkspace() {
  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="h-12 flex items-center gap-2 px-4 border-b border-gray-200 bg-gray-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>

        <div className="flex">
          <ToolSidebar />
          <div className="flex-1 bg-gray-50 p-10 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=750&fit=crop&q=90"
              alt="Design workspace"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TOOL SIDEBAR + ICONS
───────────────────────────────────────────── */
function ToolSidebar() {
  const tools = ['cursor', 'frame', 'text', 'shape', 'image', 'hand'];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-3">
      {tools.map((t, i) => (
        <div
          key={t}
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            i === 0 ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <ToolIcon type={t} />
        </div>
      ))}
    </div>
  );
}

function ToolIcon({ type }) {
  const cls = 'w-4 h-4';

  const icons = {
    cursor: (
      <path d="M3 3l10 4-4 1-1 4z" stroke="currentColor" strokeWidth="1.5" />
    ),
    frame: (
      <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    ),
    text: (
      <path d="M4 3h8M8 3v10M6 13h4" stroke="currentColor" strokeWidth="1.5" />
    ),
    shape: (
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
    ),
    image: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </>
    ),
    hand: (
      <path d="M8 3v10M4 8h8" stroke="currentColor" strokeWidth="1.5" />
    ),
  };

  return (
    <svg viewBox="0 0 16 16" fill="none" className={cls}>
      {icons[type]}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   HERO STAT
───────────────────────────────────────────── */
function HeroStat({ value, suffix, label }) {
  const ref = useRef(null);

  useEffect(() => {
    let start = performance.now();
    const animate = (t) => {
      const p = Math.min((t - start) / 900, 1);
      if (ref.current) ref.current.textContent = `${Math.floor(p * value)}${suffix || ''}`;
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, suffix]);

  return (
    <div className="text-center p-6 bg-cream-50 rounded-2xl border border-forest-100">
      <div ref={ref} className="text-4xl md:text-5xl font-bold text-forest-600 mb-2">
        0{suffix || ''}
      </div>
      <div className="text-sm text-forest-600">{label}</div>
    </div>
  );
}
