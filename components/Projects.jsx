'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    title: 'WhatsApp Bot System',
    icon: 'fab fa-whatsapp',
    description: 'Sistem automation WhatsApp dengan AI integration, command handler, anti-spam, dan fitur modular yang scalable.',
    tech: ['Node.js', 'Baileys', 'Gemini AI', 'MongoDB'],
    features: ['Automation', 'AI Integration', 'Anti-spam'],
  },
  {
    title: 'Minecraft Automation System',
    icon: 'fas fa-cubes',
    description: 'Sistem automation untuk game Minecraft dengan multi bot, auto login/register, auto chat, anti AFK, dan CLI control.',
    tech: ['Node.js', 'Mineflayer', 'TypeScript', 'CLI'],
    features: ['Multi Bot', 'Auto Login', 'Anti AFK'],
  },
  {
    title: 'REST API Platform',
    icon: 'fas fa-globe',
    description: 'Platform API modern dengan endpoint AI, rate limiting, caching, dan sistem backend yang scalable.',
    tech: ['Express', 'Redis', 'PostgreSQL', 'Docker'],
    features: ['Rate Limit', 'AI Endpoints', 'Scalable'],
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-neon-purple text-sm uppercase tracking-wider">portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured <span className="gradient-text">Projects</span></h2>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <i className={`${project.icon} text-4xl text-neon-purple group-hover:scale-110 transition-transform duration-300`}></i>
                <div className="flex gap-1">
                  {project.features.map((feature, i) => (
                    <span key={i} className="px-2 py-0.5 bg-neon-purple/10 rounded text-xs text-neon-purple">{feature}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300">{tech}</span>
                ))}
              </div>
              <button className="text-neon-purple hover:text-neon-blue transition-colors inline-flex items-center gap-2 text-sm group">
                View Project <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}