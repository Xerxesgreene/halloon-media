'use client';

import { Instagram, Youtube, MessageCircle, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      id="contact" 
      className="relative text-white px-6 pt-20 pb-8 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(180deg, #0d1f1a 0%, #1a3a2e 50%, #0d1f1a 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          
{/* BRAND & TAGLINE - Content preserved, Layout ordered */}
<div className="flex flex-col items-start max-w-sm space-y-8">
  
  {/* MASSIVE LOGO */}
  <div className="relative w-[350px] h-24 md:w-[450px] md:h-28">
    <Image 
      src="/h2.png" 
      alt="Halloon Media" 
      fill 
      className="object-contain object-left" 
      priority
    />
  </div>

  {/* TEXT CONTENT - Ordered column */}
  <div className="flex flex-col space-y-4">
    <p className="text-gray-400 leading-relaxed text-sm">
      From the house of Tariq al thaki Media consultancy, crafting strategic, creative, 
      and digital solutions across the Middle East and South Asia.
    </p>
 
  </div>

</div>

          {/* NAV LINKS GRID - All in one line */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 lg:gap-32">
            
            {/* MENU COLUMN */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Menu</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="#services" className="hover:text-white transition-colors cursor-pointer">Services</Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors cursor-pointer">Clients</Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-white transition-colors cursor-pointer">Works</Link>
                </li>
              </ul>
            </div>

            {/* REGIONS COLUMN */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Regions</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>Dubai / KSA</li>
                <li>Qatar / Kuwait</li>
                <li>India</li>
              </ul>
            </div>

            {/* CONTACT COLUMN */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <a href="tel:+971568056934" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#78c69a]" /> +971 568056934
                </a>
                <a href="mailto:halloonmedia@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#78c69a]" /> halloonmedia@gmail.com
                </a>
              </div>
              
              {/* SOCIAL ICONS */}
              <div className="flex gap-4 pt-2 text-[#78c69a]">
                <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="+971568056934" className="hover:text-white transition-colors" aria-label="WhatsApp">
                  <MessageCircle className="w-5 h-5" fill="currentColor" />
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* THIN DIVIDER */}
        <div className="w-full h-[1px] bg-white/10 mb-12" />

        {/* BOTTOM SECTION */}
        <div className="relative pt-8 pb-4">
          <div className="relative mb-6 flex justify-center">
            <div className="relative">
              <h1 
                className="text-[18vw] md:text-[15vw] font-bold leading-none select-none tracking-tighter text-center"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
                  color: 'transparent',
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Halloon
              </h1>
              {/* COPYRIGHT ICON ON TOP RIGHT */}
              <span className="absolute top-[15%] -right-[5%] text-[2vw] text-white/20 font-light">
                ©
              </span>
            </div>
          </div>
          
          <div className="text-center text-[10px] uppercase tracking-[0.2em] text-gray-500">
            © {new Date().getFullYear()} Halloon Media Consultancy. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}