'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * BlurFadeIn - A reliable blur + fade animation component
 * 
 * Usage:
 * <BlurFadeIn>
 *   <h1>Your content here</h1>
 * </BlurFadeIn>
 * 
 * Props:
 * - delay: Animation delay in seconds (default: 0)
 * - duration: Animation duration in seconds (default: 0.6)
 * - blur: Blur amount in pixels (default: 10)
 * - yOffset: Vertical offset in pixels (default: 20)
 * - threshold: Intersection threshold 0-1 (default: 0.1)
 * - once: Animate only once (default: true)
 */

export default function BlurFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  blur = 10,
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
        filter: `blur(${blur}px)`,
        y: yOffset,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            }
          : {
              opacity: 0,
              filter: `blur(${blur}px)`,
              y: yOffset,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlurFadeText - Character-by-character blur fade animation
 * 
 * Usage:
 * <BlurFadeText text="Hello World" />
 * 
 * Props:
 * - text: The text to animate
 * - delay: Base delay before animation starts (default: 0)
 * - charDelay: Delay between each character (default: 0.03)
 * - duration: Duration for each character (default: 0.4)
 * - className: CSS classes for the container
 * - style: Inline styles for the container (including fontFamily)
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
          initial={{
            opacity: 0,
            filter: 'blur(8px)',
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: 'blur(0px)',
                }
              : {
                  opacity: 0,
                  filter: 'blur(8px)',
                }
          }
          transition={{
            duration,
            delay: delay + index * charDelay,
            ease: [0.25, 0.4, 0.25, 1],
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
 * BlurFadeStagger - Stagger animation for multiple children
 * 
 * Usage:
 * <BlurFadeStagger staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </BlurFadeStagger>
 */

export function BlurFadeStagger({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  blur = 10,
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
          initial={{
            opacity: 0,
            filter: `blur(${blur}px)`,
            y: yOffset,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }
              : {
                  opacity: 0,
                  filter: `blur(${blur}px)`,
                  y: yOffset,
                }
          }
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}