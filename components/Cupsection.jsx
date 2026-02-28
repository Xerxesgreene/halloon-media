'use client';

import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #F0EBE3;
    font-family: 'Bricolage Grotesque', sans-serif;
  }

  /* ── DESKTOP ── */
  .hero-wrapper {
    padding: 28px;
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
    padding: 60px 7vw;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
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
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
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
    width: clamp(700px, 80vw, 1200px);
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
    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
    opacity: 0.05;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .hero-wrapper {
      padding: 16px 16px 24px 16px;
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
      text-align: center;
      gap: 32px;
    }

    .hero-text { align-items: center; }

    .line1, .line2, .line3 {
      font-size: clamp(1.8rem, 7vw, 2.4rem);
      white-space: normal;
    }

    .hero-tagline {
      text-align: center;
      max-width: 100%;
      font-size: 0.82rem;
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
      width: min(80vw, 340px);
      max-width: 100%;
      height: auto;
      margin: 0 auto;
      display: block;
    }

    .mouse-light { display: none; }

    .blob { width: 300px; height: 300px; }
    .blob-1 { top: -100px; left: -100px; }
    .blob-2 { bottom: -100px; right: -80px; }
  }
`;

export default function HeroSection() {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ✅ Manual scroll progress synced to ScrollSmoother's virtual scroll
  // instead of Framer Motion's useScroll (which reads native scroll position)
  const rawProgress = useMotionValue(0);

  useEffect(() => {
    if (isMobile) return;

    const update = () => {
      const el = heroRef.current;
      if (!el) return;

      // Use ScrollSmoother's scroll position if available, else fall back
      const scrollY = window.__smoother
        ? window.__smoother.scrollTop()
        : window.scrollY;

      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollY;
      const elHeight = rect.height;
      const viewH = window.innerHeight;

      // Progress: 0 when section enters bottom, 1 when it exits top
      const progress = (scrollY - elTop + viewH) / (elHeight + viewH);
      rawProgress.set(Math.min(1, Math.max(0, progress)));
    };

    // Tick on every frame to stay in sync with GSAP's virtual scroll
    let rafId;
    const tick = () => {
      update();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
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
          <motion.div className="blob blob-1" style={{ y: blobY }} />
          <motion.div
            className="blob blob-2"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity }}
          />
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