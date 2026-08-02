import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/Hero';
import { MarqueeSection } from './sections/Marquee';
import { AboutSection } from './sections/About';
import { ServicesSection } from './sections/Services';
import { ProjectsSection } from './sections/Projects';
import { Aurora } from './components/Aurora';
import './index.css';

function App() {
  useEffect(() => {
    // Disable browser auto-scroll to section hash on page refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Ensure fresh page loads at top
    if (!window.location.hash || window.location.hash === '#hero') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="main-wrapper min-h-screen relative bg-[#0C0C0C] text-[#E2EDF8]">
      {/* Floating Liquid Glass Header */}
      <Navbar />

      {/* Global fixed Aurora background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Aurora colorStops={['#5227FF', '#00d4ff', '#7cff67']} amplitude={1.2} blend={0.6} />
      </div>

      <main className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
    </div>
  );
}

export default App;
