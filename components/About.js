'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: 'Strategy',
      desc: 'We begin with deep discovery and strategic planning. , we build a clear roadmap aligned with your business objectives.',
      icon: 'checklist',
      color: '#2D5F4D',
    },
    {
      title: 'Production',
      desc: 'Our in-house team brings ideas to life through high-impact creative and production.',
      icon: 'tasks',
      color: '#47876F',
    },
    {
      title: 'Execution',
      desc: 'With regional expertise across the GCC, we ensure consistent brand performance and long-term visibility.',
      icon: 'folder',
      color: '#2D5F4D',
      showFolder: true,
      folderImages: [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop',
      ]
    }
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 px-4 bg-gradient-to-b from-[#FAF7F2] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
 <h2 className="text-4xl md:text-6xl font-semibold text-[#1F3F33] mb-6 tracking-tight">
  <span className="text-[#47876F]">
    Crafted media solutions
  </span>
  {' '}with precision.
</h2>


        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICE CARD WITH HOVER ANIMATION ---------------- */
function ServiceCard({ service, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Main Card */}
      <div className="relative bg-white border-2 border-[#E7EFEA] rounded-3xl overflow-hidden hover:border-[#47876F] hover:shadow-2xl transition-all duration-500">
        
        {/* Content Area with Grid Background */}
        <div 
          className="relative h-96 flex items-center justify-center overflow-visible p-8"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E0E7E3 1px, transparent 1px),
              linear-gradient(to bottom, #E0E7E3 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        >
          
          {/* Show Interactive Icons (First Two Cards) */}
          {!service.showFolder && (
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isHovered ? (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                  >
                    <InteractiveIcon icon={service.icon} color={service.color} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="3d-animation"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {service.icon === 'checklist' && <ChecklistAnimation />}
                    {service.icon === 'tasks' && <TasksAnimation />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Show Folder with Images (Third Card) */}
          {service.showFolder && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Folder - Always Visible */}
              <motion.div
                animate={isHovered ? {
                  scale: 0.7,
                  y: 40,
                } : {
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="relative z-10"
              >
                <GreenFolderIcon isOpen={isHovered} />
              </motion.div>

              {/* Images Popping Out - Only on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Images Opening Like Files */}
                    <div className="relative w-full h-full flex items-start justify-center pt-8">
                      {/* Left Image */}
                      <motion.div
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        animate={{ 
                          opacity: 1,
                          x: -100,
                          y: -20,
                          rotateZ: -15,
                          scale: 0.85
                        }}
                        exit={{
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        transition={{ 
                          delay: 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 18
                        }}
                        className="absolute w-44 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                        style={{ zIndex: 20 }}
                      >
                        <img 
                          src={service.folderImages[0]} 
                          alt="Project 1"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
                      </motion.div>

                      {/* Center Image (Top) */}
                      <motion.div
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        animate={{ 
                          opacity: 1,
                          x: 0,
                          y: -40,
                          rotateZ: 0,
                          scale: 0.9
                        }}
                        exit={{
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        transition={{ 
                          delay: 0,
                          type: "spring",
                          stiffness: 200,
                          damping: 18
                        }}
                        className="absolute w-48 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                        style={{ zIndex: 30 }}
                      >
                        <img 
                          src={service.folderImages[1]} 
                          alt="Project 2"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
                      </motion.div>

                      {/* Right Image */}
                      <motion.div
                        initial={{ 
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        animate={{ 
                          opacity: 1,
                          x: 100,
                          y: -20,
                          rotateZ: 15,
                          scale: 0.85
                        }}
                        exit={{
                          opacity: 0,
                          x: 0,
                          y: 80,
                          rotateZ: 0,
                          scale: 0.3
                        }}
                        transition={{ 
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                          damping: 18
                        }}
                        className="absolute w-44 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                        style={{ zIndex: 25 }}
                      >
                        <img 
                          src={service.folderImages[2]} 
                          alt="Project 3"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-8 bg-white">
          <h3 className="text-2xl font-bold text-[#1F3F33] mb-3">{service.title}</h3>
          <p className="text-[#3E6B5C] leading-relaxed">{service.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- INTERACTIVE 3D ICONS ---------------- */
function InteractiveIcon({ icon, color }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 8;
    const y = (e.clientX - rect.left - rect.width / 2) / 8;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-40 h-40"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {icon === 'checklist' && <ChecklistIcon color={color} />}
      {icon === 'tasks' && <TasksIcon color={color} />}
    </motion.div>
  );
}

/* ---------------- CHECKLIST ICON (GREEN) ---------------- */
function ChecklistIcon({ color }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full drop-shadow-2xl">
      <motion.rect
        x="20"
        y="15"
        width="100"
        height="110"
        rx="8"
        fill="white"
        stroke={color}
        strokeWidth="4"
        animate={{ y: [15, 12, 15] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <motion.rect
            x="35"
            y={40 + i * 25}
            width="18"
            height="18"
            rx="4"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
          />
          <motion.path
            d={`M 38 ${49 + i * 25} L 43 ${54 + i * 25} L 50 ${47 + i * 25}`}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.3 }}
          />
          <motion.line
            x1="60"
            y1={49 + i * 25}
            x2="105"
            y2={49 + i * 25}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- TASKS ICON (GREEN) ---------------- */
function TasksIcon({ color }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full drop-shadow-2xl">
      <motion.rect
        x="15"
        y="20"
        width="110"
        height="100"
        rx="10"
        fill="white"
        stroke={color}
        strokeWidth="4"
      />
      
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <motion.rect
            x={25 + i * 35}
            y="35"
            width="25"
            height="8"
            rx="4"
            fill={color}
            opacity="0.3"
          />
          <motion.rect
            x={25 + i * 35}
            y="50"
            width="25"
            height="55"
            rx="6"
            fill={color}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.15, duration: 0.4, type: "spring" }}
          />
          {[0, 1].map((j) => (
            <motion.rect
              key={j}
              x={28 + i * 35}
              y={55 + j * 22}
              width="19"
              height="16"
              rx="3"
              fill="white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 + j * 0.1 }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ---------------- CHECKLIST ANIMATION (HOVER STATE - GREEN) ---------------- */
function ChecklistAnimation() {
  return (
    <div className="space-y-5">
      {['Campaign Planning', 'Brand & media strategy', 'Market & audience analysis'].map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          className="flex items-center gap-4"
        >
          <motion.div
            className="w-7 h-7 rounded-lg bg-[#2D5F4D] flex items-center justify-center flex-shrink-0 shadow-lg"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
              />
            </svg>
          </motion.div>
          <span className="text-[#1F3F33] font-semibold text-lg">{text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- TASKS ANIMATION (HOVER STATE - GREEN) ---------------- */
function TasksAnimation() {
  const tasks = [
    { name: 'Landing Page', status: 'To Do', color: '#3B82F6' },
    { name: 'Mobile App UI', status: 'In Progress', color: '#F59E0B' },
    { name: 'Brand Guideline', status: 'Review', color: '#EC4899' }
  ];

  return (
    <div className="space-y-4 w-full max-w-sm">
      {tasks.map((task, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="bg-white p-5 rounded-2xl shadow-xl border-2 border-gray-100"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h4 className="font-bold text-[#1F3F33] mb-3 text-lg">{task.name}</h4>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              January {15 - i * 5}
            </span>
            <motion.span 
              className="px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ 
                backgroundColor: `${task.color}20`,
                color: task.color 
              }}
              whileHover={{ scale: 1.1 }}
            >
              {task.status}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- GREEN FOLDER ICON WITH OPEN STATE ---------------- */
function GreenFolderIcon({ isOpen }) {
  return (
    <motion.svg
      viewBox="0 0 240 200"
      fill="none"
      className="w-56 h-56 drop-shadow-2xl"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Folder Back Tab */}
      <motion.path
        d="M 40 55 L 100 55 L 115 70 L 200 70 L 200 50 L 40 50 Z"
        fill="#47876F"
        opacity="0.6"
        animate={isOpen ? {
          d: "M 40 50 L 100 50 L 115 65 L 205 65 L 210 45 L 40 45 Z"
        } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* Main Folder Body */}
      <motion.rect
        x="30"
        y="70"
        width="180"
        height="110"
        rx="14"
        fill="#2D5F4D"
        animate={isOpen ? {
          y: 75,
          height: 105
        } : { 
          y: [70, 68, 70],
        }}
        transition={isOpen ? 
          { type: "spring", stiffness: 200, damping: 20 } :
          { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
        }
      />
      
      {/* Folder Front Face with Border */}
      <motion.path
        d="M 35 75 L 205 75 L 205 172 Q 205 178 199 178 L 41 178 Q 35 178 35 172 Z"
        fill="#2D5F4D"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
        animate={isOpen ? {
          d: "M 35 80 L 205 80 L 205 175 Q 205 180 199 180 L 41 180 Q 35 180 35 175 Z"
        } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* Folder Top Edge Highlight */}
      <motion.rect
        x="35"
        y="75"
        width="170"
        height="6"
        fill="rgba(255,255,255,0.15)"
        animate={isOpen ? { y: 80 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* Folder Tab */}
      <motion.path
        d="M 40 70 L 100 70 L 112 80 L 112 75 L 40 75 Z"
        fill="#47876F"
        opacity="0.8"
        animate={isOpen ? {
          d: "M 40 65 L 100 65 L 112 75 L 112 70 L 40 70 Z"
        } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      
      {/* Shine Effect */}
      <motion.ellipse
        cx="80"
        cy="120"
        rx="30"
        ry="50"
        fill="white"
        opacity="0.1"
        animate={isOpen ? {
          opacity: [0.1, 0.15, 0.1]
        } : { 
          cx: [80, 160, 80],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={isOpen ?
          { repeat: Infinity, duration: 2, ease: "easeInOut" } :
          { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }
      />
      
      {/* Shadow at Bottom */}
      <motion.ellipse
        cx="120"
        cy="185"
        rx="80"
        ry="8"
        fill="rgba(0,0,0,0.1)"
        animate={isOpen ? { 
          ry: 12,
          opacity: 0.15 
        } : {
          opacity: 0.1
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </motion.svg>
  );
}