'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, ChevronUp } from 'lucide-react';

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Use GSAP ticker to poll ScrollSmoother scroll position
    // because window.scrollY is always 0 with ScrollSmoother
    const tick = () => {
      let scrollY = 0;

      if (window.__smoother) {
        scrollY = window.__smoother.scrollTop();
      } else {
        scrollY = window.scrollY;
      }

      setVisible(scrollY > 80);
      setShowScrollTop(scrollY > 500);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const scrollToTop = () => {
    if (window.__smoother) {
      window.__smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buttons = (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '96px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {visible && (
          <>
            {/* WhatsApp */}
            <motion.a
              key="whatsapp"
              href="https://wa.me/971568056934"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0 }}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                pointerEvents: 'all',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              aria-label="WhatsApp"
            >
              <MessageCircle color="white" size={26} fill="white" />
            </motion.a>

            {/* Mail */}
            <motion.a
              key="mail"
              href="mailto:halloonmedia@gmail.com"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.07 }}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                pointerEvents: 'all',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#1F3F33',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              aria-label="Email"
            >
              <Mail color="white" size={24} />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrolltop"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, y: -2 }}
            onClick={scrollToTop}
            style={{
              pointerEvents: 'all',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#2D5F4D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              cursor: 'pointer',
              border: 'none',
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp color="white" size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );

  // Portal to document.body so it's completely outside #smooth-wrapper
  // and never affected by its overflow:hidden or transform stacking
  if (!mounted) return null;
  return createPortal(buttons, document.body);
}