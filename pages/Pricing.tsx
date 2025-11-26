import React from 'react';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Transparent Pricing</h1>
          <p className="text-slate-500 dark:text-slate-400">We believe in honest, upfront pricing. No hidden fees.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
           <div className="bg-slate-900 dark:bg-black p-6 text-white grid grid-cols-3 font-semibold text-sm md:text-base">
              <div className="col-span-2">Treatment</div>
              <div className="text-right">Price Range</div>
           </div>
           <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <div className="p-6 grid grid-cols-3 items-center hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors">
                <div className="col-span-2">
                  <h3 className="font-bold text-slate-800 dark:text-white">General Consultation</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Includes X-Ray if needed</p>
                </div>
                <div className="text-right font-medium text-secondary dark:text-sky-400">₹300 - ₹500</div>
              </div>
              
              {SERVICES.map((service) => (
                <div key={service.id} className="p-6 grid grid-cols-3 items-center hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="col-span-2">
                    <h3 className="font-bold text-slate-800 dark:text-white">{service.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{service.shortDescription}</p>
                  </div>
                  <div className="text-right font-medium text-secondary dark:text-sky-400">{service.priceRange}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-secondary dark:border-sky-500">
               <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Insurance Partners</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">We accept cashless treatments for major insurance providers.</p>
               <div className="flex flex-wrap gap-2">
                  {['Star Health', 'Bajaj Allianz', 'ICICI Lombard', 'HDFC ERGO'].map(ins => (
                    <span key={ins} className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300">{ins}</span>
                  ))}
               </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md border-t-4 border-primary dark:border-purple-500">
               <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">EMI Options</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">0% Interest EMI available for treatments above ₹15,000.</p>
               <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-green-500"/> Bajaj Finserv</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-green-500"/> Credit Card EMI</li>
               </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;