'use client';

import { useRef } from 'react';
import BlurFadeIn from './BlurFadeIn';

const REASONS = [
  {
    num: '01',
    title: 'Strategy First',
    body: 'No fluff, just results. Thoughtful strategy and execution that make your brand stronger every step of the way.',
  },
  {
    num: '02',
    title: 'Local Insight',
    body: 'Deep roots across Dubai, KSA, Qatar, Kuwait and India — we combine local nuance with international best practices.',
  },
  {
    num: '03',
    title: 'Measurable Outcomes',
    body: 'Smart media solutions tied to real business metrics. We track what matters and optimise relentlessly.',
  },
];

const POINTS = [
  
  { icon: '🔄', label: '360° coverage — Strategy, digital, production, events and many more' },
  { icon: '🌍', label: 'Regional expertise — UAE, KSA, Qatar, Kuwait, India projects' },
  { icon: '👥', label: 'Dynamic team of 40+ skilled professionals' },
  { icon: '📅', label: '8+ years of expertise in media & brand consultancy' },
  { icon: '🏆', label: '50+ brands served across multiple industries' },
];

export default function WhyChooseUs() {
  const ref = useRef(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .wcu-section {
          background: #F0EBE3;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .wcu-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          padding: 110px 24px 72px;
        }
        .wcu-eyebrow {
          display: inline-block;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5eb083;
        }
        .wcu-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #1F3F33;
          margin: 0;
        }
        .wcu-title em {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-weight: 400;
          color: #47876F;
          letter-spacing: -0.05em;
        }
        .wcu-subtitle {
          font-size: 0.9rem;
          color: #6A6456;
          max-width: 420px;
          line-height: 1.75;
          margin: 0;
          text-align: center;
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        /* ── TOP SPLIT ── */
        .wcu-split {
          display: grid;
          grid-template-columns: 58% 42%;
          border-top: 1px solid rgba(31,63,51,0.1);
          min-height: 680px;
        }

        /* LEFT */
        .wcu-img-panel {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: visible;
          border-right: 1px solid rgba(31,63,51,0.1);
        }
        .wcu-watermark {
          position: absolute;
          left: clamp(6px, 1.5vw, 28px);
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 5vw, 5.5rem);
          letter-spacing: -0.01em;
          color: rgba(31,63,51,0.12);
          white-space: nowrap;
          pointer-events: none;
          z-index: 1;
          user-select: none;
        }
        .wcu-img-panel img {
          width: 126%;
          max-width: none;
          height: auto;
          display: block;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 -10px 60px rgba(0,0,0,0.08));
          margin-bottom: -2%;
        }

        /* RIGHT */
        .wcu-right-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px);
        }
        .wcu-right-label {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5eb083;
          margin-bottom: 24px;
          display: block;
        }
        .wcu-right-para {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 400;
          font-size: clamp(1.05rem, 1.5vw, 1.3rem);
          color: rgba(31,63,51,0.7);
          line-height: 1.85;
          margin: 0 0 28px;
          text-align: justify;
        }
        .wcu-right-para strong { color: #1F3F33; font-weight: 700; }

        /* ── POINTS LIST ── */
        .wcu-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wcu-point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(94,176,131,0.06);
          border: 1px solid rgba(94,176,131,0.15);
          border-radius: 12px;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          cursor: default;
        }
        .wcu-point:hover {
          background: rgba(94,176,131,0.12);
          border-color: rgba(94,176,131,0.3);
          transform: translateX(4px);
        }
        .wcu-point-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5eb083;
          flex-shrink: 0;
          margin-top: 5px;
        }
        .wcu-point-text {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          color: rgba(31,63,51,0.75);
          line-height: 1.6;
          font-weight: 400;
        }
        .wcu-point-text strong {
          color: #1F3F33;
          font-weight: 700;
        }

        /* ── BOTTOM REASONS ── */
        .wcu-reasons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(31,63,51,0.1);
          border-bottom: 1px solid rgba(31,63,51,0.1);
        }
        .wcu-reason {
          padding: 40px clamp(20px, 3vw, 40px);
          border-right: 1px solid rgba(31,63,51,0.1);
          transition: background 0.3s;
        }
        .wcu-reason:last-child { border-right: none; }
        .wcu-reason:hover { background: rgba(94,176,131,0.04); }
        .wcu-reason-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; color: #5eb083;
          margin-bottom: 12px; display: block;
        }
        .wcu-reason-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
          letter-spacing: -0.025em; color: #1F3F33;
          margin: 0 0 10px; line-height: 1.1;
        }
        .wcu-reason-body {
          font-size: 0.86rem;
          color: rgba(31,63,51,0.55);
          line-height: 1.8; margin: 0;
          text-align: justify;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .wcu-header { padding: 72px 20px 48px; }
          .wcu-subtitle { max-width: 100%; text-align: justify; }
          .wcu-split { grid-template-columns: 1fr; min-height: unset; }
          .wcu-img-panel {
            border-right: none;
            border-bottom: 1px solid rgba(31,63,51,0.1);
            min-height: 350px;
          }
          .wcu-img-panel img { width: 95vw; margin-bottom: 0; }
          .wcu-watermark { font-size: 2.5rem; left: 2px; }
          .wcu-right-panel { padding: 36px 20px; }
          .wcu-right-para { text-align: justify; }
          .wcu-point { padding: 10px 14px; }
          .wcu-point-text { font-size: 0.84rem; }
          .wcu-reasons { grid-template-columns: 1fr; }
          .wcu-reason {
            border-right: none;
            border-bottom: 1px solid rgba(31,63,51,0.1);
            padding: 28px 20px;
          }
          .wcu-reason:last-child { border-bottom: none; }
          .wcu-reason-body { text-align: justify; }
        }
      `}</style>

      <section ref={ref} className="wcu-section">

        {/* ── HEADER ── */}
        <BlurFadeIn delay={0.1} duration={0.8}>
          <div className="wcu-header">
            <span className="wcu-eyebrow">Why Choose Us</span>
            <h2 className="wcu-title">
              Built for brands<br />
              that <em>mean it.</em>
            </h2>
            <p className="wcu-subtitle">
              Over 8 years of expertise, 40+ specialists, and measurable results across 5 markets.
            </p>
          </div>
        </BlurFadeIn>

        <div className="wcu-split">
          <BlurFadeIn delay={0.15} duration={1.1}>
            <div className="wcu-img-panel">
              <span className="wcu-watermark">WHY CHOOSE US?</span>
              <img src="/images/e1.png" alt="Why choose Halloon Media" />
            </div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.25} duration={0.9}>
            <div className="wcu-right-panel">
              <span className="wcu-right-label">Our Difference</span>
              <p className="wcu-right-para">
                We're not just another agency. We're a{' '}
                <strong>360° media consultancy</strong> built to make your brand
                visible, credible, and impossible to ignore.
              </p>

              {/* ── POINT-WISE LIST FROM PDF ── */}
              <ul className="wcu-points">
                {POINTS.map((p, i) => (
                  <li key={i} className="wcu-point">
                    <div className="wcu-point-dot" />
                    <span className="wcu-point-text">{p.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFadeIn>
        </div>

        {/* ── BOTTOM REASONS ── */}
        <div className="wcu-reasons">
          {REASONS.map((r, i) => (
            <BlurFadeIn key={i} delay={0.3 + i * 0.1} duration={0.8}>
              <div className="wcu-reason">
                <span className="wcu-reason-num">{r.num}</span>
                <h3 className="wcu-reason-title">{r.title}</h3>
                <p className="wcu-reason-body">{r.body}</p>
              </div>
            </BlurFadeIn>
          ))}
        </div>

      </section>
    </>
  );
}