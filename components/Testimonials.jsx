'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlurFadeIn from './BlurFadeIn';

const testimonials = [
  {
    id: 1, name: 'Sarah Chen', role: 'CEO', company: 'TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    quote: 'The team transformed our brand identity completely. Their attention to detail and creative approach exceeded all expectations. Our conversion rate increased by 340% within the first month.',
    rating: 5, tag: 'Brand Strategy', metric: '+340%', metricLabel: 'Conversion Rate',
  },
  {
    id: 2, name: 'Marcus Rodriguez', role: 'Founder', company: 'DesignHub',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'Working with this team was an absolute game-changer. They delivered beyond our wildest expectations and brought our vision to life with stunning precision.',
    rating: 5, tag: 'Digital Solutions', metric: '2×', metricLabel: 'Revenue Growth',
  },
  {
    id: 3, name: 'Emily Watson', role: 'Marketing Director', company: 'GrowthLab',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    quote: 'Incredible work! The designs are not just beautiful — they actually convert. Our engagement metrics have never been better. Highly recommend to anyone serious about growth.',
    rating: 5, tag: 'Campaign', metric: '+180%', metricLabel: 'Engagement',
  },
  {
    id: 4, name: 'David Park', role: 'Product Lead', company: 'InnovateCo',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    quote: 'From concept to execution, every step was flawless. They understood our users better than we did and created an experience that truly resonates.',
    rating: 5, tag: 'UX & Web', metric: '98%', metricLabel: 'Client Satisfaction',
  },
  {
    id: 5, name: 'Lisa Anderson', role: 'VP of Design', company: 'CreativeLabs',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    quote: 'The level of creativity and professionalism is unmatched. They took our rough ideas and turned them into a cohesive, stunning brand experience that stands out.',
    rating: 5, tag: 'Branding', metric: '3×', metricLabel: 'Brand Recall',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  const go = (next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hovered) {
        setDir(1);
        setActive(prev => (prev + 1) % testimonials.length);
      }
    }, 5000);
  };

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [hovered]);

  const t = testimonials[active];

  const slideVariants = {
    enter: (d) => ({ opacity: 0, y: d * 24, filter: 'blur(6px)', scale: 0.98 }),
    center: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
    exit: (d) => ({ opacity: 0, y: d * -24, filter: 'blur(6px)', scale: 0.98 }),
  };

  const metricVariants = {
    enter: { opacity: 0, scale: 0.85 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');

        #testimonials-section {
          background: #F0EBE3;
          padding: 120px 0 100px;
          font-family: 'Bricolage Grotesque', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Subtle animated orbs in background */
        #testimonials-section::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94,176,131,0.12) 0%, transparent 70%);
          top: -100px; right: -200px;
          pointer-events: none;
          animation: orb-drift 8s ease-in-out infinite alternate;
        }
        #testimonials-section::after {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(71,135,111,0.08) 0%, transparent 70%);
          bottom: 0; left: -100px;
          pointer-events: none;
          animation: orb-drift 10s ease-in-out infinite alternate-reverse;
        }
        @keyframes orb-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -40px) scale(1.1); }
        }

        .t-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 2;
        }

        /* ── HEADER — centered like Works ── */
        .t-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 72px;
          gap: 0;
        }
        .t-eyebrow {
          display: inline-block;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eb083; margin-bottom: 20px;
        }
        .t-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #1F3F33;
          margin: 0 0 20px;
        }
        .t-title em {
          font-family: 'DM Serif Display', serif;
          font-style: italic; font-weight: 400;
          color: #47876F; letter-spacing: -0.05em;
        }
        .t-subtitle {
          font-size: 0.9rem;
          color: #6A6456;
          max-width: 420px;
          line-height: 1.75;
          margin: 0;
        }

        /* ── MAIN STAGE ── */
        .t-stage {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          align-items: stretch;
          min-height: 480px;
        }

        /* LEFT: avatar stack + nav */
        .t-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }
        .t-avatar-stack {
          position: relative;
          height: 260px;
          border-radius: 24px;
          overflow: hidden;
          background: #1F3F33;
          flex: 1;
        }
        .t-avatar-bg-shape {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1F3F33 0%, #2D5F4D 100%);
        }

        /* Large featured photo */
        .t-featured-photo {
          position: absolute;
          top: 0; right: 0;
          width: 65%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        /* gradient fade on left so text stays readable */
        .t-featured-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #1F3F33 0%,
            #1F3F33 28%,
            rgba(31,63,51,0.7) 55%,
            rgba(31,63,51,0) 100%
          );
          z-index: 1;
        }
        /* subtle bottom fade so thumbnails stay readable */
        .t-featured-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(20,50,35,0.85) 0%, transparent 100%);
          z-index: 2;
        }

        .t-avatar-circles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }
        .t-avatar-circles::before {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
          top: -60px; right: -60px;
        }
        .t-avatar-circles::after {
          content: '';
          position: absolute;
          width: 140px; height: 140px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          bottom: 20px; left: -40px;
        }
        .t-avatars-row {
          position: absolute;
          bottom: 28px;
          left: 24px;
          display: flex;
          gap: -8px;
          z-index: 3;
        }
        .t-avatar-thumb {
          width: 44px; height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2.5px solid #1F3F33;
          margin-right: -10px;
          cursor: pointer;
          transition: transform 0.25s, border-color 0.25s;
          position: relative;
        }
        .t-avatar-thumb:hover { transform: translateY(-4px) scale(1.08); border-color: #5eb083; }
        .t-avatar-thumb.active-av { border-color: #78c69a; transform: translateY(-4px) scale(1.1); z-index: 10; }
        .t-avatar-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

        .t-avatar-label {
          position: absolute;
          top: 28px; left: 24px;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          z-index: 3;
        }
        .t-active-name {
          position: absolute;
          top: 50%;
          left: 24px;
          transform: translateY(-50%);
          z-index: 3;
        }
        .t-active-name-text {
          font-weight: 700;
          font-size: 1.3rem;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .t-active-role-text {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
        }

        /* Nav card */
        .t-nav-card {
          background: #F7F3EE;
          border-radius: 20px;
          padding: 20px 24px;
          border: 1.5px solid rgba(31,63,51,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .t-nav-btns { display: flex; gap: 10px; }
        .t-nav-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1.5px solid rgba(31,63,51,0.2); background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .t-nav-btn:hover { background: #1F3F33; border-color: #1F3F33; }
        .t-nav-btn:hover svg { stroke: #F0EBE3; }
        .t-nav-btn svg { stroke: #1F3F33; transition: stroke 0.2s; }
        .t-progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
          margin: 0 16px;
        }
        .t-progress-bar {
          height: 3px;
          border-radius: 2px;
          background: rgba(31,63,51,0.1);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .t-progress-bar:hover { transform: scaleY(1.5); }
        .t-progress-fill {
          height: 100%;
          border-radius: 2px;
          background: #2D5F4D;
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .t-count {
          font-weight: 700;
          font-size: 0.78rem;
          color: #4A7A6A;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* CENTER: Quote card */
        .t-quote-card {
          background: #1F3F33;
          border-radius: 28px;
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .t-quote-card::before {
          content: '\u201C';
          position: absolute;
          top: 8px; left: 36px;
          font-family: 'DM Serif Display', serif;
          font-size: 200px;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        /* Animated green glow dot */
        .t-glow-dot {
          position: absolute;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94,176,131,0.25) 0%, transparent 70%);
          bottom: -30px; right: -30px;
          animation: glow-pulse 3s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes glow-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }

        .t-tag {
          display: inline-block;
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #78c69a;
          border: 1px solid rgba(120,198,154,0.35);
          border-radius: 100px;
          padding: 5px 14px; width: fit-content;
          margin-bottom: 24px;
        }
        .t-quote-text {
          font-size: clamp(0.95rem, 1.3vw, 1.15rem);
          font-weight: 400;
          color: rgba(240,235,227,0.88);
          line-height: 1.78;
          letter-spacing: -0.01em;
          flex: 1;
          margin-bottom: 36px;
          position: relative;
          z-index: 1;
        }
        .t-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .t-star-svg {
          transition: transform 0.2s;
        }
        .t-star-svg:hover { transform: scale(1.3); }
        .t-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .t-author-row {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .t-author-img {
          width: 48px; height: 48px;
          border-radius: 50%;
          object-fit: cover; object-position: top;
          border: 2px solid rgba(120,198,154,0.5);
          flex-shrink: 0;
        }
        .t-author-name { font-weight: 700; font-size: 0.95rem; color: #F0EBE3; letter-spacing: -0.02em; }
        .t-author-role { font-size: 0.73rem; font-weight: 400; color: rgba(240,235,227,0.45); margin-top: 2px; }

        /* RIGHT: Metric card */
        .t-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .t-metric-card {
          background: #F7F3EE;
          border-radius: 24px;
          padding: 36px 32px;
          border: 1.5px solid rgba(28,61,40,0.08);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .t-metric-card::after {
          content: '';
          position: absolute;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(94,176,131,0.12) 0%, transparent 70%);
          bottom: -40px; right: -40px;
          pointer-events: none;
        }
        .t-metric-eyebrow {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #5eb083; margin-bottom: 16px;
        }
        .t-metric-value {
          font-weight: 800;
          font-size: clamp(3.2rem, 5vw, 5rem);
          letter-spacing: -0.05em;
          color: #1F3F33;
          line-height: 1;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .t-metric-label {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #4A7A6A;
          position: relative;
          z-index: 1;
        }
        .t-bars {
          display: flex;
          gap: 5px;
          margin-top: 24px;
          position: relative;
          z-index: 1;
        }
        .t-bar {
          flex: 1; border-radius: 3px;
          background: #1F3F33;
          transition: height 0.4s ease;
        }

        .t-company-card {
          background: #1F3F33;
          border-radius: 20px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .t-company-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: #F0EBE3;
          letter-spacing: -0.01em;
        }
        .t-company-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #5eb083;
          animation: dot-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        .t-company-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(240,235,227,0.4);
          margin-top: 3px;
        }

        /* ── STATS BAR ── */
        .t-stats-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 24px;
          background: rgba(28,61,40,0.08);
          border-radius: 20px;
          overflow: hidden;
        }
        .t-stat {
          background: #F7F3EE;
          padding: 32px;
          text-align: center;
          transition: background 0.25s;
          cursor: default;
        }
        .t-stat:hover { background: #EDE8E0; }
        .t-stat:first-child { border-radius: 20px 0 0 20px; }
        .t-stat:last-child  { border-radius: 0 20px 20px 0; }
        .t-stat-val {
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          letter-spacing: -0.04em;
          color: #2D5F4D;
          line-height: 1;
          margin-bottom: 6px;
        }
        .t-stat-lbl {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #4A7A6A;
        }

        @media (max-width: 900px) {
          #testimonials-section { padding: 80px 0; }
          .t-inner { padding: 0 20px; }
          .t-stage { grid-template-columns: 1fr; gap: 16px; min-height: unset; }
          .t-left { flex-direction: row; flex-wrap: wrap; }
          .t-avatar-stack { height: 200px; flex: 1; min-width: 200px; }
          .t-nav-card { width: 100%; }
          .t-right { flex-direction: row; flex-wrap: wrap; }
          .t-metric-card { flex: 1; min-width: 160px; }
          .t-company-card { width: 100%; }
          .t-stats-bar { margin-top: 16px; }
          .t-stat { padding: 20px 16px; }
        }
      `}</style>

      <section id="testimonials">
        <div id="testimonials-section">
          <div className="t-inner">

            {/* HEADER */}
            <BlurFadeIn delay={0.1} duration={0.8}>
              <div className="t-header">
                <span className="t-eyebrow">Client Stories</span>
                <h2 className="t-title">
                  What Our Clients <em>Say</em>
                </h2>
                <p className="t-subtitle">
                  Real results from real partnerships — hear from the brands we've helped grow across the region.
                </p>
              </div>
            </BlurFadeIn>

            {/* STAGE */}
            <BlurFadeIn delay={0.2} duration={0.8}>
              <div
                className="t-stage"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >

                {/* LEFT */}
                <div className="t-left">
                  <div className="t-avatar-stack">
                    <div className="t-avatar-bg-shape" />

                    {/* Large featured photo of active person */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`photo-${active}`}
                        src={t.image}
                        alt={t.name}
                        className="t-featured-photo"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </AnimatePresence>
                    <div className="t-featured-fade" />
                    <div className="t-featured-bottom-fade" />

                    <div className="t-avatar-circles" />

                    <span className="t-avatar-label">Clients</span>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`name-${active}`}
                        className="t-active-name"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="t-active-name-text">{t.name}</div>
                        <div className="t-active-role-text">{t.role} · {t.company}</div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="t-avatars-row">
                      {testimonials.map((item, i) => (
                        <button
                          key={item.id}
                          className={`t-avatar-thumb ${i === active ? 'active-av' : ''}`}
                          onClick={() => go(i)}
                          aria-label={item.name}
                        >
                          <img src={item.image} alt={item.name} />
                        </button>
                      ))}
                    </div>

                    <div className="t-glow-dot" />
                  </div>

                  {/* Nav */}
                  <div className="t-nav-card">
                    <div className="t-nav-btns">
                      <button className="t-nav-btn" onClick={() => go((active - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4L6 9l5 5"/></svg>
                      </button>
                      <button className="t-nav-btn" onClick={() => go((active + 1) % testimonials.length)} aria-label="Next">
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4l5 5-5 5"/></svg>
                      </button>
                    </div>

                    <div className="t-progress-wrap">
                      {testimonials.map((_, i) => (
                        <div key={i} className="t-progress-bar" onClick={() => go(i)}>
                          <div
                            className="t-progress-fill"
                            style={{ width: i === active ? '100%' : i < active ? '100%' : '0%', opacity: i < active ? 0.3 : 1 }}
                          />
                        </div>
                      ))}
                    </div>

                    <span className="t-count">
                      {String(active + 1).padStart(2,'0')} / {String(testimonials.length).padStart(2,'0')}
                    </span>
                  </div>
                </div>

                {/* CENTER */}
                <div className="t-quote-card">
                  <div className="t-glow-dot" />
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={active}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                      <span className="t-tag">{t.tag}</span>

                      <div className="t-stars">
                        {[...Array(t.rating)].map((_, i) => (
                          <svg key={i} className="t-star-svg" width="16" height="16" viewBox="0 0 20 20" fill="#78c69a">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>

                      <p className="t-quote-text">"{t.quote}"</p>

                      <div className="t-divider" />
                      <div className="t-author-row">
                        <img src={t.image} alt={t.name} className="t-author-img" />
                        <div>
                          <div className="t-author-name">{t.name}</div>
                          <div className="t-author-role">{t.role} · {t.company}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* RIGHT */}
                <div className="t-right">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`metric-${active}`}
                      className="t-metric-card"
                      variants={metricVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="t-metric-eyebrow">Result</div>
                      <div className="t-metric-value">{t.metric}</div>
                      <div className="t-metric-label">{t.metricLabel}</div>
                      <div className="t-bars">
                        {[0.15, 0.35, 0.55, 0.75, 1.0].map((h, i) => (
                          <div
                            key={i}
                            className="t-bar"
                            style={{ height: `${h * 40}px`, opacity: 0.1 + i * 0.18 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`company-${active}`}
                      className="t-company-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                    >
                      <div>
                        <div className="t-company-name">{t.company}</div>
                        <div className="t-company-label">Verified Client</div>
                      </div>
                      <div className="t-company-dot" />
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </BlurFadeIn>

            {/* STATS */}
            <BlurFadeIn delay={0.35} duration={0.8}>
              <div className="t-stats-bar">
                {[
                  { value: '50+', label: 'Happy Clients' },
                  { value: '95%', label: 'Satisfaction Rate' },
                  { value: '60+', label: 'Projects Delivered' },
                ].map((s, i) => (
                  <div key={i} className="t-stat">
                    <div className="t-stat-val">{s.value}</div>
                    <div className="t-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </BlurFadeIn>

          </div>
        </div>
      </section>
    </>
  );
}