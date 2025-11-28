
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DOCTORS } from '../constants';
import { Clock, Award, Star, Languages, GraduationCap, Calendar, CheckCircle } from 'lucide-react';

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = DOCTORS.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
        <Link to="/doctors" className="text-secondary dark:text-sky-400 hover:underline">
          Back to Doctors List
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors pb-20">
      {/* Header Background */}
      <div className="bg-secondary dark:bg-purple-900 h-64 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Image & Quick Stats */}
            <div className="md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col items-center text-center border-r border-slate-100 dark:border-slate-700">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg mb-6 border-4 border-white dark:border-slate-700">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{doctor.name}</h1>
              <p className="text-secondary dark:text-sky-400 font-medium mb-4">{doctor.designation}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="bg-sky-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                   <Star size={14} className="text-yellow-500 fill-yellow-500" /> 4.9 Rating
                </span>
                <span className="bg-sky-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                   {doctor.experience} Years Exp
                </span>
              </div>

              <Link 
                to={`/booking?doctor=${doctor.id}`} 
                className="w-full bg-secondary dark:bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 dark:hover:bg-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Calendar size={18} /> Book Appointment
              </Link>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="md:w-2/3 p-8 md:p-12 space-y-8">
              
              {/* Bio Section */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                   About {doctor.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {doctor.bio}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Specializations */}
                <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Award size={18} className="text-secondary dark:text-sky-400" /> Specialization
                   </h3>
                   <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                     <p className="font-semibold text-slate-800 dark:text-white mb-1">{doctor.specialization}</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Focuses on comprehensive care and advanced treatments.</p>
                   </div>
                </div>

                {/* Education */}
                <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                     <GraduationCap size={18} className="text-secondary dark:text-sky-400" /> Education
                   </h3>
                   <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                     <p className="font-semibold text-slate-800 dark:text-white mb-1">{doctor.degrees}</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Top-tier medical training and continuous education.</p>
                   </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 {/* Languages */}
                 <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Languages size={18} className="text-secondary dark:text-sky-400" /> Languages
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {doctor.languages.map(lang => (
                        <span key={lang} className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 text-sm">
                          {lang}
                        </span>
                      ))}
                   </div>
                 </div>

                 {/* Availability */}
                 <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Clock size={18} className="text-secondary dark:text-sky-400" /> Availability
                   </h3>
                   <p className="text-slate-700 dark:text-slate-300 font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 inline-block px-4 py-2 rounded-lg border border-green-100 dark:border-green-900/30">
                     {doctor.availability}
                   </p>
                 </div>
              </div>

              {/* Certifications */}
              <div>
                 <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Certifications & Memberships</h3>
                 <ul className="space-y-2">
                   {doctor.certifications.map((cert, idx) => (
                     <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                       <CheckCircle size={16} className="text-secondary dark:text-purple-400 flex-shrink-0" />
                       <span>{cert}</span>
                     </li>
                   ))}
                 </ul>
              </div>

              {/* Recent Reviews */}
              <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Patient Reviews</h3>
                <div className="space-y-4">
                  {doctor.reviews.map((review) => (
                    <div key={review.id} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white">{review.patientName}</p>
                          <div className="flex text-yellow-400 text-xs">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                             ))}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
