'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import BlurFadeIn from './BlurFadeIn';

const STATS = [
  { value: 8,  suffix: '+', label: 'Years of expertise' },
  { value: 40, suffix: '+', label: 'In-house experts' },
  { value: 5,  suffix: '',  label: 'Regional markets' },
  { value: 50, suffix: '+', label: 'Brands served' },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');

        #about-section {
          background: #F0EBE3;
          font-family: 'Bricolage Grotesque', sans-serif;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .ab-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 72px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          box-sizing: border-box;
        }
        .ab-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5eb083;
          margin-bottom: 20px;
          display: block;
        }
        .ab-headline {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          line-height: 1.03;
          letter-spacing: -0.04em;
          color: #1F3F33;
          margin: 0 0 20px;
        }
        .ab-headline em {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-weight: 400;
          color: #47876F;
          letter-spacing: -0.05em;
        }
        .ab-subheading {
          font-size: 0.92rem;
          color: #7A8A80;
          max-width: 480px;
          line-height: 1.8;
          margin: 0;
          font-weight: 400;
          text-align: center;
        }

        .ab-divider {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 72px;
          box-sizing: border-box;
        }
        .ab-divider hr {
          border: none;
          border-top: 1px solid rgba(31,63,51,0.1);
          margin: 0;
        }

        .ab-stats {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 72px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          box-sizing: border-box;
        }
        .ab-stat {
          padding: 0 40px;
          border-right: 1px solid rgba(31,63,51,0.1);
          text-align: center;
        }
        .ab-stat:first-child { padding-left: 0; }
        .ab-stat:last-child  { border-right: none; padding-right: 0; }
        .ab-stat-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          letter-spacing: -0.05em;
          color: #1F3F33;
          line-height: 1;
          margin-bottom: 10px;
          display: block;
        }
        .ab-stat-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A9E92;
        }

        .ab-body-row {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 72px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: start;
          box-sizing: border-box;
        }
        .ab-body-left p {
          font-size: 1rem;
          line-height: 1.9;
          color: #5C6B62;
          margin: 0 0 20px;
          font-weight: 400;
          text-align: justify;
        }
        .ab-body-left p:last-child { margin-bottom: 0; }
        .ab-body-left strong { color: #1F3F33; font-weight: 700; }

        .ab-markets-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8A9E92;
          margin-bottom: 28px;
          display: block;
        }
        .ab-markets-list {
          list-style: none;
          margin: 0 0 40px;
          padding: 0;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ab-market-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1px solid rgba(31,63,51,0.15);
          border-radius: 100px;
          cursor: default;
          transition: background 0.25s, border-color 0.25s;
          white-space: nowrap;
        }
        .ab-market-item::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5eb083;
          flex-shrink: 0;
        }
        .ab-market-item:hover { background: #1F3F33; border-color: #1F3F33; }
        .ab-market-item:hover .ab-market-name { color: #F0EBE3; }
        .ab-market-name {
          font-weight: 600;
          font-size: 0.82rem;
          color: #1F3F33;
          letter-spacing: 0.01em;
          transition: color 0.25s;
        }

        .ab-pull-quote {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          font-weight: 400;
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: #1F3F33;
          margin: 0 0 40px;
          padding-left: 24px;
          border-left: 2px solid #5eb083;
          text-align: justify;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .ab-header   { padding: 100px 48px 72px; }
          .ab-divider  { padding: 0 48px; }
          .ab-stats    { padding: 64px 48px; }
          .ab-body-row { padding: 0 48px 80px; gap: 64px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          #about-section {
            overflow-x: hidden;
            width: 100%;
          }

          .ab-header {
            padding: 72px 20px 48px;
            width: 100%;
            box-sizing: border-box;
          }
          .ab-subheading {
            max-width: 100%;
            font-size: 0.88rem;
            text-align: justify;
          }

          .ab-divider {
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
          }

          .ab-stats {
            grid-template-columns: 1fr 1fr;
            padding: 40px 20px;
            gap: 0;
            width: 100%;
            box-sizing: border-box;
          }
          .ab-stat {
            padding: 24px 16px;
            border-right: none !important;
            border-left: none !important;
            border-bottom: 1px solid rgba(31,63,51,0.1);
            text-align: left;
          }
          .ab-stat:nth-child(odd)  { border-right: none !important; }
          .ab-stat:nth-child(even) { border-left: none !important; }
          .ab-stat:nth-last-child(-n+2) { border-bottom: none !important; }
          .ab-stat-num { font-size: clamp(2rem, 9vw, 2.8rem); }
          .ab-stat-label { font-size: 0.6rem; letter-spacing: 0.12em; }

          .ab-body-row {
            grid-template-columns: 1fr;
            padding: 32px 20px 72px;
            gap: 40px;
            width: 100%;
            box-sizing: border-box;
          }

          .ab-body-left p {
            text-align: justify;
            font-size: 0.92rem;
          }

          .ab-pull-quote {
            text-align: justify;
            font-size: clamp(1.15rem, 4.5vw, 1.4rem);
            padding-left: 16px;
            margin-bottom: 28px;
          }

          .ab-markets-list {
            flex-wrap: wrap;
            gap: 8px;
            width: 100%;
          }
        }
      `}</style>

      <section id="about-section">

        <div className="ab-header">
          <BlurFadeIn delay={0.1} yOffset={16}>
            <span className="ab-eyebrow">About Us</span>
          </BlurFadeIn>
          <BlurFadeIn delay={0.2} yOffset={28}>
            <h2 className="ab-headline">
              Pioneering Media <em>Excellence</em>
            </h2>
          </BlurFadeIn>
          <BlurFadeIn delay={0.3} yOffset={16}>
            <p className="ab-subheading">
              A 360° media consultancy bridging the Middle East and South Asia — local expertise, global standards.
            </p>
          </BlurFadeIn>
        </div>

        <div className="ab-divider"><hr /></div>

        <div className="ab-stats">
          {STATS.map((s, i) => (
            <BlurFadeIn key={i} delay={0.1 + i * 0.08} yOffset={16}>
              <div className="ab-stat">
                <span className="ab-stat-num">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="ab-stat-label">{s.label}</span>
              </div>
            </BlurFadeIn>
          ))}
        </div>

        <div className="ab-divider"><hr /></div>

        <div className="ab-body-row">
          <BlurFadeIn delay={0.15} yOffset={20}>
            <div className="ab-body-left">
              <p>
                <strong>Halloon Media</strong> is a leading media consultancy with a strong presence across the Middle East and South Asia — bringing local expertise with global standards to every project we take on.
              </p>
              <p>
                We specialise in transforming brands through innovative media strategies, creative campaigns, and digital excellence across Dubai, KSA, Qatar, Kuwait, and India.
              </p>
            </div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.25} yOffset={20}>
            <div>
              <p className="ab-pull-quote">
                "We transform how brands are perceived, felt, and remembered."
              </p>
              <span className="ab-markets-label">Where We Operate</span>
              <ul className="ab-markets-list">
                {['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'India'].map(name => (
                  <li key={name} className="ab-market-item">
                    <span className="ab-market-name">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFadeIn>
        </div>

      </section>
    </>
  );
}