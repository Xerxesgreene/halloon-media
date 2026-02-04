'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ─────────────────────────────────────────────
     SCROLL DETECTION (Fluence-style shrink)
  ───────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <motion.nav
          animate={{
            maxWidth: scrolled ? '860px' : '1150px',
            paddingLeft: scrolled ? '16px' : '0px',
            paddingRight: scrolled ? '16px' : '0px',
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="
            mx-auto
            rounded-full
            bg-white/20
            backdrop-blur-3xl
            border border-white/30
            shadow-[0_12px_50px_-20px_rgba(0,0,0,0.25)]
          "
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? 'px-6 py-2.5' : 'px-8 py-3.5'
            }`}
          >
            {/* LOGO → HOME */}
            <Link href="/" className="flex items-center gap-4">
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src="/h1.png"
                    alt="Halloon Media"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <span className="text-forest-900 font-semibold text-lg">
                  Halloon Media
                </span>
              </motion.div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                  className="
                    relative text-sm font-medium text-forest-800
                    hover:text-forest-900
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-full after:bg-forest-600
                    after:scale-x-0 after:origin-left
                    hover:after:scale-x-100
                    after:transition-transform after:duration-300
                  "
                >
                  {item.label}
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="
                  ml-2 px-6 py-2.5
                  rounded-full
                  bg-forest-600
                  text-white text-sm font-semibold
                  shadow-lg shadow-forest-600/30
                  hover:bg-forest-700
                  transition-all
                "
              >
                Contact Us
              </motion.a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-forest-800"
            >
              <Menu size={24} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-white/30
              backdrop-blur-3xl
              md:hidden
            "
          >
            <div className="absolute top-6 right-6">
              <button onClick={() => setOpen(false)}>
                <X size={28} className="text-forest-800" />
              </button>
            </div>

            <div className="h-full flex flex-col items-center justify-center gap-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-semibold text-forest-900"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="
                  mt-6 px-10 py-4
                  rounded-full
                  bg-forest-600
                  text-white text-lg font-semibold
                  shadow-xl shadow-forest-600/30
                "
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
