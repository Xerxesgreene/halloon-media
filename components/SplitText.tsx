'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import React from 'react';

/* ─────────────────────────────────────────────
   PROPS
───────────────────────────────────────────── */
interface SplitTextProps {
  text?: string;
  className?: string;
  tag?: keyof HTMLElementTagNameMap;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export default function SplitText({
  text = '',
  className = '',
  tag = 'h1',
  delay = 0.035,
  duration = 1,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    const chars = ref.current.querySelectorAll<HTMLElement>('.char');

    // ✅ GPU only during animation
    gsap.set(chars, { willChange: 'transform' });

    const tween = gsap.fromTo(
      chars,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: delay,
        onComplete: () => {
          gsap.set(chars, { willChange: 'auto' });
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [text, delay, duration, ease, from, to]);

  return React.createElement(
    tag,
    { ref, className },
    text.split('').map((char, i) =>
      React.createElement(
        'span',
        {
          key: i,
          className: 'char inline-block',
          style: {
            lineHeight: '1.15',   // ✅ fixes g / y / p clipping
            overflow: 'visible',
          },
        },
        char === ' ' ? '\u00A0' : char
      )
    )
  );
}
