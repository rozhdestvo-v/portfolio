import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState([0, 0, 0]);

  const stats = useMemo(() => [
    { value: 3, suffix: '+', label: t('yearsExperience') },
    { value: 15, suffix: '+', label: t('projectsDone') },
    { value: 200, suffix: '%', label: t('satisfiedClients') },
  ], [t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const durations = [2000, 2500, 2200];
      const intervals = stats.map((stat, index) => {
        const increment = stat.value / (durations[index] / 50);
        let current = 0;

        return setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
          }
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }, 50);
      });

      return () => intervals.forEach(clearInterval);
    }
  }, [isVisible, stats]);

  return (
    <section ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-2">
                <span>{counts[index]}</span>
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="text-muted text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
