'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * BlurFadeIn - Smooth pop-up fade animation (no blur)
 * All props preserved for backwards compatibility.
 */
export default function BlurFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  blur = 0,        // kept in signature but ignored
  yOffset = 20,
  threshold = 0.1,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        scale: 0.97,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: yOffset, scale: 0.97 }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlurFadeText - Character-by-character pop-up animation
 * All props preserved for backwards compatibility.
 */
export function BlurFadeText({
  text = '',
  delay = 0,
  charDelay = 0.03,
  duration = 0.4,
  className = '',
  style = {},
  as = 'p',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const Component = as;
  const chars = text.split('');

  return (
    <Component ref={ref} className={className} style={style}>
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 8, scale: 0.95 }
          }
          transition={{
            duration,
            delay: delay + index * charDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
}

/**
 * BlurFadeStagger - Stagger pop-up animation for multiple children
 * All props preserved for backwards compatibility.
 */
export function BlurFadeStagger({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  blur = 0,        // kept in signature but ignored
  yOffset = 20,
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: yOffset, scale: 0.97 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: yOffset, scale: 0.97 }
          }
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}