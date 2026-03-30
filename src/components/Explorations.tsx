import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const galleryItems = [
    { image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80', rotation: 3 },
    { image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', rotation: -2 },
    { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', rotation: 4 },
    { image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80', rotation: -3 },
    { image: 'https://images.unsplash.com/photo-1550029402-226115b7c579?w=600&q=80', rotation: 2 },
    { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', rotation: -4 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the content section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: contentRef.current,
        pinSpacing: false,
        scrub: true,
      });

      // Parallax effect for columns
      if (columnsRef.current) {
        const items = columnsRef.current.querySelectorAll('.parallax-item');
        items.forEach((item, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          gsap.to(item, {
            y: direction * 150,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[300vh] relative bg-bg">
      <div ref={contentRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Pinned Content Layer (z-10) */}
        <div className="absolute z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              {t('explorations')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            {t('visualPlayground')} <span className="italic">{t('visualPlaygroundItalic')}</span>
          </h2>
          <p className="text-muted max-w-md mx-auto mb-6">
            {t('explorationsDescription')}
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex rounded-full overflow-hidden group"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative bg-surface border border-stroke text-text-primary px-5 py-2.5 rounded-full inline-flex items-center gap-2 group-hover:border-transparent transition-colors">
              {t('followDribbble')}
              <span>→</span>
            </span>
          </a>
        </div>

        {/* Parallax Columns Layer (z-20) */}
        <div
          ref={columnsRef}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="max-w-[1400px] w-full grid grid-cols-2 gap-12 md:gap-40 px-4">
            {/* Left Column */}
            <div className="flex flex-col gap-12 md:gap-20">
              {galleryItems.filter((_, i) => i % 2 === 0).map((item, index) => (
                <div
                  key={`left-${index}`}
                  className="parallax-item aspect-square max-w-[280px] md:max-w-[320px] mx-auto relative group cursor-pointer"
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                >
                  <div className="absolute inset-0 bg-surface border border-stroke rounded-3xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Exploration ${index}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12 md:gap-20 pt-20 md:pt-40">
              {galleryItems.filter((_, i) => i % 2 !== 0).map((item, index) => (
                <div
                  key={`right-${index}`}
                  className="parallax-item aspect-square max-w-[280px] md:max-w-[320px] mx-auto relative group cursor-pointer"
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                >
                  <div className="absolute inset-0 bg-surface border border-stroke rounded-3xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Exploration ${index + 3}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explorations;
