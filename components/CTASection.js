'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-32 px-4 bg-gradient-to-b from-cream-100 to-cream-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-forest-400 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-forest-900 mb-6 font-display">
          Ready to <span className="text-forest-500">Transform</span> Your Brand?
        </h2>
        <p className="text-lg text-forest-700 mb-8 max-w-2xl mx-auto">
          Let's begin your journey with a discovery session to finalize tone, voice, and objectives
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-forest-500 to-forest-400 text-cream-50 rounded-full font-semibold hover:shadow-xl hover:shadow-forest-500/30 transition-all flex items-center gap-2 justify-center group"
          >
            <span>Schedule Discovery Session</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-cream-50 border-2 border-forest-500 text-forest-700 rounded-full font-semibold hover:bg-forest-50 transition-all"
          >
            View Case Studies
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
