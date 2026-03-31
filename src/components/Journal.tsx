import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import itmo from '../images/logos/logo_osnovnoy_russkiy_belyy.png'
import innotech from '../images/logos/t1_logo_white.png'

const Journal: React.FC = () => {
  const { t } = useLanguage();

  const experience = [
    {
      icon: innotech,
      title: t('position1'),
      company: t('company1'),
      period: t('period1'),
      description: t('description1'),
    },
  ];

  const education = [
    {
      icon: itmo,
      title: t('degree2'),
      school: t('school2'),
      period: t('period5'),
      description: t('description5'),
    },
    {
      icon: itmo,
      title: t('degree1'),
      school: t('school1'),
      period: t('period4'),
      description: t('description4'),
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
              {t('resume')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            {t('journalTitle')} <span className="italic">{t('journalInsights')}</span>
          </h2>
          <p className="text-muted max-w-md mb-6">
            {t('journalDescription')}
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-8">
            {t('experience')}
          </h3>
          <div className="space-y-2">
            {experience.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex items-baseline gap-4 py-3 border-b border-stroke last:border-0 flex-wrap md:flex-nowrap"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={item.icon} alt="" className="w-8 h-8 object-contain flex-shrink-0 self-center" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base text-text-primary font-medium break-words">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted break-words">
                    {item.description}
                  </p>
                </div>
                <span className="text-xs text-muted flex-shrink-0 whitespace-normal md:whitespace-nowrap">
                  {item.period}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-stroke mb-16" />

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-8">
            {t('education')}
          </h3>
          <div className="space-y-2">
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex items-baseline gap-4 py-3 border-b border-stroke last:border-0 flex-wrap md:flex-nowrap"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={item.icon} alt="" className="w-8 h-8 object-contain flex-shrink-0 self-center" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base text-text-primary font-medium break-words">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted break-words">
                    {item.school}
                  </p>
                  {/* <p className="text-sm text-muted truncate">
                    {item.description}
                  </p> */}
                </div>
                <span className="text-xs text-muted flex-shrink-0 whitespace-normal md:whitespace-nowrap">
                  {item.period}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journal;
