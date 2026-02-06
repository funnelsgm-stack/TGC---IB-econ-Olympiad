import React from 'react';
import { Mail, Bell } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Logo & Identity */}
          <div className="flex items-center">
             <img 
                src="https://i.postimg.cc/PqZkSDHL/12113.png" 
                alt="TGC Shield" 
                className="h-8 w-auto mr-1.5 object-contain"
             />
             <span className="font-bold text-lg font-mono tracking-tighter">
               TGC <span className="text-gray-500 mx-2">-</span> IB-econ <span className="opacity-50 font-light">Olympiad</span>
             </span>
          </div>
          
          {/* Contact / Notices */}
          <div className="flex flex-col md:items-end">
            <div className="flex items-center space-x-2 text-yellow-500/80 mb-2 bg-yellow-500/5 px-2 py-1 border border-yellow-500/10 rounded">
                <Bell className="h-3 w-3" />
                <p className="font-mono text-[10px] uppercase tracking-widest">
                    Check your inbox for official notices
                </p>
            </div>
            <a href="mailto:henry.gold@theglobalcollege.com" className="group flex items-center justify-start md:justify-end text-gray-400 hover:text-white transition-colors font-mono text-sm">
              <Mail className="h-4 w-4 mr-2 group-hover:text-white transition-colors" />
              henry.gold@theglobalcollege.com
            </a>
            <p className="text-gray-600 text-[10px] font-mono mt-2 max-w-xs text-left md:text-right leading-relaxed">
                Case materials, schedule changes, and logistical info will be sent exclusively via email.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono uppercase tracking-wider">
          <p>© 2025 THE GLOBAL COLLEGE. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 md:mt-0">FOR DP1 ECONOMICS COHORTS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;