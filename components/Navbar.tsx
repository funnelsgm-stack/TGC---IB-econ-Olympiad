import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up or at the very top (buffer zone)
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Hide if scrolling down and not at the top
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu if open
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'HOME', id: 'home' },
    { name: 'FORMAT', id: 'about' },
    { name: 'SCHEDULE', id: 'timeline' },
    { name: 'ORGANIZERS', id: 'about-us' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <img 
                src="https://i.postimg.cc/PqZkSDHL/12113.png" 
                alt="TGC Shield" 
                className="h-10 w-auto mr-1.5 object-contain"
            />
            <span className="text-xl font-bold text-white tracking-tighter font-mono">
              <span className="font-normal">The</span> <span className="font-light opacity-60">Youth Economics</span> Olympiad
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 lg:space-x-12">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-xs tracking-widest font-mono transition-all duration-300 ${
                  currentPage === link.id ? 'text-white underline underline-offset-4 decoration-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="block w-full text-left px-3 py-4 border-l-2 border-transparent hover:border-white text-sm font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;