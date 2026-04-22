'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing system...');

  useEffect(() => {
    const texts = ['Connecting to server...', 'Loading modules...', 'Starting API...', 'Ready!'];
    let textIndex = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const newIndex = Math.floor(newProgress / 25);
        if (newIndex > textIndex && newIndex < texts.length) {
          textIndex = newIndex;
          setText(texts[textIndex]);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-dark z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold">
            <span className="gradient-text">Miku</span>
            <span className="text-white">Host</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mb-4"
        >
          {text}
        </motion.p>
        
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-600 mt-3"
        >
          {Math.floor(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
}