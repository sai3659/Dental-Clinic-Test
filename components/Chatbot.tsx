import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'bot'|'user', text: string}[]>([
    {from: 'bot', text: 'Hi! Welcome to Galaxy Dental Clinic. How can I help you today?'}
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {from: 'user', text: userMsg}]);
    setInput('');

    // Simulate response
    setTimeout(() => {
        let response = "I'm a virtual assistant. Please call us at +91 98765 43210 for detailed queries.";
        if(userMsg.toLowerCase().includes('book')) response = "You can book an appointment by clicking the 'Book Appointment' button in the menu.";
        if(userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) response = "Our consultation starts at ₹500. Check our Pricing page for more details.";
        if(userMsg.toLowerCase().includes('time') || userMsg.toLowerCase().includes('open')) response = "We are open Mon-Sat 10AM to 9PM.";
        
        setMessages(prev => [...prev, {from: 'bot', text: response}]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-secondary hover:bg-teal-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-slate-800 w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-secondary dark:bg-purple-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Dental Assistant</h3>
                    <span className="text-xs text-teal-100 dark:text-purple-200 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online</span>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.from === 'user' 
                    ? 'bg-secondary dark:bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="flex-1 bg-slate-100 dark:bg-slate-700 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 dark:focus:ring-purple-500/50"
            />
            <button onClick={handleSend} className="bg-secondary dark:bg-purple-600 text-white p-2 rounded-full hover:bg-teal-700 dark:hover:bg-purple-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;