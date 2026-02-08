'use client';

import { useRef, useState, useEffect } from 'react';
import BlurFadeIn from './BlurFadeIn';

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
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <BlurFadeIn delay={0.2} duration={0.8}>
            <span
              className="inline-block text-sm font-medium tracking-[0.2em] uppercase mb-8"
              style={{
                color: '#5eb083',
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '3px',
              }}
            >
              TESTIMONIALS
            </span>
          </BlurFadeIn>

          <BlurFadeIn delay={0.3} duration={0.8}>
            <h2
              className="text-5xl md:text-7xl font-semibold mb-8"
              style={{ 
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.15,
                background: 'linear-gradient(90deg, #47876F 0%, #47876F 45%, #1F3F33 55%, #1F3F33 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What Our Clients Say
            </h2>
          </BlurFadeIn>

          <BlurFadeIn delay={0.4} duration={0.8}>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{ 
                fontFamily: "'Outfit', sans-serif", 
                lineHeight: 1.8,
                color: '#4A7A6A',
                fontWeight: 300,
              }}
            >
              Don't just take our word for it — hear from the brands we've helped transform across the Middle East and South Asia
            </p>
          </BlurFadeIn>
        </div>

        {/* Testimonial Cards - Stacking Layout */}
        <div className="relative h-[600px] md:h-[500px] mb-12">
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
        <BlurFadeIn delay={0.5} duration={0.8}>
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group relative transition-transform hover:scale-125"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background: index === activeIndex ? '#2D5F4D' : '#C9DED4',
                  }}
                />
              </button>
            ))}
          </div>
        </BlurFadeIn>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto">
          <BlurFadeIn delay={0.6} duration={0.8}>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#2D5F4D] mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                50+
              </div>
              <div
                className="text-sm text-[#4A7A6A] font-medium tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Happy Clients
              </div>
            </div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.7} duration={0.8}>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#2D5F4D] mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                95%
              </div>
              <div
                className="text-sm text-[#4A7A6A] font-medium tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Satisfaction Rate
              </div>
            </div>
          </BlurFadeIn>

          <BlurFadeIn delay={0.8} duration={0.8}>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#2D5F4D] mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                60+
              </div>
              <div
                className="text-sm text-[#4A7A6A] font-medium tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Projects Delivered
              </div>
            </div>
          </BlurFadeIn>
        </div>
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
    <div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center transition-all duration-500"
      style={{ 
        zIndex, 
        perspective: 2000,
        transform: `scale(${isHovered && isActive ? 1.02 : scale}) translateY(${y}px) rotateY(${rotateY}deg)`,
        opacity,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isActive && onSetActive(index)}
    >
      <div
        className="w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          border: `2px solid ${isActive ? testimonial.color : '#E7EFEA'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className="flex-shrink-0 transition-transform duration-300"
              style={{
                transform: isHovered && isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}
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
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Quote Icon */}
              <div 
                className="mb-4 transition-opacity duration-300"
                style={{ opacity: isActive ? 0.1 : 0 }}
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
              </div>

              {/* Quote */}
              <p
                className="text-lg md:text-xl mb-6 leading-relaxed transition-opacity duration-300"
                style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  color: '#3E6B5C',
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                "{testimonial.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={testimonial.color}
                    style={{ opacity: isActive ? 1 : 0.6 }}
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Author Info */}
              <div>
                <h4
                  className="text-xl font-bold text-[#1F3F33] mb-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {testimonial.name}
                </h4>
                <p
                  className="text-sm text-[#4A7A6A]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {testimonial.role} at <span className="font-semibold">{testimonial.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-2 transition-opacity duration-300"
          style={{ 
            background: testimonial.color,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      </div>
    </div>
  );
}