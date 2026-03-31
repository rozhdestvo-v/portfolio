import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Contact from './components/Contact';
import SpaceImagePage from './pages/SpaceImagePage';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ждём полной загрузки страницы
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', () => setIsLoading(false));
      return () => window.removeEventListener('load', () => setIsLoading(false));
    }
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-bg text-text-primary font-body">
          <AnimatePresence>
            {isLoading && (
              <LoadingScreen onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {!isLoading && (
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Navbar />
                  <main>
                    <Hero />
                    <Explorations />
                    <SelectedWorks />
                    <Journal />
                    <Stats />
                    <Contact />
                  </main>
                </motion.div>
              } />
              <Route path="/works" element={<SpaceImagePage />} />
            </Routes>
          )}
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
