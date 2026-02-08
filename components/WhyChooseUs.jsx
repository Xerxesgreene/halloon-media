'use client';

import { useRef } from 'react';
import BlurFadeIn from './BlurFadeIn';

export default function WhyChooseUs() {
  const ref = useRef(null);

  return (
    <section 
      ref={ref}
      className="relative py-32 px-4"
      style={{ 
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(to bottom, #FAF7F2 0%, #FAF7F2 35%, #f5f3ed 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Image */}
          <BlurFadeIn delay={0.2} duration={0.8}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-forest-100 to-forest-50 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional workspace"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-forest-200 rounded-full blur-3xl opacity-30" />
              <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-cream-300 rounded-full blur-3xl opacity-40" />
            </div>
          </BlurFadeIn>

          {/* RIGHT SIDE - Content */}
          <div className="space-y-12">
            
            {/* Header */}
            <div className="space-y-6">
              <BlurFadeIn delay={0.3} duration={0.8}>
                <h2 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  style={{
                    background: 'linear-gradient(90deg, #47876F 0%, #47876F 45%, #1F3F33 55%, #1F3F33 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Why Choose Us ?
                </h2>
              </BlurFadeIn>

              <BlurFadeIn delay={0.4} duration={0.8}>
                <p 
                  className="text-xl leading-relaxed"
                  style={{ 
                    color: '#4A7A6A',
                    fontWeight: 300,
                    lineHeight: 1.8
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#2D5F4D' }}>No fluff , just results.</span>{' '}
                  Thoughtful strategy and execution that make your brand stronger. We focus on smart 
                  media solutions and measurable outcomes, project after project.
                </p>
              </BlurFadeIn>
            </div>

            {/* Additional Content */}
            <BlurFadeIn delay={0.5} duration={0.8}>
              <p 
                className="text-lg leading-relaxed"
                style={{ 
                  color: '#4A7A6A',
                  fontWeight: 300,
                  lineHeight: 1.8
                }}
              >
                With over 8 years of expertise and serving across Dubai, KSA, Qatar, Kuwait, 
                and India, we combine local market insights with international best practices. Our team 
                of 40+ media experts delivers innovative solutions that drive real business outcomes.
              </p>
            </BlurFadeIn>

          </div>

        </div>

      </div>
    </section>
  );
}