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

    // Normalize scroll here (client-only, after GSAP is ready)
    ScrollTrigger.normalizeScroll(true);

    const initTimer = setTimeout(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,
        effects: false,
        smoothTouch: 0,       // ← use 0 (number) not false — more reliable
        ignoreMobileResize: true, // ← prevents ScrollTrigger refresh on mobile keyboard open
      });

      ScrollTrigger.refresh();

      window.__smoother = smootherRef.current;
    }, 3100);

    return () => {
      clearTimeout(initTimer);
      smootherRef.current?.kill();
      smootherRef.current = null;
      window.__smoother = null;
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      style={{ overflow: 'hidden', height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1 }}
    >
      <div id="smooth-content" style={{ willChange: 'transform', overflowX: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}