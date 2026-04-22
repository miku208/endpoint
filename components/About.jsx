'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-neon-purple text-sm uppercase tracking-wider">// about me</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Crafting <span className="gradient-text">Digital Excellence</span></h2>
        </div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
        >
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Developer yang fokus pada <span className="text-neon-purple font-semibold">automation, bot WhatsApp, API, dan web modern</span>. 
            Terbiasa membangun sistem dari <span className="text-neon-purple font-semibold">nol hingga deploy ke VPS</span>. 
            Setiap proyek didekati dengan fokus pada performance, clean code, dan pengalaman pengguna yang seamless.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 text-gray-400"><i className="fas fa-rocket text-neon-purple"></i> Build from zero</div>
            <div className="flex items-center gap-2 text-gray-400"><i className="fas fa-cloud-upload-alt text-neon-purple"></i> Deploy to VPS</div>
            <div className="flex items-center gap-2 text-gray-400"><i className="fas fa-tachometer-alt text-neon-purple"></i> Performance first</div>
            <div className="flex items-center gap-2 text-gray-400"><i className="fas fa-shield-alt text-neon-purple"></i> Security focused</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}