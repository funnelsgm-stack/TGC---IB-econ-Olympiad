import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, Mic, Award } from 'lucide-react';

const About: React.FC = () => {
  const steps = [
    {
        icon: FileText,
        title: "01. THE BRIEFING",
        subtitle: "Pre-Event",
        desc: "Case material is released prior to the event. Teams receive the 'Applied Case Study' dossier. Research begins immediately. You enter the room prepared.",
        realWorld: "Consultants must synthesize vast amounts of market data before client meetings. This phase mirrors the preparation required for high-level strategic advisory."
    },
    {
        icon: Clock,
        title: "02. THE SPRINT",
        subtitle: "March 21st - 09:00",
        desc: "3 Hours of intense problem solving. Teams must apply IB Economic concepts to the real-world crisis presented in the case. No textbooks, just pure reasoning.",
        realWorld: "In crisis management and trading floors, time is the scarcest resource. Teams operate under strict constraints to produce viable economic models."
    },
    {
        icon: Mic,
        title: "03. THE PITCH",
        subtitle: "March 21st - 12:00",
        desc: "5 Minutes to convince the board. You present your solution to a panel of expert judges. Clarity, viability, and economic accuracy are your weapons.",
        realWorld: "Complex data is useless if it cannot be communicated. This mimics the boardroom environment where technical analysis meets executive decision-making."
    },
    {
        icon: Award,
        title: "04. THE VERDICT",
        subtitle: "March 21st - 13:00",
        desc: "Feedback is delivered. Winners are announced. The goal is not just to win, but to have your economic intuition validated by professionals.",
        realWorld: "Feedback loops are essential for professional growth. Participants receive direct critique from industry experts, simulating a real-world performance review."
    }
  ];

  return (
    <section id="about" className="py-32 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Participate Section */}
        <div className="mb-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl"
            >
                <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Values & Objectives</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white font-mono leading-tight mb-10">
                    WHY PARTICIPATE?
                </h3>
                
                <div className="border-l-4 border-white pl-8 py-4 mb-16">
                    <p className="text-2xl md:text-3xl text-white font-serif italic leading-relaxed font-medium">
                        "First International Baccalaureate based research olympiad in Madrid."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Beyond The Syllabus", desc: "Leave the textbook behind. Apply DP1 concepts to volatile, real-world economic scenarios that defy simple models." },
                        { title: "Elite Network", desc: "Connect with the most ambitious economics students from Madrid's top international schools." },
                        { title: "Professional Validation", desc: "Don't just get a grade. Get vetted by a panel of industry experts and real-world economists." }
                    ].map((item, i) => (
                        <div key={i} className="bg-zinc-900/30 p-8 border border-white/10 hover:bg-zinc-900/50 transition-colors">
                            <h4 className="text-white font-bold font-mono mb-4 text-lg">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-sans">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Blueprint Header */}
        <div className="mb-20">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tighter">THE<br/>BLUEPRINT</h2>
                    <div className="w-12 h-1 bg-white mb-6"></div>
                    <p className="text-gray-400 leading-relaxed text-sm max-w-xl">
                        This is not a quiz. It is a simulation of high-stakes economic consultancy. 
                        We bridge the gap between IB theory and real-world application.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-white font-bold font-mono text-lg">IB APPLIED ECONOMICS</p>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Format & Methodology</p>
                </div>
             </div>
        </div>

        {/* The Steps Flow */}
        <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-0">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Side */}
                            <div className="w-full md:w-1/2 md:px-12 text-center md:text-left">
                                <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'}`}>
                                    <div className="flex items-center gap-3 mb-3 text-white/50">
                                        <step.icon className="w-5 h-5" />
                                        <span className="font-mono text-xs uppercase tracking-widest">{step.subtitle}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white font-mono mb-4">{step.title}</h3>
                                    <p className={`text-gray-400 text-sm leading-relaxed mb-6 max-w-md ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
                                        {step.desc}
                                    </p>
                                    
                                    {/* Real World Application Block - Replaces the icon block */}
                                    <div className={`mt-2 border-t border-white/10 pt-4 max-w-sm
                                        ${isEven ? 'text-left' : 'text-left md:text-right'}
                                    `}>
                                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2">
                                            How this applies to the real world
                                        </p>
                                        <p className="text-white text-sm font-mono leading-relaxed italic opacity-80">
                                            "{step.realWorld}"
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Center Node (Desktop) */}
                            <div className="hidden md:flex relative z-10 w-12 h-12 bg-black border border-white/20 items-center justify-center rounded-full">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>

                            {/* Spacer for structure */}
                            <div className="w-full md:w-1/2 hidden md:block"></div>
                        </motion.div>
                    )
                })}
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;