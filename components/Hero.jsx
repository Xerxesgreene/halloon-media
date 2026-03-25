'use client';

import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const WORDS = [
  { text: 'brands',      color: '#7ec8b0' },
  { text: 'journeys',    color: '#6fa3d0' },
  { text: 'stories',     color: '#c4a65a' },
  { text: 'experiences', color: '#e07b5a' },
  { text: 'designs',     color: '#9b8ea0' },
  { text: 'ideas',       color: '#d4836a' },
  { text: 'moments',     color: '#7ab89a' },
  { text: 'campaigns',   color: '#a07ec8' },
];

function smoothScrollTo(href) {
  const target = document.querySelector(href);
  if (!target) return;
  if (window.__smoother) {
    window.__smoother.scrollTo(target, true);
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Hero({ introDone }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [maskUrl, setMaskUrl] = useState(null);
  const [maskReady, setMaskReady] = useState(false); // ← new: hide video until mask is correct
  const maskUrlRef = useRef(null);

  useEffect(() => {
    if (!introDone) return;
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, [introDone]);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const vw = window.innerWidth;
      const mobile = vw <= 768;
      const dpr = window.devicePixelRatio || 1;

      const targetFill  = mobile ? 0.95 : 0.88;
      const heightRatio = mobile ? 0.40 : 0.28;

      const W = Math.round(vw * dpr);
      const H = Math.round(W * heightRatio);

      // ── FONT LOADING FIX ──────────────────────────────────────────────
      // 1. Wait for ALL fonts to be ready first
      await document.fonts.ready;

      // 2. Explicitly load the specific weight/family we need for the mask.
      //    This forces the browser to fetch & decode the font if it hasn't yet.
      //    We try Bricolage Grotesque first, fall back gracefully.
      const fontVariants = [
        '800 100px "Bricolage Grotesque"',
        '800 100px BricolageHero',
      ];
      await Promise.allSettled(
        fontVariants.map(f => document.fonts.load(f))
      );

      // 3. Small tick to let the browser finish rasterising the newly-loaded font.
      //    Without this, measureText can still return stale metrics on some engines.
      await new Promise(r => setTimeout(r, 30));
      // ─────────────────────────────────────────────────────────────────

      if (cancelled) return;

      const canvas = document.createElement('canvas');
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'white';

      // Use the exact same font stack but now we know it's loaded
      const fontStack = `'Bricolage Grotesque', 'BricolageHero', 'Arial Rounded MT Bold', Impact, sans-serif`;

      let lo = 10, hi = W * 1.5, bestSize = W * 0.2;
      for (let i = 0; i < 32; i++) {
        const mid = (lo + hi) / 2;
        ctx.font = `800 ${mid}px ${fontStack}`;
        const w = ctx.measureText('Halloon').width;
        if (w < W * targetFill) { lo = mid; bestSize = mid; }
        else { hi = mid; }
      }

      ctx.font = `800 ${bestSize}px ${fontStack}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Halloon', W / 2, H / 2);

      canvas.toBlob(blob => {
        if (cancelled) return;
        const newUrl = URL.createObjectURL(blob);
        if (maskUrlRef.current?.startsWith('blob:')) {
          URL.revokeObjectURL(maskUrlRef.current);
        }
        maskUrlRef.current = newUrl;
        setMaskUrl(newUrl);
        setMaskReady(true); // ← signal that mask is correct & ready to show
      }, 'image/png');
    };

    render();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (maskUrlRef.current?.startsWith('blob:')) {
        URL.revokeObjectURL(maskUrlRef.current);
        maskUrlRef.current = null;
      }
    };
  }, []);

  const current = WORDS[wordIndex];

  const videoStyle = maskUrl ? {
    WebkitMaskImage: `url(${maskUrl})`,
    maskImage: `url(${maskUrl})`,
  } : {
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 260'%3E%3Ctext x='600' y='245' text-anchor='middle' font-family='Arial Rounded MT Bold%2C Impact%2C sans-serif' font-weight='900' font-size='215' letter-spacing='-4' fill='white'%3EHalloon%3C%2Ftext%3E%3C%2Fsvg%3E")`,
    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 260'%3E%3Ctext x='600' y='245' text-anchor='middle' font-family='Arial Rounded MT Bold%2C Impact%2C sans-serif' font-weight='900' font-size='215' letter-spacing='-4' fill='white'%3EHalloon%3C%2Ftext%3E%3C%2Fsvg%3E")`,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,700;9..40,900&family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Caveat:wght@700&display=swap');

        :root {
          --cream: #F0EBE3;
          --green-light: #2d7a42;
          --forest: #1c3d28;
          --text-main: #1c3d28;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        #hero-root {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          background: #F0EBE3;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        #hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 15% 50%, rgba(28,61,40,0.04) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 30%, rgba(28,61,40,0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        #hero-content {
          position: relative;
          z-index: 10;
          padding-top: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
          width: 100%;
          flex-shrink: 0;
          gap: 6px;
        }

        .tl-eyebrow {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(28,61,40,0.35);
          margin-bottom: 10px;
          display: block;
        }

        .tl-line1 {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.22em;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(1.1rem, 2vw, 2rem);
          color: var(--text-main);
          line-height: 1.05;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }

        .tl-word-slot {
          display: inline-flex;
          align-items: baseline;
          min-width: 7ch;
        }
        .tl-word { display: inline-block; white-space: nowrap; }

        .tl-line2 {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: clamp(2rem, 4.5vw, 4.5rem);
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 0.95;
          display: block;
          margin-top: 0;
        }

        .tl-sub {
          margin-top: 8px;
          font-size: clamp(0.7rem, 0.8vw, 0.82rem);
          color: rgba(28,61,40,0.45);
          line-height: 1.65;
          max-width: 22rem;
          display: block;
        }
        .tl-sub strong { color: var(--forest); font-weight: 700; }

        #explore-center {
          position: relative;
          z-index: 10;
          margin-top: 18px;
          flex-shrink: 0;
          pointer-events: all;
        }

        .h-btn-p {
          padding: 9px 20px;
          background: var(--forest);
          color: var(--cream);
          font-size: 0.62rem;
          border-radius: 9999px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .h-btn-p:hover { background: var(--green-light); }

        .h-btn-icon { display: none; }

        #halloon-spacer {
          flex: 1 1 0;
          min-height: 10px;
        }

        #halloon-layer {
          position: relative;
          width: 100%;
          padding-top: 10px;
          height: calc(100vw * 0.28);
          z-index: 2;
          pointer-events: none;
          flex-shrink: 0;
          margin-bottom: 0;
          padding-bottom: 0;
          display: block;
          line-height: 0;
          font-size: 0;
          /* Hide until mask is correctly rendered with the right font */
          transition: opacity 0.4s ease;
        }

        #halloon-layer video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          opacity: 0.92;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          -webkit-mask-size: 100% auto;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: 100% auto;
        }

        .corner-mark {
          position: absolute; width: 14px; height: 14px;
          opacity: 0.1; pointer-events: none; z-index: 5;
        }
        .corner-mark::before, .corner-mark::after {
          content: ''; position: absolute; background: var(--forest);
        }
        .corner-mark::before { width: 1px; height: 100%; left: 50%; top: 0; }
        .corner-mark::after  { width: 100%; height: 1px; top: 50%; left: 0; }
        .cm-tl { top: 100px; left: 60px; }
        .cm-tr { top: 100px; right: 60px; }
        .cm-bl { bottom: 36px; left: 60px; }
        .cm-br { bottom: 36px; right: 60px; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          #hero-root {
            height: auto !important;
            min-height: unset !important;
            overflow-x: clip;
            overflow-y: visible;
            align-items: center;
            justify-content: flex-start;
            padding-bottom: 0;
            margin-bottom: 0;
          }

          .corner-mark { display: none; }
          .tl-eyebrow  { display: none; }

          #hero-content {
            padding: 90px 20px 0 20px;
            align-items: center;
            text-align: center;
            pointer-events: all;
            width: 100%;
            gap: 4px;
          }

          .tl-line1 {
            font-size: clamp(1rem, 5vw, 1.5rem);
            white-space: normal;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.15em;
            line-height: 1.1;
          }

          .tl-word-slot { min-width: 8ch; }

          .tl-line2 {
            font-size: clamp(2rem, 9vw, 3.5rem);
            white-space: nowrap;
            margin-top: 0;
            line-height: 0.9;
            text-align: center;
          }

          .tl-sub {
            font-size: 0.72rem;
            max-width: 100%;
            margin-top: 6px;
            color: rgba(28,61,40,0.5);
            text-align: center;
          }

          .h-btn-p { display: none; }
          #explore-center { display: none; }

          .h-btn-icon {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--forest);
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            margin-top: 10px;
            margin-bottom: 30px;
            opacity: 0.65;
            pointer-events: all;
          }

          #halloon-spacer { display: none; }

          #halloon-layer {
            position: relative !important;
            margin-top: 6px !important;
            padding-top: 0 !important;
            width: 100vw;
            height: calc(100vw * 0.48);
            margin-bottom: 0;
            z-index: 2;
            line-height: 0;
            font-size: 0;
          }

          #halloon-and-cta {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 0 !important;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }
      `}</style>

      <div id="hero-root">
        {['cm-tl','cm-tr','cm-bl','cm-br'].map(c => (
          <div key={c} className={`corner-mark ${c}`} />
        ))}

        <motion.div
          id="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tl-eyebrow">Media &amp; Advertising Consultancy</span>

          <div className="tl-line1">
            Let's create&nbsp;
            <span className="tl-word-slot">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.text}
                  className="tl-word"
                  style={{ color: current.color }}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{    opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.text}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <span className="tl-line2">together.</span>

          <span className="tl-sub">
            We help businesses find their voice, shape their identity,
            and connect with their audience. <strong>Less talk. More craft.</strong>
          </span>
        </motion.div>

        <motion.div
          id="explore-center"
          initial={{ opacity: 0, y: 10 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <button className="h-btn-p" onClick={() => smoothScrollTo('#services')}>
            Explore Services <ArrowRight size={11} />
          </button>
        </motion.div>

        <div id="halloon-spacer" />

        <div id="halloon-and-cta" style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
          <motion.div
            id="halloon-layer"
            initial={{ opacity: 0 }}
            animate={introDone && maskReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <video
              src="/videos/video1.mp4"
              autoPlay loop muted playsInline
              style={videoStyle}
            />
          </motion.div>

          <motion.button
            className="h-btn-icon"
            onClick={() => smoothScrollTo('#services')}
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Explore Services
            <span className="icon-circle">
              <ArrowRight size={12} />
            </span>
          </motion.button>
        </div>

      </div>
    </>
  );
}