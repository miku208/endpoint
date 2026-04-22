'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contacts = [
  { name: 'WhatsApp', icon: 'fab fa-whatsapp', value: '+62 812 3456 7890', action: 'Chat Now', link: 'https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20menggunakan%20jasa%20Anda', bg: 'bg-green-600' },
  { name: 'Email', icon: 'far fa-envelope', value: 'mikuhost@mikudev.id', action: 'Send Email', link: 'mailto:mikuhost@mikudev.id', bg: 'bg-blue-600' },
  { name: 'GitHub', icon: 'fab fa-github', value: '/mikuhost', action: 'View Profile', link: '#', bg: 'bg-gray-700' },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-neon-purple text-sm uppercase tracking-wider">connect</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Let's work <span className="gradient-text">together</span></h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Siap membantu mewujudkan project automation, bot, atau API Anda. Hubungi saya sekarang!
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 text-center hover:transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <i className={`${contact.icon} text-5xl ${contact.name === 'WhatsApp' ? 'text-green-500' : contact.name === 'Email' ? 'text-blue-400' : 'text-gray-400'} mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
              <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
              <p className="text-gray-400 text-sm mb-4 font-mono">{contact.value}</p>
              <span className={`inline-block px-6 py-2 ${contact.bg} hover:opacity-90 rounded-full text-white text-sm transition-all group-hover:shadow-lg`}>
                {contact.action} <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </span>
            </motion.a>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20menggunakan%20jasa%20Anda"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
          >
            <i className="fab fa-whatsapp text-xl"></i> Hire Me — Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}