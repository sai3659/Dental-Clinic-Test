
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
    // Simple parsing based on the static string data or hardcoded for demo
    // Dr. Sharma: Mon-Sat, 10-2
    // Dr. Reddy: Tue-Sun, 11-8
    // Dr. Priya: Mon-Sat, 4-9
    
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
      
      // Ensure half hour slot is also before endHour (simple check, strictly usually endHour means close time)
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

    const logs = [
      "Checking Doctor's Availability...",
      "Validating Time Slot...",
      "Slot confirmed.",
      "Generating Patient ID: GALAXY-" + Math.floor(1000 + Math.random() * 9000),
      "Configuring 24h SMS & WhatsApp Reminders...",
      "Scheduling 2h Prior Email Notification...",
      "Enrolling in Birthday Rewards Program (10% Off)...",
      "Preparing Post-Treatment Care Guide...",
      "Setting up Aligner/Checkup Follow-up Sequence...",
      "Syncing with Clinic Management System...",
      "Booking Confirmed!"
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 600)); // Simulate delay
      setAutomationLog(prev => [...prev, logs[i]]);
      
      // Trigger Webhook when 'Syncing' log appears
      if (logs[i].includes("Syncing")) {
        try {
          // Sending data to n8n webhook (Cloudflare Tunnel URL)
          await fetch("https://enormous-copyrighted-instruments-stores.trycloudflare.com/webhook/dental-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        } catch (error) {
          // Log as warning to avoid "Failed to fetch" red errors in console appearing as crashes to the user
          // This allows the demo to continue even if the webhook tunnel is down
          console.warn("Webhook sync skipped: Server is offline or unreachable.", error);
        }
      }
    }

    setLoading(false);
    setStep(3); // Success screen
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.time) {
      alert("Please select a date and time.");
      return;
    }
    setStep(2); // Go to automation simulation view
    simulateAutomation();
  };

  // Render Calendar Grid
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
      const isDayAvailable = isDoctorAvailableOnDay(date);
      const disabled = isPast(date) || !isDayAvailable;
      const today = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            h-10 md:h-12 w-full rounded-xl text-sm font-medium transition-all relative flex items-center justify-center border-2
            ${disabled 
              ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed border-transparent bg-slate-50 dark:bg-slate-800/50' 
              : 'border-transparent hover:border-secondary/30 dark:hover:border-purple-500/30 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}
            ${isSelected 
              ? '!bg-gradient-to-tr !from-secondary !to-teal-500 dark:!from-purple-600 dark:!to-indigo-600 !text-white !shadow-lg !scale-110 !border-transparent z-10' 
              : ''}
            ${today && !isSelected ? 'border-secondary/50 dark:border-purple-500/50 text-secondary dark:text-purple-400 font-bold' : ''}
          `}
        >
          {day}
          {today && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-secondary dark:bg-purple-500 rounded-full"></span>}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-sky-50 dark:bg-slate-900 min-h-screen py-10 px-4 transition-colors">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transition-colors border border-slate-100 dark:border-slate-700">
        
        {/* Header */}
        <div className="bg-secondary dark:bg-purple-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
          <h1 className="text-3xl font-bold mb-2 relative z-10">Book Your Appointment</h1>
          <p className="text-teal-100 dark:text-purple-200 relative z-10">Select your preferred doctor and schedule a visit.</p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Specialist</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                    <select 
                      name="doctorId" 
                      required
                      value={formData.doctorId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 focus:border-transparent outline-none transition-colors appearance-none"
                    >
                      <option value="">-- Choose Doctor --</option>
                      {DOCTORS.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
                      ))}
                    </select>
                  </div>
                  {formData.doctorId && (
                    <div className="mt-2 text-xs text-secondary dark:text-sky-400 bg-sky-50 dark:bg-slate-700/50 p-2 rounded-lg flex items-center gap-2">
                       <Clock size={14} />
                       <span>Available: {availability.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Treatment Type</label>
                   <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                    <select 
                      name="serviceId" 
                      required
                      value={formData.serviceId}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 focus:border-transparent outline-none transition-colors appearance-none"
                    >
                      <option value="">-- Choose Service --</option>
                      {SERVICES.map(srv => (
                        <option key={srv.id} value={srv.id}>{srv.title}</option>
                      ))}
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Patient Details</h3>
                   <div className="space-y-4">
                      <div className="relative">
                          <input 
                            type="text" 
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-4 p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none transition-colors"
                          />
                      </div>
                      <div className="relative">
                          <input 
                            type="tel" 
                            name="phone"
                            placeholder="Phone Number"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-4 p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none transition-colors"
                          />
                      </div>
                      <div className="relative">
                          <input 
                            type="email" 
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-4 p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none transition-colors"
                          />
                      </div>
                      <div className="relative">
                          <textarea 
                            name="notes"
                            placeholder="Notes or Questions for the Doctor..."
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-4 p-3 focus:ring-2 focus:ring-secondary dark:focus:ring-purple-500 outline-none transition-colors resize-none"
                          />
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Calendar & Time */}
              <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-700/30 rounded-3xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <CalendarIcon className="text-secondary dark:text-purple-400" size={20} />
                    Select Date & Time
                  </h3>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><ChevronLeft size={20} className="text-slate-600 dark:text-slate-300"/></button>
                    <span className="text-sm font-semibold w-32 text-center text-slate-800 dark:text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><ChevronRight size={20} className="text-slate-600 dark:text-slate-300"/></button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-8 select-none">
                  <div className="grid grid-cols-7 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-slate-500 dark:text-slate-400 justify-center">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gradient-to-tr from-secondary to-teal-500 dark:from-purple-600 dark:to-indigo-600"></div> Selected</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full border border-secondary text-secondary font-bold flex items-center justify-center text-[8px]">12</div> Today</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div> Unavailable</div>
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="animate-fade-in">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                      <Clock size={16} /> Available Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h4>
                    {timeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({...formData, time})}
                            className={`
                              py-2 px-1 rounded-xl text-sm font-medium border-2 transition-all duration-200
                              ${formData.time === time 
                                ? 'bg-secondary dark:bg-purple-600 border-secondary dark:border-purple-600 text-white shadow-md transform scale-110' 
                                : 'bg-white dark:bg-slate-800 border-transparent hover:border-secondary dark:hover:border-purple-500 text-slate-600 dark:text-slate-300 hover:shadow-sm'}
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl text-center text-sm flex flex-col items-center gap-2">
                        <Info size={24} />
                        <p>No slots available for this date. {formData.doctorId ? `Dr. ${selectedDoctorObj?.name.split(' ')[1]} might be off-duty.` : 'Please check another date.'}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 flex justify-end">
                   <button 
                    type="submit"
                    disabled={!selectedDate || !formData.time}
                    className="bg-secondary dark:bg-purple-600 hover:bg-teal-700 dark:hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    Confirm Booking <CheckCircle size={20} />
                  </button>
                </div>
              </div>

            </form>
          )}

          {step === 2 && (
            <div className="text-center py-16 max-w-lg mx-auto">
               <div className="flex justify-center mb-8">
                 <div className="relative">
                   <div className="w-24 h-24 border-4 border-slate-100 dark:border-slate-700 rounded-full"></div>
                   <div className="w-24 h-24 border-4 border-secondary dark:border-purple-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={32} className="text-secondary dark:text-purple-600 animate-spin" />
                   </div>
                 </div>
               </div>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Processing Booking</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-8">Please wait while we secure your appointment...</p>
               
               <div className="bg-slate-900 text-green-400 font-mono text-sm p-6 rounded-2xl text-left h-64 overflow-y-auto shadow-inner border border-slate-800">
                  {automationLog.map((log, index) => (
                    <div key={index} className="flex items-center gap-3 mb-2 animate-fade-in">
                       <span className="text-secondary dark:text-purple-400">➜</span> {log}
                    </div>
                  ))}
                  {loading && <span className="animate-pulse">_</span>}
               </div>
            </div>
          )}

          {step === 3 && (
             <div className="text-center py-10 max-w-2xl mx-auto">
                <div className="w-28 h-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 shadow-lg shadow-green-100 dark:shadow-none animate-bounce-slow">
                   <CheckCircle size={56} />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Booking Confirmed!</h2>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-slate-700 shadow-lg">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                     <p className="text-slate-500 dark:text-slate-400">Appointment ID</p>
                     <p className="text-xl font-mono font-bold text-slate-900 dark:text-white">#GALAXY-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>
                  <div className="text-left space-y-3">
                     <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Date:</span>
                       <span className="font-semibold text-slate-800 dark:text-white">{selectedDate?.toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Time:</span>
                       <span className="font-semibold text-slate-800 dark:text-white">{formData.time}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-slate-500 dark:text-slate-400">Doctor:</span>
                       <span className="font-semibold text-slate-800 dark:text-white">{DOCTORS.find(d => d.id === formData.doctorId)?.name || 'Specialist'}</span>
                     </div>
                  </div>
                </div>

                {/* Automated Care Section */}
                <div className="bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 mb-8 border border-sky-100 dark:border-slate-700 text-left">
                  <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <HeartPulse className="text-secondary dark:text-purple-400" /> Galaxy Automated Care Enabled
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                        <Bell className="text-secondary dark:text-purple-400 shrink-0 mt-1" size={18} />
                        <div>
                           <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Smart Reminders</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">SMS/WhatsApp (24h prior) & Email (2h prior) scheduled.</p>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                        <Gift className="text-pink-500 shrink-0 mt-1" size={18} />
                        <div>
                           <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Birthday Club</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Birthday wishes + 10% discount coupon auto-scheduled.</p>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                        <FileText className="text-sky-500 shrink-0 mt-1" size={18} />
                        <div>
                           <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Post-Care Guide</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Do's & Don'ts + Pain management guide queued for post-visit.</p>
                        </div>
                     </div>
                     <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-start gap-3">
                        <CalendarIcon className="text-teal-500 shrink-0 mt-1" size={18} />
                        <div>
                           <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Treatment Plan</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Aligner & checkup follow-up reminders activated.</p>
                        </div>
                     </div>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                  A confirmation has been sent to <strong>{formData.email}</strong>.
                </p>
                
                <div className="flex justify-center gap-4">
                  <button onClick={() => navigate('/')} className="px-8 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors">Go Home</button>
                  <button onClick={() => { setStep(1); setAutomationLog([]); setSelectedDate(null); setFormData(prev => ({...prev, time: '', notes: ''})); }} className="px-8 py-3 bg-secondary dark:bg-purple-600 text-white rounded-xl hover:bg-teal-700 dark:hover:bg-purple-700 font-bold shadow-lg transition-colors">Book Another</button>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
