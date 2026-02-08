'use client';

import { useRef, useState, useEffect } from 'react';
import BlurFadeIn from './BlurFadeIn';

/* ─────────────────────────────────────────────
   ABOUT SECTION COMPONENT
   ───────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <>
      {/* About Content with Stats */}
      <section id="about-section" className="about-section">
        <div className="ambient-glow"></div>
        <div className="grain-overlay"></div>
        
        <div className="container">
          {/* Two Column Layout */}
          <div className="about-grid">
            {/* Left Column - Content */}
            <div className="content-column">
              <BlurFadeIn delay={0.2} duration={0.8}>
                <div className="section-label">ABOUT US</div>
              </BlurFadeIn>
              
              <BlurFadeIn delay={0.3} duration={0.8}>
                <h1 className="about-title">
                  Pioneering Media Excellence
                </h1>
              </BlurFadeIn>
              
              <div className="text-content">
                <BlurFadeIn delay={0.4} duration={0.8}>
                  <p className="about-text">
                    Halloon Media is a leading 360° media consultancy firm with a strong presence across the Middle East and South Asia. We specialize in transforming brands through innovative media strategies and creative excellence.
                  </p>
                </BlurFadeIn>

                <BlurFadeIn delay={0.5} duration={0.8}>
                  <p className="about-text">
                    Bringing the best solutions in Dubai, Riyadh, Doha, Kuwait City, and Mumbai, we bring local expertise with global standards to every project we undertake.
                  </p>
                </BlurFadeIn>
              </div>

              <BlurFadeIn delay={0.6} duration={0.8}>
                <button className="cta-button">
                  Learn More About Us
                  <span className="arrow-icon">→</span>
                </button>
              </BlurFadeIn>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="stats-column">
              <div className="stats-grid-2col">
                <BlurFadeIn delay={0.3} duration={0.8}>
                  <StatCard 
                    icon="award" 
                    value={8} 
                    suffix="+" 
                    label="Years" 
                    sublabel="Of Expertise" 
                  />
                </BlurFadeIn>

                <BlurFadeIn delay={0.4} duration={0.8}>
                  <StatCard 
                    icon="users" 
                    value={40} 
                    suffix="+" 
                    label="Experts" 
                    sublabel="Skilled Team" 
                  />
                </BlurFadeIn>

                <BlurFadeIn delay={0.5} duration={0.8}>
                  <StatCard 
                    icon="globe" 
                    value={5} 
                    label="Offices" 
                    sublabel="Regional Presence" 
                  />
                </BlurFadeIn>

                <BlurFadeIn delay={0.6} duration={0.8}>
                  <StatCard 
                    icon="trending" 
                    value={50} 
                    suffix="+" 
                    label="Brands" 
                    sublabel="Successfully Served" 
                  />
                </BlurFadeIn>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&display=swap');

        /* ═══════════════════════════════════════════
           ABOUT SECTION
           ═══════════════════════════════════════════ */
        .about-section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 100px 40px;
          min-height: 100vh;
          background: linear-gradient(to bottom, #FAF7F2 0%, #FAF7F2 35%, #f5f3ed 100%);
          overflow: hidden;
        }

        /* Ambient background effects */
        .ambient-glow {
          position: absolute;
          top: -50%;
          left: -25%;
          width: 150%;
          height: 200%;
          background: radial-gradient(
            circle at 30% 40%,
            rgba(77, 149, 113, 0.08) 0%,
            transparent 50%
          ),
          radial-gradient(
            circle at 70% 60%,
            rgba(94, 176, 131, 0.05) 0%,
            transparent 50%
          );
          animation: drift 25s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(5%, -5%) rotate(1deg); }
          66% { transform: translate(-5%, 5%) rotate(-1deg); }
        }

        .grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015;
          pointer-events: none;
        }

        .container {
          width: 100%;
          max-width: 1400px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* Two Column Grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* Left Column - Content */
        .content-column {
          padding-right: 20px;
        }

        .section-label {
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          color: #5eb083;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .about-title {
          font-size: clamp(42px, 5.5vw, 72px);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          margin-bottom: 32px;
          line-height: 1.15;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #47876F 0%, #47876F 45%, #1F3F33 55%, #1F3F33 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Content text */
        .text-content {
          margin-bottom: 40px;
        }

        .about-text {
          font-size: clamp(15px, 1.5vw, 17px);
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          color: #4A7A6A;
          line-height: 1.8;
          margin-bottom: 20px;
          text-align: left;
        }

        /* CTA Button */
        .cta-button {
          background: linear-gradient(135deg, #4d9571 0%, #5eb083 100%);
          color: #ffffff;
          border: none;
          border-radius: 50px;
          padding: 16px 36px;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(77, 149, 113, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(77, 149, 113, 0.4);
        }

        .arrow-icon {
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Right Column - Stats */
        .stats-column {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 600px;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .content-column {
            padding-right: 0;
          }

          .stats-grid-2col {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 24px;
          }

          .about-grid {
            gap: 50px;
          }

          .section-label {
            font-size: 11px;
            letter-spacing: 2px;
            margin-bottom: 20px;
          }

          .text-content {
            margin-bottom: 32px;
          }

          .about-text {
            margin-bottom: 18px;
          }

          .cta-button {
            padding: 14px 32px;
            font-size: 14px;
          }

          .stats-grid-2col {
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .about-section {
            padding: 50px 20px;
          }

          .stats-grid-2col {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD COMPONENT
   ───────────────────────────────────────────── */
function StatCard({ icon, value, suffix = '', label, sublabel }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * value);
            
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const getIcon = () => {
    const iconProps = {
      width: 32,
      height: 32,
      stroke: '#f5f3ed',
      strokeWidth: 1.5,
      fill: 'none'
    };

    switch(icon) {
      case 'award':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        );
      case 'trending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="stat-card-container"
      >
        <div className="stat-icon-wrapper">
          {getIcon()}
        </div>
        <div 
          className="stat-number-text"
          style={{ 
            color: '#f5f3ed',
            fontSize: 'clamp(48px, 8vw, 64px)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            marginBottom: '12px',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: 1
          }}
        >
          {count}{suffix}
        </div>
        <div 
          className="stat-label-text"
          style={{ 
            color: '#f5f3ed',
            fontSize: 'clamp(16px, 1.6vw, 18px)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.3px',
            marginBottom: '4px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div 
            className="stat-sublabel-text"
            style={{ 
              color: 'rgba(245, 243, 237, 0.8)',
              fontSize: 'clamp(13px, 1.3vw, 15px)',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              letterSpacing: '0.2px',
              position: 'relative',
              zIndex: 1
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      <style jsx>{`
        .stat-card-container {
          background: linear-gradient(135deg, #1a3a2e 0%, #1f4539 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 48px 32px;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          min-height: 280px;
          height: 100%;
        }

        .stat-card-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(94, 176, 131, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .stat-card-container:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }

        .stat-card-container:hover::before {
          opacity: 1;
        }

        .stat-icon-wrapper {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
          .stat-card-container {
            padding: 40px 28px;
          }

          .stat-icon-wrapper {
            width: 56px;
            height: 56px;
            margin-bottom: 24px;
          }
        }

        @media (max-width: 480px) {
          .stat-card-container {
            padding: 36px 24px;
          }
        }
      `}</style>
    </>
  );
}