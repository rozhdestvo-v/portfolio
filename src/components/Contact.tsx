import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rozhdestvo-v' },
  { name: 'Telegram', url: 'https://t.me/rozhdestvo_v' },
  { name: 'Vk', url: 'https://vk.com/rozhdestvo_v' },
];

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
        // HLS cleanup
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video (flipped) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden mb-16 md:mb-20">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl lg:text-8xl font-display italic text-text-primary/10 mx-4"
            >
              {t('buildingFuture')}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center mb-16">
        <a
          href="mailto:vrozhdestvog@gmail.com"
          className="relative inline-flex rounded-full overflow-hidden group"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative bg-surface border border-stroke text-text-primary px-8 py-4 rounded-full inline-flex items-center gap-2 group-hover:border-transparent transition-colors text-lg">
            vrozhdestvog@gmail.com
            <span>→</span>
          </span>
        </a>
      </div>

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
    </footer>
  );
};

export default Contact;
