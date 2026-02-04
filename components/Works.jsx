'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PORTFOLIO DATA
   ───────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: 'TechStart Branding',
    category: 'Branding',
    client: 'TechStart Inc.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1000&fit=crop',
    description: 'Complete brand identity redesign for a leading tech startup',
    color: '#2D5F4D',
    tags: ['Brand Identity', 'Logo Design', 'Guidelines'],
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Web Design',
    client: 'ShopFlow',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Modern e-commerce platform with seamless user experience',
    color: '#47876F',
    tags: ['UI/UX', 'Web Development', 'E-commerce'],
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    category: 'UI/UX',
    client: 'FinTech Pro',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=900&fit=crop',
    description: 'Intuitive mobile banking experience for modern users',
    color: '#5A9B82',
    tags: ['Mobile App', 'UI Design', 'Finance'],
  },
  {
    id: 4,
    title: 'Product Launch Campaign',
    category: 'Marketing',
    client: 'InnovateCo',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=800&h=800&fit=crop',
    description: '360° marketing campaign for flagship product launch',
    color: '#6DB095',
    tags: ['Campaign', 'Social Media', 'Video'],
  },
  {
    id: 5,
    title: 'Restaurant Rebrand',
    category: 'Branding',
    client: 'Urban Bistro',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1000&fit=crop',
    description: 'Fresh brand identity for upscale dining experience',
    color: '#80C4A8',
    tags: ['Branding', 'Packaging', 'Interior'],
  },
  {
    id: 6,
    title: 'SaaS Dashboard',
    category: 'UI/UX',
    client: 'DataFlow',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=600&fit=crop',
    description: 'Analytics dashboard with data visualization',
    color: '#93D8BB',
    tags: ['Dashboard', 'Data Viz', 'SaaS'],
  },
];

const categories = ['All', 'Branding', 'Web Design', 'UI/UX', 'Marketing'];

/* ─────────────────────────────────────────────
   MAIN WORKS COMPONENT WITH PINNED SCROLL
   ───────────────────────────────────────────── */
export default function Works() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Detect mobile with better breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Changed from 768 to 1024 for better tablet support
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Pinned Scroll Animation (Desktop only)
  useEffect(() => {
    if (isMobile || !cardsContainerRef.current || !sectionRef.current) return;

    const cards = gsap.utils.toArray('.work-card');
    const totalCards = cards.length;

    if (totalCards === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === 'works-pin' || st.vars.id?.startsWith('work-card-')) {
        st.kill();
      }
    });

    const ctx = gsap.context(() => {
      // Set z-index for proper stacking
      gsap.set(cards, {
        zIndex: (i) => totalCards - i,
      });

      // Animate each card (except the last one)
      cards.forEach((card, i) => {
        if (i === totalCards - 1) return; // Skip last card

        gsap.to(card, {
          yPercent: -100,
          ease: 'none',
          scrollTrigger: {
            id: `work-card-${i}`,
            trigger: sectionRef.current,
            start: () => `top -${window.innerHeight * i}`,
            end: () => `+=${window.innerHeight}`,
            scrub: 1, // Smooth scrubbing with slight delay for performance
            invalidateOnRefresh: true,
          },
        });
      });

      // Pin the entire section
      ScrollTrigger.create({
        id: 'works-pin',
        trigger: sectionRef.current,
        pin: true,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalCards}`,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects, isMobile]);

  return (
    <>
      {/* Header Section - Separate from pinned section, no overlapping */}
      <div className="relative bg-white py-12 md:py-20 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-4 md:mb-6"
              style={{
                background: '#E7EFEA',
                border: '1px solid #C9DED4',
                color: '#2D5F4D',
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              Our Works
            </motion.span>

            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1F3F33] mb-4 md:mb-6 px-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured <span className="italic text-[#47876F]">Projects</span>
            </h2>

            <p
              className="text-base md:text-lg lg:text-xl text-[#4A7A6A] max-w-2xl mx-auto mb-6 md:mb-8 px-4"
              style={{ fontFamily: "'Raleway', sans-serif", lineHeight: 1.8 }}
            >
              Explore our latest work and see how we bring bold ideas to life
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-xs md:text-sm transition-all duration-300"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    background: selectedCategory === category ? '#2D5F4D' : '#F5F5F5',
                    color: selectedCategory === category ? '#fff' : '#3E6B5C',
                    border: `2px solid ${
                      selectedCategory === category ? '#2D5F4D' : 'transparent'
                    }`,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Works Section - Pinned Cards (Desktop) or Stacked (Mobile) */}
      <section
        ref={sectionRef}
        id="works"
        className="relative bg-white overflow-hidden"
        style={{ minHeight: isMobile ? 'auto' : '100vh' }}
      >
        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className={isMobile ? 'relative' : 'relative w-full h-screen flex items-center justify-center'}
        >
          {isMobile ? (
            // Mobile: Stack cards vertically without pinning
            <div className="space-y-6 md:space-y-8 py-8 px-4">
              {filteredProjects.map((project, index) => (
                <MobileWorkCard
                  key={project.id}
                  project={project}
                  index={index}
                  total={filteredProjects.length}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            // Desktop: Pinned scroll animation
            filteredProjects.map((project, index) => (
              <PinnedWorkCard
                key={project.id}
                project={project}
                index={index}
                total={filteredProjects.length}
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   MOBILE WORK CARD (No Pinning)
   ───────────────────────────────────────────── */
function MobileWorkCard({ project, index, total, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={onClick}
      className="relative w-full cursor-pointer"
    >
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
        style={{
          aspectRatio: '16/10',
          background: project.color,
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.color}00 0%, ${project.color}50 40%, ${project.color}E6 100%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
          {/* Top Badge */}
          <div className="flex items-start justify-between">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(255,255,255,0.25)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              {project.category}
            </span>

            <div
              className="text-white/80 text-right text-xs"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              <div className="font-medium">{project.client}</div>
              <div>{project.year}</div>
            </div>
          </div>

          {/* Bottom Content */}
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-white/90 text-sm md:text-base mb-3"
              style={{
                fontFamily: "'Raleway', sans-serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Project Button */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm"
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: project.color,
                fontFamily: "'Raleway', sans-serif",
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              <span>View Project</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 10h10M11 6l4 4-4 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.3)',
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            {index + 1}/{total}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PINNED WORK CARD (Desktop)
   ───────────────────────────────────────────── */
function PinnedWorkCard({ project, index, total, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="work-card absolute inset-0 flex items-center justify-center px-6 lg:px-8"
      style={{
        willChange: 'transform',
        transform: 'translateY(0)',
      }}
    >
      <motion.div
        className="relative w-full max-w-6xl cursor-pointer"
        style={{ height: '75vh', minHeight: '600px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: project.color,
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                willChange: 'transform',
              }}
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${project.color}00 0%, ${project.color}40 30%, ${project.color}E6 100%)`,
                opacity: isHovered ? 1 : 0.85,
              }}
            />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between">
            {/* Top Badge */}
            <div className="flex items-start justify-between">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                {project.category}
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white/80 text-right"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <div className="text-sm font-medium">{project.client}</div>
                <div className="text-xs">{project.year}</div>
              </motion.div>
            </div>

            {/* Bottom Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <h3
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {project.title}
              </h3>

              <p
                className="text-white/90 text-lg lg:text-xl mb-6 max-w-2xl"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Project CTA */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: project.color,
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Project</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 10h10M11 6l4 4-4 4" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-8 right-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              {index + 1}/{total}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT DETAIL MODAL
   ───────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
          style={{ color: project.color }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${project.color}E6 0%, transparent 50%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </h2>
            <p className="text-base md:text-lg opacity-90" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {project.client} • {project.year}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h3
              className="text-xl md:text-2xl font-bold text-[#1F3F33] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Project Overview
            </h3>
            <p
              className="text-[#4A7A6A] leading-relaxed text-base md:text-lg"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="w-full py-3 md:py-4 rounded-2xl text-white font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-xl"
            style={{
              background: project.color,
              fontFamily: "'Raleway', sans-serif",
            }}
            onClick={onClose}
          >
            Close Project
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}