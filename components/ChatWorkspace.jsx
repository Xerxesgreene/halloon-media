'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ChatWorkspace() {
  const messages = [
    {
      id: 1,
      title: "Brand Identity & Strategy",
      text: "We craft compelling brand identities that resonate with your audience. From logo design to complete brand guidelines, we build the foundation of your brand's visual language.",
      delay: 0.9
    },
    {
      id: 2,
      title: "Creative Design Solutions",
      text: "Our design team transforms ideas into stunning visuals. Whether it's packaging, digital design, or print materials, we deliver designs that captivate and convert.",
      delay: 1.1
    },
    {
      id: 3,
      title: "Strategic Advertisement",
      text: "We develop data-driven advertising campaigns across UAE, KSA, Qatar, Kuwait & India. From concept to execution, we ensure your message reaches the right audience.",
      delay: 1.3
    }
  ];

  return (
    <motion.div
      className="
        w-full
        max-w-4xl
        mx-auto
        mt-8 sm:mt-12 md:mt-14
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="
        rounded-2xl
        bg-white/15
        backdrop-blur-lg
        border border-white/25
        shadow-[0_8px_32px_rgba(31,38,135,0.2)]
        overflow-hidden
      ">
        {/* Toolbar */}
        <div className="h-11 sm:h-12 flex items-center justify-between px-4 sm:px-6 border-b border-white/20 bg-white/5">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-forest-400/60" />
            <span className="w-3 h-3 rounded-full bg-forest-500/60" />
            <span className="w-3 h-3 rounded-full bg-forest-600/60" />
          </div>

          <div className="flex items-center gap-2 text-forest-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">
              What We Do
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4">
          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: message.delay, duration: 0.5 }}
      className="w-full"
    >
      <div className="
        w-full
        rounded-xl
        bg-white/20
        backdrop-blur-sm
        border border-white/30
        p-4 sm:p-5
        flex gap-3
        text-left
      ">
        <div className="w-10 h-10 rounded-lg bg-forest-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        <div>
          <h3 className="font-semibold text-forest-800 text-sm sm:text-base mb-1">
            {message.title}
          </h3>
          <p className="text-forest-700 text-xs sm:text-sm leading-relaxed">
            {message.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
