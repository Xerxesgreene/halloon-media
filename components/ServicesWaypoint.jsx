'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import BlurFadeIn, { BlurFadeText, BlurFadeStagger } from './BlurFadeIn';

const bgStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,800&family=DM+Serif+Display:ital@0;1&display=swap');

  @keyframes blob1 {
    0%,100% { transform: translate(0px, 0px) scale(1); }
    33%     { transform: translate(60px, -40px) scale(1.15); }
    66%     { transform: translate(-30px, 50px) scale(0.92); }
  }
  @keyframes blob2 {
    0%,100% { transform: translate(0px, 0px) scale(1); }
    40%     { transform: translate(-80px, 30px) scale(1.1); }
    70%     { transform: translate(40px, -60px) scale(0.9); }
  }
  @keyframes blob3 {
    0%,100% { transform: translate(0px, 0px) scale(1); }
    30%     { transform: translate(50px, 60px) scale(0.88); }
    60%     { transform: translate(-60px, -20px) scale(1.12); }
  }
  @keyframes blob4 {
    0%,100% { transform: translate(0px, 0px) scale(1); }
    45%     { transform: translate(-40px, -50px) scale(1.08); }
    75%     { transform: translate(70px, 30px) scale(0.94); }
  }
  @keyframes blob5 {
    0%,100% { transform: translate(0px, 0px) scale(1); }
    35%     { transform: translate(30px, -70px) scale(1.05); }
    65%     { transform: translate(-50px, 40px) scale(0.91); }
  }
  @keyframes diagDrift {
    0%   { transform: translate(0px, 0px); }
    100% { transform: translate(80px, 80px); }
  }
`;

function AmbientBackground() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bgStyles }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position:'absolute', top:'-10%', left:'-8%', width:'550px', height:'550px', borderRadius:'50%', background:'radial-gradient(circle, rgba(45,95,77,0.18) 0%, rgba(45,95,77,0.06) 50%, transparent 75%)', animation:'blob1 18s ease-in-out infinite' }} />
        <div style={{ position:'absolute', top:'20%', right:'-12%', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle, rgba(71,135,111,0.16) 0%, rgba(71,135,111,0.05) 50%, transparent 75%)', animation:'blob2 22s ease-in-out infinite' }} />
        <div style={{ position:'absolute', top:'40%', left:'35%', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle, rgba(90,155,130,0.13) 0%, rgba(90,155,130,0.04) 50%, transparent 75%)', animation:'blob3 26s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-8%', left:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(109,176,149,0.15) 0%, rgba(109,176,149,0.05) 50%, transparent 75%)', animation:'blob4 20s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'5%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle, rgba(128,196,168,0.14) 0%, rgba(128,196,168,0.04) 50%, transparent 75%)', animation:'blob5 24s ease-in-out infinite' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ minHeight:'100%', opacity:0.18 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="slantPattern" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2D5F4D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="calc(100% + 160px)" height="calc(100% + 160px)" x="-80" y="-80" fill="url(#slantPattern)" style={{ animation:'diagDrift 40s linear infinite' }} />
        </svg>
      </div>
    </>
  );
}

const services = [
  {
    title: 'Brand Development',
    tagline: 'Build a brand that commands attention and earns loyalty.',
    description: 'We craft identities that transcend aesthetics. From core positioning to every visual touchpoint, we engineer brands that resonate deeply and stand apart in crowded markets.',
    features: ['Logo & Monogram Design', 'Brand Strategy & Positioning', 'Style Guides & Brand Books', 'Tone of Voice & Messaging'],
    image: '/services/1.png', color: '#2D5F4D', position: 'left',
  },
  {
    title: 'Digital Solutions',
    tagline: 'Turn digital channels into measurable growth engines.',
    description: 'We build data-driven digital ecosystems that attract, nurture, and convert your ideal customers. Our integrated approach combines SEO, paid media, and content strategy into a unified system.',
    features: ['Social Media Strategy', 'SEO & Content Marketing', 'Paid Ads & Retargeting', 'Lead Generation Funnels', 'Brand Activation Campaigns'],
    image: '/services/2.png', color: '#47876F', position: 'right',
  },
  {
    title: 'Video Production',
    tagline: 'Stories told with vision. Content that moves people to act.',
    description: 'End-to-end video production from concept to final delivery. We produce commercials, corporate films, and social content that captivates audiences and reinforces your brand narrative.',
    features: ['Commercial Advertisements', 'Corporate & Brand Films', 'Social-Native Content', 'Motion Graphics & Animation', 'Full Post-Production'],
    image: '/services/3.png', color: '#5A9B82', position: 'left',
  },
  {
    title: 'OOH Advertising',
    tagline: 'Own the streets. Dominate the skyline.',
    description: 'Outdoor advertising that stops people in their tracks. We design and deploy high-impact campaigns across billboards, transit networks, and digital screens.',
    features: ['Billboard & Hoarding Design', 'Transit & Bus Wrap Campaigns', 'Digital Screen Networks', 'Taxi & Vehicle Branding', 'Urban Space Activations'],
    image: '/services/4.png', color: '#6DB095', position: 'right',
  },
  {
    title: 'Events & Activities',
    tagline: 'Create moments. Build connections. Leave an impression.',
    description: 'From intimate product launches to large-scale corporate gatherings, we conceptualize and execute events that captivate attendees and amplify your message.',
    features: ['Corporate Events & Conferences', 'Product Launch Experiences', 'Trade Shows & Exhibitions', 'Brand Activation & Pop-ups', 'Entertainment & Cultural Shows'],
    image: '/services/5.png', color: '#80C4A8', position: 'left',
  },
  {
    title: 'Website Solutions',
    tagline: 'Digital presence that converts visitors into advocates.',
    description: 'We design and develop websites that are as performant as they are beautiful. Custom platforms, e-commerce stores, and content-managed sites engineered with user experience at the core.',
    features: ['UI/UX Design & Prototyping', 'Custom Web Development', 'E-commerce Platforms', 'CMS Integration & Management', 'Performance & Maintenance'],
    image: '/services/6.png', color: '#93D8BB', position: 'right',
  },
];

export default function ServicesWaypoint() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 70%', 'end center'] });

  return (
    <section ref={containerRef} id="services" className="relative overflow-hidden" style={{ background: '#F0EBE3', paddingTop: '100px', paddingBottom: '120px' }}>
      <AmbientBackground />

      <div className="relative z-10 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <BlurFadeIn delay={0} duration={0.8} yOffset={40} blur={12}>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              display: 'inline-block',
              fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#5eb083', marginBottom: '20px',
            }}>
              OUR SERVICES
            </span>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#1F3F33',
              margin: '0 0 0',
            }}>
              Complete Solutions<br />
              For Every{' '}
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#47876F',
                letterSpacing: '-0.05em',
              }}>
                Need
              </span>
            </h2>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 400,
              fontSize: '0.9rem',
              color: '#6A6456',
              maxWidth: '420px',
              margin: '20px auto 0',
              lineHeight: 1.75,
              textAlign: 'center',
            }}>
              From brand strategy to digital execution, we offer end-to-end services designed to elevate your brand and drive meaningful growth.
            </p>
          </BlurFadeIn>
        </div>
      </div>

      {/* Service Cards — no dividers */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const imageCardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress: cardScrollProgress } = useScroll({ target: imageCardRef, offset: ['start end', 'end start'] });

  const rotateY = useSpring(useTransform(cardScrollProgress, [0, 0.25, 0.5, 0.75, 1], [180, 90, 0, -90, -180]), { stiffness: 60, damping: 25 });
  const rotateX = useSpring(useTransform(cardScrollProgress, [0, 0.25, 0.5, 0.75, 1], [15, -8, 0, 8, -15]), { stiffness: 60, damping: 25 });
  const rotateZ = useSpring(useTransform(cardScrollProgress, [0, 0.3, 0.5, 0.7, 1], [8, -3, 0, 3, -8]), { stiffness: 60, damping: 25 });
  const scale = useSpring(useTransform(cardScrollProgress, [0, 0.2, 0.5, 0.8, 1], [0.65, 0.92, 1.15, 0.92, 0.65]), { stiffness: 60, damping: 25 });
  const opacity = useTransform(cardScrollProgress, [0, 0.15, 0.85, 1], isMobile ? [1,1,1,1] : [0.2, 1, 1, 0.2]);

  const isLeft = service.position === 'left';
  const cardMotionStyle = isMobile
    ? { transformStyle: 'preserve-3d', opacity: 1 }
    : { rotateY, rotateX, rotateZ, scale, opacity, transformStyle: 'preserve-3d' };

  return (
    <BlurFadeIn delay={index * 0.15} duration={0.9} yOffset={60} blur={12}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`flex flex-col md:flex-row items-center gap-12 md:gap-28 ${isLeft ? '' : 'md:flex-row-reverse'}`}
        style={{ marginBottom: '100px' }}
      >
        <div ref={imageCardRef} className="w-full max-w-sm mx-auto md:flex-1" style={{ perspective: 2000 }}>
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={cardMotionStyle}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
          >
            <div className="relative" style={{ paddingBottom: '133.33%' }}>
              <img
                src={service.image} alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.7s ease' }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(145deg, ${service.color}BB, #00000070)`, opacity: hovered ? 0.75 : 0.6, transition: 'opacity 0.5s ease' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.5s ease' }} />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                <div className="mt-auto">
                  <h4 className="font-bold text-2xl text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.4s ease' }}>
                    {service.title}
                  </h4>
                  <div className="overflow-hidden" style={{ maxHeight: hovered ? '80px' : '0', transition: 'max-height 0.45s ease' }}>
                    <p className="mt-2 text-base" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: 'rgba(255,255,255,0.9)', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                      {service.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:flex-1 px-4 md:px-0" style={{ maxWidth: '640px' }}>
          <BlurFadeIn delay={0.1} duration={0.8} yOffset={30}>
            <h3 className="leading-[1.1] tracking-tight mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', letterSpacing: '-0.04em', color: '#1F3F33', textAlign: 'left' }}>
              {service.title}
            </h3>
          </BlurFadeIn>
          <BlurFadeIn delay={0.2} duration={0.7} yOffset={25}>
            <p className="leading-relaxed mb-7" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 400, fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', color: '#6A6456', textAlign: 'left', maxWidth: '100%' }}>
              {service.description}
            </p>
          </BlurFadeIn>
          <BlurFadeStagger staggerDelay={0.08} duration={0.5} yOffset={20} blur={8}>
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-left mb-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: service.color }} />
                <span className="text-[#1F3F33] text-sm md:text-base leading-relaxed" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {feature}
                </span>
              </div>
            ))}
          </BlurFadeStagger>
        </div>
      </motion.div>
    </BlurFadeIn>
  );
}