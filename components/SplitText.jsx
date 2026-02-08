'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import React from 'react';

export default function SplitText({
  text = '',
  className = '',
  tag = 'h1',
  delay = 0.03,
  duration = 1.1,
  ease = 'power3.out',
}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || !text || hasAnimated.current) return;

    const element = ref.current;
    const chars = element.querySelectorAll('.char');
    if (!chars.length) return;

    // Initial hidden state (no flash)
    gsap.set(chars, {
      opacity: 0,
      filter: 'blur(10px)',
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;

        gsap.set(chars, {
          willChange: 'opacity, filter',
        });

        gsap.to(chars, {
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          ease,
          stagger: delay,
          onComplete: () => {
            gsap.set(chars, { willChange: 'auto' });
          },
        });

        observer.disconnect();
      },
      {
        threshold: 0.6, // must be mostly visible
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [text, delay, duration, ease]);

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
            lineHeight: '1.15',
            overflow: 'visible',
          },
        },
        char === ' ' ? '\u00A0' : char
      )
    )
  );
}
