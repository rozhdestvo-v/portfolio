import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface Translation {
  [key: string]: {
    ru: string;
    en: string;
  };
}

const translations: Translation = {
  // Loading Screen
  portfolio: { ru: 'Портфолио', en: 'Portfolio' },
  design: { ru: 'Дизайн', en: 'Design' },
  create: { ru: 'Творить', en: 'Create' },
  inspire: { ru: 'Вдохновлять', en: 'Inspire' },
  
  // Navbar
  home: { ru: 'Главная', en: 'Home' },
  work: { ru: 'Работы', en: 'Work' },
  resume: { ru: 'Резюме', en: 'Resume' },
  sayHi: { ru: 'Связаться', en: 'Say hi' },
  
  // Hero
  collection: { ru: 'ПОРТФОЛИО \'26', en: 'COLLECTION \'26' },
  roleDeveloper: { ru: 'Разработчик', en: 'Developer' },
  roleDesigner: { ru: 'Дизайнер', en: 'Designer' },
  roleCreator: { ru: 'Творец', en: 'Creator' },
  roleEnthusiast: { ru: 'Энтузиаст', en: 'Enthusiast' },
  basedInRussia: { ru: 'из России', en: '  based in Russia' },
  heroDescription: {
    ru: 'Создаю цифровые продукты, фокусируясь на уникальных деталях, которые оживляют идеи.',
    en: 'Creating seamless digital experiences by focusing on the unique nuances which bring ideas to life.',
  },
  seeWorks: { ru: 'Смотреть работы', en: 'See Works' },
  reachOut: { ru: 'Написать мне...', en: 'Reach out...' },
  scroll: { ru: 'ПРОКРУТИ', en: 'SCROLL' },
  
  // Selected Works
  selectedWork: { ru: 'Избранные работы', en: 'Selected Work' },
  featuredProjects: { ru: 'проекты', en: 'projects' },
  featuredText: {
    ru: 'Подборка проектов, над которыми я работал, от концепции до запуска.',
    en: 'A selection of projects I\'ve worked on, from concept to launch.',
  },
  viewAllWork: { ru: 'Все работы', en: 'View all work' },
  projectWebDev: { ru: 'Веб-разработка', en: 'Web Development' },
  projectMobileApps: { ru: 'Мобильные приложения', en: 'Mobile Apps' },
  projectUiUx: { ru: 'UI/UX Дизайн', en: 'UI/UX Design' },
  projectBrand: { ru: 'Брендинг', en: 'Brand Identity' },
  viewProject: { ru: 'Просмотр — ', en: 'View — ' },
  
  // Journal
  recentThoughts: { ru: 'Публикации', en: 'Recent Thoughts' },
  journalTitle: { ru: 'Журнал и ', en: 'Journal & ' },
  journalInsights: { ru: 'инсайты', en: 'insights' },
  journalDescription: {
    ru: 'Мысли о разработке, дизайне и технологической индустрии.',
    en: 'Thoughts on development, design, and the tech industry.',
  },
  viewAllPosts: { ru: 'Все публикации', en: 'View all posts' },
  journalEntry1: { ru: 'Будущее веб-разработки', en: 'The Future of Web Development' },
  journalEntry2: { ru: 'Дизайн для доступности', en: 'Designing for Accessibility' },
  journalEntry3: { ru: 'Создание масштабируемых приложений', en: 'Building Scalable Applications' },
  journalEntry4: { ru: 'Искусство чистого кода', en: 'The Art of Clean Code' },
  minRead: { ru: ' мин', en: ' min read' },
  
  // Explorations
  explorations: { ru: 'Исследования', en: 'Explorations' },
  visualPlayground: { ru: 'Визуальная ', en: 'Visual ' },
  visualPlaygroundItalic: { ru: 'площадка', en: 'playground' },
  explorationsDescription: {
    ru: 'Коллекция экспериментальных дизайнов и творческих исследований.',
    en: 'A collection of experimental designs and creative explorations.',
  },
  followDribbble: { ru: 'Dribbble', en: 'Follow on Dribbble' },
  
  // Stats
  yearsExperience: { ru: 'Года опыта', en: 'Years Experience' },
  projectsDone: { ru: 'Проектов выполнено', en: 'Projects Done' },
  satisfiedClients: { ru: 'Довольных клиентов', en: 'Satisfied Clients' },
  
  // Contact
  buildingFuture: { ru: 'СТРОИМ БУДУЩЕЕ • ', en: 'BUILDING THE FUTURE • ' },
  availableProjects: { ru: 'Открыт для проектов', en: 'Available for projects' },
  copyright: { ru: '© 2026 Владислав Рождественский', en: '© 2026 Vladislav Rozhdestvensky' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
