'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/* ─────────────────────────────────────────────
   CSS-ONLY ANIMATED BACKGROUND (zero JS per frame)
   ───────────────────────────────────────────── */
const bgStyles = `
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
  @keyframes gridDrift {
    0%   { transform: translate(0px, 0px); }
    100% { transform: translate(80px, 80px); }
  }
`;

function AmbientBackground() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bgStyles }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blob 1 — top-left, large warm green */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-8%',
          width: '550px', height: '550px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,95,77,0.18) 0%, rgba(45,95,77,0.06) 50%, transparent 75%)',
          animation: 'blob1 18s ease-in-out infinite',
        }} />

        {/* Blob 2 — right side, medium teal */}
        <div style={{
          position: 'absolute', top: '20%', right: '-12%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(71,135,111,0.16) 0%, rgba(71,135,111,0.05) 50%, transparent 75%)',
          animation: 'blob2 22s ease-in-out infinite',
        }} />

        {/* Blob 3 — center, soft sage */}
        <div style={{
          position: 'absolute', top: '40%', left: '35%',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90,155,130,0.13) 0%, rgba(90,155,130,0.04) 50%, transparent 75%)',
          animation: 'blob3 26s ease-in-out infinite',
        }} />

        {/* Blob 4 — bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-8%', left: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,176,149,0.15) 0%, rgba(109,176,149,0.05) 50%, transparent 75%)',
          animation: 'blob4 20s ease-in-out infinite',
        }} />

        {/* Blob 5 — bottom-right */}
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(128,196,168,0.14) 0%, rgba(128,196,168,0.04) 50%, transparent 75%)',
          animation: 'blob5 24s ease-in-out infinite',
        }} />

        {/* Grid — drifts slowly so it feels alive */}
        <svg className="absolute inset-0 w-full h-full" style={{ minHeight: '100%', opacity: 0.18 }}>
          <defs>
            <pattern id="gridPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2D5F4D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="calc(100% + 80px)" height="calc(100% + 80px)" x="-80" y="-80"
            fill="url(#gridPattern)"
            style={{ animation: 'gridDrift 40s linear infinite' }}
          />
        </svg>

      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  {
    title: 'Brand Development',
    tagline: 'Build a brand that commands attention and earns loyalty.',
    description:
      'We craft identities that transcend aesthetics. From your core positioning and competitive strategy to every visual touchpoint — we engineer brands that resonate deeply with your audience and stand apart in crowded markets. Our identity systems are built for longevity, scalability, and impact across every medium.',
    features: ['Logo & Monogram Design', 'Brand Strategy & Positioning', 'Style Guides & Brand Books', 'Tone of Voice & Messaging'],
    image: '/services/1.png',
    color: '#2D5F4D',
    position: 'left',
  },
  {
    title: 'Digital Solutions',
    tagline: 'Turn digital channels into measurable growth engines.',
    description:
      'From search intent to social engagement, we build data-driven digital ecosystems that attract, nurture, and convert your ideal customers. Our integrated approach combines SEO, paid media, content strategy, and brand activation into a unified system — optimised continuously for performance and ROI.',
    features: ['Social Media Strategy', 'SEO & Content Marketing', 'Paid Ads & Retargeting', 'Lead Generation Funnels', 'Brand Activation Campaigns'],
    image: '/services/2.png',
    color: '#47876F',
    position: 'right',
  },
  {
    title: 'Video Production',
    tagline: 'Stories told with vision. Content that moves people to act.',
    description:
      'End-to-end video production — from concept and scripting through to on-location shooting, post-production, and final delivery. We produce commercials, corporate films, explainer videos, and social-native content that captivates audiences and reinforces your brand narrative across every screen.',
    features: ['Commercial Advertisements', 'Corporate & Brand Films', 'Social-Native Content', 'Motion Graphics & Animation', 'Full Post-Production'],
    image: '/services/3.png',
    color: '#5A9B82',
    position: 'left',
  },
  {
    title: 'OOH Advertising',
    tagline: 'Own the streets. Dominate the skyline.',
    description:
      'Outdoor advertising that stops people in their tracks. We design and deploy high-impact campaigns across billboards, transit networks, digital screens, and urban spaces — engineered to maximise reach, recall, and brand presence wherever your audience moves through the physical world.',
    features: ['Billboard & Hoarding Design', 'Transit & Bus Wrap Campaigns', 'Digital Screen Networks', 'Taxi & Vehicle Branding', 'Urban Space Activations'],
    image: 'services/4.png',
    color: '#6DB095',
    position: 'right',
  },
  {
    title: 'Events & Activities',
    tagline: 'Create moments. Build connections. Leave an impression.',
    description:
      'From intimate product launches to large-scale corporate gatherings and brand experiences — we conceptualise, plan, and execute events that captivate attendees and amplify your message. Every detail is choreographed to create memorable touchpoints and drive tangible business outcomes.',
    features: ['Corporate Events & Conferences', 'Product Launch Experiences', 'Trade Shows & Exhibitions', 'Brand Activation & Pop-ups', 'Entertainment & Cultural Shows'],
    image: 'services/5.png',
    color: '#80C4A8',
    position: 'left',
  },
  {
    title: 'Website Solutions',
    tagline: 'Digital presence that converts visitors into advocates.',
    description:
      'We design and develop websites that are as performant as they are beautiful. Custom-built platforms, high-conversion e-commerce stores, and content-managed sites — engineered with user experience at the core. From initial wireframe to ongoing maintenance, we build digital assets that drive real business results.',
    features: ['UI/UX Design & Prototyping', 'Custom Web Development', 'E-commerce Platforms', 'CMS Integration & Management', 'Performance & Maintenance'],
    image: 'services/6.png',
    color: '#93D8BB',
    position: 'right',
  },
];

/* ─────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────── */
export default function ServicesWaypoint() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative overflow-hidden"
      style={{
        background: '#FAF7F2',
        paddingTop: '140px',
        paddingBottom: '180px',
      }}
    >
      {/* Animated ambient background */}
      <AmbientBackground />

      {/* Curved top edge */}
      <div className="absolute top-0 left-0 w-full h-56 overflow-hidden z-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,80 C240,120 480,120 720,90 960,60 1200,40 1440,60 L1440,0 L0,0 Z" fill="#EFEBE5" />
        </svg>
      </div>

      

      {/* Header */}
      <div className="relative z-10 mb-[120px]">
        <div className="max-w-5xl mx-auto text-center px-6">       

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              color: '#1F3F33',
              lineHeight: 1.1,
            }}
          >
            Our{' '}
            <span style={{ color: '#47876F', fontStyle: 'normal' }}>Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#4A7A6A',
              lineHeight: 1.8,
            }}
          >
            End-to-end creative and strategic solutions — built to elevate your brand, 
            engage your audience, and deliver measurable impact at every touchpoint.
          </motion.p>

          <div className="mt-10 h-px w-40 mx-auto" style={{ background: 'linear-gradient(to right, transparent, #47876F, transparent)', opacity: 0.4 }} />
        </div>
      </div>

      {/* Service Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {services.map((service, index) => (
          <div key={index}>
            <ServiceCard service={service} index={index} />
            {/* Divider between cards */}
            {index < services.length - 1 && (
              <div className="flex items-center justify-center" style={{ height: '240px' }}>
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '180px', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-px"
                  style={{ background: 'linear-gradient(to right, transparent, #fbfffd, transparent)' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICE CARD WITH 3D ROTATION
   ───────────────────────────────────────────── */
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

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Scroll progress for the image card specifically
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: imageCardRef,
    offset: ['start end', 'end start'],
  });

  // 3D Card Flip Animation (inspired by playing card rotation)
  // Full 360° rotation on Y-axis as card scrolls through viewport
  const rotateY = useSpring(
    useTransform(cardScrollProgress, [0, 0.25, 0.5, 0.75, 1], [180, 90, 0, -90, -180]),
    { stiffness: 60, damping: 25 }
  );
  
  // Subtle tilt on X-axis for depth
  const rotateX = useSpring(
    useTransform(cardScrollProgress, [0, 0.25, 0.5, 0.75, 1], [15, -8, 0, 8, -15]),
    { stiffness: 60, damping: 25 }
  );
  
  // Light rotation on Z-axis for natural movement
  const rotateZ = useSpring(
    useTransform(cardScrollProgress, [0, 0.3, 0.5, 0.7, 1], [8, -3, 0, 3, -8]),
    { stiffness: 60, damping: 25 }
  );

  // Scale up in center, down at edges
  const scale = useSpring(
    useTransform(cardScrollProgress, [0, 0.2, 0.5, 0.8, 1], [0.65, 0.92, 1.15, 0.92, 0.65]),
    { stiffness: 60, damping: 25 }
  );
  
  // Fade in/out at viewport edges
  const opacity = useTransform(cardScrollProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);

  const isLeft = service.position === 'left';

  const cardMotionStyle = isMobile
    ? { transformStyle: 'preserve-3d' }
    : {
        rotateY,
        rotateX,
        rotateZ,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${
        isLeft ? '' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── IMAGE CARD WITH 3D ROTATION ── */}
      <div
        ref={imageCardRef}
        className="w-full max-w-sm mx-auto md:flex-1"
        style={{ perspective: 2000 }}
      >
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={cardMotionStyle}
          className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        >
          <div className="relative" style={{ paddingBottom: '133.33%' }}>
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.7s ease',
              }}
            />
            {/* Colour overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(145deg, ${service.color}BB, #00000070)`,
                opacity: hovered ? 0.75 : 0.6,
                transition: 'opacity 0.5s ease',
              }}
            />
            {/* Shine on hover */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
            {/* Card content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
              {/* Bottom text */}
              <div className="mt-auto">
                
                <h4
                  className="font-bold"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)',
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  {service.title}
                </h4>
                {/* Hover reveal: tagline */}
                <p
                  className="mt-2 text-sm overflow-hidden"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: 'rgba(255,255,255,0.75)',
                    maxHeight: hovered ? '60px' : '0',
                    opacity: hovered ? 1 : 0,
                    transition: 'max-height 0.45s ease, opacity 0.4s ease',
                  }}
                >
                  {service.tagline}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── TEXT CONTENT ── */}
      <div
        className="w-full md:flex-1 text-center md:text-left"
        style={{ maxWidth: '520px', margin: '0 auto' }}
      >
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            color: '#1F3F33',
            lineHeight: 1.2,
          }}
        >
          {service.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: service.color,
            lineHeight: 1.5,
          }}
        >
          {service.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            color: '#4A7A6A',
            lineHeight: 1.9,
          }}
        >
          {service.description}
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2.5 justify-center md:justify-start"
        >
          {service.features.map((f, i) => (
            <FeaturePill key={i} label={f} color={service.color} delay={i * 0.06} />
          ))}
        </motion.div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 flex justify-center md:justify-start"
        >
          <CTALink color={service.color} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE PILL (with hover)
   ───────────────────────────────────────────── */
function FeaturePill({ label, color, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="inline-block px-4 py-2 rounded-full cursor-default"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        background: hovered ? color : '#E7EFEA',
        color: hovered ? '#fff' : '#2D5F4D',
        boxShadow: hovered ? `0 4px 18px ${color}40` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {label}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   CTA LINK (animated arrow)
   ───────────────────────────────────────────── */
function CTALink({ color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 cursor-pointer"
      style={{ color }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          borderBottom: hovered ? `2px solid ${color}` : '2px solid transparent',
          paddingBottom: '2px',
          transition: 'border-color 0.3s ease',
        }}
      >
        Learn More
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <path d="M3 9h12M11 5l4 4-4 4" />
      </svg>
    </div>
  );
}