
import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", title: "Modern Treatment Area" },
    { url: "https://images.unsplash.com/photo-1609840114035-1c29046a8af3?q=80&w=800&auto=format&fit=crop", title: "Patient Consultation" },
    { url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop", title: "Advanced Equipment" },
    { url: "https://images.unsplash.com/photo-1445527697940-617d9ccdae9e?q=80&w=800&auto=format&fit=crop", title: "Dental Implants Model" },
    { url: "https://images.unsplash.com/photo-1590611936760-eeb9bc598548?q=80&w=800&auto=format&fit=crop", title: "Sterilized Instruments" },
    { url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?q=80&w=800&auto=format&fit=crop", title: "Smile Makeover Results" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">Clinic Gallery</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Take a look at our state-of-the-art facilities and advanced dental technology. We maintain the highest standards of hygiene and comfort.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {images.map((img, idx) => (
             <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-72">
               <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <span className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</span>
                 <span className="text-sky-300 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">View Details</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
