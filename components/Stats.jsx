'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  { value: 10, label: 'Bot Projects', icon: 'fas fa-robot', suffix: '+' },
  { value: 50, label: 'API Endpoints', icon: 'fas fa-chart-line', suffix: '+' },
  { value: 5, label: 'Websites Built', icon: 'fas fa-code', suffix: '+' },
  { value: 20, label: 'Happy Clients', icon: 'fas fa-smile', suffix: '+' },
];

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let start = 0;
        const duration = 2000;
        const increment = stat.value / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= stat.value) {
            setCounters(prev => {
              const newArr = [...prev];
              newArr[index] = stat.value;
              return newArr;
            });
            clearInterval(timer);
          } else {
            setCounters(prev => {
              const newArr = [...prev];
              newArr[index] = Math.floor(start);
              return newArr;
            });
          }
        }, 16);
      });
    }
  }, [inView]);

  return (
    <section className="py-20 px-6 md:px-12 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-neon-purple/50 transition-all"
            >
              <i className={`${stat.icon} text-3xl text-neon-purple mb-3 group-hover:scale-110 transition-transform duration-300`}></i>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}