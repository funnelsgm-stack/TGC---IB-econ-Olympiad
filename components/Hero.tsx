import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EVENT_DATE } from '../constants';
import { getRegistrationStatus } from '../services/storageService';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
      const fetchStatus = async () => {
          const status = await getRegistrationStatus();
          setIsOpen(status);
      };
      fetchStatus();
  }, []);

  const keywords = [
      { word: "ANALYZE", desc: "The Case" },
      { word: "SOLVE", desc: "The Problem" },
      { word: "PITCH", desc: "The Solution" },
      { word: "DOMINATE", desc: "The Olympiad" }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black min-h-screen flex items-center border-b border-white/10">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px] opacity-20 pointer-events-none"></div>
      
      {/* Radial fade for grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex items-center space-x-2 mb-8 font-mono text-xs tracking-widest uppercase border px-4 py-2
                ${isOpen ? 'text-white/60 border-white/20' : 'text-red-500/80 border-red-500/20'}
            `}
          >
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white animate-pulse' : 'bg-red-500'}`}></span>
            <span>Registration Status: {isOpen ? 'Open' : 'Closed'}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] font-mono mb-8"
          >
            THE <br />
            <span className="font-serif italic font-medium ml-4 md:ml-20">Future</span> <br />
            OF ECONOMICS.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 border-l border-white/20 pl-6 space-y-6"
          >
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Elite&nbsp;<span className="text-white font-bold">IB</span>&nbsp;Inter-School Case Study Competition.
            </p>
            
            <div className="flex flex-wrap gap-x-8 gap-y-2">
                {keywords.map((item, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="text-white font-bold font-mono text-xl tracking-tight">{item.word}</span>
                        <span className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">{item.desc}</span>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <button
              onClick={onRegisterClick}
              disabled={!isOpen}
              className={`group relative inline-flex items-center justify-center px-8 py-4 text-sm font-mono tracking-wider font-bold transition-all
                ${isOpen ? 'text-black bg-white hover:bg-gray-200 cursor-pointer' : 'text-gray-500 bg-zinc-900 cursor-not-allowed'}
              `}
            >
              <span>{isOpen ? 'REGISTER TEAM' : 'REGISTRATION CLOSED'}</span>
              {isOpen && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>
            <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-mono tracking-wider font-bold text-white border border-white/30 hover:bg-white hover:text-black transition-all"
            >
                VIEW DETAILS
            </a>
          </motion.div>

          {/* Footer Stats in Hero */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8"
          >
             <div>
                <p className="font-mono text-xs text-gray-500 uppercase mb-1">Date</p>
                <p className="text-white font-mono">{EVENT_DATE}</p>
             </div>
             <div>
                <p className="font-mono text-xs text-gray-500 uppercase mb-1">Format</p>
                <p className="text-white font-mono">Applied Case Study</p>
             </div>
             <div>
                <p className="font-mono text-xs text-gray-500 uppercase mb-1">Teams</p>
                <p className="text-white font-mono">Max 8 (5 pax)</p>
             </div>
             <div>
                <p className="font-mono text-xs text-gray-500 uppercase mb-1">Location</p>
                <p className="text-white font-mono text-sm leading-tight">The Global College<br/><span className="text-gray-500 text-xs">C. de Castellón de la Plana, 8</span><br/><span className="text-gray-500 text-xs">Madrid, ES</span></p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;