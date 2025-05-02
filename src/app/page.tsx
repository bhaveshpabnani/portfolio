'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Passions from '@/components/Passions';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setShowNavbar(window.scrollY > heroHeight - 100);
      }
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black">
      <div className="w-full">
        <div id="home">
          <Hero />
        </div>
        {showNavbar && <Navbar />}
        <div id="about">
          <Experience />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="certifications">
          <Certifications />
        </div>
        <div id="passions">
          <Passions />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}