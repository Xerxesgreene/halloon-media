'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function LoaderContent({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F0EBE3',
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {/* Ambient blobs */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <motion.div
              animate={{ opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '20%', left: '20%',
                width: 400, height: 400,
                background: 'radial-gradient(circle, rgba(74,124,89,0.18) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', bottom: '20%', right: '20%',
                width: 320, height: 320,
                background: 'radial-gradient(circle, rgba(28,61,40,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Logo + Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}
            >
              <Image src="/h3.png" alt="Halloon Media" fill className="object-contain" priority />
            </motion.div>

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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.045,
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

          {/* Progress line */}
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
              opacity: 0.6,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function IntroLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hideTimer = setTimeout(() => setVisible(false), 2400);
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(<LoaderContent visible={visible} />, document.body);
}