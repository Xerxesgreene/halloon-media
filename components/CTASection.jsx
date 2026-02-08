'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import BlurFadeIn from './BlurFadeIn'; // Adjust the import path as necessary

export default function CTASection() {
  return (
    <section
      className="relative py-28 px-6 bg-[#f5f3ed] overflow-hidden"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Wrap the entire card in a BlurFadeIn */}
        <BlurFadeIn duration={0.8} yOffset={40}>
          <div className="
            rounded-[40px]
            bg-gradient-to-br from-[#1a3a2e] to-[#2d5f4d]
            shadow-[0_40px_120px_rgba(26,58,46,0.45)]
            overflow-hidden
          ">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT CONTENT */}
              <div className="p-12 md:p-16">
                <BlurFadeIn delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-semibold text-[#f5f3ed] mb-6">
                    Ready to transform <br className="hidden sm:block" /> your brand?
                  </h2>
                </BlurFadeIn>

                <BlurFadeIn delay={0.3}>
                  <p className="text-lg text-[#e8e6dc] max-w-md mb-10 leading-relaxed">
                    Let's begin your journey with a discovery session to finalize
                    design, plan and objectives.
                  </p>
                </BlurFadeIn>

                <BlurFadeIn delay={0.4}>
                  <motion.a
                    href="#contact"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      inline-flex items-center gap-3
                      bg-[#f5f3ed]
                      text-[#1a3a2e]
                      px-8 py-4
                      rounded-full
                      text-sm font-medium
                      shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                      cursor-pointer
                    "
                  >
                    Start Today
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </BlurFadeIn>
              </div>

              {/* RIGHT GLOWING BULB */}
              <div className="relative hidden lg:flex items-center justify-center">
                <BlurFadeIn delay={0.5} blur={20}>
                  <div className="absolute w-[220px] h-[220px] bg-[#5eb083]/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                  <div className="absolute w-[320px] h-[320px] bg-[#78c69a]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

                  <div className="
                    relative
                    w-[260px] h-[260px]
                    rounded-full
                    bg-white/5
                    backdrop-blur-xl
                    border border-white/10
                    flex items-center justify-center
                  ">
                    <Lightbulb className="w-28 h-28 text-[#78c69a]" />
                  </div>
                </BlurFadeIn>
              </div>
            </div>
          </div>
        </BlurFadeIn>
      </div>
    </section>
  );
}