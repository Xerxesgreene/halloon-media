'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, ChevronUp } from 'lucide-react';

export default function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 bottom-24 z-[999] flex flex-col items-center gap-4">
      
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/971568056934"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -2 }}
        className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
      >
        <MessageCircle className="text-white" size={26} />
      </motion.a>

      {/* Mail */}
      <motion.a
        href="mailto:halloonmedia@gmail.com"
        whileHover={{ scale: 1.1, y: -2 }}
        className="w-14 h-14 rounded-full bg-forest-600 flex items-center justify-center shadow-xl"
      >
        <Mail className="text-white" size={24} />
      </motion.a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-forest-700 flex items-center justify-center shadow-xl"
          >
            <ChevronUp className="text-white w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
