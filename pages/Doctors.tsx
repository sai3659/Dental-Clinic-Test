import React from 'react';
import { DOCTORS } from '../constants';
import DoctorCard from '../components/DoctorCard';

const Doctors: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Medical Team</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Meet the experienced professionals dedicated to your smile. Our team covers all specialties of dentistry under one roof.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;