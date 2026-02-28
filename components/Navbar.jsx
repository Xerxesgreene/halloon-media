'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

const navItems = [
  { label: 'About',    href: '#about-section' },
  { label: 'Services', href: '#services' },
  { label: 'Clients',  href: '#testimonials' },
];

function smoothScrollTo(href) {
  if (window.__smoother) {
    window.__smoother.scrollTo(href, true);
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ── Animated text that splits chars on hover ── */
function SplitHoverText({ text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="split-text-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="split-char"
          animate={hovered ? { y: -2, opacity: 1 } : { y: 0, opacity: 0.75 }}
          transition={{
            duration: 0.25,
            delay: hovered ? i * 0.03 : (text.length - i) * 0.015,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Magnetic nav link ── */
function MagneticNavItem({ item, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: springX, y: springY }}
      className="magnetic-wrap"
    >
      <button
        onClick={() => smoothScrollTo(item.href)}
        className="nav-link-btn"
      >
        <SplitHoverText text={item.label} />
        <span className="nav-link-line" />
      </button>
    </motion.div>
  );
}

/* ── Mobile menu line item ── */
function MobileNavItem({ item, index, onClose }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
      animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
      transition={{ delay: 0.05 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mobile-item"
    >
      <button
        onClick={() => { smoothScrollTo(item.href); onClose(); }}
        className="mobile-nav-btn"
      >
        <span className="mobile-num">0{index + 1}</span>
        <span className="mobile-label">{item.label}</span>
        <motion.span
          className="mobile-arrow"
          initial={{ x: -4, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 + index * 0.1 }}
        >↗</motion.span>
      </button>
      <div className="mobile-divider" />
    </motion.div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (y / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* ─── SCROLL PROGRESS ─── */
        .scroll-bar {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #4a7c59, #8fbc8f);
          z-index: 100;
          transform-origin: left;
          box-shadow: 0 0 8px rgba(74,124,89,0.6);
          transition: width 0.1s linear;
        }

        /* ─── OUTER WRAPPER ─── */
        .nav-outer {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding: 14px 24px 0;
          transition: padding 0.4s cubic-bezier(0.22,1,0.36,1);
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        .nav-outer.scrolled {
          padding: 8px 24px 0;
        }

        /* ─── SHELL ─── */
        .nav-shell {
          margin: 0 auto;
          max-width: 860px;
          border-radius: 100px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 8px 32px rgba(31,38,135,0.08),
            0 1px 0 rgba(255,255,255,0.3) inset,
            0 -1px 0 rgba(0,0,0,0.04) inset;
          transition:
            background 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .nav-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .nav-outer.scrolled .nav-shell {
          background: rgba(240,235,227,0.85);
          box-shadow:
            0 16px 48px rgba(31,38,135,0.12),
            0 1px 0 rgba(255,255,255,0.5) inset;
          border-color: rgba(255,255,255,0.4);
        }

        /* ─── INNER FLEX ─── */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 20px;
          transition: padding 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-outer.scrolled .nav-inner {
          padding: 7px 20px;
        }

        /* ─── LOGO ─── */
        .logo-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
        }
        .logo-img-wrap {
          position: relative;
          width: 30px; height: 30px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
        }
        .logo-btn:hover .logo-img-wrap {
          /* no tilt — shimmer only */
        }
        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: none;
          pointer-events: none;
          z-index: 2;
        }
        .logo-btn:hover .logo-shimmer {
          transform: translateX(100%);
          transition: transform 0.55s ease;
        }
        .logo-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #1a2e1e;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .logo-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4a7c59;
          margin-left: 1px;
          vertical-align: middle;
          position: relative;
          top: -1px;
          box-shadow: 0 0 6px rgba(74,124,89,0.6);
        }

        /* ─── DESKTOP LINKS ─── */
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .magnetic-wrap { position: relative; }

        .nav-link-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 13px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #2d4a31;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .nav-link-btn:hover { color: #1a2e1e; }

        .split-text-wrap { display: inline-flex; }
        .split-char { display: inline-block; }

        .nav-link-line {
          display: block;
          height: 1.5px;
          width: 0;
          background: linear-gradient(90deg, #4a7c59, #8fbc8f);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
          align-self: flex-start;
          box-shadow: 0 0 6px rgba(74,124,89,0.4);
        }
        .nav-link-btn:hover .nav-link-line { width: 100%; }

        /* ─── CTA BUTTON ─── */
        .cta-btn-wrap {
          margin-left: 12px;
          position: relative;
        }
        .cta-btn {
          position: relative;
          padding: 9px 20px;
          border-radius: 100px;
          background: #2d4a31;
          color: #f0ebe3;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s, box-shadow 0.3s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(45,74,49,0.35), 0 1px 0 rgba(255,255,255,0.12) inset;
        }
        .cta-btn:hover {
          box-shadow: 0 8px 28px rgba(45,74,49,0.5), 0 1px 0 rgba(255,255,255,0.12) inset;
          transform: translateY(-1px);
        }
        .cta-btn:active { transform: translateY(0); }
        .cta-liquid {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #4a7c59, #3d6647);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
          border-radius: inherit;
        }
        .cta-btn:hover .cta-liquid { transform: scaleX(1); }
        .cta-label {
          position: relative;
          z-index: 1;
        }

        /* ─── HAMBURGER ─── */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 44px; height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(45,74,49,0.08);
          border: 1px solid rgba(45,74,49,0.12);
          transition: background 0.2s;
        }
        .hamburger-btn:hover { background: rgba(45,74,49,0.14); }
        .burger-lines {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .burger-line {
          display: block;
          height: 1.5px;
          background: #2d4a31;
          border-radius: 2px;
          transition: transform 0.3s ease, width 0.3s ease;
        }
        .burger-line:nth-child(1) { width: 20px; }
        .burger-line:nth-child(2) { width: 14px; }

        /* ─── MOBILE OVERLAY ─── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          background: #f0ebe3;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        .mobile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(45,74,49,0.08);
        }
        .mobile-close-btn {
          background: rgba(45,74,49,0.06);
          border: 1px solid rgba(45,74,49,0.12);
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.3s;
        }
        .mobile-close-btn:hover { background: rgba(45,74,49,0.12); transform: rotate(90deg); }
        .mobile-close-icon { font-size: 18px; color: #2d4a31; line-height: 1; }

        .mobile-nav-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 28px 40px;
        }

        .mobile-item { overflow: hidden; }
        .mobile-nav-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .mobile-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-style: italic;
          color: rgba(45,74,49,0.4);
          letter-spacing: 0.08em;
          min-width: 20px;
        }
        .mobile-label {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(38px, 10vw, 64px);
          font-weight: 700;
          color: #1a2e1e;
          letter-spacing: -0.03em;
          line-height: 1;
          flex: 1;
          transition: letter-spacing 0.3s ease;
        }
        .mobile-nav-btn:hover .mobile-label { letter-spacing: 0.01em; }
        .mobile-arrow {
          font-size: 22px;
          color: #4a7c59;
          transform: rotate(0deg);
          transition: transform 0.3s ease;
        }
        .mobile-nav-btn:hover .mobile-arrow { transform: rotate(45deg) scale(1.2); }
        .mobile-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(45,74,49,0.15), transparent);
        }

        .mobile-cta-wrap {
          padding: 0 28px 40px;
        }
        .mobile-cta-btn {
          width: 100%;
          padding: 18px;
          border-radius: 100px;
          background: #2d4a31;
          color: #f0ebe3;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 8px 28px rgba(45,74,49,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mobile-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(45,74,49,0.45);
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 768px) {
          .nav-outer { padding: 0 !important; }
          .nav-shell {
            border-radius: 0 !important;
            max-width: 100% !important;
            background: #f0ebe3 !important;
            backdrop-filter: none !important;
            border: none !important;
            border-bottom: 1px solid rgba(45,74,49,0.08) !important;
            box-shadow: none !important;
          }
          .nav-shell::before { display: none; }
          .nav-inner { padding: 16px 20px !important; }
          .nav-desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .logo-text { display: none !important; }
          .scroll-bar { display: none; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          .logo-text { display: inline !important; }
          .mobile-overlay { display: none; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div
        className="scroll-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── NAVBAR ── */}
      <div className={`nav-outer${scrolled ? ' scrolled' : ''}`}>
        <nav className="nav-shell">
          <div className="nav-inner">

            {/* LOGO */}
            <motion.button
              className="logo-btn"
              onClick={() => smoothScrollTo('#hero')}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="logo-img-wrap">
                <Image src="/h3.png" alt="Halloon Media" fill className="object-contain" priority />
                <div className="logo-shimmer" />
              </div>
              <span className="logo-text">
                Halloon Media<span className="logo-dot" />
              </span>
            </motion.button>

            {/* DESKTOP LINKS */}
            <div className="nav-desktop-links">
              {navItems.map((item, i) => (
                <MagneticNavItem key={item.label} item={item} index={i} />
              ))}

              {/* CTA */}
              <motion.div
                className="cta-btn-wrap"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="cta-btn"
                  onClick={() => smoothScrollTo('#contact')}
                >
                  <span className="cta-liquid" />
                  <span className="cta-label">Contact Us</span>
                </button>
              </motion.div>
            </div>

            {/* HAMBURGER */}
            <button className="hamburger-btn" onClick={() => setOpen(true)}>
              <div className="burger-lines">
                <span className="burger-line" />
                <span className="burger-line" />
              </div>
            </button>

          </div>
        </nav>
      </div>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top bar */}
            <div className="mobile-top">
              <motion.button
                className="logo-btn"
                onClick={() => { smoothScrollTo('#hero'); setOpen(false); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="logo-img-wrap">
                  <Image src="/h3.png" alt="Halloon Media" fill className="object-contain" />
                </div>
              </motion.button>

              <motion.button
                className="mobile-close-btn"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <span className="mobile-close-icon">✕</span>
              </motion.button>
            </div>

            {/* Nav items */}
            <div className="mobile-nav-body">
              {navItems.map((item, i) => (
                <MobileNavItem key={item.label} item={item} index={i} onClose={() => setOpen(false)} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mobile-cta-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="mobile-cta-btn"
                onClick={() => { smoothScrollTo('#contact'); setOpen(false); }}
              >
                Contact Us →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}