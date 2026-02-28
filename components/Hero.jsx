'use client';

import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const WORDS = [
  { text: 'things',  color: '#9b8ea0' },
  { text: 'brands',  color: '#7ec8b0' },
  { text: 'ideas',   color: '#e07b5a' },
  { text: 'stories', color: '#6fa3d0' },
  { text: 'moments', color: '#c4a65a' },
];

function smoothScrollTo(href) {
  if (window.__smoother) {
    window.__smoother.scrollTo(href, true);
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Hero({ introDone }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [maskDataUrl, setMaskDataUrl] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fontUrl = 'url(https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5HsSoRHTBRXyC.woff2)';
    const font = new FontFace('BricolageHero', fontUrl, { weight: '800' });

    const render = () => {
      const vw = window.innerWidth;
      const mobile = vw <= 768;
      const dpr = window.devicePixelRatio || 1;

      const targetFill  = mobile ? 0.88 : 0.65;
      const heightRatio = mobile ? 0.36 : 0.22;

      const W = Math.round(vw * dpr);
      const H = Math.round(W * heightRatio);

      const canvas = document.createElement('canvas');
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'white';

      const fontStack = `'BricolageHero', 'Bricolage Grotesque', 'Arial Rounded MT Bold', Impact, sans-serif`;

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

      setMaskDataUrl(canvas.toDataURL('image/png'));
    };

    font.load()
      .then(loaded => { document.fonts.add(loaded); render(); })
      .catch(() => render());

    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, []);

  const current = WORDS[wordIndex];

  const videoStyle = maskDataUrl ? {
    WebkitMaskImage: `url(${maskDataUrl})`,
    maskImage: `url(${maskDataUrl})`,
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

        /* ── DESKTOP ── */
        #hero-root {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 600px;
          background: #F0EBE3;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* ✅ overlap next section by 3px to kill the gap line for good */
          margin-bottom: -3px;
          padding-bottom: 3px;
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

        /* Top content block */
        #hero-content {
          position: relative;
          z-index: 10;
          padding-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          pointer-events: none;
          width: 100%;
          /* ✅ don't grow — let it sit naturally at top */
          flex-shrink: 0;
        }

        .tl-eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(28,61,40,0.4);
          margin-bottom: 18px;
          display: block;
        }

        .tl-line1 {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.22em;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 4rem);
          color: var(--text-main);
          line-height: 1.05;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }

        .tl-word-slot {
          display: inline-flex;
          align-items: baseline;
          min-width: 4ch;
        }
        .tl-word { display: inline-block; white-space: nowrap; }

        .tl-line2 {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: clamp(4rem, 9vw, 9.5rem);
          color: var(--text-main);
          letter-spacing: -0.02em;
          line-height: 0.95;
          display: block;
          margin-top: -0.05em;
        }

        .tl-sub {
          margin-top: 16px;
          font-size: clamp(0.82rem, 1vw, 1rem);
          color: rgba(28,61,40,0.5);
          line-height: 1.7;
          max-width: 26rem;
          display: block;
        }
        .tl-sub strong { color: var(--forest); font-weight: 700; }

        /* Button */
        #explore-center {
          position: relative;
          z-index: 10;
          margin-top: 32px;
          flex-shrink: 0;
          pointer-events: all;
        }

        .h-btn-p {
          padding: 12px 26px;
          background: var(--forest);
          color: var(--cream);
          font-size: 0.7rem;
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

        /* ✅ Halloon: use mt-auto to push it to the BOTTOM of the flex column
           This guarantees max distance from the button regardless of vh */
        #halloon-layer {
          position: relative;
          width: 100%;
          /* mt-auto pushes it all the way to the bottom */
          margin-top: auto;
          /* A little extra gap between button and Halloon */
          padding-top: 20px;
          height: calc(100vw * 0.22);
          z-index: 2;
          pointer-events: none;
          flex-shrink: 0;
          /* ✅ extend 3px below so it overlaps and hides gap line */
          margin-bottom: -3px;
        }

        #halloon-layer video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          opacity: 0.9;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          -webkit-mask-size: 100% auto;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: 100% auto;
        }

        .corner-mark {
          position: absolute; width: 18px; height: 18px;
          opacity: 0.12; pointer-events: none; z-index: 5;
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
            margin-bottom: -3px;
          }

          .corner-mark { display: none; }
          .tl-eyebrow  { display: none; }

          #hero-content {
            padding: 90px 20px 0 20px;
            align-items: center;
            text-align: center;
            pointer-events: all;
            width: 100%;
          }

          .tl-line1 {
            font-size: clamp(2rem, 8.5vw, 3rem);
            white-space: normal;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.15em;
            line-height: 1.1;
          }

          .tl-line2 {
            font-size: clamp(3.5rem, 15vw, 6rem);
            margin-top: 0;
            text-align: center;
          }

          .tl-sub {
            font-size: 0.88rem;
            max-width: 100%;
            margin-top: 12px;
            color: rgba(28,61,40,0.55);
            text-align: center;
          }

          .h-btn-p { display: none; }
          #explore-center { display: none; }

          .h-btn-icon {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--forest);
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            margin-top: 18px;
            opacity: 0.75;
            pointer-events: all;
          }
          .h-btn-icon .icon-circle {
            width: 30px;
            height: 30px;
            border: 1.5px solid currentColor;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          #halloon-layer {
            /* On mobile, back to relative flow — no mt-auto needed */
            position: relative !important;
            margin-top: 24px !important;
            padding-top: 0 !important;
            width: 100vw;
            height: calc(100vw * 0.36);
            margin-bottom: -3px;
            z-index: 2;
          }

          #halloon-layer video {
            position: absolute !important;
            inset: 0 !important;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
            display: block;
            opacity: 0.9;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center center;
            -webkit-mask-size: 100% auto;
            mask-repeat: no-repeat;
            mask-position: center center;
            mask-size: 100% auto;
          }

          #halloon-and-cta {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-bottom: 0;
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
          animate={{ opacity: 1, y: 0 }}
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

        {/* Desktop pill button */}
        <motion.div
          id="explore-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <button className="h-btn-p" onClick={() => smoothScrollTo('#services')}>
            Explore Services <ArrowRight size={12} />
          </button>
        </motion.div>

        {/* Halloon — mt-auto on desktop pushes it to bottom of the 100svh container */}
        <div id="halloon-and-cta" style={{ width: '100%', marginTop: 'auto' }}>
          <motion.div
            id="halloon-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
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
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Explore Services
            <span className="icon-circle">
              <ArrowRight size={13} />
            </span>
          </motion.button>
        </div>

      </div>
    </>
  );
}