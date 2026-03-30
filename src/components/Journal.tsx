import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Journal: React.FC = () => {
  const { t } = useLanguage();

  const journalEntries = [
    {
      title: t('journalEntry1'),
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      readTime: '5' + t('minRead'),
      date: 'Mar 15, 2026',
    },
    {
      title: t('journalEntry2'),
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=400&q=80',
      readTime: '7' + t('minRead'),
      date: 'Mar 10, 2026',
    },
    {
      title: t('journalEntry3'),
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
      readTime: '6' + t('minRead'),
      date: 'Mar 5, 2026',
    },
    {
      title: t('journalEntry4'),
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&q=80',
      readTime: '4' + t('minRead'),
      date: 'Feb 28, 2026',
    },
  ];

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              {t('recentThoughts')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            {t('journalTitle')} <span className="italic">{t('journalInsights')}</span>
          </h2>
          <p className="text-muted max-w-md mb-6">
            {t('journalDescription')}
          </p>
          <a
            href="#journal"
            className="hidden md:inline-flex relative rounded-full overflow-hidden group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative bg-surface border border-stroke text-text-primary px-5 py-2.5 rounded-full inline-flex items-center gap-2 group-hover:border-transparent transition-colors">
              {t('viewAllPosts')}
              <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Journal Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journalEntries.map((entry, index) => (
            <motion.a
              key={entry.title}
              href="#journal"
              className="flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base text-text-primary font-medium truncate group-hover:text-muted transition-colors">
                  {entry.title}
                </h3>
                <p className="text-xs text-muted mt-1">
                  {entry.readTime} • {entry.date}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:border-text-primary transition-colors">
                <span className="text-muted group-hover:text-text-primary text-sm">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
