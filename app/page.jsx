'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent pointer-events-none" style={{ backgroundPosition: 'bottom right' }} />
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      
      <footer className="py-8 text-center border-t border-white/10">
        <p className="text-gray-500 text-sm">© 2025 MikuHost — Built with Next.js & Framer Motion</p>
      </footer>
    </main>
  );
}