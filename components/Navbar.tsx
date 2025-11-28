
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar, Moon, Sun } from 'lucide-react';
import { CLINIC_PHONE } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleBookNow = () => {
    navigate('/booking');
    setIsOpen(false);
  }

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              {/* Dynamic Logo Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-teal-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-tr from-secondary via-sky-500 to-primary dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shadow-xl animate-gradient-xy transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <span className="drop-shadow-md">G</span>
                </div>
              </div>
              
              {/* Dynamic Text */}
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-primary transition-all duration-300">
                  Galaxy
                </span>
                <span className="text-secondary dark:text-sky-400 text-sm font-medium tracking-wide group-hover:tracking-wider transition-all duration-300">
                  Dental Clinic
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isActive(link.path) 
                    ? 'text-secondary dark:text-sky-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button
               onClick={toggleTheme}
               className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-90"
               aria-label="Toggle Dark Mode"
             >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             <a href={`tel:${CLINIC_PHONE}`} className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-secondary dark:hover:text-white text-sm font-medium hover:scale-105 transition-transform">
                <Phone size={16} />
                <span>Call Us</span>
             </a>
            <button
              onClick={handleBookNow}
              className="bg-gradient-to-r from-secondary to-primary dark:from-indigo-600 dark:to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
               onClick={toggleTheme}
               className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-90"
             >
               {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
             </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-secondary p-2 transition-transform active:scale-90"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-all active:scale-98 ${
                  isActive(link.path)
                    ? 'bg-sky-50 dark:bg-slate-800 text-secondary dark:text-sky-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleBookNow}
              className="w-full mt-4 bg-gradient-to-r from-secondary to-primary dark:from-indigo-600 dark:to-purple-600 text-white px-5 py-3 rounded-lg text-base font-semibold shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Calendar size={20} />
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
