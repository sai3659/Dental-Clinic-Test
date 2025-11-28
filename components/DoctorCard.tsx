
import React from 'react';
import { Doctor } from '../types';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="group relative h-full">
      {/* Dynamic Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-secondary to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>
      
      <div className="relative h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent p-4">
            <h3 className="text-white font-bold text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{doctor.name}</h3>
            <p className="text-sky-300 text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{doctor.specialization}</p>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow relative bg-white dark:bg-slate-800 z-10">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">4.9</span>
              <span className="text-xs text-slate-400">(120+ reviews)</span>
            </div>
            <span className="text-xs font-semibold bg-sky-50 dark:bg-slate-700 text-secondary dark:text-sky-300 px-2 py-1 rounded-full">
              {doctor.experience} Yrs Exp
            </span>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">{doctor.degrees}</p>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Clock size={14} />
              <span>{doctor.availability}</span>
          </div>

          <div className="flex gap-2 mt-auto">
            <Link to={`/doctors/${doctor.id}`} className="flex-1 border border-secondary dark:border-sky-500 text-secondary dark:text-sky-400 py-2 rounded-lg text-sm font-medium text-center hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors active:scale-95">
              Profile
            </Link>
            <Link to={`/booking?doctor=${doctor.id}`} className="flex-1 bg-secondary dark:bg-sky-600 text-white py-2 rounded-lg text-sm font-medium text-center hover:bg-teal-700 dark:hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
              Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
