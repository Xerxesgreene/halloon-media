'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import AnimatedBoxes from './AnimatedBoxes';
import { BlurFadeText } from './BlurFadeIn';
import ChatWorkspace from './ChatWorkspace';

export default function Hero({ introDone }) {
  return (
    <section id = "hero"
      className="
        relative min-h-screen overflow-hidden
        pt-28 sm:pt-20 md:pt-24
        pb-8 sm:pb-12
      "
      style={{ backgroundColor: '#f5f3ed' }}
    >
      {/* Animated Background */}
      <AnimatedBoxes />

      {/* Outer Glass Container */}
      <div className="relative z-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 my-3 sm:my-4 md:my-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            rounded-2xl sm:rounded-3xl
            bg-white/10
            backdrop-blur-md
            border border-white/20
            shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
            p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 2xl:p-20
          "
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] xl:grid-cols-[1.5fr_0.7fr] gap-10 lg:gap-14 xl:gap-16 2xl:gap-20 items-start">

              {/* LEFT COLUMN */}
              <div
                className="
                  space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10
                  lg:pt-6 xl:pt-8 2xl:pt-10
                "
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span
                    className="
                      inline-block
                      px-4 py-1.5 sm:px-5 sm:py-2
                      bg-forest-50/80
                      backdrop-blur-sm
                      border-2 border-forest-200/50
                      rounded-full
                      text-forest-600
                      text-xs sm:text-sm
                      font-medium
                      tracking-wide
                      uppercase
                    "
                  >
                    Media Consultancy
                  </span>
                </motion.div>

                {/* Headings */}
                <div className="space-y-0">
                  {introDone && (
                    <>
                      <BlurFadeText
                        text="A 360° Integrated"
                        as="h1"
                        delay={0.3}
                        charDelay={0.02}
                        duration={0.4}
                        className="
                          text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.5rem]
                          font-semibold
                          text-forest-900
                          leading-[1.1] sm:leading-[1.05] lg:leading-[0.95]
                          tracking-tight
                        "
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />

                      <BlurFadeText
                        text="Media Consultancy"
                        as="h1"
                        delay={0.5}
                        charDelay={0.02}
                        duration={0.4}
                        className="
                          text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.5rem]
                          font-semibold
                          text-forest-600
                          leading-[1.1] sm:leading-[1.05] lg:leading-[0.95]
                          tracking-tight
                        "
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />

                      <BlurFadeText
                        text="For Brands That Lead"
                        as="h1"
                        delay={0.7}
                        charDelay={0.02}
                        duration={0.4}
                        className="
                          text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-[5.5rem]
                          font-semibold
                          text-forest-600
                          leading-[1.1] sm:leading-[1.05] lg:leading-[0.95]
                          tracking-tight
                        "
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </>
                  )}
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="
                    text-sm sm:text-base md:text-lg lg:text-xl
                    text-forest-700
                    leading-relaxed
                    max-w-2xl
                    pt-2 sm:pt-3 md:pt-4
                  "
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Dubai-based media consultancy delivering strategy, digital, production,
                  and events across UAE, KSA, Qatar, Kuwait &amp; India.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() =>
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="
                      w-full sm:w-auto
                      px-6 py-3 sm:px-8 sm:py-4
                      bg-gradient-to-r from-forest-500 to-forest-400
                      text-white
                      text-base sm:text-lg
                      rounded-full
                      font-semibold
                      flex items-center justify-center gap-2
                      hover:shadow-xl hover:scale-105
                      transition-all duration-300
                    "
                  >
                    Explore Services
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() =>
                      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="
                      w-full sm:w-auto
                      px-6 py-3 sm:px-8 sm:py-4
                      bg-white/20
                      border-2 border-forest-500/50
                      text-forest-700
                      text-base sm:text-lg
                      rounded-full
                      font-semibold
                      hover:bg-white/30 hover:scale-105
                      transition-all duration-300
                    "
                  >
                    View Our Work
                  </button>
                </motion.div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="w-full max-w-md lg:max-w-full"
                >
                  <ChatWorkspace />
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}