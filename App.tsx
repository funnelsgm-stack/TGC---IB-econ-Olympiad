import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutUs from './components/AboutUs';
import Timeline from './components/Timeline';
import Registration from './components/Registration';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // ScrollSpy: Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // If we are in manager mode, don't spy
      if (currentPage === 'manager') return;

      const sections = ['home', 'about', 'timeline', 'about-us', 'register'];
      const scrollPosition = window.scrollY + 300; // Offset to trigger active state earlier

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentPage(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    if (id === 'manager') {
        setCurrentPage('manager');
        window.scrollTo(0,0);
        return;
    }
    
    if (currentPage === 'manager') {
        setCurrentPage('home');
        // Wait for render to find element
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    // We let the scroll listener update the currentPage state
  };

  return (
    <div className="font-sans text-gray-900 bg-black selection:bg-white selection:text-black relative">
      <CustomCursor />
      
      <Navbar 
        onNavigate={scrollToSection} 
        currentPage={currentPage}
      />

      <main className="min-h-screen">
        {currentPage === 'manager' ? (
          <AdminDashboard />
        ) : (
          <>
            <div id="home">
                <Hero onRegisterClick={() => scrollToSection('register')} />
            </div>
            <About />
            <Timeline />
            <AboutUs />
            <Registration />
          </>
        )}
      </main>

      {currentPage !== 'manager' && <Footer />}
    </div>
  );
};

export default App;