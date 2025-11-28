
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
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/917993051031"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-20 md:right-24 z-50 p-3 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 hover:bg-[#20bd5a] animate-bounce-slow"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

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