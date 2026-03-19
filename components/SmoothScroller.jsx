'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller({ children }) {
  const smootherRef = useRef(null);

  useEffect(() => {
    // Guard: already initialized
    if (smootherRef.current) return;

    // DO NOT use normalizeScroll with ScrollSmoother —
    // they both intercept native scroll and will conflict,
    // causing stuttering and incorrect scroll position reads.

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,          // slightly higher = more buttery feel
      effects: false,
      smoothTouch: 0,       // disable on touch — GSAP smoothTouch is unreliable on iOS
      ignoreMobileResize: true,
    });

    // Expose globally so other components (e.g. nav links) can call
    // window.__smoother.scrollTo('#section', true) for smooth anchoring
    window.__smoother = smootherRef.current;

    // Single refresh after creation — do NOT delay this, it must run
    // synchronously after create() so ScrollTrigger bounds are correct.
    ScrollTrigger.refresh();

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
      window.__smoother = null;
    };
  }, []);

  return (
    // overflow:hidden on wrapper is intentional — ScrollSmoother needs it.
    // Do NOT add position:fixed here; let the document flow normally.
    // ScrollSmoother handles the fixed positioning of smooth-content internally.
    <div
      id="smooth-wrapper"
      style={{ overflow: 'hidden' }}
    >
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}