'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import BlurFadeIn from './BlurFadeIn';

function LottieCard({ src }) {
  const [animData, setAnimData] = useState(null);
  useEffect(() => {
    fetch(src).then(r => r.json()).then(setAnimData).catch(console.error);
  }, [src]);
  if (!animData) return <div style={{ width: 160, height: 160 }} />;
  return <Lottie animationData={animData} loop autoplay style={{ width: 160, height: 160 }} />;
}

const services = [
  {
    title: 'Strategy', label: '01',
    desc: 'We chart the course. Deep-dive brand audits, market mapping, and a clear north star that aligns every decision you make.',
    src: '/animations/ani1.json', accent: '#2D5F4D', color: '#78c69a',
  },
  {
    title: 'Process', label: '02',
    desc: 'Structured workflows, collaborative frameworks, and repeatable systems that keep your brand consistent at every touchpoint.',
    src: '/animations/ani2.json', accent: '#47876F', color: '#5eb083',
  },
  {
    title: 'Execution', label: '03',
    desc: 'We launch, manage, and optimise. From campaigns to content to conversions — delivered with precision and speed.',
    src: '/animations/ani3.json', accent: '#5A9B82', color: '#3d9e6b',
  },
];

function MagneticCard({ s, i, isInView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setTilt({ x: dy * -10, y: dx * 10 });
      setSpotlight({ x: px, y: py });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        borderRadius: 28,
        overflow: 'hidden',
        background: '#F7F3EE',
        border: hovered ? '1.5px solid rgba(94,176,131,0.4)' : '1.5px solid rgba(28,61,40,0.07)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        position: 'relative',
        boxShadow: hovered
          ? `0 30px 80px rgba(28,61,40,0.2), 0 0 0 1px rgba(94,176,131,0.2), inset 0 1px 0 rgba(255,255,255,0.6)`
          : '0 2px 12px rgba(28,61,40,0.06)',
        willChange: 'transform',
      }}
    >
      {/* Spotlight layer */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        borderRadius: 28, overflow: 'hidden',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        background: `radial-gradient(circle 180px at ${spotlight.x}% ${spotlight.y}%, rgba(120,198,154,0.12) 0%, transparent 70%)`,
      }} />

      {/* Shimmer streak */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
        borderRadius: 28, overflow: 'hidden',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'absolute',
          top: '-100%', left: '-60%',
          width: '40%', height: '300%',
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
          animation: hovered ? 'shimmer-sweep 0.7s ease forwards' : 'none',
        }} />
      </div>

      {/* Top accent bar */}
      <div style={{
        height: 3, width: '100%',
        background: `linear-gradient(90deg, ${s.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        position: 'relative', zIndex: 1,
      }} />

      {/* Media area */}
      <div style={{
        background: hovered ? `linear-gradient(135deg, #e8f5ee 0%, #EDE8E0 100%)` : '#EDE8E0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '44px 32px 36px',
        position: 'relative', minHeight: 220, overflow: 'hidden',
        transition: 'background 0.5s ease',
        zIndex: 1,
      }}>
        <span style={{
          position: 'absolute', top: 16, right: 20,
          fontWeight: 800, fontSize: '4rem',
          color: hovered ? `rgba(28,61,40,0.12)` : 'rgba(28,61,40,0.06)',
          letterSpacing: '-0.04em', lineHeight: 1,
          transition: 'color 0.3s, transform 0.4s ease',
          transform: hovered ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}>{s.label}</span>

        <div style={{
          position: 'absolute',
          width: 180, height: 180, borderRadius: '50%',
          border: `1px solid rgba(94,176,131,${hovered ? 0.25 : 0})`,
          transition: 'all 0.5s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(0.8)',
        }} />
        <div style={{
          position: 'absolute',
          width: 220, height: 220, borderRadius: '50%',
          border: `1px solid rgba(94,176,131,${hovered ? 0.12 : 0})`,
          transition: 'all 0.6s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(0.8)',
        }} />

        <div style={{
          transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative', zIndex: 2,
        }}>
          <LottieCard src={s.src} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: s.color, marginBottom: 10,
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}>Step {s.label}</span>

        <h3 style={{
          fontSize: '1.65rem', fontWeight: 800,
          color: hovered ? s.accent : '#1c3d28',
          margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.1,
          transition: 'color 0.3s ease',
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}>{s.title}</h3>

        <p style={{
          fontSize: '0.88rem', color: '#5A7A68', lineHeight: 1.8, margin: 0, flex: 1,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          textAlign: 'justify',
        }}>{s.desc}</p>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 24, gap: 16 }}>
          <div style={{ height: 1, background: 'rgba(28,61,40,0.08)', flex: 1 }} />
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            border: hovered ? 'none' : '1.5px solid rgba(28,61,40,0.15)',
            background: hovered ? '#1F3F33' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
            boxShadow: hovered ? `0 0 16px rgba(94,176,131,0.5)` : 'none',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ stroke: hovered ? '#F0EBE3' : '#1F3F33', transition: 'stroke 0.25s' }}>
              <path d="M2 12L12 2M12 2H5M12 2v7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes shimmer-sweep {
          0%   { left: -60%; opacity: 0; }
          10%  { opacity: 1; }
          100% { left: 120%; opacity: 0; }
        }

        #about-v2 {
          background: #F0EBE3;
          padding: 110px 48px 120px;
          font-family: 'Bricolage Grotesque', sans-serif;
          position: relative;
          overflow: hidden;
        }
        #about-v2::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(31,63,51,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .ab2-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .ab2-top {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 24px; margin-bottom: 80px;
        }
        .ab2-eyebrow {
          display: inline-block; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eb083; margin-bottom: 20px;
        }
        .ab2-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          line-height: 1.05; letter-spacing: -0.04em; color: #1F3F33; margin: 0;
        }
        .ab2-heading em {
          font-family: 'DM Serif Display', serif; font-style: italic;
          font-weight: 400; color: #47876F; letter-spacing: -0.05em;
        }
        .ab2-sub {
          font-size: 0.9rem; color: #6A6456; max-width: 420px;
          line-height: 1.75; margin: 0; text-align: center;
        }
        .ab2-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }

        /* ── STRIP ── */
        .ab2-strip {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 48px; padding: 28px 40px;
          background: #1F3F33; border-radius: 20px; gap: 24px;
        }
        .ab2-strip-text {
          font-weight: 800; font-size: clamp(1.1rem, 2vw, 1.5rem);
          color: rgba(240,235,227,0.9); letter-spacing: -0.03em; line-height: 1.2;
          flex-shrink: 0;
        }
        .ab2-strip-text em {
          font-family: 'DM Serif Display', serif; font-style: italic;
          font-weight: 400; color: #78c69a;
        }
        .ab2-strip-pills {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: flex-end;
        }
        .ab2-pill {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px; padding: 7px 18px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
          color: rgba(240,235,227,0.7); white-space: nowrap;
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          #about-v2 { padding: 72px 20px 80px; }
          .ab2-top { margin-bottom: 48px; }
          .ab2-sub { max-width: 100%; }
          .ab2-grid { grid-template-columns: 1fr; gap: 14px; }
          .ab2-strip {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 24px;
            gap: 20px;
          }
          .ab2-strip-text { font-size: clamp(1rem, 4.5vw, 1.2rem); }
          .ab2-strip-pills { justify-content: flex-start; gap: 8px; }
          .ab2-pill { padding: 6px 14px; font-size: 0.68rem; }
        }
      `}</style>

      <section id="about-v2" ref={ref}>
        <div className="ab2-inner">

          {/* ── HEADER with BlurFadeIn ── */}
          <div className="ab2-top">
            <BlurFadeIn delay={0.1} yOffset={20}>
              <span className="ab2-eyebrow">How We Work</span>
            </BlurFadeIn>
            <BlurFadeIn delay={0.25} yOffset={30}>
              <h2 className="ab2-heading">
                How we can<br />
                help you <em>grooow</em>
              </h2>
            </BlurFadeIn>
            <BlurFadeIn delay={0.4} yOffset={20}>
              <p className="ab2-sub">
                Three pillars that drive everything we do — from the first brief to the final delivery.
              </p>
            </BlurFadeIn>
          </div>

          {/* ── CARDS — keep existing MagneticCard motion ── */}
          <div className="ab2-grid">
            {services.map((s, i) => (
              <MagneticCard key={i} s={s} i={i} isInView={isInView} />
            ))}
          </div>

          {/* ── STRIP with BlurFadeIn ── */}
          <BlurFadeIn delay={0.5} yOffset={24}>
            <div className="ab2-strip">
              <p className="ab2-strip-text">
                Every great brand starts with<br />
                a <em>clear strategy</em> and a <em>bold vision.</em>
              </p>
              <div className="ab2-strip-pills">
                {['Brand Audit', 'Market Research', 'Campaign Planning', 'Creative Direction', 'Growth Analytics'].map(pill => (
                  <span key={pill} className="ab2-pill">{pill}</span>
                ))}
              </div>
            </div>
          </BlurFadeIn>

        </div>
      </section>
    </>
  );
}