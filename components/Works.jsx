'use client';

import BlurFadeIn from './BlurFadeIn'; // Adjust path based on your file structure

export default function Works() {
  return (
    <>
      <section id="works" className="loop-images">
        {/* Header Content with Staggered Fade */}
        <div className="works-header-content">
          <BlurFadeIn delay={0.1} yOffset={20}>
            <span className="works-label">OUR WORKS</span>
          </BlurFadeIn>
          
          <BlurFadeIn delay={0.3} yOffset={30}>
            <h2 className="works-title">
              <span className="title-green">Transforming Visions</span> <span className="title-dark">Into Reality</span>
            </h2>
          </BlurFadeIn>

          <BlurFadeIn delay={0.5} yOffset={40}>
            <p className="works-description">
              Discover how we've helped brands stand out, connect with audiences, and achieve measurable success across the Middle East and South Asia.
            </p>
          </BlurFadeIn>
        </div>

        {/* Carousel Track with Fade In */}
        <BlurFadeIn delay={0.7} duration={1} blur={15} threshold={0.1}>
          <div className="carousel-container">
            <div className="carousel-track">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div key={i} className="carousel-item" style={{ '--i': i }}>
                  <img
                    src={getCarouselImage(i)}
                    alt={`Portfolio ${i}`}
                    className="carousel-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </BlurFadeIn>

        <span className="scroll-down">
          Scroll down <span className="arrow">↓</span>
        </span>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&display=swap');

        :root {
          --forest-green: #2d5f4d;
          --cream: #f5f3ed;
        }

        .loop-images {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(to bottom, #FAF7F2 0%, #FAF7F2 35%, var(--cream) 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 120px; 
          padding-bottom: 100px;
        }

        .works-header-content {
          max-width: 1200px;
          margin: 0 auto 80px; 
          text-align: center;
          position: relative;
          z-index: 20;
          padding: 0 40px;
        }

        .works-label {
          display: inline-block;
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #5eb083;
          margin-bottom: 24px;
        }

        .works-title {
          font-size: clamp(42px, 5.5vw, 72px);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          margin-bottom: 24px;
          line-height: 1.15;
          background: linear-gradient(90deg, #47876F 0%, #47876F 45%, #1F3F33 55%, #1F3F33 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .works-description {
          font-size: clamp(16px, 1.6vw, 18px);
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          color: #4A7A6A;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
        }

        /* CAROUSEL STYLES */
        .carousel-container {
          width: 100%;
          margin-top: 100px;
          position: relative;
          z-index: 30;
          height: 350px;
        }

        .carousel-track {
          min-width: 3000px;
          height: 100%;
          position: relative;
        }

        .carousel-item {
          position: absolute;
          width: 300px;
          height: 300px;
          left: 100%;
          perspective: 1000px;
          transform-style: preserve-3d;
          animation: scroll-left 60s linear infinite;
          animation-delay: calc(60s / 12 * (var(--i) - 1) - 60s);
          transition: transform 0.5s ease;
          cursor: pointer;
        }

        .carousel-item:hover {
          z-index: 50;
        }

        .carousel-item:hover .carousel-img {
          transform: rotateY(0deg) translateY(-20px) scale(1.05);
          filter: brightness(1.1);
        }

        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: white;
          transform: rotateY(-45deg);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        @keyframes scroll-left {
          to { left: -3000px; }
        }

        .scroll-down {
          position: absolute;
          bottom: 30px;
          z-index: 10;
          width: 100%;
          text-align: center;
          font-family: 'Outfit', sans-serif;
          color: var(--forest-green);
          pointer-events: none;
        }

        .arrow {
          display: block;
          margin-top: 8px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </>
  );
}
function getCarouselImage(index) {
  const images = [
    // Branding - Logo design workspace
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop',
    
    // Content Creation - Flat lay setup
    'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=800&auto=format&fit=crop',
    
    // Digital Solutions - Laptop workspace
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    
    // Advertising - Creative mockups
    'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800&auto=format&fit=crop',
    
    // Branding - Color palette materials
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    
    // Advertising - Marketing campaign planning
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    
    // Digital Solutions - Mobile app design
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    
    // Advertising - Brand strategy session
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
    
    // Branding - Typography design
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=800&auto=format&fit=crop',
    
    // Content Creation - Social media planning
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
    
    // Digital Solutions - Web development
    'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    
    // Advertising - Marketing materials
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop',
  ];
  return images[index - 1];
}