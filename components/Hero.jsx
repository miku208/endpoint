'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const scrollTo = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs mb-6">
              ✦ Next-Gen Developer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Build & Scale <span className="gradient-text">Digital Solutions</span>
            </h1>
            <div className="text-neon-purple text-lg mb-3">Bot Developer • API Engineer • Web Designer • Fullstack Developer</div>
            <p className="text-gray-400 mb-8 max-w-lg">
              Membangun sistem automation, WhatsApp bot, REST API, dan UI modern dengan performa tinggi. 
              Terbiasa deploy ke VPS sendiri.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => scrollTo('#projects')}
                className="btn-primary flex items-center gap-2"
              >
                <i className="fas fa-eye"></i> Lihat Project
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-secondary flex items-center gap-2"
              >
                <i className="fas fa-user-astronaut"></i> Hire Me
              </button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-3 relative group">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-neon-purple to-neon-blue px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
                API Ready
              </div>
              <div className="absolute -bottom-2 -left-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-neon-purple border border-neon-purple/30 z-10">
                Automation System
              </div>
              
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/miku.png"
                  alt="Miku Character"
                  width={500}
                  height={500}
                  className="w-full rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
              </div>
            </div>
            
            {/* Fake Terminal UI */}
            <div className="glass-card rounded-xl p-3 mt-4 max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500">terminal@mikuhost:~/api</div>
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="text-neon-green">$ POST /api/deploy</div>
                <div className="text-gray-400">{`{`}</div>
                <div className="text-gray-400 ml-2">status: <span className="text-neon-green">"success"</span>,</div>
                <div className="text-gray-400 ml-2">bot: <span className="text-neon-blue">"running"</span>,</div>
                <div className="text-gray-400 ml-2">endpoint: <span className="text-neon-purple">"https://mikuhost.web.id"</span></div>
                <div className="text-gray-400">{`}`}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}