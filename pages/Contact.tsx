
import React from 'react';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="bg-secondary dark:bg-purple-900 h-64 w-full absolute top-16 left-0 z-0 transition-colors"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row transition-colors">
           {/* Contact Info */}
           <div className="lg:w-2/5 bg-slate-900 dark:bg-black text-white p-10 lg:p-16">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <p className="text-slate-400 mb-12">Have questions about your dental health? Visit us or drop a message.</p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-secondary dark:text-purple-400 shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Visit Us</h4>
                    <p className="text-slate-300 text-sm mt-1">{CLINIC_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-secondary dark:text-purple-400 shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Call Us</h4>
                    <p className="text-slate-300 text-sm mt-1">{CLINIC_PHONE}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-secondary dark:text-purple-400 shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="text-slate-300 text-sm mt-1">{CLINIC_EMAIL}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-secondary dark:text-purple-400 shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold text-lg">Timings</h4>
                    <p className="text-slate-300 text-sm mt-1">Mon - Sat: 10AM - 9PM</p>
                    <p className="text-slate-300 text-sm">Sunday: 10AM - 2PM</p>
                  </div>
                </div>
              </div>
           </div>

           {/* Form */}
           <div className="lg:w-3/5 p-10 lg:p-16">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send Message</h2>
              <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                      <input type="text" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors"></textarea>
                 </div>
                 <button className="bg-secondary dark:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 dark:hover:bg-purple-700 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
                   Send Message
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
