'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   TESTIMONIALS DATA
   ───────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, TechStart',
    company: 'TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    quote: 'The team transformed our brand identity completely. Their attention to detail and creative approach exceeded all expectations. Our conversion rate increased by 340% within the first month.',
    rating: 5,
    color: '#2D5F4D',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Founder',
    company: 'DesignHub',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'Working with this team was an absolute game-changer. They delivered beyond our wildest expectations and brought our vision to life with stunning precision.',
    rating: 5,
    color: '#47876F',
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Marketing Director',
    company: 'GrowthLab',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    quote: 'Incredible work! The designs are not just beautiful—they actually convert. Our engagement metrics have never been better. Highly recommend to anyone serious about growth.',
    rating: 5,
    color: '#5A9B82',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Product Lead',
    company: 'InnovateCo',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    quote: 'From concept to execution, every step was flawless. They understood our users better than we did and created an experience that truly resonates.',
    rating: 5,
    color: '#6DB095',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'VP of Design',
    company: 'CreativeLabs',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    quote: 'The level of creativity and professionalism is unmatched. They took our rough ideas and turned them into a cohesive, stunning brand experience.',
    rating: 5,
    color: '#80C4A8',
  },
];

/* ─────────────────────────────────────────────
   MAIN TESTIMONIALS COMPONENT
   ───────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30,
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #FAF7F2 0%, #EFEBE5 100%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #2D5F4D 0%, transparent 70%)' }}
        />
        <motion.div
          style={{ y: useTransform(y, (val) => -val * 0.5) }}
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #47876F 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-6"
            style={{
              background: '#E7EFEA',
              border: '1px solid #C9DED4',
              color: '#2D5F4D',
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            Testimonials
          </motion.span>

          <h2
            className="text-5xl md:text-7xl font-bold text-[#1F3F33] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our <span className="italic text-[#47876F]">Clients Say</span>
          </h2>

          <p
            className="text-xl text-[#4A7A6A] max-w-2xl mx-auto"
            style={{ fontFamily: "'Raleway', sans-serif", lineHeight: 1.8 }}
          >
            Don't just take our word for it — hear from the brands we've helped transform
          </p>
        </motion.div>

        {/* Testimonial Cards - Stacking Layout */}
        <div ref={cardsRef} className="relative h-[600px] md:h-[500px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              activeIndex={activeIndex}
              totalCards={testimonials.length}
              onSetActive={setActiveIndex}
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <motion.div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: index === activeIndex ? '#2D5F4D' : '#C9DED4',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-5xl mx-auto"
        >
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '1000+', label: 'Projects Delivered' },
            { number: '50+', label: 'Industry Awards' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-bold text-[#2D5F4D] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm text-[#4A7A6A] font-medium tracking-wide"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD WITH STACKING EFFECT
   ───────────────────────────────────────────── */
function TestimonialCard({ testimonial, index, activeIndex, totalCards, onSetActive }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = index === activeIndex;
  const isPrev = index === (activeIndex - 1 + totalCards) % totalCards;
  const isNext = index === (activeIndex + 1) % totalCards;

  let zIndex = 0;
  let scale = 0.85;
  let y = 0;
  let opacity = 0;
  let rotateY = 0;

  if (isActive) {
    zIndex = 30;
    scale = 1;
    y = 0;
    opacity = 1;
    rotateY = 0;
  } else if (isPrev) {
    zIndex = 20;
    scale = 0.9;
    y = 20;
    opacity = 0.6;
    rotateY = -8;
  } else if (isNext) {
    zIndex = 20;
    scale = 0.9;
    y = 20;
    opacity = 0.6;
    rotateY = 8;
  } else {
    zIndex = 10;
    scale = 0.8;
    y = 40;
    opacity = 0.3;
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex, perspective: 2000 }}
      animate={{
        scale: isHovered && isActive ? 1.02 : scale,
        y,
        opacity,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isActive && onSetActive(index)}
    >
      <div
        className="w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
        style={{
          border: `2px solid ${isActive ? testimonial.color : '#E7EFEA'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <motion.div
              className="flex-shrink-0"
              animate={{
                scale: isHovered && isActive ? 1.1 : 1,
                rotate: isHovered && isActive ? 5 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `0 8px 32px ${testimonial.color}40`,
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}20 0%, transparent 100%)`,
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              {/* Quote Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isActive ? 0.1 : 0, scale: isActive ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill={testimonial.color}
                  className="opacity-20"
                >
                  <path d="M12 34c-4.4 0-8-3.6-8-8 0-7.5 4.5-14 11-17l2 3c-4.5 2-7 6-7 10v1c.8-.5 2-.9 3-.9 3.3 0 6 2.7 6 6s-2.7 6-6 6zm19 0c-4.4 0-8-3.6-8-8 0-7.5 4.5-14 11-17l2 3c-4.5 2-7 6-7 10v1c.8-.5 2-.9 3-.9 3.3 0 6 2.7 6 6s-2.7 6-6 6z" />
                </svg>
              </motion.div>

              {/* Quote */}
              <motion.p
                className="text-lg md:text-xl text-[#3E6B5C] mb-6 leading-relaxed"
                style={{ fontFamily: "'Raleway', sans-serif" }}
                animate={{ opacity: isActive ? 1 : 0.6 }}
              >
                "{testimonial.quote}"
              </motion.p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={testimonial.color}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.6, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </motion.svg>
                ))}
              </div>

              {/* Author Info */}
              <div>
                <h4
                  className="text-xl font-bold text-[#1F3F33] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {testimonial.name}
                </h4>
                <p
                  className="text-sm text-[#4A7A6A]"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {testimonial.role} at <span className="font-semibold">{testimonial.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="h-2"
          style={{ background: testimonial.color }}
          animate={{ opacity: isActive ? 1 : 0.3 }}
        />
      </div>
    </motion.div>
  );
}