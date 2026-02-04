'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function IntroLoader({ onComplete }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Complete the loader after animation
    const completeTimer = setTimeout(() => {
      setShowLoader(false);
      if (onComplete) onComplete();
    }, 3000); // Total duration

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-cream-50 via-white to-cream-100 flex items-center justify-center"
        >
          {/* Main Content Container */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Logo Animation with blur effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, rotate: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0"
            >
              <Image
                src="/h1.png"
                alt="Halloon Media"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Text Animation with blur effect */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ x: -50, opacity: 0, filter: 'blur(10px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5,
                }}
              >
                <h1 className="text-3xl md:text-5xl font-bold text-forest-900 tracking-tight whitespace-nowrap">
                  {'Halloon Media'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.5,
                        delay: 0.7 + i * 0.05,
                        ease: 'easeOut',
                      }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Pulsing blur effect in background */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream-300 rounded-full blur-3xl opacity-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}