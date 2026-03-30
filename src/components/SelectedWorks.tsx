import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SelectedWorks: React.FC = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('projectWebDev'),
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      span: 'col-span-1 md:col-span-7',
      aspect: 'aspect-[4/3]',
    },
    {
      title: t('projectMobileApps'),
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      span: 'col-span-1 md:col-span-5',
      aspect: 'aspect-square',
    },
    {
      title: t('projectUiUx'),
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      span: 'col-span-1 md:col-span-5',
      aspect: 'aspect-square',
    },
    {
      title: t('projectBrand'),
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
      span: 'col-span-1 md:col-span-7',
      aspect: 'aspect-[4/3]',
    },
  ];

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
              {t('selectedWork')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Featured <span className="italic">{t('featuredProjects')}</span>
          </h2>
          <p className="text-muted max-w-md mb-6">
            {t('featuredText')}
          </p>
          <a
            href="#work"
            className="hidden md:inline-flex relative rounded-full overflow-hidden group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative bg-surface border border-stroke text-text-primary px-5 py-2.5 rounded-full inline-flex items-center gap-2 group-hover:border-transparent transition-colors">
              {t('viewAllWork')}
              <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`${project.span} ${project.aspect} group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone-overlay" />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg flex items-center justify-center">
                <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden">
                  <span className="absolute inset-0 accent-gradient animate-gradient-shift" />
                  <span className="relative bg-white text-bg px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm">
                    {t('viewProject')}<span className="font-display italic">{project.title}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
