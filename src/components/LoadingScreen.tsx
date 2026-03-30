import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const { t } = useLanguage();
  
  const wordKeys = ['design', 'create', 'inspire'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const duration = 2700;
    const frames = 60;
    const increment = 100 / (duration / (1000 / frames));
    let currentCount = 0;
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (deltaTime >= 1000 / frames) {
        currentCount += increment * (deltaTime / (1000 / frames));
        if (currentCount >= 100) {
          currentCount = 100;
          setCount(100);
          setTimeout(() => {
            onComplete();
          }, 400);
          return;
        }
        setCount(Math.floor(currentCount));
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % wordKeys.length);
    }, 900);

    return () => clearInterval(interval);
  }, [wordKeys.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t('portfolio')}
      </motion.span>

      <div className="flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t(wordKeys[currentWordIndex])}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end">
        <motion.span
          className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(count).padStart(3, '0')}
        </motion.span>

        <div className="w-full h-[3px] bg-stroke/50 mt-4 overflow-hidden">
          <motion.div
            className="h-full accent-gradient"
            style={{
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
