import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { CLINIC_ADDRESS, CLINIC_EMAIL, CLINIC_PHONE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white pt-0 pb-20 md:pb-6 border-t-4 border-secondary dark:border-purple-600">
      {/* Full Width Map Section */}
      <div className="w-full h-80 md:h-96 relative grayscale hover:grayscale-0 transition-all duration-500">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.467368022791!2d78.36506307493481!3d17.465491083435165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c9288e6397%3A0x6d90d8a9e97c9451!2sKondapur%2C%20Hyderabad%2C%20Telangana%20500084!5e0!3m2!1sen!2sin!4v1709230000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{border:0}} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location"
          className="w-full h-full"
        ></iframe>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent h-20 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-gradient-to-tr from-secondary to-primary dark:from-indigo-500 dark:to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="font-bold text-lg">Galaxy Dental</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Providing world-class dental care in Hyderabad. Our mission is to deliver healthy smiles through advanced technology and compassionate care.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-800 flex items-center justify-center hover:bg-secondary dark:hover:bg-purple-600 cursor-pointer transition-colors"><Facebook size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-800 flex items-center justify-center hover:bg-secondary dark:hover:bg-purple-600 cursor-pointer transition-colors"><Instagram size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-800 flex items-center justify-center hover:bg-secondary dark:hover:bg-purple-600 cursor-pointer transition-colors"><Twitter size={20} /></div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400 dark:text-purple-400">Services</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="hover:text-white cursor-pointer">Root Canal Treatment</li>
              <li className="hover:text-white cursor-pointer">Dental Implants</li>
              <li className="hover:text-white cursor-pointer">Invisalign & Braces</li>
              <li className="hover:text-white cursor-pointer">Teeth Whitening</li>
              <li className="hover:text-white cursor-pointer">Pediatric Dentistry</li>
              <li className="hover:text-white cursor-pointer">Smile Designing</li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-sky-400 dark:text-purple-400">Contact Us</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="text-secondary dark:text-purple-400 shrink-0 mt-1" size={18} />
                  <span>{CLINIC_ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-secondary dark:text-purple-400 shrink-0" size={18} />
                  <span>{CLINIC_PHONE}</span>
                </li>
              </ul>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex items-center gap-3">
                  <Mail className="text-secondary dark:text-purple-400 shrink-0" size={18} />
                  <span>{CLINIC_EMAIL}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-secondary dark:text-purple-400 shrink-0 mt-1" size={18} />
                  <div>
                    <p>Mon - Sat: 10:00 AM - 9:00 PM</p>
                    <p>Sun: 10:00 AM - 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Galaxy Dental Clinic. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 p-3 border-t border-gray-200 dark:border-slate-800 z-50 flex gap-2">
        <a href={`tel:${CLINIC_PHONE}`} className="flex-1 bg-slate-800 dark:bg-slate-700 text-white rounded-lg flex items-center justify-center py-3 font-medium">
            Call
        </a>
        <a href="#/booking" className="flex-1 bg-secondary dark:bg-purple-600 text-white rounded-lg flex items-center justify-center py-3 font-medium">
            Book Now
        </a>
      </div>
    </footer>
  );
};

export default Footer;