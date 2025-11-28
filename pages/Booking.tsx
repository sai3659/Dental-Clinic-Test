
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DOCTORS, SERVICES } from '../constants';
import { CheckCircle, Calendar as CalendarIcon, Clock, User, Phone, Mail, ChevronLeft, ChevronRight, Loader2, Info, MessageSquare, Bell, Gift, FileText, HeartPulse } from 'lucide-react';
import { Doctor } from '../types';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedDoctor = searchParams.get('doctor');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [automationLog, setAutomationLog] = useState<string[]>([]);
  
  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const [formData, setFormData] = useState({
    doctorId: preSelectedDoctor || '',
    serviceId: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Doctor Availability Logic (Simulation)
  const getDoctorAvailability = (docId: string) => {
    if (docId === 'dr-sharma') return { days: [1,2,3,4,5,6], startHour: 10, endHour: 14, label: 'Mon-Sat: 10AM - 2PM' };
    if (docId === 'dr-reddy') return { days: [0,2,3,4,5,6], startHour: 11, endHour: 20, label: 'Tue-Sun: 11AM - 8PM' };
    if (docId === 'dr-priya') return { days: [1,2,3,4,5,6], startHour: 16, endHour: 21, label: 'Mon-Sat: 4PM - 9PM' };
    return { days: [0,1,2,3,4,5,6], startHour: 9, endHour: 21, label: 'Daily: 9AM - 9PM' }; // Default
  };

  const selectedDoctorObj = DOCTORS.find(d => d.id === formData.doctorId);
  const availability = getDoctorAvailability(formData.doctorId);

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() && 
           d.getMonth() === today.getMonth() && 
           d.getFullYear() === today.getFullYear();
  };

  const isPast = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isDoctorAvailableOnDay = (date: Date) => {
    if (!formData.doctorId) return true;
    return availability.days.includes(date.getDay());
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isPast(newDate) && isDoctorAvailableOnDay(newDate)) {
      setSelectedDate(newDate);
      setFormData({ ...formData, time: '' }); // Reset time when date changes
    }
  };

  // Time Slots Generator (Dynamic based on doctor)
  const generateTimeSlots = () => {
    if (!selectedDate) return [];
    
    const slots = [];
    const { startHour, endHour } = availability;
    const now = new Date();
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour <= 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      const timeDate = new Date(selectedDate);
      timeDate.setHours(hour, 0, 0, 0);

      // If selected date is today, filter past times
      if (isToday(selectedDate)) {
        if (timeDate > now) {
          slots.push(timeString);
        }
      } else {
        slots.push(timeString);
      }
      
      // Half hour slots
      const halfTimeDate = new Date(selectedDate);
      halfTimeDate.setHours(hour, 30, 0, 0);
      const halfTimeString = `${hour <= 12 ? hour : hour - 12}:30 ${hour < 12 ? 'AM' : 'PM'}`;
      
      // Ensure half hour slot is also before endHour
      if (hour < endHour) {
         if (isToday(selectedDate)) {
          if (halfTimeDate > now) {
            slots.push(halfTimeString);
          }
        } else {
          slots.push(halfTimeString);
        }
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    if (e.target.name === 'doctorId') {
      setSelectedDate(null); // Reset date if doctor changes to prevent invalid selections
      setFormData(prev => ({ ...prev, doctorId: e.target.value, time: '' }));
    }
  };

  const simulateAutomation = async () => {
    setLoading(true);
    setAutomationLog([]);
    
    // Prepare Data for Webhook
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const payload = {
      doctor: formData.doctorId,
      service: formData.serviceId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      notes: formData.notes,
      appointmentDate: selectedDate ? formatDate(selectedDate) : '',
      appointmentTime: formData.time
    };
    
    const steps = [
      "Validating patient details...",
      "Checking doctor availability...",
      "Syncing with Clinic Management System...",
      "Setting up 24hr & 2hr SMS/WhatsApp reminders...",
      "Scheduling post-treatment care instructions...",
      "Checking birthday for personalized coupon...",
      "Finalizing appointment slot..."
    ];

    for (const log of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAutomationLog(prev => [...prev, log]);
      
      // Hook into specific steps for simulated actions
      if (log === "Syncing with Clinic Management System...") {
         console.log("Sending data to webhook (Simulated):", payload);
         
         // Webhook commented out to prevent errors
         /*
         fetch("https://enormous-copyrighted-instruments-stores.trycloudflare.com/webhook/dental-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }).catch(err => console.warn("Webhook unavailable (expected in demo):", err));
         */
      }
    }

    setLoading(false);
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.name && formData.phone && formData.doctorId) {
        setStep(2);
      } else {
        alert('Please fill in all required details');
      }
    } else {
      simulateAutomation();
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="mb-8">
           <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10"></div>
              {[1, 2, 3].map((s) => (
                <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s ? 'bg-secondary dark:bg-purple-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
              ))}
           </div>
           <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Details</span>
              <span>Slot</span>
              <span>Confirm</span>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors">
          {step === 1 && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Patient Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Specialist</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select 
                      name="doctorId" 
                      value={formData.doctorId} 
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none appearance-none dark:text-white transition-colors"
                      required
                    >
                      <option value="">-- Choose Doctor --</option>
                      {DOCTORS.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Treatment Type</label>
                  <div className="relative">
                    <Info className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select 
                      name="serviceId" 
                      value={formData.serviceId} 
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none appearance-none dark:text-white transition-colors"
                      required
                    >
                      <option value="">-- Choose Service --</option>
                      {SERVICES.map(service => (
                        <option key={service.id} value={service.id}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                  <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Personal Info</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors"
                        required 
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone Number" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors"
                        required 
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors"
                        required 
                      />
                    </div>
                     <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                      <textarea 
                        name="notes" 
                        placeholder="Any specific notes or questions for the doctor? (Optional)" 
                        value={formData.notes} 
                        onChange={handleChange} 
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none dark:text-white transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-secondary dark:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 dark:hover:bg-purple-700 transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95">
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
             <div className="p-8 animate-fade-in">
               {!loading ? (
                 <>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                       <CalendarIcon className="text-secondary dark:text-purple-400" /> Select Date & Time
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                       Checking availability for <span className="font-semibold text-secondary dark:text-sky-400">{selectedDoctorObj?.name || 'Any Doctor'}</span>
                    </p>

                    {/* Custom Calendar */}
                    <div className="mb-8 select-none">
                       <div className="flex justify-between items-center mb-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                          <button onClick={handlePrevMonth} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-transform active:scale-90"><ChevronLeft size={20}/></button>
                          <span className="font-bold text-lg text-slate-800 dark:text-white">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </span>
                          <button onClick={handleNextMonth} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-transform active:scale-90"><ChevronRight size={20}/></button>
                       </div>
                       
                       <div className="grid grid-cols-7 text-center mb-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-xs font-bold text-slate-400 uppercase">{day}</div>
                          ))}
                       </div>

                       <div className="grid grid-cols-7 gap-1">
                          {/* Empty cells for start of month */}
                          {[...Array(getFirstDayOfMonth(currentMonth))].map((_, i) => <div key={`empty-${i}`} />)}
                          
                          {/* Days */}
                          {[...Array(getDaysInMonth(currentMonth))].map((_, i) => {
                             const day = i + 1;
                             const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                             const isPastDay = isPast(date);
                             const isAvailable = isDoctorAvailableOnDay(date);
                             const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                             
                             let cellClass = "h-12 flex flex-col items-center justify-center rounded-xl text-sm transition-all duration-200 relative ";
                             
                             if (isPastDay || !isAvailable) {
                               cellClass += "text-slate-300 dark:text-slate-700 cursor-not-allowed bg-transparent";
                             } else if (isSelected) {
                               cellClass += "bg-secondary dark:bg-purple-600 text-white shadow-md scale-105 font-bold ring-2 ring-offset-2 ring-secondary dark:ring-purple-600 dark:ring-offset-slate-800";
                             } else {
                               cellClass += "text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 cursor-pointer font-medium hover:scale-105 active:scale-95";
                             }

                             return (
                               <div key={day} onClick={() => handleDateClick(day)} className={cellClass}>
                                  {day}
                                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full mt-1"></span>}
                               </div>
                             );
                          })}
                       </div>
                       
                       <div className="flex gap-4 justify-center mt-6 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-secondary dark:bg-purple-600"></span> Selected</div>
                          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border border-secondary text-secondary font-bold flex items-center justify-center text-[8px]">12</span> Today</div>
                          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></span> Unavailable</div>
                       </div>
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div className="animate-fade-in border-t border-slate-100 dark:border-slate-700 pt-6">
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                           <Clock size={16} className="text-slate-400"/> Available Slots
                        </h3>
                        {timeSlots.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                             {timeSlots.map((slot) => (
                               <button
                                 key={slot}
                                 type="button"
                                 onClick={() => setFormData({...formData, time: slot})}
                                 className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                   formData.time === slot 
                                     ? 'bg-secondary dark:bg-purple-600 text-white shadow-md scale-110 ring-2 ring-offset-2 ring-secondary dark:ring-purple-600 dark:ring-offset-slate-800' 
                                     : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 hover:scale-105 active:scale-95'
                                 }`}
                               >
                                 {slot}
                               </button>
                             ))}
                          </div>
                        ) : (
                          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">No slots available for this date. Please choose another.</p>
                        )}
                      </div>
                    )}
                 
                    <div className="pt-8 flex justify-between">
                       <button type="button" onClick={() => setStep(1)} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium flex items-center gap-2 transition-transform hover:-translate-x-1">
                         <ChevronLeft size={18} /> Back
                       </button>
                       <button 
                         type="button" 
                         onClick={handleSubmit} 
                         disabled={!selectedDate || !formData.time}
                         className={`px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all ${
                            !selectedDate || !formData.time 
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                            : 'bg-secondary dark:bg-purple-600 text-white hover:bg-teal-700 dark:hover:bg-purple-700 hover:scale-105 active:scale-95'
                         }`}
                       >
                         Confirm Booking <CheckCircle size={18} />
                       </button>
                    </div>
                 </>
               ) : (
                 <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative mb-8">
                       <div className="absolute inset-0 bg-secondary/20 dark:bg-purple-600/20 rounded-full blur-xl animate-pulse"></div>
                       <Loader2 size={64} className="text-secondary dark:text-purple-500 animate-spin relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Processing Appointment</h3>
                    <div className="w-full max-w-md bg-slate-100 dark:bg-slate-900 rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs border border-slate-200 dark:border-slate-700 shadow-inner">
                       {automationLog.map((log, i) => (
                         <div key={i} className="mb-2 flex items-start gap-2 text-slate-600 dark:text-slate-300 animate-fade-in">
                            <span className="text-green-500">➜</span> {log}
                         </div>
                       ))}
                       <div className="animate-pulse text-secondary dark:text-sky-400">_</div>
                    </div>
                 </div>
               )}
             </div>
          )}

          {step === 3 && (
            <div className="p-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Booking Confirmed!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Your appointment has been successfully scheduled.</p>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 mb-8 border border-slate-100 dark:border-slate-700 text-left max-w-md mx-auto">
                 <div className="flex justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <span className="text-slate-500 dark:text-slate-400">Appointment ID</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-white">#GAL-{Math.floor(Math.random() * 10000)}</span>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Doctor</span>
                       <span className="font-medium text-slate-900 dark:text-white">{selectedDoctorObj?.name}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Date</span>
                       <span className="font-medium text-slate-900 dark:text-white">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Time</span>
                       <span className="font-medium text-slate-900 dark:text-white">{formData.time}</span>
                    </div>
                 </div>
              </div>

              {/* Automation Feedback for User */}
              <div className="mb-8 text-left max-w-md mx-auto">
                 <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-4 border-secondary dark:border-purple-500 pl-3">
                    Galaxy Automated Care
                 </h3>
                 <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-sky-50 dark:bg-slate-800/50 p-3 rounded-lg border border-sky-100 dark:border-slate-700">
                       <Bell size={18} className="text-secondary dark:text-purple-400 mt-0.5 shrink-0" />
                       <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Reminders Set</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">You will receive SMS & WhatsApp alerts 24hrs and 2hrs before your visit.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3 bg-purple-50 dark:bg-slate-800/50 p-3 rounded-lg border border-purple-100 dark:border-slate-700">
                       <Gift size={18} className="text-purple-500 dark:text-purple-400 mt-0.5 shrink-0" />
                       <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Birthday Club</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">We've noted your birthday! Expect a special 10% off coupon on your special day.</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800/50 p-3 rounded-lg border border-green-100 dark:border-slate-700">
                       <HeartPulse size={18} className="text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                       <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Post-Care Guide</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">A personalized 'Do's & Don'ts' guide will be sent to your email after the treatment.</p>
                       </div>
                    </div>
                 </div>
              </div>

              <button onClick={() => navigate('/')} className="text-secondary dark:text-sky-400 font-semibold hover:underline">
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
