'use client';

import { Mail, Phone, MapPin, Globe, Instagram, Youtube, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-forest-900 text-cream-100 px-6 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto">

        {/* ─────────────── TOP GRID ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">

          {/* BRAND */}
          <div className="space-y-6">
            <div className="relative w-36 h-12">
              <Image
                src="/logo-light.png"
                alt="Halloon Media"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-cream-200 max-w-sm">
              A 360° media and communications partner crafting strategic,
              creative, and digital solutions across the Middle East and
              South Asia.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-forest-700 flex items-center justify-center
                           text-cream-300 hover:text-forest-300 hover:border-forest-600 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-forest-700 flex items-center justify-center
                           text-cream-300 hover:text-forest-300 hover:border-forest-600 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/971568056934"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-forest-700 flex items-center justify-center
                           text-cream-300 hover:text-forest-300 hover:border-forest-600 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-cream-50 tracking-tight">
              Contact
            </h4>

            <ul className="space-y-4 text-sm text-cream-200">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-forest-300" />
                <span>+971 56 805 6934</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-forest-300" />
                <span>halloonmedia@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-forest-300" />
                <span>www.halloonmedia.com</span>
              </li>
            </ul>
          </div>

          {/* PRESENCE */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-cream-50 tracking-tight">
              Our Presence
            </h4>

            <ul className="space-y-4 text-sm text-cream-200">
              {[
                'Dubai, UAE',
                'Riyadh, KSA',
                'Doha, Qatar',
                'Kuwait City, Kuwait',
                'Mumbai, India',
              ].map((location, i) => (
                <li key={i} className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-forest-300" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ─────────────── DIVIDER ─────────────── */}
        <div className="mt-20 mb-8 h-px bg-forest-800" />

        {/* ─────────────── BOTTOM BAR ─────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-300">
          <span>
            © {new Date().getFullYear()} Halloon Media. All rights reserved.
          </span>

          <div className="flex gap-6">
            <a href="#" className="hover:text-forest-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-forest-300 transition-colors">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
