import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Globe2, Wallet } from 'lucide-react';

// Placeholder data for the architects
const TEAM = [
  {
    id: 1,
    name: "HENRY",
    role: "FOUNDER / OPERATIONS",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
  },
  {
    id: 2,
    name: "G. MARTIN",
    role: "CO-FOUNDER / TECH",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80"
  },
  {
    id: 3,
    name: "J. DOE",
    role: "HEAD OF STRATEGY",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&q=80"
  },
  {
    id: 4,
    name: "S. SMITH",
    role: "CREATIVE DIRECTOR",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80"
  }
];

const AboutUs: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Parallax setup
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create a subtle parallax effect (cards move slower than scroll)
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Specific chaotic positions for "spread" state (Non-grid, scattered look)
  const cardLayouts = [
    { x: -140, y: -125, rotate: -12 },  // Top Left (Henry) - Tilted strongly left
    { x: 135, y: -105, rotate: 8 },     // Top Right (G. Martin) - Higher, tilted right
    { x: -105, y: 110, rotate: 6 },     // Bottom Left (J. Doe) - Overlaps center/top left slightly
    { x: 155, y: 135, rotate: -5 }      // Bottom Right (S. Smith) - Pushed out, subtle left tilt
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
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
                    The <span className="text-white font-bold">TGC IB-econ Olympiad</span> is an initiative spearheaded by a group of students and faculty of Economics at the school of The Global College.
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

            {/* Interactive Card Deck Section */}
            <motion.div 
                className="relative h-[600px] flex items-center justify-center cursor-pointer perspective-1000"
                style={{ y: parallaxY }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setHoveredCardId(null);
                    setFlippedCards([]); // Reset flips when hiding deck
                }}
            >
                {/* Background Grid for Context */}
                <div className="absolute inset-0 bg-grid-white bg-[size:30px_30px] opacity-10 pointer-events-none rounded-xl border border-white/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

                {/* The Dollar Bill Overlay */}
                <motion.div
                    className="absolute z-20 w-[340px] h-[160px] bg-zinc-950 border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between p-3 select-none pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                        backgroundSize: '8px 8px'
                    }}
                    animate={isHovered ? {
                        y: -150,
                        opacity: 0,
                        rotate: 10,
                        scale: 0.9,
                        filter: "blur(4px)"
                    } : {
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    {/* Decorative Border Inner */}
                    <div className="border-2 border-double border-white/30 h-full w-full p-2 relative flex flex-col items-center justify-center">
                        
                        {/* Corners */}
                        <div className="absolute top-1 left-2 font-serif text-white/80 font-bold text-lg">20</div>
                        <div className="absolute top-1 right-2 font-serif text-white/80 font-bold text-lg">25</div>
                        <div className="absolute bottom-1 left-2 font-serif text-white/80 font-bold text-lg">20</div>
                        <div className="absolute bottom-1 right-2 font-serif text-white/80 font-bold text-lg">25</div>

                        {/* Top Text */}
                        <div className="text-center mb-2">
                            <h3 className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-mono mb-1">Economics Society</h3>
                            <h2 className="text-lg font-serif italic font-bold text-white tracking-wide">THE GLOBAL COLLEGE</h2>
                        </div>

                        {/* Center Seal */}
                        <div className="relative w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center mb-2 bg-zinc-900">
                             <span className="font-serif font-bold text-white italic">TGC</span>
                             {/* Guilloche effect lines (simplified) */}
                             <div className="absolute inset-0 rounded-full border border-white/10 scale-75"></div>
                             <div className="absolute inset-0 rounded-full border border-white/10 scale-50"></div>
                        </div>

                        {/* Bottom Text */}
                        <div className="text-center">
                            <div className="text-[6px] text-gray-600 font-mono max-w-[200px] leading-tight mb-1">
                                OFFICIAL ORGANIZING BODY OF THE OLYMPIAD.
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-white/60 font-mono border-t border-white/10 pt-1 mt-1">
                                HOVER TO REVEAL
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Cards (Team Members) */}
                <div className="relative w-64 h-80 z-10">
                    {TEAM.map((member, index) => {
                        const layout = cardLayouts[index];
                        
                        const isFlipped = flippedCards.includes(member.id);
                        const isCardHovered = hoveredCardId === member.id;
                        
                        // Check if any card is active (hovered OR flipped)
                        const isAnyCardFlipped = flippedCards.length > 0;
                        const isAnyCardHovered = hoveredCardId !== null;
                        const isFocusActive = isAnyCardHovered || isAnyCardFlipped;

                        // This card is emphasized if it is flipped OR hovered
                        const isEmphasized = isFlipped || isCardHovered;

                        return (
                            <motion.div
                                key={member.id}
                                className="interactive-card absolute top-0 left-0 w-full h-full bg-black border border-white/10 shadow-2xl origin-center cursor-pointer"
                                initial={false}
                                onClick={(e) => handleCardClick(member.id, e)}
                                onMouseEnter={() => setHoveredCardId(member.id)}
                                onMouseLeave={() => setHoveredCardId(null)}
                                animate={isHovered ? {
                                    x: layout.x,
                                    y: layout.y,
                                    rotate: layout.rotate,
                                    // If any focus is active, scale non-emphasized cards down. Emphasized cards stay 1.
                                    scale: isFocusActive ? (isEmphasized ? 1 : 0.85) : 1, 
                                    opacity: isFocusActive ? (isEmphasized ? 1 : 0.6) : 1,
                                    zIndex: isFlipped ? 50 : (isCardHovered ? 40 : 10 + index), // Base index staggered
                                    filter: isFocusActive ? (isEmphasized ? "brightness(1.1)" : "brightness(0.5)") : "brightness(1)"
                                } : {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 0.8, // Scale down behind the bill
                                    opacity: 0, // Hide behind the bill
                                    zIndex: 0,
                                    filter: "brightness(0.5)"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: isHovered ? 0.1 + (index * 0.05) : 0 // slight delay to wait for bill to lift
                                }}
                            >
                                <motion.div 
                                    className="w-full h-full relative bg-black"
                                    initial={false}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* FRONT */}
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden bg-zinc-900 border border-white">
                                        <div className="w-full h-full relative group">
                                            <img 
                                                src={member.img} 
                                                alt={member.name}
                                                className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500" 
                                            />
                                            {/* Overlay Content (Front) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <p className="text-white font-mono font-bold text-lg">{member.name}</p>
                                                <p className="text-gray-400 font-mono text-xs uppercase">CLICK TO INSPECT</p>
                                            </div>
                                            
                                            {/* Always visible minimal label when spread */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 border-t border-white/20">
                                                <p className="text-white font-mono text-sm text-center">{member.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BACK */}
                                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-zinc-950 border border-white p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                                        {/* Back Background Pattern */}
                                        <div className="absolute inset-0 bg-grid-white bg-[size:10px_10px] opacity-10 pointer-events-none"></div>
                                        
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-mono font-bold text-white mb-2 italic">{member.name}</h3>
                                            <div className="w-12 h-0.5 bg-white mb-6 mx-auto"></div>
                                            
                                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">ROLE</p>
                                            <p className="text-sm font-mono text-white mb-6 uppercase border border-white/20 py-1 px-2 inline-block">{member.role}</p>
                                            
                                            <div className="text-[10px] font-mono text-gray-400 space-y-1 border-t border-white/10 pt-4 w-full">
                                                <div className="flex justify-between">
                                                    <span>ID:</span>
                                                    <span className="text-white">TGC-0{index + 1}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>STATUS:</span>
                                                    <span className="text-green-500">ACTIVE</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;