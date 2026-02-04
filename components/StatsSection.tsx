'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STATS: Stat[] = [
  { value: 40, suffix: '+', label: 'Skilled Professionals' },
  { value: 5, label: 'Regional Offices' },
  { value: 8, suffix: '+', label: 'Years of Excellence' },
  { value: 100, suffix: '+', label: 'Brands Served' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-32 px-4 bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} start={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD (isolated for performance)
───────────────────────────────────────────── */
function StatCard({
  stat,
  index,
  start,
}: {
  stat: Stat;
  index: number;
  start: boolean;
}) {
  const numberRef = useRef<HTMLDivElement>(null!);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current || !numberRef.current) return;

    hasAnimated.current = true;

    const duration = 1000; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * stat.value);

      if (numberRef.current) {
        numberRef.current.textContent = `${current}${stat.suffix ?? ''}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, stat.value, stat.suffix]);

  return (
    <div className="text-center p-8 bg-cream-100 border-2 border-forest-200 rounded-3xl hover:border-forest-400 hover:shadow-xl transition-all">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={start ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        <div
          ref={numberRef}
          className="text-5xl md:text-6xl font-bold text-forest-500 mb-3 font-display"
        >
          0{stat.suffix ?? ''}
        </div>

        <div className="text-forest-700 text-sm font-medium">
          {stat.label}
        </div>
      </motion.div>
    </div>
  );
}
