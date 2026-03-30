import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <main>
                <Hero />
                <SelectedWorks />
                <Journal />
                <Explorations />
                <Stats />
                <Contact />
              </main>
            </motion.div>
          )}
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
