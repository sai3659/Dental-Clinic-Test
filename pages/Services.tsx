
import React from 'react';
import { SERVICES } from '../constants';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors">
       <div className="bg-secondary dark:bg-purple-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Treatments</h1>
            <p className="text-teal-100 dark:text-purple-200 max-w-2xl mx-auto">World-class dental procedures at affordable prices.</p>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                 <div className="bg-sky-50 dark:bg-slate-800 rounded-3xl p-1 relative group overflow-hidden shadow-2xl">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="rounded-2xl w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
                 </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                 <div className="w-16 h-16 bg-sky-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-secondary dark:text-sky-400 font-bold text-2xl mb-4 border border-slate-100 dark:border-slate-700 relative group cursor-help transition-transform hover:scale-110">
                   {service.title.charAt(0)}
                   {/* Tooltip */}
                   <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {service.title}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
                   </span>
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{service.title}</h2>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{service.description}</p>
                 
                 <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                   <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Key Benefits:</h4>
                   <ul className="grid grid-cols-1 gap-2">
                     {service.benefits.map((benefit, idx) => (
                       <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                         <Check size={16} className="text-green-500" /> {benefit}
                       </li>
                     ))}
                   </ul>
                 </div>

                 <div className="flex items-center justify-between pt-4">
                    <div>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Estimated Cost</span>
                      <span className="text-xl font-bold text-secondary dark:text-sky-400">{service.priceRange}</span>
                    </div>
                    <Link to={`/booking`} className="bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary dark:hover:bg-purple-600 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
                      Book Now
                    </Link>
                 </div>
              </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default Services;
