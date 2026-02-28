'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller({ children }) {
  const smootherRef = useRef(null);

  useEffect(() => {
    if (smootherRef.current) return;

    // ✅ Wait for the intro loader to finish (3000ms) before initializing.
    // If ScrollSmoother inits while content is opacity:0, it miscalculates
    // page height and scroll positions.
    const initTimer = setTimeout(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        // ✅ normalizeScroll removed — it conflicts with fixed/portal elements
        // and causes layout thrashing during the loader phase
      });

      window.__smoother = smootherRef.current;
    }, 3100); // just after loader's onComplete fires at 3000ms

    return () => {
      clearTimeout(initTimer);
      smootherRef.current?.kill();
      smootherRef.current = null;
      window.__smoother = null;
    };
  }, []);

  return (
    /*
      ✅ overflow:hidden stays — GSAP needs it for scroll containment.
      The IntroLoader escapes this via createPortal() in page.jsx,
      so it's no longer affected by this overflow.
    */
    <div id="smooth-wrapper" style={{ overflow: 'hidden', height: '100vh', width: '100%' }}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}