
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      <Navbar />
      <main className="flex-grow pt-16"> 
        {children}
      </main>
      <Footer />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 md:bottom-8 left-6 z-40 p-3 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default Layout;