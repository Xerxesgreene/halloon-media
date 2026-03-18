'use client';

import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    
    font-family: 'Bricolage Grotesque', sans-serif;
  }

  /* ── DESKTOP ── */
  .hero-wrapper {
  background: #F0EBE3;
    /* FIX: remove top padding so no gap between Hero and HeroSection */
    padding: 0 28px 28px 28px;
  }

  .hero {
    width: 100%;
    background: #0e3524;
    border-radius: 28px;
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 56px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 60px 7vw;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    justify-self: start;
  }

  .line1, .line2, .line3 {
    font-size: clamp(2.4rem, 4.5vw, 4.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    white-space: nowrap;
  }

  .line1 { color: rgba(220,245,232,0.82); }
  .line2 { color: #e8f5ee; }
  .line3 { color: rgba(220,245,232,0.82); }

  .hero-tagline {
    margin-top: 28px;
    font-size: clamp(0.78rem, 1vw, 0.92rem);
    font-weight: 400;
    color: rgba(220,245,232,0.45);
    line-height: 1.8;
    max-width: 26rem;
  }
  .hero-tagline strong {
    color: rgba(220,245,232,0.75);
    font-weight: 600;
  }

  .hero-cup {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    z-index: 2;
    justify-self: end;
    align-self: center;
    padding-right: 4vw;
  }

  @keyframes floatCup {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-22px) rotate(1deg); }
  }

  .cup-wrap {
    animation: floatCup 4s ease-in-out infinite;
    filter: drop-shadow(0 50px 70px rgba(0,0,0,0.6));
  }

  .cup-wrap img {
    width: clamp(150px, 18vw, 260px);
    height: auto;
    display: block;
  }

  .blob {
    position: absolute;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    filter: blur(140px);
    opacity: 0.25;
    pointer-events: none;
    z-index: 0;
  }
  .blob-1 {
    background: radial-gradient(circle, #22C55E 0%, transparent 70%);
    top: -250px; left: -250px;
  }
  .blob-2 {
    background: radial-gradient(circle, #4ADE80 0%, transparent 70%);
    bottom: -250px; right: -200px;
    animation: blobFloat 22s ease-in-out infinite;
  }

  @keyframes blobFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(40px); }
  }

  .mouse-light {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74,222,128,0.25) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 1;
  }

  .grain {
    position: absolute;
    inset: 0;
    background-image: url("/images/noise.svg");
    opacity: 0.05;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .hero-wrapper {
      padding: 0 16px 24px 16px;
      position: relative;
      z-index: 20;
    }

    .hero {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 24px;
      min-height: unset;
      padding: 48px 28px 52px;
      text-align: left;
      gap: 32px;
    }

    .hero-text { align-items: flex-start; }

    .line1, .line2, .line3 {
      font-size: clamp(1.75rem, 7.2vw, 2.2rem);
      white-space: normal;
      text-align: left;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .hero-tagline {
      text-align: left;
      max-width: 100%;
      font-size: 0.95rem;
      margin-top: 20px;
    }

    .hero-cup { width: 100%; }

    .cup-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      animation: none;
      filter: drop-shadow(0 30px 50px rgba(0,0,0,0.5));
    }

    .cup-wrap img {
      width: min(42vw, 170px);
      max-width: 100%;
      height: auto;
      margin: 0 auto;
      display: block;
    }

    .mouse-light { display: none; }

    .blob { width: 300px; height: 300px; }
    .blob-1 { top: -100px; left: -100px; }
    .blob-2 {
      bottom: -100px; right: -80px;
      animation: none;
    }
  }
`;

export default function HeroSection() {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    let t;
    const debounced = () => { clearTimeout(t); t = setTimeout(check, 150); };
    window.addEventListener('resize', debounced);
    return () => { window.removeEventListener('resize', debounced); clearTimeout(t); };
  }, []);

  const rawProgress = useMotionValue(0);

  useEffect(() => {
    if (isMobile) return;

    const update = () => {
      const el = heroRef.current;
      if (!el) return;

      const scrollY = window.__smoother
        ? window.__smoother.scrollTop()
        : window.scrollY;

      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollY;
      const elHeight = rect.height;
      const viewH = window.innerHeight;

      const progress = (scrollY - elTop + viewH) / (elHeight + viewH);
      rawProgress.set(Math.min(1, Math.max(0, progress)));
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, [isMobile, rawProgress]);

  const cupY  = useTransform(rawProgress, [0, 1], [0, -80]);
  const blobY = useSpring(
    useTransform(rawProgress, [0, 1], [0, 80]),
    { stiffness: 40, damping: 20 }
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="hero-wrapper">
        <section
          className="hero"
          ref={heroRef}
          onMouseMove={handleMouseMove}
        >
          <motion.div className="blob blob-1" style={isMobile ? {} : { y: blobY }} />
          <div className="blob blob-2" />

          {!isMobile && (
            <motion.div
              className="mouse-light"
              style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            />
          )}
          <div className="grain" />

          <div className="hero-text">
            <p className="line1">A 360° Integrated</p>
            <p className="line2">Media Consultancy</p>
            <p className="line3">For Brands That Lead</p>

            <p className="hero-tagline">
              Dubai-based media consultancy delivering{' '}
              <strong>strategy, digital, production</strong>{' '}
              and events across UAE, KSA, Qatar, Kuwait&nbsp;&amp;&nbsp;India.
            </p>
          </div>

          <div className="hero-cup">
            {isMobile ? (
              <div className="cup-wrap">
                <img src="/images/cup.png" alt="Halloon Media Cup" />
              </div>
            ) : (
              <motion.div style={{ y: cupY }}>
                <div className="cup-wrap">
                  <img src="/images/cup.png" alt="Halloon Media Cup" />
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}