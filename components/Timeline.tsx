
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

type TimelineStatus = 'completed' | 'active' | 'upcoming';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: TimelineStatus;
}

const events: TimelineEvent[] = [
  {
    date: "FEB 2025",
    title: "REGISTRATION OPENS",
    description: "Applications open for all eligible DP1 cohorts.",
    status: "completed",
  },
  {
    date: "27 FEB 2025",
    title: "TEAMS CONFIRMED",
    description: "Registration Deadline. 23:59 local time.",
    status: "active",
  },
  {
    date: "14 MAR 2025",
    title: "CASE MATERIAL RELEASE",
    description: "Preliminary context released.",
    status: "upcoming",
  },
  {
    date: "20 MAR 2025",
    title: "THE OLYMPIAD",
    description: "Competition Day at TGC.",
    status: "upcoming",
  }
];

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="timeline" className="py-16 bg-black border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
           <h2 className="text-xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              KEY DATES
           </h2>
        </div>

        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-[5px] left-0 right-0 h-px bg-white/10 w-full" />

          {/* Scrollable Container */}
          <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-0 pb-4 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {events.map((event, index) => {
               const isActive = event.status === 'active';
               const isCompleted = event.status === 'completed';

               return (
                 <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-64 md:w-1/4 pr-8 relative"
                 >
                    {/* Node on the line */}
                    <div className={`absolute -top-[15px] left-0 w-2.5 h-2.5 rounded-full border z-10 bg-black transition-colors
                        ${isActive ? 'border-white bg-white' : isCompleted ? 'border-gray-600 bg-gray-600' : 'border-gray-800'}
                    `}></div>

                    <div className="pt-2">
                        <span className={`block font-mono text-[10px] uppercase tracking-widest mb-1
                            ${isActive ? 'text-white' : 'text-gray-500'}
                        `}>
                            {event.date}
                        </span>
                        <h3 className={`text-xs font-bold font-mono mb-1 uppercase
                            ${isActive ? 'text-white' : 'text-gray-400'}
                        `}>
                            {event.title}
                        </h3>
                        <p className="text-gray-600 font-mono text-[10px] leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                 </motion.div>
               )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
