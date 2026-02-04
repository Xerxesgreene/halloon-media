'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface BoxConfig {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

type MotionDivProps = HTMLMotionProps<'div'>;

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const BOXES: BoxConfig[] = [
  { size: 80, top: '20%', left: '10%', delay: 0, duration: 8 },
  { size: 60, top: '60%', left: '80%', delay: 0.5, duration: 10 },
  { size: 100, top: '70%', left: '15%', delay: 1, duration: 12 },
  { size: 70, top: '30%', left: '75%', delay: 1.5, duration: 9 },
  { size: 50, top: '50%', left: '50%', delay: 2, duration: 11 },
];

export default function AnimatedBoxes() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // ✅ Correct way to store timers in React + TS
  const timeoutRef = useRef<number | null>(null);

  /**
   * PERFORMANCE:
   * Run after first paint / idle time
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
      (window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      }).requestIdleCallback?.(() => {
        setEnabled(true);
      });
    } else {
      timeoutRef.current = (window as Window).setTimeout(() => {
        setEnabled(true);
      }, 300);
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Respect OS-level "reduce motion"
   */
  if (prefersReducedMotion || !enabled) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {BOXES.map((box, index) => (
        <motion.div
          key={index}
          {...({ className: 'absolute will-change-transform' } as MotionDivProps)}
          style={{
            top: box.top,
            left: box.left,
            width: box.size,
            height: box.size,
            transform: 'translate3d(0,0,0)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotateX: [0, 360],
            rotateY: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: box.duration,
            delay: box.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* 3D Box */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-300 to-forest-400 rounded-2xl border-2 border-forest-400"
              style={{ transform: 'translateZ(20px)' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-200 to-forest-300 rounded-2xl border-2 border-forest-300"
              style={{ transform: 'translateZ(-20px)' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-400 to-forest-500 rounded-2xl"
              style={{ transform: 'rotateX(90deg) translateZ(20px)' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-200 to-forest-300 rounded-2xl"
              style={{ transform: 'rotateX(-90deg) translateZ(20px)' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-300 to-forest-400 rounded-2xl"
              style={{ transform: 'rotateY(-90deg) translateZ(20px)' }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-forest-300 to-forest-400 rounded-2xl"
              style={{ transform: 'rotateY(90deg) translateZ(20px)' }}
            />
          </div>
        </motion.div>
      ))}

      {/* Soft floating blobs */}
      <motion.div
        {...({
          className:
            'absolute top-1/4 right-1/4 w-64 h-64 bg-forest-200 rounded-full blur-3xl opacity-20',
        } as MotionDivProps)}
        animate={{ scale: [1, 1.3, 1], x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        {...({
          className:
            'absolute bottom-1/4 left-1/4 w-96 h-96 bg-forest-300 rounded-full blur-3xl opacity-15',
        } as MotionDivProps)}
        animate={{ scale: [1, 1.2, 1], x: [0, -80, 0], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
