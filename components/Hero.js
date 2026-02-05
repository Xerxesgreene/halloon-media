'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import AnimatedBoxes from './AnimatedBoxes';
import SplitText from './SplitText';

export default function Hero() {
  const [startTextAnimation, setStartTextAnimation] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStartTextAnimation(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100 pt-24 sm:pt-28 md:pt-32 pb-16">
      <AnimatedBoxes />

      <motion.div
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="
            inline-block
            px-5 py-1.5
            sm:px-6 sm:py-2
            bg-forest-50
            border-2 border-forest-200
            rounded-full
            text-forest-600
            text-xs sm:text-sm
            font-sans-serif font-medium
          ">
           MEDIA CONSULTANCY
          </span>
        </motion.div>

        {/* Headings */}
        <div className="mb-6 sm:mb-8 space-y-1.5 sm:space-y-2 md:space-y-4">
          {startTextAnimation && (
            <SplitText
              text="A 360° Integrated"
              tag="h1"
              className="
                text-[1.9rem]
                sm:text-5xl
                md:text-7xl
                font-semibold
                text-forest-900
                font-sans-serif
                leading-[1.2]
              "
            />
          )}

          {startTextAnimation && (
            <SplitText
              text="Media Consultancy"
              tag="h1"
              className="
                text-[1.9rem]
                sm:text-5xl
                md:text-7xl
                font-semibold
                text-forest-600
                font-sans-serif
                leading-[1.2]
              "
            />
          )}

          {startTextAnimation && (
            <SplitText
              text="For Brands That Lead."
              tag="h1"
              className="
                text-[1.9rem]
                sm:text-5xl
                md:text-7xl
                font-semibold
                text-forest-600
                font-sans-serif
                leading-[1.25]
              "
            />
          )}
        </div>

        {/* Subtext */}
        <div className="mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
          {startTextAnimation && (
            <SplitText
              text="Dubai-based media consultancy delivering strategy, digital, production, and events across UAE, KSA, Qatar, Kuwait & India."
              tag="p"
              delay={0.01}
              className="
                text-sm
                sm:text-base
                md:text-xl
                text-forest-700
                leading-relaxed
              "
            />
          )}
        </div>

        {/* CTA */}
        <motion.div
  className="
    flex
    flex-col
    sm:flex-row
    gap-3
    sm:gap-4
    justify-center
    items-center
    mb-12 sm:mb-16 md:mb-20
  "
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  {/* Explore Services */}
  <button
    onClick={() => {
      document.getElementById('services')?.scrollIntoView({
        behavior: 'smooth',
      });
    }}
    className="px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-forest-500 to-forest-400 text-white rounded-full font-semibold flex items-center gap-2"
  >
    Explore Services
    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
  </button>

  {/* View Our Work */}
  <button
    onClick={() => {
      document.getElementById('works')?.scrollIntoView({
        behavior: 'smooth',
      });
    }}
    className="px-7 sm:px-8 py-3.5 sm:py-4 bg-cream-50 border-2 border-forest-500 text-forest-700 rounded-full font-semibold"
  >
    View Our Work
  </button>
</motion.div>


        {/* DESIGN WORKSPACE (kept, just scaled better) */}
        <DesignWorkspace />

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-forest-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[10px] sm:text-xs font-medium tracking-wide">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 sm:w-6 h-9 sm:h-10 border-2 border-forest-400 rounded-full flex justify-center">
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
      className="max-w-5xl mx-auto mt-12 sm:mt-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 sm:h-12 flex items-center gap-2 px-4 border-b border-gray-200 bg-gray-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>

        <div className="flex">
          <ToolSidebar />
          <div className="flex-1 bg-gray-50 p-6 sm:p-8 md:p-10 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=750&fit=crop&q=90"
              alt="Design workspace"
              className="rounded-xl shadow-xl max-h-[420px] sm:max-h-none object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TOOL SIDEBAR
───────────────────────────────────────────── */
function ToolSidebar() {
  const tools = ['cursor', 'frame', 'text', 'shape', 'image', 'hand'];

  return (
    <div className="w-14 sm:w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 sm:py-6 gap-3">
      {tools.map((t, i) => (
        <div
          key={t}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${
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
  const icons = {
    cursor: <path d="M3 3l10 4-4 1-1 4z" stroke="currentColor" strokeWidth="1.5" />,
    frame: <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />,
    text: <path d="M4 3h8M8 3v10M6 13h4" stroke="currentColor" strokeWidth="1.5" />,
    shape: <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />,
    image: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </>
    ),
    hand: <path d="M8 3v10M4 8h8" stroke="currentColor" strokeWidth="1.5" />,
  };

  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
      {icons[type]}
    </svg>
  );
}
