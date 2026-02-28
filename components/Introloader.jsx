'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function IntroLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait for the text animation to finish (last char at ~0.7 + 13*0.05 = ~1.35s)
    // then hold briefly, then start exit (600ms), then fire onComplete
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 2400); // start exit animation

    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000); // exit animation finishes (2400 + 600ms)

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, []); // ✅ no dependency on onComplete — avoids re-runs if parent re-renders

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F0EBE3',
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {/* Ambient blobs */}
          <motion.div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            animate={{ opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{
              position: 'absolute', top: '20%', left: '20%',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(74,124,89,0.18) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(40px)',
            }} />
            <div style={{
              position: 'absolute', bottom: '20%', right: '20%',
              width: 320, height: 320,
              background: 'radial-gradient(circle, rgba(28,61,40,0.12) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(40px)',
            }} />
          </motion.div>

          {/* Logo + Text row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: 'blur(12px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}
            >
              <Image src="/h3.png" alt="Halloon Media" fill className="object-contain" priority />
            </motion.div>

            {/* "Halloon Media" — char by char */}
            <div style={{ overflow: 'hidden' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#1c3d28',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
                display: 'flex',
                whiteSpace: 'nowrap',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}>
                {'Halloon Media'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.45,
                      delay: 0.5 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </div>
          </div>

          {/* Thin progress line at bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #4a7c59, #8fbc8f, transparent)',
              transformOrigin: 'left',
              opacity: 0.7,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}