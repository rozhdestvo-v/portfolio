import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const { t, language } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);

  // const roleKeys = ['roleDeveloper', 'roleDesigner', 'roleCreator', 'roleEnthusiast'];
  const roleKeys = ['roleDesigner', 'roleCreator', 'roleEnthusiast'];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (Hls.isSupported()) {
        // HLS cleanup handled by garbage collection
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roleKeys.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [roleKeys.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ ease: 'power3.out' })
        .from(nameRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.1,
        })
        .from(
          eyebrowRef.current,
          {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20,
            duration: 1,
            stagger: 0.1,
            delay: 0.3,
          },
          0
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <p
          ref={eyebrowRef}
          className="text-xs text-muted uppercase tracking-[0.3em] mb-8 blur-in"
        >
          {t('collection')}
        </p>

        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 name-reveal"
        >
          {language === 'ru' ? 'Владислав Рождественский' : 'Vladislav Rozhdestvenskiy'}
        </h1>

        <div className="text-lg md:text-xl text-muted mb-4">
          <span>{language === 'ru' ? 'Разработчик и ' : 'Developer and '}</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {t(roleKeys[roleIndex])}
          </span>
          <span>{language === 'ru' ? ' ' + t('basedInRussia') : t('basedInRussia')}</span>
        </div>

        <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          {t('heroDescription')}
        </p>

        {/* CTA Buttons */}
        <div className="inline-flex gap-4 flex-wrap justify-center">
          <a
            href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-transform overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative bg-text-primary text-bg px-7 py-3.5 rounded-full group-hover:bg-bg group-hover:text-text-primary transition-colors inline-block">
              {t('seeWorks')}
            </span>
          </a>

          <a
            href="#contact"
            className="group relative rounded-full text-sm px-7 py-3.5 hover:scale-105 transition-transform overflow-hidden"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative border-2 border-stroke bg-bg text-text-primary px-7 py-3.5 rounded-full group-hover:border-transparent inline-block">
              {t('reachOut')}
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="text-xs text-muted uppercase tracking-[0.2em] mb-2">
          {t('scroll')}
        </p>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
