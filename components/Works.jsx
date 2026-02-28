'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurFadeIn from './BlurFadeIn';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    client: 'Halloon',
    category: 'Brand Identity',
    year: '2024',
    description: 'A full visual identity system built around playful geometry and bold color — crafted to make Halloon instantly recognizable across every touchpoint.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #2D5F4D 0%, #5eb083 100%)',
    features: ['Logo System', 'Brand Guidelines', 'Collateral Design'],
    accent: '#2D5F4D',
  },
  {
    id: 2,
    client: 'Elevate Co.',
    category: 'Digital Marketing',
    year: '2024',
    description: 'A performance-driven campaign across social and search channels that tripled qualified leads within 90 days, redefining growth benchmarks for Elevate Co.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #47876F 0%, #8ec5a8 100%)',
    features: ['Paid Social', 'Google Ads', 'Content Strategy'],
    accent: '#47876F',
  },
  {
    id: 3,
    client: 'Nexus UAE',
    category: 'Video Production',
    year: '2025',
    description: 'Cinematic brand films for Nexus UAE — produced across three cities, combining documentary realism with high-end motion design to tell an authentic story.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #1A3A2A 0%, #47876F 100%)',
    features: ['Brand Film', 'Social Reels', 'Post Production'],
    accent: '#1A3A2A',
  },
  {
    id: 4,
    client: 'Forma KSA',
    category: 'OOH Campaign',
    year: '2025',
    description: 'Outdoor advertising across Riyadh and Jeddah — strategically placed, visually disruptive, and designed to dominate the streetscape and drive brand recall.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #3A5A4A 0%, #7ab89a 100%)',
    features: ['Billboard Design', 'Transit Ads', 'City Mapping'],
    accent: '#3A5A4A',
  },
  {
    id: 5,
    client: 'Vexa Events',
    category: 'Events & Activation',
    year: '2025',
    description: 'From concept to crowd — we produced an immersive brand activation for Vexa that blurred the line between event and experience, earning 2M+ social impressions.',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #2A4A3A 0%, #5eb083 100%)',
    features: ['Event Design', 'Brand Activation', 'Social Coverage'],
    accent: '#2A4A3A',
  },
  {
    id: 6,
    client: 'Orbis Digital',
    category: 'Website & UX',
    year: '2025',
    description: 'A ground-up redesign of the Orbis platform — prioritizing clarity, speed, and delight. The result: a 40% increase in session duration and a dramatically lower bounce rate.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
    imageBg: 'linear-gradient(135deg, #1F3F33 0%, #47876F 100%)',
    features: ['UX Research', 'UI Design', 'Web Development'],
    accent: '#1F3F33',
  },
];

const N = projects.length;

export default function Works() {
  const containerRef = useRef(null);
  const ctx = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.current?.revert();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const cards = gsap.utils.toArray('.wk-card', container);
    if (!cards.length) return;

    ctx.current = gsap.context(() => {
      gsap.set(cards, { zIndex: (i) => i + 1 });
      gsap.set(cards.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({ paused: true });

      cards.slice(1).forEach((card) => {
        tl.to(card, { yPercent: 0, duration: 1, ease: 'power2.inOut' });
        tl.to({}, { duration: 0.3 });
      });

      const PX_PER_UNIT = 500;

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${tl.duration() * PX_PER_UNIT}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 2,
        animation: tl,
      });

    }, container);

    return () => {
      ctx.current?.revert();
    };
  }, [isMobile]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');

        #works-section {
          font-family: 'Bricolage Grotesque', sans-serif;
          background: #F0EBE3;
        }

        /* ── HEADER ── */
        .wk-header {
          padding: 120px 80px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }
        .wk-label {
          display: inline-block;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eb083; margin-bottom: 20px;
        }
        .wk-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800; font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          line-height: 1.05; letter-spacing: -0.04em;
          color: #1F3F33; margin: 0;
        }
        .wk-title em {
          font-family: 'DM Serif Display', serif;
          font-style: italic; font-weight: 400;
          color: #47876F; letter-spacing: -0.05em;
        }
        .wk-subtitle {
          font-size: 0.9rem;
          color: #6A6456;
          max-width: 420px;
          line-height: 1.75;
          margin: 0;
          text-align: center;
        }

        /* ── SCROLL STAGE ── */
        #wk-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 20px;
          box-sizing: border-box;
        }

        /* ── CARD ── */
        .wk-card {
          position: absolute;
          top: 28px;
          left: 20px;
          right: 20px;
          bottom: 28px;
          max-width: 1500px;
          margin: 0 auto;

          background: #ffffff;
          border-radius: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          will-change: transform;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05);
        }

        /* ── LEFT: TEXT ── */
        .wk-text {
          padding: 52px 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .wk-num {
          font-size: 0.64rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(31,63,51,0.28);
          margin-bottom: 28px;
          display: block;
        }
        .wk-client {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.2vw, 3.6rem);
          letter-spacing: -0.04em;
          line-height: 0.93;
          color: #1F3F33;
          margin: 0 0 12px;
        }
        .wk-cat {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: #47876F;
          margin: 0 0 24px;
          display: block;
        }
        .wk-rule {
          width: 28px; height: 1.5px;
          background: rgba(31,63,51,0.12);
          margin-bottom: 20px;
        }
        .wk-desc {
          font-size: 0.88rem;
          color: #5a6a60;
          line-height: 1.8;
          max-width: 340px;
          margin: 0;
          text-align: justify;
        }
        .wk-text-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .wk-features {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wk-feature {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(31,63,51,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wk-feature::before {
          content: '';
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #5eb083;
          flex-shrink: 0;
        }
        .wk-year-badge {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(31,63,51,0.28);
          border: 1px solid rgba(31,63,51,0.1);
          padding: 6px 14px;
          border-radius: 100px;
        }

        /* ── RIGHT: IMAGE PANEL ── */
        .wk-img-panel {
          position: relative;
          overflow: hidden;
          border-radius: 0 24px 24px 0;
        }
        .wk-img-bg {
          position: absolute;
          inset: 0;
        }
        .wk-img-photo {
          position: absolute;
          top: 32px; left: 32px; right: 32px; bottom: 32px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .wk-img-photo img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .wk-header { padding: 80px 24px 40px; }
          .wk-subtitle { text-align: center; }

          #wk-container {
            position: static;
            height: auto;
            overflow: visible;
            padding: 0 16px 60px;
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
            display: flex;
          }

          .wk-card {
            position: relative;
            top: auto; left: auto; right: auto; bottom: auto;
            margin: 0;
            max-width: 100%;
            height: 480px;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            border-radius: 20px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .wk-img-panel {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            z-index: 1;
          }

          .wk-img-photo {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .wk-img-photo img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
          }

          .wk-img-bg { display: none; }

          .wk-text {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            z-index: 2;
            padding: 20px 24px 28px;
            background: linear-gradient(to top, rgba(5,18,12,0.95) 0%, rgba(5,18,12,0.55) 55%, transparent 100%);
            display: flex;
            flex-direction: column;
            gap: 4px;
            justify-content: flex-end;
          }

          .wk-num { color: rgba(255,255,255,0.4); margin-bottom: 4px; }
          .wk-client { color: #ffffff; font-size: clamp(1.6rem, 5vw, 2rem); margin-bottom: 2px; }
          .wk-cat { color: rgba(94,176,131,0.95); font-size: 0.9rem; margin-bottom: 0; }
          .wk-rule { display: none; }
          .wk-desc { display: none; }
          .wk-text-bottom { display: none; }
        }
      `}</style>

      <div id="works-section">

        {/* HEADER */}
        <div className="wk-header">
          <div style={{ textAlign: 'center' }}>
            <BlurFadeIn delay={0.1} yOffset={20}>
              <span className="wk-label">Our Works</span>
            </BlurFadeIn>
            <BlurFadeIn delay={0.25} yOffset={30}>
              <h2 className="wk-title">
                Transforming Visions<br />Into <em>Reality</em>
              </h2>
            </BlurFadeIn>
          </div>
          <BlurFadeIn delay={0.4} yOffset={20}>
            <p className="wk-subtitle">
              Discover how we've helped brands stand out, connect with audiences,
              and achieve measurable success across the Middle East and South Asia.
            </p>
          </BlurFadeIn>
        </div>

        {/* SCROLL STAGE — desktop pinned / mobile plain */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px 60px' }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="wk-card"
                style={{ marginBottom: i < projects.length - 1 ? '16px' : 0, transition: 'transform 0.3s ease' }}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className="wk-img-panel">
                  <div className="wk-img-bg" style={{ background: p.imageBg }} />
                  <div className="wk-img-photo">
                    <img src={p.image} alt={p.client} />
                  </div>
                </div>

                <div className="wk-text">
                  <span className="wk-num">
                    {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </span>
                  <h3 className="wk-client">{p.client}</h3>
                  <span className="wk-cat">{p.category}</span>
                </div>

                <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 3, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '5px 14px' }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                    {p.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div id="wk-container" ref={containerRef}>
          {projects.map((p, i) => (
            <div key={p.id} className="wk-card">

              {/* LEFT: Text */}
              <div className="wk-text">
                <div>
                  <span className="wk-num">
                    {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </span>
                  <h3 className="wk-client">{p.client}</h3>
                  <span className="wk-cat">{p.category}</span>
                  <div className="wk-rule" />
                  <p className="wk-desc">{p.description}</p>
                </div>
                <div className="wk-text-bottom">
                  <div className="wk-features">
                    {p.features.map(f => (
                      <span key={f} className="wk-feature">{f}</span>
                    ))}
                  </div>
                  <span className="wk-year-badge">{p.year}</span>
                </div>
              </div>

              {/* RIGHT: Image */}
              <div className="wk-img-panel">
                <div className="wk-img-bg" style={{ background: p.imageBg }} />
                <div className="wk-img-photo">
                  <img src={p.image} alt={p.client} />
                </div>
              </div>

            </div>
          ))}
        </div>
        )}

      </div>
    </>
  );
}