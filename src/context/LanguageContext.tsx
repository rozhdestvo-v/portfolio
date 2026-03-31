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
  featuredProjects: { ru: 'Выполненные проекты', en: 'Featured projects' },
  featuredText: {
    ru: 'Подборка проектов, над которыми я работал, от концепции до запуска.',
    en: 'A selection of projects I\'ve worked on, from concept to launch.',
  },
  viewAllWork: { ru: 'Все работы', en: 'View all work' },
  projectWebDev: { ru: 'Веб-разработка', en: 'Web Development' },
  projectMobileApps: { ru: 'Мобильные приложения', en: 'Mobile Apps' },
  projectUiUx: { ru: 'UI/UX Дизайн', en: 'UI/UX Design' },
  projectBrand: { ru: 'Рендеры', en: 'Renders' },
  viewProject: { ru: 'Просмотр — ', en: 'View — ' },
  
  // Journal / Resume
  recentThoughts: { ru: 'Публикации', en: 'Recent Thoughts' },
  journalTitle: { ru: 'Опыт и ', en: 'Experience ' },
  journalInsights: { ru: 'образование', en: '& Education' },
  journalDescription: {
    ru: 'Мой профессиональный путь и квалификация.',
    en: 'My professional journey and qualifications.',
  },
  viewAllPosts: { ru: 'Все публикации', en: 'View all posts' },
  journalEntry1: { ru: 'Будущее веб-разработки', en: 'The Future of Web Development' },
  journalEntry2: { ru: 'Дизайн для доступности', en: 'Designing for Accessibility' },
  journalEntry3: { ru: 'Создание масштабируемых приложений', en: 'Building Scalable Applications' },
  journalEntry4: { ru: 'Искусство чистого кода', en: 'The Art of Clean Code' },
  minRead: { ru: ' мин', en: ' min read' },
  experience: { ru: 'Опыт работы', en: 'Work Experience' },
  education: { ru: 'Образование', en: 'Education' },
  position1: { ru: 'T1 Иннотех: Frontend Разработчик', en: 'T1 Innotech: Frontend Developer' },
  company1: { ru: 'Tech Company', en: 'Tech Company' },
  period1: { ru: '09.2024 — Наст. время', en: '09.2024 — Present' },
  description1: { ru: 'Разработка современных веб-приложений на React и TypeScript', en: 'Developing modern web applications using React and TypeScript' },
  degree1: { ru: 'Бакалавриат: 16.03.01 Техническая физика', en: 'Bachelor of Physics' },
  school1: { ru: 'Университет ИТМО', en: 'ITMO University' },
  period4: { ru: '2021 — 2025', en: '2021 — 2025' },
  description4: { ru: 'Специализация: программная инженерия и веб-технологии', en: 'Specialization: Software Engineering and Web Technologies' },
  degree2: { ru: 'Магистратура: 09.04.04 Программная инженерия', en: 'Masters of Computer Science' },
  school2: { ru: 'Университет ИТМО', en: 'ITMO University' },
  period5: { ru: '2025 — Наст. время', en: '2025 — Present' },
  description5: { ru: 'Изучение современных фреймворков и лучших практик разработки', en: 'Learning modern frameworks and development best practices' },
  
  // Explorations
  explorations: { ru: 'Визуализация', en: 'Visualization' },
  visualPlayground: { ru: 'Образ ', en: 'Visual ' },
  visualPlaygroundItalic: { ru: 'пространства', en: 'playground' },
  explorationsDescription: {
    ru: 'Коллекция рендеров экстерьеров и интерьеров.',
    en: 'A collection of exterior and interior renderings.',
  },
  followDribbble: { ru: 'Работы', en: 'Works' },
  
  // Stats
  yearsExperience: { ru: 'Года опыта', en: 'Years Experience' },
  projectsDone: { ru: 'Проектов выполнено', en: 'Projects Done' },
  satisfiedClients: { ru: 'Довольных клиентов', en: 'Satisfied Clients' },
  
  // Contact
  buildingFuture: { ru: 'СТРОИМ БУДУЩЕЕ • ', en: 'BUILDING THE FUTURE • ' },
  availableProjects: { ru: 'Открыт для проектов', en: 'Available for projects' },
  copyright: { ru: '© 2026 Владислав Рождественский', en: '© 2026 Vladislav Rozhdestvenskiy' },
  
  // Space Image Page
  backToHome: { ru: 'На главную', en: 'Back to Home' },
  architecture: { ru: 'Визуализация', en: 'VISUALIZATION' },
  spaceImageTitle: { ru: 'Образ пространства', en: 'Image of Space' },
  spaceImageDescription: { ru: 'Визуализация архитектурного проекта, воплощающая современные идеи дизайна и функциональности.', en: 'Visualization of an architectural project embodying modern design ideas and functionality.' },
  exterior: { ru: 'Экстерьер', en: 'Exterior' },
  interior: { ru: 'Интерьер', en: 'Interior' },
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
