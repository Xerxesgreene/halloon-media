'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * BlurFadeIn - Smooth fade-up animation
 */
export default function BlurFadeIn({
  children,
  delay = 0,
  duration = 0.5,
  blur = 0,
  yOffset = 14,
  threshold = 0.1,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'opacity, transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlurFadeText - Character-by-character fade-up animation
 */
export function BlurFadeText({
  text = '',
  delay = 0,
  charDelay = 0.025,
  duration = 0.35,
  className = '',
  style = {},
  as = 'p',
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = as;

  return (
    <Component ref={ref} className={className} style={style}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{
            duration,
            delay: delay + index * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'opacity, transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
}

/**
 * BlurFadeStagger - Staggered fade-up for multiple children
 */
export function BlurFadeStagger({
  children,
  staggerDelay = 0.08,
  duration = 0.5,
  blur = 0,
  yOffset = 14,
  className = '',
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: yOffset }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: 'opacity, transform' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}