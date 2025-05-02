'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, DownloadCloud } from 'lucide-react';

const navItems = [
  { title: 'Home', href: '#home' },
  
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Skills', href: '#skills' },
  { title: 'Certificates', href: '#certifications' },
  { title: 'Passions', href: '#passions' },
  { title: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (isOpen) setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1e1e1e]/95 backdrop-blur-md py-2 shadow-md' : 'bg-[#1e1e1e] py-3'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xl font-bold text-white flex items-center"
        >
          <Code className="text-[#007acc] mr-2" size={20} />
          <span className="text-[#007acc]">B</span>havesh
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-[#cccccc] hover:text-white transition-colors duration-300 px-2 py-1 rounded hover:bg-[#2a2d2e]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* CV Button */}
        <a
          href="/docs/Bhavesh_Pabnani_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center bg-[#333333] hover:bg-[#444444] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors border border-[#007acc] gap-1.5"
        >
          <DownloadCloud size={14} />
          Download CV
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-between items-center">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'transform rotate-45 translate-y-2.5' : ''
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'transform -rotate-45 -translate-y-2.5' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-6 py-4 bg-[#252526] border-t border-[#333333]">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[#cccccc] hover:text-white block py-2 px-3 hover:bg-[#2a2d2e] rounded transition-colors duration-300"
                >
                  {item.title}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="/docs/Bhavesh_Pabnani_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#007acc] hover:bg-[#0066b6] text-white px-4 py-2 rounded text-sm font-medium transition-colors gap-2"
                onClick={() => setIsOpen(false)}
              >
                <DownloadCloud size={14} />
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.nav>
  );
}