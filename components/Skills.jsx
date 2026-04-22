'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const skills = [
  { name: 'Bot Development', icon: 'fab fa-whatsapp', description: 'WhatsApp bot, Baileys, automation, command system', progress: 95, color: 'from-green-500 to-emerald-500' },
  { name: 'API Development', icon: 'fas fa-cloud-upload-alt', description: 'REST API, AI endpoint, integration, rate limiting', progress: 92, color: 'from-neon-purple to-neon-blue' },
  { name: 'Web Design', icon: 'fas fa-palette', description: 'UI modern, animasi, landing page premium', progress: 88, color: 'from-pink-500 to-rose-500' },
  { name: 'Fullstack', icon: 'fas fa-server', description: 'Node.js, Express, VPS, database management', progress: 90, color: 'from-cyan-500 to-blue-500' },
];

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [animatedProgress, setAnimatedProgress] = useState(skills.map(() => 0));

  useEffect(() => {
    if (inView) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedProgress(prev => {
            const newArr = [...prev];
            newArr[index] = skill.progress;
            return newArr;
          });
        }, index * 200);
      });
    }
  }, [inView]);

  return (
    <section id="skills" className="py-20 px-6 md:px-12 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-neon-purple text-sm uppercase tracking-wider">expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Technical <span className="gradient-text">Mastery</span></h2>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <i className={`${skill.icon} text-3xl text-neon-purple`}></i>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedProgress[index]}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-neon-purple text-sm font-mono">{animatedProgress[index]}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}