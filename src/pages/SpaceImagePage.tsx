import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import exterior from '../images/renders/exterior';
import interior from '../images/renders/interior';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rozhdestvo-v' },
  { name: 'Telegram', url: 'https://t.me/rozhdestvo_v' },
  { name: 'Vk', url: 'https://vk.com/rozhdestvo_v' },
];

type ViewMode = 'exterior' | 'interior';

const SpaceImagePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('exterior');
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentList = viewMode === 'exterior' ? exterior.exteriorList : interior.interiorList;

  // Обработка скролла колесиком мыши для горизонтальной прокрутки
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const galleryRect = gallery.getBoundingClientRect();
      // Проверяем, находится ли курсор над областью галереи (по вертикали)
      const isOverGallery =
        e.clientY >= galleryRect.top &&
        e.clientY <= galleryRect.bottom;

      if (isOverGallery) {
        e.preventDefault();
        const newScrollPosition = gallery.scrollLeft + e.deltaY * 2;
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        gallery.scrollLeft = Math.max(0, Math.min(maxScroll, newScrollPosition));
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Сброс скролла при переключении режима
  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header с кнопкой назад и переключателем */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="relative inline-flex rounded-full overflow-hidden group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative bg-surface border border-stroke text-text-primary px-5 py-2.5 rounded-full inline-flex items-center gap-2 group-hover:border-transparent transition-colors text-sm">
              <span>←</span>
              {t('backToHome')}
            </span>
          </button>

          {/* Toggle переключатель Интерьер/Экстерьер */}
          <div className="relative inline-flex rounded-full overflow-hidden bg-surface border border-stroke p-1">
            <button
              onClick={() => setViewMode('exterior')}
              className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 z-10 ${
                viewMode === 'exterior'
                  ? 'text-white'
                  : 'text-muted hover:text-text-primary'
              }`}
            >
              {t('exterior')}
            </button>
            <button
              onClick={() => setViewMode('interior')}
              className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 z-10 ${
                viewMode === 'interior'
                  ? 'text-white'
                  : 'text-muted hover:text-text-primary'
              }`}
            >
              {t('interior')}
            </button>
            {/* Скользящий фон */}
            <motion.span
              className="absolute inset-y-1 w-[calc(50%-4px)] bg-bg rounded-full shadow-sm"
              initial={false}
              animate={{
                x: viewMode === 'exterior' ? 4 : 'calc(100% - 4px)',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </motion.header>

      {/* Основной контент */}
      <main className="flex-1 relative overflow-hidden">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center pt-32 pb-12 px-6 relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              {t('architecture')}
            </span>
          </div>
          <motion.h1
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary"
          >
            {t('spaceImageTitle')}
          </motion.h1>
        </motion.div>

        {/* Горизонтальная галерея на всю ширину экрана */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative h-[35vh] md:h-[45vh]"
        >
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: viewMode === 'exterior' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div
              ref={galleryRef}
              className="gallery-container absolute inset-0 overflow-x-auto overflow-y-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="gallery-track flex items-center gap-8 px-[30vw] h-full min-w-max overflow-y-visible pt-1 pb-1">
                {currentList.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="gallery-item flex-shrink-0 h-full aspect-[16/9] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={src}
                      alt={`${viewMode} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Градиентные маски по краям */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Описание */}
        <motion.p
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted text-center mt-8 mb-12 max-w-2xl mx-auto px-6 relative z-10"
        >
          {viewMode === 'exterior'
            ? 'Коллекция рендеров экстерьеров, демонстрирующих современную архитектуру и ландшафтный дизайн.'
            : 'Коллекция рендеров интерьеров, показывающих функциональность и эстетику внутренних пространств.'}
        </motion.p>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-6 py-8"
      >
        {/* Footer Bar */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-text-primary transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-muted text-sm">{t('availableProjects')}</span>
            </div>

            {/* Copyright */}
            <div className="text-muted text-sm">
              {t('copyright')}
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Стили для скрытия скроллбара и кастомизации галереи */}
      <style>{`
        .gallery-container::-webkit-scrollbar {
          display: none;
        }
        
        .gallery-container {
          -webkit-overflow-scrolling: touch;
        }
        
        .gallery-item {
          transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default SpaceImagePage;
