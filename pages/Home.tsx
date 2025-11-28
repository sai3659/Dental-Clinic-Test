
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DOCTORS, SERVICES, TESTIMONIALS } from '../constants';
import DoctorCard from '../components/DoctorCard';
import { ArrowRight, CheckCircle2, Shield, Calendar, Phone, Star, ChevronLeft, ChevronRight, Quote, Sparkles, Activity } from 'lucide-react';

// Custom Tooth Icon Component
const ToothIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2C4.24 2 2 4.24 2 7C2 9.3 3.62 11.23 5.79 11.81L4.7 19.44C4.55 20.3 5.3 21 6.16 21H17.84C18.7 21 19.45 20.3 19.3 19.44L18.21 11.81C20.38 11.23 22 9.3 22 7C22 4.24 19.76 2 17 2C15.05 2 13.36 3.12 12.5 4.78L12 5.86L11.5 4.78C10.64 3.12 8.95 2 7 2ZM7 4C8.28 4 9.41 4.73 9.97 5.83L11.11 8.08L12 9.83L12.89 8.08L14.03 5.83C14.59 4.73 15.72 4 17 4C18.66 4 20 5.34 20 7C20 8.35 19.11 9.5 17.88 9.88L18.06 10.45L19.06 18.06C19.09 18.27 18.92 18.44 18.71 18.44H13.5V13H10.5V18.44H5.29C5.08 18.44 4.91 18.27 4.94 18.06L5.94 10.45L6.12 9.88C4.89 9.5 4 8.35 4 7C4 5.34 5.34 4 7 4Z"/>
  </svg>
);

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string; decimals?: number }> = ({ end, duration = 2000, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeOut * end);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return <span ref={elementRef}>{displayValue}{suffix}</span>;
};

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full">
      {/* Hero Section - Redesigned Vibrant Style */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 dark:bg-slate-900">
        
        {/* Dynamic Animated Background (Blobs & Dental Icons) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Base Color Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 md:w-[600px] md:h-[600px] bg-sky-300 dark:bg-sky-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
          <div 
            className="absolute top-0 -right-4 w-72 h-72 md:w-[600px] md:h-[600px] bg-teal-300 dark:bg-teal-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute -bottom-32 left-20 w-72 h-72 md:w-[600px] md:h-[600px] bg-emerald-300 dark:bg-emerald-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"
            style={{ animationDelay: '4s' }}
          ></div>

          {/* Floating Dental Icons Layer */}
          <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
            {/* Tooth Icon - Top Left */}
            <div className="absolute top-20 left-[10%] text-sky-500 animate-float" style={{animationDelay: '0s'}}>
               <ToothIcon className="w-16 h-16 md:w-24 md:h-24 drop-shadow-lg" />
            </div>

            {/* Sparkle - Top Right Center */}
            <div className="absolute top-32 right-[30%] text-yellow-400 animate-pulse-slow" style={{animationDelay: '1s'}}>
               <Sparkles className="w-8 h-8 md:w-12 md:h-12 drop-shadow-md" />
            </div>

            {/* Tooth Icon - Bottom Right */}
            <div className="absolute bottom-40 right-[10%] text-teal-500 animate-float-delayed" style={{animationDelay: '2s'}}>
               <ToothIcon className="w-20 h-20 md:w-28 md:h-28 drop-shadow-lg rotate-12" />
            </div>

            {/* Shield/Protection - Bottom Left */}
            <div className="absolute bottom-20 left-[15%] text-indigo-400 animate-float" style={{animationDelay: '1.5s'}}>
               <Shield className="w-12 h-12 md:w-16 md:h-16 drop-shadow-md" />
            </div>

            {/* Activity/Heartbeat - Center Right */}
            <div className="absolute top-1/2 right-[5%] text-pink-400 animate-pulse-slow">
               <Activity className="w-10 h-10 md:w-14 md:h-14 drop-shadow-md" />
            </div>

            {/* Small Tooth - Top Center */}
             <div className="absolute top-10 left-[45%] text-emerald-400 animate-float-delayed" style={{animationDelay: '3s'}}>
               <ToothIcon className="w-10 h-10 md:w-14 md:h-14 drop-shadow-sm -rotate-12" />
            </div>
            
            {/* Star - Bottom Center */}
            <div className="absolute bottom-10 left-[40%] text-sky-300 animate-spin-slow opacity-60">
               <Star className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>
        </div>

        {/* Mobile Specific Background Image (Overlay) */}
        <div className="absolute inset-0 md:hidden z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop" 
            alt="Dental Clinic Background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-5 mix-blend-overlay"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/20 dark:border-slate-700 shadow-sm text-secondary dark:text-sky-300 text-sm font-semibold animate-fade-in mx-auto md:mx-0">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary dark:bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary dark:bg-sky-400"></span>
                  </span>
                  No. 1 Dental Clinic in Kondapur
               </div>

               <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                  Experience the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-sky-500 to-primary dark:from-sky-300 dark:via-purple-400 dark:to-pink-400">Galaxy</span> of Smiles
               </h1>

               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto md:mx-0">
                  State-of-the-art dental care where advanced technology meets compassionate treatment. Join our family for a brighter, healthier future.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                  <Link to="/booking" className="bg-gradient-to-r from-secondary to-primary dark:from-indigo-600 dark:to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-sky-200 dark:shadow-indigo-900/50 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y-0 transition-all duration-300 text-center flex items-center justify-center gap-2">
                    <Calendar size={20} /> Book Appointment
                  </Link>
                  <Link to="/contact" className="bg-white dark:bg-slate-800 text-secondary dark:text-sky-300 border border-secondary dark:border-slate-600 px-8 py-4 rounded-full font-bold hover:bg-sky-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2">
                    <Phone size={20} /> Call Now
                  </Link>
               </div>

               <div className="flex items-center gap-8 pt-4 justify-center md:justify-start">
                  <div className="flex -space-x-4">
                     {[1,2,3,4].map((i) => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden hover:scale-110 transition-transform z-0 hover:z-20">
                          <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="Patient" className="w-full h-full object-cover" />
                       </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-secondary dark:bg-purple-600 text-white flex items-center justify-center text-xs font-bold z-10 hover:scale-110 transition-transform">
                       <AnimatedCounter end={5000} suffix="+" duration={2000} />
                     </div>
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                     <div className="flex text-yellow-400 mb-1 justify-center md:justify-start">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                     </div>
                     Happy Patients
                  </div>
               </div>
            </div>

            {/* Visual Content (Hidden on Mobile, shown on Desktop) */}
            <div className="relative hidden lg:block">
               {/* Main Card */}
               <div className="relative z-20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-white/50 dark:border-white/10 p-4 rounded-[2.5rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 group">
                  <div className="rounded-[2rem] overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Modern Dental Clinic" className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -left-12 top-1/4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow hover:scale-110 transition-transform">
                     <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full text-green-600 dark:text-green-400">
                        <Shield size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-800 dark:text-white">100% Safe</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Sterilized Tools</p>
                     </div>
                  </div>

                  <div className="absolute -right-8 bottom-1/4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow hover:scale-110 transition-transform" style={{animationDelay: '1s'}}>
                     <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full text-sky-600 dark:text-sky-400">
                        <CheckCircle2 size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-800 dark:text-white">Top Rated</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Clinic in City</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Comprehensive Dental Services</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">We use the latest technology to provide treatments that are effective, durable, and minimally invasive.</p>
          </div>
          {/* Modified Grid for Mobile: grid-cols-2 instead of grid-cols-1 */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 border border-transparent hover:border-sky-100 dark:hover:border-slate-700 group flex flex-col h-full hover:scale-[1.02]">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-secondary dark:text-sky-400 mb-4 md:mb-6 group-hover:bg-secondary dark:group-hover:bg-purple-600 group-hover:text-white transition-colors border border-slate-100 dark:border-slate-700 group-hover:scale-110 duration-300">
                  <div className="font-bold text-xl md:text-2xl">{service.title.charAt(0)}</div>
                </div>
                <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3 line-clamp-2">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3 flex-grow">{service.shortDescription}</p>
                <Link to="/services" className="inline-flex items-center text-secondary dark:text-sky-400 font-semibold text-xs md:text-sm hover:gap-2 transition-all mt-auto group-hover:text-primary">
                  Learn More <ArrowRight size={16} className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-secondary dark:hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
              View All Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Galaxy Dental Clinic?</h2>
               <div className="space-y-6">
                 <div className="flex gap-4 group cursor-default">
                   <div className="bg-secondary/20 dark:bg-purple-600/20 p-3 rounded-lg h-fit text-secondary dark:text-purple-400 group-hover:scale-110 transition-transform"><Shield size={24} /></div>
                   <div>
                     <h4 className="text-xl font-semibold mb-2 group-hover:text-secondary dark:group-hover:text-purple-400 transition-colors">Advanced Sterilization</h4>
                     <p className="text-slate-400 text-sm">We follow strict 7-step sterilization protocols to ensure 100% patient safety.</p>
                   </div>
                 </div>
                 <div className="flex gap-4 group cursor-default">
                   <div className="bg-secondary/20 dark:bg-purple-600/20 p-3 rounded-lg h-fit text-secondary dark:text-purple-400 group-hover:scale-110 transition-transform"><CheckCircle2 size={24} /></div>
                   <div>
                     <h4 className="text-xl font-semibold mb-2 group-hover:text-secondary dark:group-hover:text-purple-400 transition-colors">Transparent Pricing</h4>
                     <p className="text-slate-400 text-sm">No hidden charges. We explain the treatment cost before starting any procedure.</p>
                   </div>
                 </div>
                 <div className="flex gap-4 group cursor-default">
                   <div className="bg-secondary/20 dark:bg-purple-600/20 p-3 rounded-lg h-fit text-secondary dark:text-purple-400 group-hover:scale-110 transition-transform"><Calendar size={24} /></div>
                   <div>
                     <h4 className="text-xl font-semibold mb-2 group-hover:text-secondary dark:group-hover:text-purple-400 transition-colors">Automated Care</h4>
                     <p className="text-slate-400 text-sm">Automated reminders for appointments, checkups, and post-treatment care instructions.</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500">
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-secondary dark:text-purple-400 mb-2">
                    <AnimatedCounter end={15000} suffix="+" duration={2500} />
                  </p>
                  <p className="text-slate-300">Happy Smiles Created</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 dark:bg-slate-900 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter end={15} suffix="+" duration={1500} />
                    </p>
                    <p className="text-xs text-slate-400">Expert Doctors</p>
                  </div>
                  <div className="bg-slate-800 dark:bg-slate-900 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter end={4.9} decimals={1} duration={1500} />
                    </p>
                    <p className="text-xs text-slate-400">Google Rating</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Doctors Spotlight */}
      <section className="py-20 bg-sky-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Meet Our Experts</h2>
            <p className="text-slate-500 dark:text-slate-400">Highly qualified specialists for every dental need.</p>
          </div>
          
          {/* Horizontal Scrolling Row */}
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {DOCTORS.map((doctor) => (
              <div key={doctor.id} className="min-w-[85vw] sm:min-w-[350px] md:min-w-[380px] snap-center h-full">
                 <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
             <Link to="/doctors" className="inline-flex items-center gap-2 text-secondary dark:text-sky-400 font-bold hover:gap-3 transition-all border border-secondary dark:border-sky-400 px-8 py-3 rounded-full hover:bg-secondary hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-900 hover:shadow-lg hover:scale-105 active:scale-95">
               View All Doctors <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Patient Stories</h2>
            <p className="text-slate-500 dark:text-slate-400">Hear what our patients have to say about their experience.</p>
          </div>

          <div className="relative">
             <div className="overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 relative transition-colors hover:shadow-2xl duration-300">
                  <Quote size={48} className="absolute top-8 left-8 text-secondary/20 dark:text-purple-600/20" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 animate-fade-in key={currentTestimonial}">
                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg flex-shrink-0">
                        <img src={TESTIMONIALS[currentTestimonial].image} alt={TESTIMONIALS[currentTestimonial].name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">"{TESTIMONIALS[currentTestimonial].comment}"</p>
                        <div>
                           <h4 className="font-bold text-lg text-slate-900 dark:text-white">{TESTIMONIALS[currentTestimonial].name}</h4>
                           <p className="text-sm text-secondary dark:text-sky-400 font-medium">{TESTIMONIALS[currentTestimonial].location}</p>
                           <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < TESTIMONIALS[currentTestimonial].rating ? "currentColor" : "none"} strokeWidth={i < TESTIMONIALS[currentTestimonial].rating ? 0 : 2} className={i < TESTIMONIALS[currentTestimonial].rating ? "" : "text-slate-300 dark:text-slate-600"} />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             {/* Navigation Controls */}
             <div className="flex justify-center items-center gap-4 mt-8">
               <button onClick={prevTestimonial} className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 active:scale-95">
                 <ChevronLeft size={24} />
               </button>
               <div className="flex gap-2">
                 {TESTIMONIALS.map((_, idx) => (
                   <button 
                     key={idx} 
                     onClick={() => setCurrentTestimonial(idx)}
                     className={`h-3 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'bg-secondary dark:bg-purple-600 w-8 scale-110' : 'bg-slate-300 dark:bg-slate-700 w-3 hover:bg-slate-400'}`}
                   />
                 ))}
               </div>
               <button onClick={nextTestimonial} className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 active:scale-95">
                 <ChevronRight size={24} />
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary to-teal-800 dark:from-indigo-600 dark:to-purple-800 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-110 transition-transform duration-1000"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to transform your smile?</h2>
            <p className="text-teal-100 dark:text-purple-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">Book an appointment today and get a free initial consultation for dental implants and braces.</p>
            <Link to="/booking" className="inline-block bg-white text-teal-800 dark:text-purple-800 px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10">
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
