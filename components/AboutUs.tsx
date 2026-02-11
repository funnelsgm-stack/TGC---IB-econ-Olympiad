import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Globe2, Mail } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  description: string;
  img: string;
  email?: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "GABRIEL",
    description: "Economics student at The Global College",
    img: "https://i.postimg.cc/vcg6KBfm/image.png"
  },
  {
    id: 2,
    name: "HENRY",
    description: "Economics Lead & Founding teacher @ The Global College",
    img: "https://i.postimg.cc/9rkpM6yb/image.png",
    email: "henry.gold@theglobalcollege.com"
  },
  {
    id: 3,
    name: "ICIAR",
    description: "Engineering student at The Global College",
    img: "https://i.postimg.cc/0KQ4gp1B/image.png"
  },
  {
    id: 4,
    name: "MARIOLA",
    description: "PPE student at The Global College",
    img: "https://i.postimg.cc/2LYQbrXJ/image.png"
  }
];

const AboutUs: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const cardLayouts = [
    { x: -110, y: -90, rotate: -12 },
    { x: 105, y: -70, rotate: 8 },
    { x: -85, y: 80, rotate: 6 },
    { x: 125, y: 100, rotate: -5 }
  ];

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isHovered) return;
    setFlippedCards(prev => 
        prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  return (
    <section id="about-us" ref={containerRef} className="py-24 bg-black border-b border-white/10 overflow-hidden">
      {/* Enhanced SVG Texture Filter */}
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
        <filter id="wear">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-2">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8 z-10"
            >
                <div>
                    <h2 className="text-4xl font-bold text-white font-mono mb-2">THE_ORGANIZERS</h2>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Organizing Committee</p>
                </div>
                
                <p className="text-gray-300 font-sans text-lg leading-relaxed border-l-2 border-white/20 pl-6">
                    The <span className="text-white font-bold"><span className="font-normal">The</span> Youth Economics Olympiad</span> is an initiative spearheaded by a group of students and faculty of Economics at the school of The Global College.
                    We are dedicated to fostering critical thinking and real-world economic application among the next generation of leaders.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="border border-white/10 p-6 bg-zinc-950/30">
                        <Building2 className="h-6 w-6 text-gray-400 mb-4" />
                        <h3 className="text-white font-mono text-sm uppercase mb-2">Institution</h3>
                        <p className="text-gray-500 text-xs font-mono">The Global College<br/>Madrid, Spain</p>
                    </div>
                    <div className="border border-white/10 p-6 bg-zinc-950/30">
                        <Globe2 className="h-6 w-6 text-gray-400 mb-4" />
                        <h3 className="text-white font-mono text-sm uppercase mb-2">Vision</h3>
                        <p className="text-gray-500 text-xs font-mono">Bridging theory and<br/>applied economics.</p>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                className="relative h-[500px] flex items-center justify-center cursor-pointer perspective-1000"
                style={{ y: parallaxY }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setHoveredCardId(null);
                    setFlippedCards([]);
                }}
            >
                <div className="absolute inset-0 bg-grid-white bg-[size:30px_30px] opacity-10 pointer-events-none rounded-xl border border-white/5" />
                
                {/* Enhanced 'Bill' Card with more texture */}
                <motion.div
                    className="absolute z-20 w-[360px] h-[170px] bg-[#0c0c0e] border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between p-3 select-none pointer-events-none"
                    animate={isHovered ? { y: -150, opacity: 0, scale: 0.9, filter: "blur(4px)" } : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                >
                    {/* Layer 1: Fibrous Paper Texture */}
                    <div className="absolute inset-0 opacity-[0.12] mix-blend-screen" 
                         style={{ 
                             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                             backgroundSize: '150px 150px'
                         }} 
                    />

                    {/* Layer 2: Scuff Marks & Stains */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none" 
                         style={{ 
                             backgroundImage: `
                                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 40%),
                                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 35%),
                                radial-gradient(circle at 50% 10%, rgba(255,255,255,0.04) 0%, transparent 20%)
                             `
                         }} 
                    />

                    {/* Layer 3: Crease Lines */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-[33%] w-[1px] bg-white/40 blur-[1px] rotate-1" />
                        <div className="absolute top-0 bottom-0 left-[66%] w-[1px] bg-white/30 blur-[1px] -rotate-1" />
                        <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-white/20 blur-[2px]" />
                    </div>
                    
                    {/* Layer 4: Grainy Texture Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay" style={{ filter: 'url(#grain)', background: '#fff' }} />
                    
                    {/* Layer 5: Dot Matrix Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
                         style={{ 
                             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                             backgroundSize: '6px 6px' 
                         }} 
                    />

                    {/* Layer 6: Subtle Vignette / Edge Wear */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-black/60 opacity-60" />
                    <div className="absolute inset-0 border-[10px] border-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
                    
                    <div className="border-2 border-double border-white/20 h-full w-full p-2 relative flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-[0.5px]">
                        {/* Decorative Corner Numbers */}
                        <div className="absolute top-1 left-2 font-serif text-white/40 font-bold text-lg select-none">20</div>
                        <div className="absolute top-1 right-2 font-serif text-white/40 font-bold text-lg select-none">25</div>
                        <div className="absolute bottom-1 left-2 font-serif text-white/20 font-bold text-[10px] select-none">No. 2025-YEO</div>
                        <div className="absolute bottom-1 right-2 font-serif text-white/20 font-bold text-[10px] select-none">SERIES A</div>

                        <div className="text-center mb-2 z-10">
                            <h3 className="text-[7px] uppercase tracking-[0.6em] text-gray-500 font-mono mb-1.5 opacity-80">Youth Economics</h3>
                            <h2 className="text-xl font-serif italic font-bold text-white tracking-wider filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                <span className="font-normal opacity-70">The</span> Youth Economics Olympiad
                            </h2>
                        </div>
                        
                        <div className="relative w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-3 bg-zinc-900/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                             {/* Seal Texture */}
                             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,transparent_20%,black_100%)]" />
                             <span className="font-serif font-bold text-white/80 italic text-lg z-10">YEO</span>
                        </div>

                        <div className="text-center z-10">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-mono border-t border-white/10 pt-1.5 mt-1">
                                HOVER TO REVEAL CREW
                            </p>
                        </div>
                    </div>
                    
                    {/* Final "Dirt" Pass */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-color-burn opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                </motion.div>

                <div className="relative w-52 h-64 z-10">
                    {TEAM.map((member, index) => {
                        const layout = cardLayouts[index];
                        const isFlipped = flippedCards.includes(member.id);
                        const isCardHovered = hoveredCardId === member.id;
                        const isFocusActive = hoveredCardId !== null || flippedCards.length > 0;
                        const isEmphasized = isFlipped || isCardHovered;

                        return (
                            <motion.div
                                key={member.id}
                                className="interactive-card absolute top-0 left-0 w-full h-full bg-black border border-white/10 shadow-2xl origin-center cursor-pointer"
                                onClick={(e) => handleCardClick(member.id, e)}
                                onMouseEnter={() => setHoveredCardId(member.id)}
                                onMouseLeave={() => setHoveredCardId(null)}
                                animate={isHovered ? {
                                    x: layout.x, y: layout.y, rotate: layout.rotate,
                                    scale: isFocusActive ? (isEmphasized ? 1.05 : 0.85) : 1,
                                    opacity: isFocusActive ? (isEmphasized ? 1 : 0.4) : 1,
                                    zIndex: isFlipped ? 50 : (isCardHovered ? 40 : 10 + index),
                                } : { x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
                            >
                                <motion.div 
                                    className="w-full h-full relative bg-black"
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden bg-zinc-900 border border-white">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale contrast-125" />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 border-t border-white/20">
                                            <p className="text-white font-mono text-xs text-center">{member.name}</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-zinc-950 border border-white p-4 flex flex-col items-center justify-center text-center">
                                        <h3 className="text-xl font-mono font-bold text-white mb-4 italic">{member.name}</h3>
                                        <p className="text-[10px] font-mono text-white leading-relaxed mb-4">{member.description}</p>
                                        
                                        {member.email && (
                                            <div className="mt-2 pt-3 border-t border-white/10 w-full">
                                                <a 
                                                    href={`mailto:${member.email}`}
                                                    className="flex flex-col items-center group/email transition-colors hover:text-white text-gray-400"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Mail className="w-4 h-4 mb-1.5 opacity-60 group-hover/email:opacity-100" />
                                                    <span className="text-[9px] font-mono tracking-wider break-all px-2">
                                                        {member.email}
                                                    </span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-0 flex flex-col items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
            <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Hosted & Managed By</p>
            <img 
                src="https://i.postimg.cc/FK2HRmrv/b242c7f2-2b6b-4d1d-9511-3e3221d27893-md.jpg" 
                alt="The Global College" 
                className="h-32 md:h-48 w-auto object-contain"
            />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;